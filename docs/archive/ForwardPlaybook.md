# Interactive Web Forward Playbook

> Refer to `ForwardPlaybook-Notes.md` for the detailed narrative, verbatim user brief, and contextual commentary behind each action item.

## Mission Snapshot
- Deliver a cohesive, science-forward storytelling site where motion, typography, and content feel intentional across desktop and mobile.
- Preserve the newly achieved polish (hero inspect panels, Improved Interactive Laboratory cards) while tightening remaining gaps in layout, animation timing, and responsive behaviour.

## Completed Since Last Checkpoint
- Hero inspect-mode panels restyled with scientific labels, typography hierarchy, and refined glass UI across breakpoints.
- Interactive Laboratory organelles resized and tuned; foundational renaming from "Work" complete.
- Academic Journey desktop now opens with a combined title/subtitle/intro block embedded in the first card footprint.
- **NEW:** Hola section text lines now cascade sequentially - each line waits for previous to complete before animating.
- **NEW:** Academic Journey animations restructured into 4 scroll-triggered blocks with internal cascades:
  - Block 1: Intro → 2016 label → UEM card → laser
  - Block 2: 2019 label → UQ card → laser
  - Block 3: 2022 label → IGM card → laser → UTS card
  - Block 4: 2025 label → Lanzarote card
- **NEW:** Added vertical spacing (15vh desktop, 10vh mobile) between Hola and Academic Journey sections.
- **NEW (Codex Jan 2025):** Unified section spacing contract (`SectionSpacer`, spacing tokens) and removed legacy debug overlays from home sections.
- **NEW (Codex Jan 2025):** Interactive Laboratory header cleaned (no more "Work" placeholder) and blog/contact hero titles restyled with split-line hover states.
- **NEW (Codex Jan 2025):** Academic Journey glass viewport refactored—95% viewport frame, pinned snap-in/out behaviour, and controlled inner scroll with debug telemetry.

### Latest Session (Jan 2025 - Viewport Polish, Width Tightening & Velocity-Based Scroll)

**Last Three Sections Width Tightening:**
- Increased max-widths from 1400px → **1600px** for Work, Blog, Contact sections
- Increased Work grid width from 90vw → **96vw** for tighter edge-to-edge feel
- **Result:** Better visual density matching Hero/Hola sections, less whitespace on sides

**Academic Journey Viewport Exit Bug Fix:**
- **Issue:** Scrolling UP through timeline and reaching top caused infinite cycling (release → re-attach loop)
- **Root Cause:** Exit position tracking missing when exiting at TOP (only tracked on BOTTOM exit)
- **Fix:** Added position tracking (`viewportBottomYRef`, `lastScrollYRef`) when exiting at top
- **Result:** Smooth exit from top, no more cycling, clean scroll to Hola section

**Hola Section "Invisible String" Attachment (MAJOR REDESIGN):**
- **Old System:** Fixed trigger zone 60px before section, always triggered regardless of speed
- **Problem:** Grabbed users too early (even before "Hola" visible), felt forced for slow scrollers
- **New System:** Velocity-proportional elastic catch (like hitting a trampoline)
  - **"String" concept:** Only exists during text animation (~4 seconds after section becomes visible)
  - **Trigger zone:** Wide 400px window (±200px from center) using wheel events (not scroll events)
  - **Velocity detection:** Dual calculation (scroll distance/time + wheel deltaY) for accurate speed
  - **Bounce physics:** NO easing curves - pure physics proportional to velocity:
    - Slow scroll (< 0.5px/ms): Minimal bounce (~5-10px overshoot), 300ms duration
    - Medium scroll (0.5-2px/ms): Moderate bounce (~30-60px), 500ms duration
    - Fast scroll (> 2px/ms): Dramatic bounce (~80-150px), 700ms duration
  - **Two-phase animation:** Overshoot down section → Spring back to center position
  - **Result:** Slow scroll = barely noticeable gentle stop, Fast scroll = satisfying elastic snap
- **String disappears** after animation completes (`lastLineComplete === true`), allowing smooth scroll-through
- **Implementation:** Lines 191-313 in AboutIntro.jsx with console debug logging

### Previous Session (Jan 2025 - Spacing, Width, Viewport & Genomic Banner)
**Academic Journey Glass Viewport:**
- Fixed bidirectional scroll capture with snap-to-position animation
- Viewport locks at 5rem below navbar on desktop (consistent positioning)
- Smooth 400ms snap animation when entering from top or bottom
- Natural release at boundaries without snap
- Top/bottom spacing: 5rem from navbar, 1rem from page bottom
- Frosted glass borders match navbar styling exactly
- Inner neon glow on glass borders for depth

