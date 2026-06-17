# AZ-900 Study Hub

A self-contained, zero-dependency study site for the **Microsoft Azure Fundamentals (AZ-900)** exam.

Open `index.html` in any browser — no build step, no server required.

## Pages

| Page | What it does |
|------|--------------|
| **Study Guide** (`index.html`) | Complete, exam-aligned notes covering all three domains: Cloud Concepts, Azure Architecture & Services, and Management & Governance. |
| **Flashcards** (`flashcards.html`) | 80+ active-recall cards. Flip, shuffle, filter by domain, and mark cards as mastered (progress saved in your browser). |
| **Mock Tests** (`mock-tests.html`) | 100+ scenario-based questions in the style of the real AZ-900 exam. Full timed exam, instant-feedback practice mode, and per-domain drills with scored results, explanations, and a review breakdown. |
| **Memory Games** (`games.html`) | Three games — *Match Up*, *Memory Flip*, and *Beat the Clock* — built on key term/definition pairs. |
| **My Progress** (`progress.html`) | Per-topic strengths & weaknesses dashboard. Mock-test results are saved locally (per device) so you can see what you're good at and what to improve every time you return. |

## How progress tracking works
Every mock-test question is tagged with a specific topic (e.g. *Storage*, *Identity & Security*, *Cost Management*). As you answer questions, your correct/total per topic is saved to `localStorage` under `az900_topic_progress_v1`. The **My Progress** page reads this to show overall readiness, a per-domain breakdown, ranked strengths/weaknesses, and every topic sorted weakest-first. Nothing leaves your browser; use the reset button to clear it.

## Exam facts baked in
- Three domains: Cloud Concepts (25–30%), Architecture & Services (35–40%), Management & Governance (30–35%).
- ~40–60 questions, ~45 minutes, pass mark **700/1000** (≈70%).

## Editing content
- The **scenario question bank** lives in **`js/questions.js`** (loaded first, exposed as `window.AZ_QUESTIONS`). Add entries here to grow the mock tests; each is `{ cat, topic, q, options[], answer, explain }`.
- **Flashcards**, **topic/category definitions**, and **term/definition pairs** for the games live in **`js/data.js`**.
- Add or edit entries in those files and every page updates automatically.

The mock-test questions are modelled on real AZ-900 practice-exam style (long real-world scenarios with a single best answer) and span all 14 topics so the Progress dashboard stays meaningful.

> Built as a personal study aid. Always confirm details against the official Microsoft Learn AZ-900 skills outline.
