# Review Log

Purpose: Track what we've reviewed, issues found, and follow-ups before final polish/publish.

## Scope Progress

- Repo cleanup: completed
- General structure: completed
- Entry points & routing: completed
- Layout & global behavior: completed
- Background scene & scroll effects: completed
- Components overview: completed
- Hero/About/AcademicJourney: completed
- Work/Blog/Contact: completed
- Projects (HearingLoss/Melanoma): completed
- Data/assets/SEO/deploy: completed
- Assets & 3D performance: pending
- Styles/CSS organization: pending
- Build/lint/test checks: pending
- Accessibility/SEO/mobile: pending

## Scoring

- **Need (1–5):** 1 = optional polish, 3 = should fix, 5 = must fix before publish.
- **Difficulty (1–5):** 1 = isolated change, 3 = moderate refactor, 5 = high risk / wide impact.

## Findings (So Far)

### Entry points & routing (src/main.jsx, src/App.jsx, src/Layout.jsx)

- Manual `document.body`/`document.documentElement` height forcing on Home page runs on timers + resize; risk of layout jank or stale height when content changes after 1s. **Need:** 3 **Difficulty:** 2
- `window.Buffer = Buffer` global set in `src/main.jsx`; verify if actually required by any dependency, remove if unused. **Need:** 2 **Difficulty:** 1
- `Layout` always renders shader background + navbar for all routes; verify if this is desired for non-home routes (performance). **Need:** 2 **Difficulty:** 2
- Router `basename` derived from `import.meta.env.BASE_URL`; verify against deploy target. **Need:** 2 **Difficulty:** 1

### Scroll/lock interactions (src/components/hero/Hero.jsx, src/components/about/AcademicJourney.jsx)

- Multiple components independently lock scroll via `prevent-scroll` + `body.style.top` (Hero inspect mode, AcademicJourney modal). Risk of interference if both used or if component unmounts while locked. **Need:** 3 **Difficulty:** 3

### Theme context (src/contexts/ThemeContext.jsx)

- `localStorage` is read during initial state setup without a safety guard; can throw in non-browser contexts or restricted storage environments. **Need:** 2 **Difficulty:** 1

### Background/scroll effects (src/components/BackgroundScene.jsx, src/hooks/useScrollGradient.js)

- Three.js canvas runs with `frameloop="always"` and 3,000 particles on dark theme; can be heavy on mobile/GPU. Consider adaptive quality or demand-based rendering if perf issues show up. **Need:** 3 **Difficulty:** 3
- `isReportPage` is computed but doesn’t change behavior; unused dependency suggests leftover logic. **Need:** 1 **Difficulty:** 1
- `useScrollGradient` updates on every scroll without throttling and can compute `t` with `end - start = 0` for very short pages, causing `NaN` colors. **Need:** 2 **Difficulty:** 2

### Hero + About + Academic Journey

- Multiple components create their own WebGL canvases (`BackgroundScene` and `DNAHelixScene`), which means multiple WebGL contexts; this can be heavy on some devices/browsers. **Need:** 3 **Difficulty:** 3
- `DNAHelixScene` computes `isMobile` once per render without a resize listener; if viewport changes, camera/scale won’t update until a re-render occurs. **Need:** 2 **Difficulty:** 2
- Repeated `window.resize` listeners for mobile detection across Hero/About/AcademicJourney; consider a shared hook to reduce boilerplate and potential listener churn. **Need:** 2 **Difficulty:** 2
- AcademicJourney modal scroll locking uses `body.style.top` + `prevent-scroll`; combined with Hero’s scroll locking, potential interference when navigating. **Need:** 3 **Difficulty:** 3
- `.DS_Store` present in `src/assets/` (cleanup). **Need:** 1 **Difficulty:** 1

### About.jsx + ProteinViewer.jsx (deep dive)

- `src/components/about/About.jsx` appears unused in the app (no imports). Large legacy component + assets (BRCA1/Cas9/RNApol2) add weight and mental overhead. **Need:** 2 **Difficulty:** 2
- `src/components/about/AcademicJourney.jsx.backup` is a backup file inside `src/` and is not used; should be removed or moved out of source. **Need:** 1 **Difficulty:** 1
- `ProteinViewer` logs to console (`console.log` in render + hover). In production this can spam and hurt perf. **Need:** 3 **Difficulty:** 1
- `ProteinViewer` runs raycasting every frame when expanded; OK for now but can be heavy with complex meshes. Consider throttling or only raycasting when pointer moves. **Need:** 2 **Difficulty:** 3

### Work / Blog / Contact

- `Contact` form posts to Formspree placeholder (`YOUR_FORM_ID`) and mailto uses a placeholder address. These will fail in production unless replaced. **Need:** 4 **Difficulty:** 1
- `PasswordGate` includes a hardcoded fallback password (`myportfolio2025`). This is a security risk if deployed; should require env only or remove. **Need:** 4 **Difficulty:** 1
- Blog cards use `<a href>` instead of React Router `<Link>`, causing full page reload and losing SPA state. **Need:** 2 **Difficulty:** 1
- Blog has only one post in `src/posts/index.js`; MDX files exist but aren’t wired. Consider removing or integrating to reduce confusion. **Need:** 2 **Difficulty:** 2
- Footer copyright year is 2024; update if needed for 2026. **Need:** 1 **Difficulty:** 1

### Projects (HearingLoss/Melanoma)

- D3 charts append tooltips to `body` with shared class names (`.chart-tooltip`, `.forest-tooltip`); multiple charts on a page can conflict and cleanup may remove each other. **Need:** 3 **Difficulty:** 2
- ErrorBarChart creates tooltip even though hover tooltip content is disabled; wasted DOM and work. **Need:** 2 **Difficulty:** 1
- MelanomaWorkshop data fetch does not check `response.ok` or handle HTTP errors before `json()`. **Need:** 3 **Difficulty:** 1
- HearingLoss data context uses `fetch` without abort; rapid route changes could set state after unmount (rare). **Need:** 2 **Difficulty:** 2
- Backup file `src/components/projects/HearingLoss/components/RiskFactorsSection.jsx.backup` exists in `src/`. **Need:** 1 **Difficulty:** 1

### Data / Assets / SEO / Deploy

- `public/robots.txt` disallows all crawling. If you want indexing, this must be changed before launch. **Need:** 5 **Difficulty:** 1
- `index.html` title is still “Vite + React” and there are no meta description / Open Graph / Twitter tags. **Need:** 4 **Difficulty:** 2
- Duplicate data copies exist: `src/data/hearing-loss/*` and `public/data/hearing-loss/*`. Only `public/data` is used. Consider removing unused copy to reduce confusion. **Need:** 2 **Difficulty:** 1
- `src/assets/.DS_Store` present (cleanup). **Need:** 1 **Difficulty:** 1

### Build output (baseline)

- `npm run build` succeeds, but a main JS chunk is ~1.5 MB minified (gzip ~450 KB). Consider code-splitting if performance is a concern. **Need:** 3 **Difficulty:** 3

## Next Check

- Component architecture and data flow (App-level components, contexts, large components).
