# Section Spacing Audit

Date: 2024-XX-XX  
Scope: Application landing flow (`Hero → About → Work → Blog → Contact`)

## 1. Global Layout Contract
- `section.screen-section` (defined in `src/App.css`) sets `min-height: 100vh`, uses flex centering (`align-items`/`justify-content`), and applies `scroll-snap-align: start`.
- No default padding or margins between sections; vertical breathing room comes from each section's internal wrapper.
- Sections inherit the unified grid CSS variables but few layouts make explicit use of the anchor system yet.

## 2. Section-by-Section Findings

### Hero (`#hero`)
- **Primary container**: `.hero` (`src/Styles/Hero.css`) fixes `height: 100vh`, matching the global section height.
- **Internal spacing**: Content is vertically centered; CTA button sits `bottom: 2rem`.
- **Net effect**: Occupies exactly one viewport with minimal overflow. Transition to next section depends entirely on the following block’s top padding.

### About (`#about`)
- **Section override**: `.about-section` removes the flex centering by forcing `display: block`, so content height is dictated by children.
- **Stacked subsections** inside `.about-container`:
  - `AboutIntro` behaves like a tall hero (variable height based on copy).
  - `SkillsBannerGlass` adds its own full-width animation band (~60vh visual footprint).
  - `.about-timeline` (academic journey) introduces `margin: 15vh 0 0` and `padding: 12vh 0 5vh`, with a fixed `height: 2600px`.
- **Net effect**: About spans multiple viewports, combines `vh` padding with absolute positioning, and introduces the largest vertical gap before the Work section.

### Work / Interactive Laboratory (`#work`)
- **Wrapper**: `.work-wrapper` (`src/Styles/Work.css`) keeps `min-height: 100vh` but adds `padding: 6vh 0 6vh`.
- **Grid**: `.work-content-grid` sets `grid-template-columns: 75% 25%` with `min-height: calc(100vh - 14vh)` to compensate for wrapper padding.
- **Net effect**: Visually close to one viewport; actual height is `~100vh + padding`. Top and bottom spacing are symmetrical (6vh each), so it feels balanced but slightly taller than the hero.

### Blog (`#blog`)
- **Wrapper**: `.blog-wrapper` (`src/Styles/Blog.css`) declares `min-height: 100vh` (duplicated line) and `padding: 8vh 2rem 6vh`.
- **Layout**: Grid of cards with sticky intro panel; content height grows with post count.
- **Net effect**: Always taller than a single viewport once more than one row of posts exists. Additional `vh` padding makes the transition from Work → Blog feel looser than other boundaries.

### Contact (`#contact`)
- **Wrapper**: `.contact-wrapper-minimal` (`src/Styles/Contact.css`) uses `min-height: 100vh` and fixed `padding: 2rem`.
- **Content**: Single column stack with collapsible accordions; natural height rarely exceeds the viewport.
- **Net effect**: Reads as a centered final screen with small gutters. Shorter padding compared with Work/Blog causes the Blog → Contact transition to feel abrupt.

## 3. Cross-Section Inconsistencies
- Mixed units: Hero relies on `rem`, Work/Blog on `vh`, Contact on fixed `rem`; About mixes `vh`, fixed pixel heights, and absolute positioning.
- Some sections (About, Blog) grow far beyond 100vh, breaking the scroll-snap “one screen per section” intent set in `App.css`.
- Top/bottom padding varies widely:
  - Work: `6vh` each
  - Blog: `8vh` top / `6vh` bottom
  - Contact: `2rem` top and bottom
  - About timeline: effectively `27vh` before any content plus fixed `2600px` height.
- Sticky elements (Blog intro) and absolute positioned timelines ignore the flex centering contract, making spacing reliant on incidental margins.

## 4. Considerations for Upcoming Spacing Pass
- Decide whether every top-level section should truly snap to one viewport or whether multi-screen sections (About) should be broken into subsections.
- Establish a shared spacing scale (e.g., `section--tight`, `section--standard`, `section--extended`) with defined top/bottom padding tokens.
- Replace fixed heights (`2600px`) with content-driven height plus responsive guards (`min-height`, `max-width`) to avoid overscroll on large displays.
- Audit sticky/absolute positioned blocks to ensure they respect the chosen spacing scale (e.g., unify top offsets).
- Clean duplicate declarations (e.g., the double `min-height` in `.blog-wrapper`) while the spacing refactor is underway.

This audit captures the current contract so we can iterate on spacing with clear targets in the next pass.

## 5. Shared Contract Implemented (Current State)
- Added spacing tokens in `src/Styles/index.css` (`--space-*`, `--section-gap-*`, `--section-padding-x-default`) and bound them in `App.css` via utility classes (`section--flush`, `section--tight`, `section--extended`, `section--reveal-*`, `section--viewport-98`).
- Introduced `<SectionSpacer />` for the mid-section rhythm (`tight`, `default`, `reveal`, `extended`, `flush` variants) so transitions no longer rely on ad-hoc margins.
- Hero now uses `section--flush`; About uses `section--tight section--viewport-98 section--reveal-bottom` with an internal layout (`about-overview-block`, `about-banner-slot`, `about-timeline-frame`) that keeps the glass viewport fixed while the timeline scrolls within the frame.
- Work and Blog wrappers shed bespoke padding in favour of the shared variables; mobile overrides now adjust the CSS variables instead of applying raw padding. Contact inherits the section spacing while keeping its internal `main` padding.
- Documentation should treat these utilities as the baseline—future sections should opt into a tier or adjust the exposed CSS variables instead of redefining raw padding/margins.
