# Certification Study Hub

A self-contained, zero-dependency study site for Microsoft certifications. Open `index.html` in any browser and pick a course — no build step, no server required.

## Courses

| Course | Path | Covers |
|--------|------|--------|
| **AZ-900** — Azure Fundamentals | `az-900/` | Cloud concepts, Azure architecture & services, management & governance |
| **SC-200** — Security Operations Analyst | `sc-200/` | Microsoft Defender XDR, Microsoft Defender for Cloud, Microsoft Sentinel |
| **KQL** — Kusto Query Language | `kql/` | A live query sandbox with gated scenarios + a full basic/advanced query reference |

The root `index.html` is a course selector with a button for each certification.

## Each course includes

| Page | What it does |
|------|--------------|
| **Study Guide** (`index.html`) | Complete, exam-aligned notes across all domains, plus an exam-readiness meter, an exam-date countdown, and a tickable 7-day study plan. |
| **Flashcards** (`flashcards.html`) | Active-recall cards with domain filtering, shuffle, and mastery tracking. |
| **Mock Tests** (`mock-tests.html`) | Scenario questions in single-answer, multiple-response, yes/no, and complete-the-sentence formats — including **read-the-KQL / complete-the-query** items and **incident-response workflow** scenarios. Full timed exam, relaxed practice, and a focused **By Topic** mode. Instant-feedback toggle, Back button, flag questions, review mistakes, retry incorrect, and a **Drill my weak spots** mode that auto-builds a set from your lowest-scoring topics (read from My Progress). |
| **Memory Games** (`games.html`) | Match Up, Memory Flip, and Beat the Clock on key term/definition pairs. |
| **My Progress** (`progress.html`) | Per-topic strengths & weaknesses dashboard, saved locally per course. |
| **Cheat Sheet** (`cheatsheet.html`) | Dense high-yield one-pager with a Print / Save-as-PDF button. |

**The KQL course** (`kql/`) is a dedicated lab: a live, in-browser KQL engine over fictional SOC databases (SigninLogs, SecurityEvent, DeviceProcessEvents, EmailEvents, AzureActivity, etc.). Its **Practice** page (`kql/index.html`) lets you run any query, browse the schema, and work gated scenarios — each scenario has its own database and a ladder of levels that unlock in turn. Its **Reference** page (`kql/reference.html`) is a copy-paste library of operators, functions, and basic/advanced query patterns plus recommended learning resources, and its **Cheat Sheet** page (`kql/cheatsheet.html`) is a printable one-pager. Engine: `kql/js/kql-engine.js`; data + challenges: `kql/js/kql-data.js`. SC-200's sidebar links across to it since KQL underpins Sentinel and advanced hunting.

## Structure & data

```
index.html            ← course selector
css/style.css         ← shared styles
az-900/  index.html, flashcards.html, mock-tests.html, games.html, progress.html, cheatsheet.html
         js/ data.js, questions.js, questions-formats.js, progress.js
sc-200/  (same page set + its own js/)
```

- Each course's content lives in its own `js/` folder: **`data.js`** (categories, topics, flashcards, term pairs), **`questions.js`** and **`questions-formats.js`** (the mock-test bank), and **`progress.js`**.
- Progress, flags, mastery, plans, and exam dates are saved in the browser's `localStorage`, **namespaced per course** (`az900_*` vs `sc200_*`), so the two courses never collide.

> Built as a personal study aid. Always confirm details against the official Microsoft Learn skills outline for each exam.
