# Review Plan

Purpose: staged cleanup and fix plan based on `docs/review-log.md`. Each stage should be completed and sanity-checked before moving on.

## Stage 0 — Safety + Preconditions (fast, low-risk)

Scope:
- Ensure we can run app and tests without breaking release flow.
- No visual/layout refactors in this stage.

Tasks:
- Confirm branch name for fixes (suggest `fix/review-plan-stage-1`).
- Verify current working tree is clean enough to proceed.

Checks:
- `npm run dev` (basic boot) if desired.
- `npm run build` before/after Stage 2.

---

## Stage 1 — Launch blockers (Need 4–5, low difficulty)

Focus: Fix must-fix before publishing.

Tasks:
- Update `public/robots.txt` to allow indexing (if launch is intended).
- Replace title and add SEO/OG/Twitter meta tags in `index.html`.
- Remove hardcoded password fallback in `src/components/PasswordGate.jsx` (env-only).
- Replace Contact form Formspree placeholder ID + email placeholder in `src/components/Contact.jsx`.

Checks:
- Load home page and a project page.
- Verify PasswordGate behavior (with and without env var).
- Verify contact form submission path + mailto link.

---

## Stage 2 — Cleanup + hygiene (Need 1–2, low difficulty)

Focus: remove noise, reduce confusion, small correctness fixes.

Tasks:
- Remove backup files in `src/`:
  - `src/components/about/AcademicJourney.jsx.backup`
  - `src/components/projects/HearingLoss/components/RiskFactorsSection.jsx.backup`
- Remove `src/assets/.DS_Store`.
- Remove unused `src/data/hearing-loss/*` if not referenced.
- Remove console logs in `src/components/about/ProteinViewer.jsx`.
- Update footer copyright year (if desired).

Checks:
- Run app and confirm no runtime errors.
- Verify About/Academic pages still render.

---

## Stage 3 — App correctness + DX (Need 2–3, moderate)

Focus: avoid subtle bugs and improve routing/behavior.

Tasks:
- Use React Router `<Link>` in blog cards to avoid full reload.
- Review blog post registry: either wire MDX posts or remove unused MDX files/metadata to prevent drift.
- Fix MelanomaWorkshop data fetch: check `response.ok` before `json()`.
- Consider aborting fetch on unmount in data contexts (optional).

Checks:
- Navigate to blog, open post, go back; ensure no hard reload.
- Verify both project pages load data cleanly.

---

## Stage 4 — Performance + interaction risk (Need 2–3, higher effort)

Focus: heavier changes; do after low-risk fixes.

Tasks (optional, validate need first):
- Throttle `useScrollGradient` or guard division by zero.
- Reduce raycasting cost in `ProteinViewer` (pointer-move driven).
- Normalize scroll lock handling across Hero/AcademicJourney to avoid conflicts.
- Consider adaptive quality for background/particles on low-end devices.

Checks:
- Run Lighthouse (Perf + Accessibility).
- Test on mobile device / simulator.

