/* =====================================================================
   SC-200 Study Hub — a small KQL engine (subset of Kusto Query Language)
   Runs pipeline queries against in-memory tables, entirely in the browser.

   Supported: table source, union; where, project, project-away, extend,
   summarize (count/countif/sum/avg/min/max/dcount/make_set/make_list) by,
   count, take/limit, top ... by, sort/order by, distinct, join (inner),
   mv-expand, render (ignored). Scalar funcs: ago, now, datetime, bin,
   tolower/toupper, strlen, strcat, tostring, toint, isempty/isnotempty,
   coalesce, iff/iif, substring, indexof, split, array_length.
   String ops: ==, !=, <,>,<=,>=, contains, has, startswith, endswith,
   in, !in, between; and/or/not; +,-,*,/,%.

   Not a full KQL implementation — enough for realistic SOC practice.
   ===================================================================== */
(function () {
  "use strict";

  // ---------------- helpers ----------------
  const dt = e => ({ __dt: e });
  const isDate = v => v && typeof v === "object" && "__dt" in v;
  function toEpoch(v) {
    if (isDate(v)) return v.__dt;
    if (typeof v === "number") return v;
    if (typeof v === "string") { const p = Date.parse(v); return isNaN(p) ? NaN : p; }
    return NaN;
  }
  function truthy(v) {
    if (typeof v === "boolean") return v;
    if (v == null) return false;
    if (typeof v === "number") return v !== 0 && !isNaN(v);
    if (typeof v === "string") return v !== "";
    return !!v;
  }
  function numeric(v) { if (isDate(v)) return v.__dt; const n = Number(v); return n; }
  function looksNumeric(v) { return typeof v === "number" || (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))); }
  function cmp(a, b) {
    if (isDate(a) || isDate(b)) { const x = toEpoch(a), y = toEpoch(b); return x < y ? -1 : x > y ? 1 : 0; }
    if (a == null && b == null) return 0;
    if (a == null) return 1; if (b == null) return -1; // nulls last
    if (looksNumeric(a) && looksNumeric(b)) { const x = Number(a), y = Number(b); return x < y ? -1 : x > y ? 1 : 0; }
    return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
  }
  function eqCS(a, b) {
    if (isDate(a) || isDate(b)) return toEpoch(a) === toEpoch(b);
    if (a == null || b == null) return a === b;
    if (typeof a === "number" && typeof b === "number") return a === b;
    if (typeof a === "boolean" || typeof b === "boolean") return String(a) === String(b);
    return String(a) === String(b); // case-sensitive
  }
  const ci = s => (s == null ? "" : String(s)).toLowerCase();
  function hasWord(hay, needle) {
    const h = ci(hay), n = ci(needle);
    if (!n) return false;
    return new RegExp("(^|[^a-z0-9])" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)").test(h);
  }
  function tsToMs(v, unit) { return v * ({ ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 })[unit]; }

  // ---------------- top-level splitters ----------------
  function splitTop(str, sepChars) {
    // split on any char in sepChars at paren/bracket depth 0, outside quotes
    const out = []; let depth = 0, q = null, cur = "";
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (q) { cur += c; if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; cur += c; continue; }
      if (c === "(" || c === "[") { depth++; cur += c; continue; }
      if (c === ")" || c === "]") { depth--; cur += c; continue; }
      if (depth === 0 && sepChars.indexOf(c) >= 0) { out.push(cur); cur = ""; continue; }
      cur += c;
    }
    out.push(cur);
    return out;
  }
  function splitPipes(str) { return splitTop(str, "|").map(s => s.trim()).filter(s => s.length); }
  // find " <kw> " at top level; returns index or -1
  function findKeyword(str, kw) {
    let depth = 0, q = null;
    const re = new RegExp("\\b" + kw + "\\b", "i");
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === "(" || c === "[") { depth++; continue; }
      if (c === ")" || c === "]") { depth--; continue; }
      if (depth === 0) { const m = re.exec(str.slice(i)); if (m && m.index === 0) return i; }
    }
    return -1;
  }
  // split "Name = expr" -> find first single '=' (not ==,!=,<=,>=) at top level
  function findAssign(str) {
    let depth = 0, q = null;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === "(" || c === "[") { depth++; continue; }
      if (c === ")" || c === "]") { depth--; continue; }
      if (depth === 0 && c === "=") {
        const prev = str[i - 1], next = str[i + 1];
        if (prev === "!" || prev === "<" || prev === ">" || prev === "=" ) continue;
        if (next === "=") continue;
        return i;
      }
    }
    return -1;
  }

  // ---------------- lexer ----------------
  function lex(input) {
    const toks = []; let i = 0; const n = input.length;
    const isIdStart = c => /[A-Za-z_]/.test(c), isId = c => /[A-Za-z0-9_]/.test(c);
    while (i < n) {
      const c = input[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "/" && input[i + 1] === "/") { while (i < n && input[i] !== "\n") i++; continue; }
      if (c === '"' || c === "'") { const q = c; i++; let s = ""; while (i < n && input[i] !== q) { if (input[i] === "\\") { s += input[i + 1]; i += 2; } else s += input[i++]; } i++; toks.push({ t: "str", v: s }); continue; }
      if (/[0-9]/.test(c)) {
        let j = i; while (j < n && /[0-9.]/.test(input[j])) j++;
        const num = input.slice(i, j); const rest = input.slice(j);
        const m = /^(ms|d|h|m|s)(?![A-Za-z0-9_])/.exec(rest);
        if (m) { toks.push({ t: "num", v: tsToMs(parseFloat(num), m[1]) }); i = j + m[1].length; continue; }
        toks.push({ t: "num", v: parseFloat(num) }); i = j; continue;
      }
      if (isIdStart(c)) { let j = i; while (j < n && isId(input[j])) j++; toks.push({ t: "id", v: input.slice(i, j) }); i = j; continue; }
      const two = input.substr(i, 2);
      if (["==", "!=", "<=", ">=", "..", "&&", "||"].indexOf(two) >= 0) { toks.push({ t: "op", v: two }); i += 2; continue; }
      if ("=<>!+-*/%(),.".indexOf(c) >= 0) { toks.push({ t: "op", v: c }); i++; continue; }
      throw new Error("Unexpected character '" + c + "'");
    }
    return toks;
  }

  // ---------------- expression parser ----------------
  function parseExpr(str) {
    const toks = lex(str); let pos = 0;
    const peek = () => toks[pos];
    const next = () => toks[pos++];
    const isId = v => peek() && peek().t === "id" && peek().v.toLowerCase() === v;
    const isOp = v => peek() && peek().t === "op" && peek().v === v;

    function parseExpression() { return parseOr(); }
    function parseOr() { let l = parseAnd(); while (isId("or") || isOp("||")) { next(); l = { type: "bin", op: "or", l, r: parseAnd() }; } return l; }
    function parseAnd() { let l = parseNot(); while (isId("and") || isOp("&&")) { next(); l = { type: "bin", op: "and", l, r: parseNot() }; } return l; }
    function parseNot() { if (isId("not") || isOp("!")) { next(); return { type: "unary", op: "not", e: parseNot() }; } return parseComparison(); }
    const CMP = ["==", "!=", "<", ">", "<=", ">="];
    const WORDOPS = ["contains", "has", "startswith", "endswith", "in", "hasprefix", "hassuffix", "matches"];
    function parseComparison() {
      const l = parseAdditive();
      const p = peek();
      if (p && p.t === "op" && CMP.indexOf(p.v) >= 0) { next(); return { type: "bin", op: p.v, l, r: parseAdditive() }; }
      if (p && p.t === "id" && p.v.toLowerCase() === "between") { next(); return parseBetween(l, false); }
      if (p && p.t === "id" && WORDOPS.indexOf(p.v.toLowerCase()) >= 0) { const op = next().v.toLowerCase(); return parseWordOp(l, op, false); }
      if (p && p.t === "op" && p.v === "!" && toks[pos + 1] && toks[pos + 1].t === "id") {
        const w = toks[pos + 1].v.toLowerCase();
        if (WORDOPS.indexOf(w) >= 0) { next(); next(); return parseWordOp(l, w, true); }
        if (w === "between") { next(); next(); return parseBetween(l, true); }
      }
      return l;
    }
    function parseWordOp(l, op, neg) {
      if (op === "in") {
        if (!isOp("(")) throw new Error("Expected '(' after 'in'");
        next(); const items = [];
        if (!isOp(")")) { items.push(parseExpression()); while (isOp(",")) { next(); items.push(parseExpression()); } }
        if (!isOp(")")) throw new Error("Expected ')'"); next();
        return { type: "bin", op: neg ? "!in" : "in", l, r: { type: "list", items } };
      }
      const r = parseAdditive();
      return { type: "bin", op: (neg ? "!" : "") + op, l, r };
    }
    function parseBetween(l, neg) {
      if (!isOp("(")) throw new Error("Expected '(' after 'between'"); next();
      const lo = parseAdditive();
      if (!isOp("..")) throw new Error("Expected '..' in between"); next();
      const hi = parseAdditive();
      if (!isOp(")")) throw new Error("Expected ')'"); next();
      return { type: "bin", op: neg ? "!between" : "between", l, r: { lo, hi } };
    }
    function parseAdditive() { let l = parseMul(); while (isOp("+") || isOp("-")) { const op = next().v; l = { type: "bin", op, l, r: parseMul() }; } return l; }
    function parseMul() { let l = parseUnary(); while (isOp("*") || isOp("/") || isOp("%")) { const op = next().v; l = { type: "bin", op, l, r: parseUnary() }; } return l; }
    function parseUnary() { if (isOp("-") || isOp("+")) { const op = next().v; return { type: "unary", op, e: parseUnary() }; } return parsePrimary(); }
    function parsePrimary() {
      const p = peek();
      if (!p) throw new Error("Unexpected end of expression");
      if (p.t === "num") { next(); return { type: "lit", v: p.v }; }
      if (p.t === "str") { next(); return { type: "lit", v: p.v }; }
      if (p.t === "id") {
        const name = next().v;
        if (name.toLowerCase() === "true") return { type: "lit", v: true };
        if (name.toLowerCase() === "false") return { type: "lit", v: false };
        if (isOp("(")) {
          next(); const args = [];
          if (!isOp(")")) { args.push(parseExpression()); while (isOp(",")) { next(); args.push(parseExpression()); } }
          if (!isOp(")")) throw new Error("Expected ')' after arguments to " + name); next();
          return { type: "call", name: name.toLowerCase(), args };
        }
        return { type: "col", name };
      }
      if (p.t === "op" && p.v === "(") { next(); const e = parseExpression(); if (!isOp(")")) throw new Error("Expected ')'"); next(); return e; }
      throw new Error("Unexpected token '" + p.v + "'");
    }
    const ast = parseExpression();
    if (pos < toks.length) throw new Error("Unexpected token '" + toks[pos].v + "'");
    return ast;
  }

  // ---------------- expression evaluator ----------------
  function evalExpr(node, row, ctx) {
    switch (node.type) {
      case "lit": return node.v;
      case "col": { const v = row[node.name]; return v === undefined ? null : v; }
      case "list": return node.items.map(x => evalExpr(x, row, ctx));
      case "unary": {
        const v = evalExpr(node.e, row, ctx);
        if (node.op === "not") return !truthy(v);
        if (node.op === "-") return -numeric(v);
        return +numeric(v);
      }
      case "call": return callFn(node.name, node.args.map(a => evalExpr(a, row, ctx)), ctx);
      case "bin": {
        const op = node.op;
        if (op === "and") return truthy(evalExpr(node.l, row, ctx)) && truthy(evalExpr(node.r, row, ctx));
        if (op === "or") return truthy(evalExpr(node.l, row, ctx)) || truthy(evalExpr(node.r, row, ctx));
        const a = evalExpr(node.l, row, ctx);
        if (op === "in" || op === "!in") { const arr = evalExpr(node.r, row, ctx); const found = arr.some(x => eqCS(a, x)); return op === "in" ? found : !found; }
        if (op === "between" || op === "!between") { const lo = evalExpr(node.r.lo, row, ctx), hi = evalExpr(node.r.hi, row, ctx); const res = cmp(a, lo) >= 0 && cmp(a, hi) <= 0; return op === "between" ? res : !res; }
        const b = evalExpr(node.r, row, ctx);
        switch (op) {
          case "==": return eqCS(a, b);
          case "!=": return !eqCS(a, b);
          case "<": return cmp(a, b) < 0;
          case ">": return cmp(a, b) > 0;
          case "<=": return cmp(a, b) <= 0;
          case ">=": return cmp(a, b) >= 0;
          case "contains": return ci(a).indexOf(ci(b)) >= 0;
          case "!contains": return ci(a).indexOf(ci(b)) < 0;
          case "has": return hasWord(a, b);
          case "!has": return !hasWord(a, b);
          case "startswith": return ci(a).indexOf(ci(b)) === 0;
          case "!startswith": return ci(a).indexOf(ci(b)) !== 0;
          case "endswith": return ci(a).lastIndexOf(ci(b)) === ci(a).length - ci(b).length && ci(b).length > 0;
          case "!endswith": return !(ci(a).lastIndexOf(ci(b)) === ci(a).length - ci(b).length && ci(b).length > 0);
          case "hasprefix": return ci(a).indexOf(ci(b)) === 0;
          case "hassuffix": return ci(a).endsWith(ci(b));
          case "+": if (looksNumeric(a) && looksNumeric(b)) return Number(a) + Number(b); return String(a == null ? "" : a) + String(b == null ? "" : b);
          case "-": return numeric(a) - numeric(b);
          case "*": return numeric(a) * numeric(b);
          case "/": return numeric(a) / numeric(b);
          case "%": return numeric(a) % numeric(b);
          default: throw new Error("Unknown operator '" + op + "'");
        }
      }
      default: throw new Error("Bad expression node");
    }
  }

  function callFn(name, args, ctx) {
    switch (name) {
      case "ago": return dt(ctx.now - Number(args[0]));
      case "now": return dt(ctx.now);
      case "datetime": case "todatetime": return dt(Date.parse(args[0]));
      case "bin": case "floor": {
        const v = args[0], span = Number(args[1]);
        if (isDate(v)) return dt(Math.floor(toEpoch(v) / span) * span);
        if (typeof v === "string" && /\d{4}-\d\d-\d\d/.test(v)) { const e = Date.parse(v); if (!isNaN(e)) return dt(Math.floor(e / span) * span); }
        return Math.floor(Number(v) / span) * span;
      }
      case "tolower": return ci(args[0]);
      case "toupper": return (args[0] == null ? "" : String(args[0])).toUpperCase();
      case "strlen": return (args[0] == null ? "" : String(args[0])).length;
      case "strcat": return args.map(a => (a == null ? "" : String(a))).join("");
      case "tostring": return args[0] == null ? "" : String(args[0]);
      case "toint": case "tolong": case "todouble": case "toreal": return Number(args[0]);
      case "isempty": return args[0] == null || args[0] === "";
      case "isnotempty": return !(args[0] == null || args[0] === "");
      case "isnull": return args[0] == null;
      case "isnotnull": return args[0] != null;
      case "coalesce": { for (const a of args) if (a != null && a !== "") return a; return null; }
      case "iff": case "iif": return truthy(args[0]) ? args[1] : args[2];
      case "substring": return (args[0] == null ? "" : String(args[0])).substr(Number(args[1]), args[2] != null ? Number(args[2]) : undefined);
      case "indexof": return (args[0] == null ? "" : String(args[0])).indexOf(String(args[1]));
      case "split": return (args[0] == null ? "" : String(args[0])).split(String(args[1]));
      case "array_length": return Array.isArray(args[0]) ? args[0].length : 0;
      default: throw new Error("Unknown function '" + name + "()'");
    }
  }

  // ---------------- project/extend item parsing ----------------
  function parseItem(str) {
    const eq = findAssign(str);
    if (eq >= 0) { const name = str.slice(0, eq).trim(); return { name, ast: parseExpr(str.slice(eq + 1)) }; }
    const ast = parseExpr(str);
    let name = str.trim();
    if (ast.type === "col") name = ast.name;
    else if (ast.type === "call" && ast.name === "bin" && ast.args[0] && ast.args[0].type === "col") name = ast.args[0].name;
    return { name, ast };
  }

  // ---------------- pipeline ----------------
  function evalSource(seg, tables) {
    const m = /^union\s+(.+)$/i.exec(seg.trim());
    if (m) {
      const names = splitTop(m[1], ",").map(s => s.trim().replace(/^kind\s*=\s*\w+\s+/i, ""));
      let rows = [];
      names.forEach(nm => { const t = tables[nm]; if (!t) throw new Error("Unknown table '" + nm + "'"); rows = rows.concat(t.map(r => Object.assign({}, r))); });
      return rows;
    }
    const name = seg.trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error("Expected a table name to start the query, got '" + name + "'");
    const t = tables[name];
    if (!t) throw new Error("Unknown table '" + name + "'. Available: " + Object.keys(tables).join(", "));
    return t.map(r => Object.assign({}, r));
  }

  function parseSortKeys(str) {
    return splitTop(str, ",").map(part => {
      const m = /^([\s\S]+?)\s+(asc|desc)\s*$/i.exec(part.trim());
      if (m) return { ast: parseExpr(m[1]), dir: m[2].toLowerCase() };
      return { ast: parseExpr(part.trim()), dir: "desc" };
    });
  }
  function sortRows(rows, keys, ctx) {
    return rows.slice().sort((ra, rb) => {
      for (const k of keys) { const c = cmp(evalExpr(k.ast, ra, ctx), evalExpr(k.ast, rb, ctx)); if (c !== 0) return k.dir === "asc" ? c : -c; }
      return 0;
    });
  }

  function applyOp(seg, rows, ctx, tables) {
    const m = /^([A-Za-z_][A-Za-z0-9_-]*)\b([\s\S]*)$/.exec(seg.trim());
    if (!m) throw new Error("Could not parse operator: " + seg);
    const op = m[1].toLowerCase(); const arg = m[2].trim();

    switch (op) {
      case "where": case "filter": { const ast = parseExpr(arg); return rows.filter(r => truthy(evalExpr(ast, r, ctx))); }
      case "project": { const items = splitTop(arg, ",").map(s => parseItem(s.trim())); return rows.map(r => { const o = {}; items.forEach(it => o[it.name] = evalExpr(it.ast, r, ctx)); return o; }); }
      case "project-away": { const cols = splitTop(arg, ",").map(s => s.trim()); return rows.map(r => { const o = Object.assign({}, r); cols.forEach(c => delete o[c]); return o; }); }
      case "project-keep": case "project-rename": { const items = splitTop(arg, ",").map(s => parseItem(s.trim())); return rows.map(r => { const o = {}; items.forEach(it => o[it.name] = evalExpr(it.ast, r, ctx)); return o; }); }
      case "extend": { const items = splitTop(arg, ",").map(s => parseItem(s.trim())); return rows.map(r => { const o = Object.assign({}, r); items.forEach(it => o[it.name] = evalExpr(it.ast, r, ctx)); return o; }); }
      case "count": return [{ Count: rows.length }];
      case "take": case "limit": { const nn = parseInt(arg, 10); return rows.slice(0, isNaN(nn) ? rows.length : nn); }
      case "top": { const mm = /^(\d+)\s+by\s+([\s\S]+)$/i.exec(arg); if (!mm) throw new Error("Usage: top N by Column"); const keys = parseSortKeys(mm[2]); return sortRows(rows, keys, ctx).slice(0, parseInt(mm[1], 10)); }
      case "sort": case "order": { const a2 = arg.replace(/^by\s+/i, ""); return sortRows(rows, parseSortKeys(a2), ctx); }
      case "distinct": { const items = splitTop(arg, ",").map(s => parseItem(s.trim())); const seen = new Set(); const out = []; rows.forEach(r => { const o = {}; items.forEach(it => o[it.name] = evalExpr(it.ast, r, ctx)); const k = canonRow(o); if (!seen.has(k)) { seen.add(k); out.push(o); } }); return out; }
      case "summarize": return doSummarize(arg, rows, ctx);
      case "mv-expand": case "mvexpand": { const col = arg.split(/\s+/)[0]; const out = []; rows.forEach(r => { const v = r[col]; if (Array.isArray(v)) v.forEach(x => { const o = Object.assign({}, r); o[col] = x; out.push(o); }); else out.push(r); }); return out; }
      case "join": return doJoin(arg, rows, ctx, tables);
      case "union": { const names = splitTop(arg, ",").map(s => s.trim().replace(/^kind\s*=\s*\w+\s+/i, "")); let out = rows.slice(); names.forEach(nm => { const t = tables[nm]; if (!t) throw new Error("Unknown table '" + nm + "'"); out = out.concat(t.map(r => Object.assign({}, r))); }); return out; }
      case "render": return rows; // visualization ignored in the sandbox
      case "evaluate": case "parse": case "lookup": throw new Error("The '" + op + "' operator isn't supported in this sandbox yet.");
      default: throw new Error("Unknown operator '" + op + "'");
    }
  }

  function doSummarize(arg, rows, ctx) {
    const byIdx = findKeyword(arg, "by");
    let aggPart = arg, byPart = "";
    if (byIdx >= 0) { aggPart = arg.slice(0, byIdx); byPart = arg.slice(byIdx + 2); }
    const aggs = splitTop(aggPart, ",").map(s => s.trim()).filter(Boolean).map(parseAgg);
    const keys = byPart.trim() ? splitTop(byPart, ",").map(s => parseItem(s.trim())) : [];

    const groups = new Map();
    rows.forEach(r => {
      const kv = keys.map(k => evalExpr(k.ast, r, ctx));
      const gk = canonRow(kv);
      if (!groups.has(gk)) groups.set(gk, { kv, rows: [] });
      groups.get(gk).rows.push(r);
    });
    if (keys.length === 0 && rows.length === 0) groups.set("__all__", { kv: [], rows: [] });

    const out = [];
    groups.forEach(g => {
      const o = {};
      keys.forEach((k, i) => o[k.name] = g.kv[i]);
      aggs.forEach(a => o[a.name] = computeAgg(a, g.rows, ctx));
      out.push(o);
    });
    return out;
  }
  function parseAgg(str) {
    let name = null, expr = str;
    const eq = findAssign(str);
    if (eq >= 0) { name = str.slice(0, eq).trim(); expr = str.slice(eq + 1).trim(); }
    const m = /^([A-Za-z_]+)\s*\(([\s\S]*)\)$/.exec(expr);
    if (!m) throw new Error("Invalid aggregation '" + expr + "'");
    const fn = m[1].toLowerCase(); const inner = m[2].trim();
    if (!name) name = fn === "count" ? "count_" : fn + "_" + (inner || "");
    return { name, fn, ast: inner ? parseExpr(inner) : null, inner };
  }
  function computeAgg(a, rs, ctx) {
    const vals = () => rs.map(r => evalExpr(a.ast, r, ctx));
    switch (a.fn) {
      case "count": return rs.length;
      case "countif": return rs.filter(r => truthy(evalExpr(a.ast, r, ctx))).length;
      case "sum": return vals().reduce((s, v) => s + Number(v || 0), 0);
      case "avg": case "average": { const v = vals().map(Number); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : 0; }
      case "min": { let m = null; vals().forEach(v => { if (m === null || cmp(v, m) < 0) m = v; }); return m; }
      case "max": { let m = null; vals().forEach(v => { if (m === null || cmp(v, m) > 0) m = v; }); return m; }
      case "dcount": return new Set(vals().map(v => (v == null ? " null" : String(v)))).size;
      case "make_set": { const s = []; const seen = new Set(); vals().forEach(v => { const k = String(v); if (!seen.has(k)) { seen.add(k); s.push(v); } }); return s.sort((x, y) => cmp(x, y)); }
      case "make_list": return vals();
      case "any": case "take_any": return rs.length ? evalExpr(a.ast, rs[0], ctx) : null;
      default: throw new Error("Unknown aggregation '" + a.fn + "()'");
    }
  }

  function doJoin(arg, rows, ctx, tables) {
    const m = /^(?:kind\s*=\s*(\w+)\s*)?\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s+on\s+([\s\S]+)$/i.exec(arg.trim());
    if (!m) throw new Error("Usage: join kind=inner (RightTable) on Key");
    const kind = (m[1] || "innerunique").toLowerCase();
    const rname = m[2]; const rightRows = tables[rname]; if (!rightRows) throw new Error("Unknown table '" + rname + "'");
    const keys = splitTop(m[3], ",").map(s => s.trim());
    const keyFn = row => keys.map(k => String(row[k])).join("");
    const index = new Map();
    rightRows.forEach(r => { const k = keyFn(r); if (!index.has(k)) index.set(k, []); index.get(k).push(r); });
    const out = [];
    const usedLeftKeys = new Set();
    rows.forEach(lr => {
      const k = keyFn(lr); let matches = index.get(k) || [];
      if (kind === "innerunique") matches = matches.slice(0, 1);
      if ((kind === "leftouter" || kind === "leftanti") && matches.length === 0) { if (kind === "leftouter") out.push(Object.assign({}, lr)); return; }
      matches.forEach(rr => {
        if (kind === "leftanti") return;
        const o = Object.assign({}, lr);
        Object.keys(rr).forEach(col => { if (keys.indexOf(col) >= 0) return; o[(col in lr) ? col + "1" : col] = rr[col]; });
        out.push(o);
      });
      if (kind === "leftanti" && matches.length === 0) out.push(Object.assign({}, lr));
    });
    return out;
  }

  function canonVal(v) {
    if (isDate(v)) return "dt:" + v.__dt;
    if (Array.isArray(v)) return "[" + v.slice().sort((a, b) => cmp(a, b)).map(canonVal).join(",") + "]";
    if (v == null) return " ";
    return typeof v + ":" + String(v);
  }
  function canonRow(o) {
    if (Array.isArray(o)) return o.map(canonVal).join("");
    return Object.keys(o).sort().map(k => k + "=" + canonVal(o[k])).join("");
  }
  function inferColumns(rows) {
    const cols = []; const seen = new Set();
    rows.forEach(r => Object.keys(r).forEach(k => { if (!seen.has(k)) { seen.add(k); cols.push(k); } }));
    return cols;
  }

  // display formatting of a cell value
  function formatCell(v) {
    if (v == null) return "";
    if (isDate(v)) return new Date(v.__dt).toISOString().replace("T", " ").replace(".000Z", "Z");
    if (Array.isArray(v)) return "[" + v.map(formatCell).join(", ") + "]";
    return String(v);
  }

  function runQuery(query, tables, options) {
    const now = options && options.now != null ? options.now : Date.now();
    const ctx = { now, tables };
    // preprocess bare datetime(...) -> datetime("...")
    let q = String(query).replace(/datetime\(\s*([^)'"]+?)\s*\)/gi, 'datetime("$1")');
    const segs = splitPipes(q);
    if (!segs.length) throw new Error("Empty query");
    let rows = evalSource(segs[0], tables);
    for (let i = 1; i < segs.length; i++) rows = applyOp(segs[i], rows, ctx, tables);
    return { columns: inferColumns(rows), rows: rows, format: formatCell, canonRow: canonRow };
  }

  // compare two result sets for scenario checking
  function resultsMatch(userRes, expectedRes, ordered) {
    const ur = userRes.rows, er = expectedRes.rows;
    if (ur.length !== er.length) return false;
    if (ordered) { for (let i = 0; i < ur.length; i++) if (canonRow(ur[i]) !== canonRow(er[i])) return false; return true; }
    const a = ur.map(canonRow).sort(), b = er.map(canonRow).sort();
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  const API = { runQuery, resultsMatch, formatCell, _parseExpr: parseExpr };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (typeof window !== "undefined") window.KQL = API;
})();
