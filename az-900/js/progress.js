/* =====================================================================
   AZ-900 Study Hub — local progress tracking
   Persists per-topic mock-test performance in the browser (localStorage)
   so strengths & weaknesses survive across visits.

   Stored shape (per topic id):
     { correct, total, lastSeen, history: [last 20 booleans] }
   ===================================================================== */
(function () {
  const KEY = "az900_topic_progress_v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  /* Record a batch of answered questions.
     results = [{ topic, correct }, ...] */
  function recordResults(results) {
    const data = load();
    const now = Date.now();
    results.forEach(r => {
      if (!r.topic) return;
      const t = data[r.topic] || { correct: 0, total: 0, history: [] };
      t.total += 1;
      if (r.correct) t.correct += 1;
      t.history = (t.history || []).concat(r.correct ? 1 : 0).slice(-20);
      t.lastSeen = now;
      data[r.topic] = t;
    });
    save(data);
    return data;
  }

  function reset() { localStorage.removeItem(KEY); }

  /* Skill level label from an accuracy percentage. */
  function level(pct) {
    if (pct >= 85) return { label: "Strong",     cls: "lvl-strong",  color: "#36d399" };
    if (pct >= 70) return { label: "Good",        cls: "lvl-good",    color: "#3a8dff" };
    if (pct >= 50) return { label: "Needs work",  cls: "lvl-mid",     color: "#fbbf24" };
    return { label: "Weak", cls: "lvl-weak", color: "#f87171" };
  }

  window.AZProgress = { KEY, load, save, recordResults, reset, level };
})();