**Skills Banner → Genomic Code Representation (COMPLETE REDESIGN):**
- **Transformed** from chaotic neon marquee to scientific genomic code visualization
- **Created** `geneConnectors.js` - 15 pre-defined intron connector patterns (80-250px, 5 visual styles)
- **Restructured skills** as genomic regions:
  - Exons (filled cyan boxes): Core technical skills
  - UTRs (outlined boxes): Soft/communication skills
  - Regulatory (small badges): Tools/methods
  - Introns (line connectors): Visual spacing with varied patterns
- **Removed** neon nucleotide colors → **Added** monochrome cyan-gray palette (`rgba(100, 200, 220)`)
- **Removed** alternating directions → **Single direction** (left-to-right, 5'→3')
- **Slowed** animation from 60s → 100s with smooth cubic-bezier easing
- **Result:** Calmer, authentic genomic diagram aesthetic that gives rhythm without overwhelming

**Hero DNA Camera Adjustment:**
- Desktop camera: z:-55 → z:-60 (slight zoom out)
- Mobile: unchanged

**Section Spacing Normalization:**
- **Removed ALL SectionSpacer components** - eliminated triple-stacking (padding + spacer + padding)
- Unified all sections to **6vh top/bottom padding**
- Banner container: 18vh → 6vh padding
- Timeline margins: 2vh → 1vh, padding: 2.6vw → 1.5vw
- **Result:** Clean **12vh gaps** between all sections (6vh bottom + 6vh top)

**Hola Section Refinement:**
- Reduced gap between "¡Hola!" title and text content
- Text starts at 28% (was 35%) for tighter visual flow

**Width Homogenization (1400px Standard):**
- Work section: 1600px → **1400px** max-width
- Blog section: 1200px → **1400px** max-width
- Contact section: 800px → **1400px** max-width
- **Result:** All content sections use consistent **1400px standard**
- Special cases maintained:
  - Hero/Banner: Full width for impact
  - Hola: Asymmetric 75.5vw for storytelling
  - Timeline: 95vw for breathing room
- Created comprehensive `WIDTH_ANALYSIS.md` documentation

**Debug System:**
- Created spacing/width debug overlays for analysis
- Removed all debug components after completion

## Global Design Principles Moving Forward
1. **Scroll-Triggered Storytelling** – Major sections reveal as the viewport reaches them; time-based animation only when multiple elements share the same vertical trigger.
2. **Typographic Cohesion** – Reuse the inspect-mode hierarchy (title / category / meta / body with small-caps emphasis) where applicable.
3. **Responsive Parity** – Every new desktop treatment needs an intentional phone counterpart, not a scaled-down fallback.
4. **Interactive Clarity** – Provide obvious close/tap-out affordances and semantic markers when content expands beyond its default state.
5. **Width Consistency** – All content sections (Work, Blog, Contact) use 1400px max-width for visual alignment.
6. **Spacing Consistency** – All sections use 6vh top/bottom padding = 12vh gaps between sections.

## Section Action Matrix

### Hero (DNA Inspect)
- **Status:** DNA resting position/float tuned (Jan 2025).
- **Next Action:** Lower the DNA helix's final resting position so it sits midway between the hero title block and the "Inspect DNA" button.
- **Notes:** Maintain current animation cadence; only adjust the transform target used when wiggle animation finishes.

### Hola Introduction
- **Status:** Sequential text animation + velocity-based scroll attachment (Jan 2025 - COMPLETE).
- **Completed:**
  - Title "¡Hola!" animates letter-by-letter, triggers first text line on completion.
  - Each text line waits for previous line to complete before starting.
  - 0.35s animation duration per line with 100ms gaps.
  - Reduced gap to title (text now at 28% vs 35%).
  - **Velocity-proportional "string" attachment:** Section catches users with bounce intensity scaled to scroll speed.
  - String only active during text animation (~4s), then disappears for smooth pass-through.
  - Wide 400px trigger zone with wheel events ensures even fast scrolls get caught.
- **Remaining:**
  - Mobile: reduce headline and body copy sizes for small screens.
  - Desktop: maintain current sizing (already appropriate).
  - **NEXT:** Placeholder SVG arrow animations after DNA helix lands - one pointing to theme toggle, two pointing to "Inspect me" button (fire colors in light mode, neon in dark mode).

### Skills Banner
- **Status:** Genomic Code Representation System (Jan 2025 - COMPLETE REDESIGN).
- **Completed:**
  - **MAJOR REDESIGN:** Transformed from neon marquee to genomic code visualization
  - **Visual System:**
    - Exons (filled boxes): Core technical skills (React, Python, R, Bioinformatics, Three.js, JavaScript)
    - UTRs (outlined boxes): Soft skills (Genetic Counseling, Clinical Genetics, Patient Communication)
    - Regulatory (small badges): Tools/methods (Data Visualization, Statistical Analysis, etc.)
    - Introns (connectors): Pre-defined line patterns (15 variants, 80-250px) between skills
  - **Color Palette:** Replaced neon nucleotide colors with monochrome cyan-gray (`rgba(100, 200, 220)`)
  - **Animation:** Single direction only (left-to-right, 5'→3'), slowed from 60s to 100s with smooth easing
  - **Performance:** Pre-defined connector library (`geneConnectors.js`) - no runtime generation
  - **Result:** Calmer, scientific genomic diagram aesthetic - gives rhythm without stealing focus
  - Proper trigger waiting for Hola completion
  - Faster entry animations, thinner tubes, flat stacking
  - Dual-mode glass effects (dark subtle, light frosted) - matching navbar/viewport
- **Remaining:** None - fully polished.

### Academic Journey
- **Status:** Animation system rebuilt (Jan 2025).
- **Completed:**
  - Added 15vh top margin (desktop) / 10vh (mobile) for spacing from Hola section.
  - Implemented 4-block scroll-triggered animation system:
    - **Block 1:** Intro → 2016 label → UEM card → laser (cascade triggered by intro scroll)
    - **Block 2:** 2019 label → UQ card → laser (cascade triggered by 2019 scroll)
    - **Block 3:** 2022 label → IGM card → laser → UTS card (cascade triggered by 2022 scroll)
    - **Block 4:** 2025 label → Lanzarote card (cascade triggered by 2025 scroll)
  - Each block uses state-based cascades with 200ms delays between elements.
  - Laser lines now grouped with their origin year labels for visual coherence.
- **Codex Update (Jan 2025):** Introduced 95% viewport glass frame with snap-to-pin scroll logic (activation at frameTop ≤160, release at 1500 inner scroll). Debug HUD lives top-right for ongoing tuning.
- **Latest:** Spacing normalized to 6vh padding system (Jan 2025).
- **Remaining:**
  - Fine-tune animation timing if needed after user testing.
  - Mobile card scroll-triggered reveals (currently show immediately).
  - Validate new glass scroll thresholds on real devices; adjust activation/release constants if the experience still feels sticky.

### Interactive Laboratory (formerly Work)
- **Status:** Width normalized to 1400px (Jan 2025).
- **Remaining:**
  - Remove the old "Work" title on both desktop and mobile.
  - **Mobile adjustments**
    - Center the cell canvas on screen.
    - Reduce organelle drift speed (desktop values remain).
    - Upgrade the cell shell to a bilayer membrane.
    - Allow tap outside an expanded organelle to close it.
  - **Shared Enhancements**
    - Add taxonomy/keyword markers inside expanded organelle panels.
    - Queue additional polish for the Melanoma Workshops project card.

### Blog
- **Status:** Width normalized to 1400px (Jan 2025).
- **Desktop**
  - Introduce the new title / subtitle / intro block, anchored to the right and appearing before post cards. (done)
  - Animate posts emerging right-to-left with depth stacking; support long archives with horizontal/depth navigation approach.
- **Mobile**
  - Fix blog card layout width (currently too narrow/thin).
  - Apply coherent entry animations after layout fix.

### Contact
- **Status:** Width normalized to 1400px (Jan 2025).
- Redesign in progress—await latest requirements before implementation.
- **Codex Update (Jan 2025):** Headline split into two lines with gradient hover accents; thin separator animates on hover.

## Tracking & Next Steps
- Treat each bullet above as an actionable ticket; group by section in the project tracker.
- Prioritise Hero, Hola mobile, and Academic Journey parity first to align hero experience across devices.
- After animation/system tasks, move to Interactive Laboratory refinements and Blog structural update.
- Keep this playbook updated whenever a section ships or new design guidance arrives.
- **Width system is now locked:** All content sections use 1400px standard (see WIDTH_ANALYSIS.md).
- **Spacing system is now locked:** All sections use 6vh padding = 12vh gaps.
