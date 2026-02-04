# Skills Banner UX Review

Created: 2025-??-?? (fill after review)

Purpose: evaluate the stacked skills banners (glass tubes) in both dark and light themes, document the current user experience, and outline options to soften the motion/light intensity without losing the scientific storytelling tone.

---

## 1. Current Experience Snapshot
- **Placement:** sandwiched between the Hola narrative and the Academic Journey timeline. Acts as the “skills thesis statement” before diving into chronological storytelling, yet the full-bleed presentation still reads as a “mini-hero” (per Section Spacing audit) rather than a transitional element.
- **Structure:** three edge-to-edge glass tubes (`.skills-banner-tube-glass`) with randomized skill words scrolling continuously across the full viewport width.
- **Animation:** perpetual 45–60 s marquee loop (direction alternates per tube), sharp blur-in reveal after the Hola text fires the `sessionStorage` flag.
- **Color treatment:** vivid nucleotide gradients per word (`#E91E63`, `#4A90E2`, `#7ED321`, `#F5A623`) with drop-shadow glows. Light theme swaps to translucent white tube background but retains bright word glows.
- **Glass styling:** strong blur (`backdrop-filter: blur(10–15px)`) plus stacked box-shadows; dark theme leans smoky, light theme becomes frosted with interior highlight.
- **Content cadence:** randomised skill order (Fisher–Yates shuffle in `useMemo`) reshuffles on every mount, so returning users never see the same sequence and grouping by discipline is lost.

---

## 2. User Experience Observations

### Dark Mode
- **Brightness spikes:** neon text glows and white border reflections read as bright bursts against the deep navy background; the marquee never fully settles.
- **Motion sensation:** three independent scroll directions + randomized word lengths create micro-judder and letter spacing jitter. Combined with the blur reveal it feels like a lab scanner whirring up—energetic but potentially overwhelming after the calmer Hola copy.
- **Context shift:** Hola’s serif storytelling tone is warm and paced; jumping immediately into neon glass tubes jars the mood before returning to the calmer timeline frame.

### Light Mode
- **Contrast:** translucent white tubes on a pale background drop contrast; the gradients fight with the frosted glass glow, making edges busy and slightly hazy.
- **Perceived weight:** the bright glass panel plus glows consume a lot of visual attention, making the following Academic Journey frame feel secondary.
- **Fatigue:** infinite motion on a light background increases perceived flicker, especially as laptop screens often run at lower refresh rates than phones.

### Mobile Highlights
- Smaller vertical padding now aligns the block better, but the tubes still fill the full width; eye tracking requires multiple scroll passes to read every word, which is tiring on a handheld device.
- Touch users cannot slow or pause the loop, so perceived control is low. Combined with the strong colors, this fuels the “too crazy / dizzy” feedback.
- Theme switches (system dark ↔ light) retrigger the glow-heavy styles, causing a sudden flash that feels harsher on mobile OLED displays.

---

## 3. Core Issues to Address
- **Sensory overload:** simultaneous bold color + glow + continuous motion breaks the pacing established by Hola and the timeline.
- **Legibility vs. spectacle:** the marquee prioritises spectacle; skill comprehension is secondary because words blur past before the user can digest them.
- **Theme coherence:** the glass aesthetic matches the Academic Journey frame, but the neon palette and motion tempo introduce a cyberpunk vibe that competes with the scientific warm tone elsewhere.
- **Accessibility:** continuous motion and animated gradients can trigger motion sensitivity. No “prefers-reduced-motion” branch for the marquee itself (only disables animation, leaving static duplicates stacked off-screen).

---

## 4. Improvement Strategies

### 4.1 Visual Tone Adjustments
1. **Monochrome lab mode:** collapse gradients into a single cyan/cadet palette, shift glows to subtle inner shadows. Maintains the DNA reference through typography rather than color.
2. **Depth through opacity, not glow:** reduce `drop-shadow` intensity, increase tube transparency so the underlying background shader reads through softly.
3. **Segmented tubes:** split the banners into panels with 1400 px max-width on desktop and centered alignment; edge-to-edge is reserved for the hero to keep the “wow” moments rare.

### 4.2 Motion Recalibration
1. **Slower, longer loop:** extend animation duration to 120–150 s and ease the marquee with subtle velocity curves (e.g., `easeInOut` with long ramp segments) to reduce perceived flicker.
2. **Micro-pauses:** allow the track to slow or pause when a word reaches center, giving viewers a chance to read. Could be triggered by IntersectionObserver, viewport center, or timed intervals.
3. **User control:** add a tiny “Pause motion” button or rely on hover/tap to temporarily stop the loop (mind iOS hover limitations—tap toggles are safer).
4. **Reduced motion mode:** if `prefers-reduced-motion`, swap to static skill chips with a gentle opacity pulse rather than outright disabling animation (prevents the tubes from feeling empty).

### 4.3 Information Architecture
1. **Curated highlights:** instead of random shuffle, group skills into 3–4 curated statements with icons (e.g., “Genomic Data Architect”). Each tube reveals one statement at a time using fade transitions.
2. **Narrative tie-in:** pair each banner with a micro-caption (“Counselling • Clinical empathy,” “Code • React / D3 / Three.js,” etc.) to bridge Hola’s storytelling to the timeline’s milestones.
3. **Compress to one hero banner:** rather than three stacked tubes, adopt a single banner with layered text lines—first line static, second line gently sliding. Less repetition, more clarity.

### 4.4 Interaction Enhancements
1. **Tap-to-cycle:** on mobile, provide forward/back controls so viewers can swipe through skill sets at their own pace.
2. **Progress indicator:** add subtle dots or a chromosomal band graphic that signals the number of skill “lanes,” helping users orient themselves within the motion.
3. **Ambient sound/feedback (future idea):** if the site ever handles audio, soft lab ambience or a subtle chime when new skill groups appear could reinforce the narrative calmly.
4. **Hover/tap pause affordance:** display a gentle “Hold to pause” hint or icon so users realise they can calm the motion on demand.

---

## 5. Storyboard & Narrative Alignment
- **Hero → Hola → Banner → Timeline arc:** Hero energises with controlled motion, Hola slows and humanises the story, Timeline reintroduces motion but within a structured frame. The banner currently spikes intensity above the hero before the user has processed the narrative.
- **Thematic anchors:** Hola emphasises empathy and storytelling; the timeline evidences experience year by year. The banner should translate empathy into capability without turning into a spectacle. Consider framing each line as “How I help teams” rather than a literal marquee.
- **Design reference:** see `ForwardPlaybook.md` (“Interactive clarity” and “Responsive parity”)—the banner should echo the scientific labels introduced inside the hero inspect panels for consistency.
- **Opportunity:** build a “skills overture” that foreshadows the four timeline blocks (2016, 2019, 2022, 2025). Each banner could highlight the skill set that aligns with the upcoming section, acting as a preview rather than an unrelated ticker.

---

## 6. Dark vs. Light Mode Matrix

| Aspect | Dark Theme (Current) | Light Theme (Current) | Suggested Adjustment |
|--------|----------------------|-----------------------|----------------------|
| Tube background | Smoky glass with strong outer glow | Frosted white with bright inner rim | Adopt a neutral translucent tone in both themes, rely on subtle inner shadow for depth |
| Word treatment | Neon gradients + drop-shadows | Same gradients, glow doubles because of light base | Introduce two-tone palette tokens (`--skill-primary`, `--skill-secondary`), limit glow to `drop-shadow(0 0 6px)` max |
| Motion perception | High due to alternating directions | Flicker amplified by light-on-light contrast | Slow light-theme animation by +40%, add easing to reduce jerkiness |
| Hierarchy vs. Hola | Jumps from serif warmth to neon tech | Same jump, feels even harsher | Match Hola’s typographic system (serif lead-in + monospace detail) to create continuity |
| Accessibility | Good contrast but visually busy | Lower contrast, heavy glare | Increase letter-spacing, reduce blur radius, provide pause affordance |

---

## 7. Expanded Brainstorm Concepts
1. **Helical ticker:** Use React Three Fiber to render a slow helix with skill labels sliding along the strands; freeze rotation after one loop to prevent overload.
2. **Skill reagent cards:** Three translucent cards float in a shallow lab tray. Each card flips every 6 seconds, revealing a new cluster with iconography (pipette, code bracket, DNA).
3. **Mini timeline primer:** Replace tubes with a horizontal strip of four segments labelled “Foundation • Genomics • Counselling • Research”. Each segment animates gently, synced with scroll progress to the matching timeline block.
4. **DNA ladder rungs:** Static vertical ladder with illuminated rungs; when the user scrolls, a light travels down, highlighting the next rung and revealing copy via fade-in.
5. **Interactive microscope:** Tapping toggles magnification levels, sliding in new skill labels tied to the view (“Low mag → Communication”, “Mid mag → Programming”, “High mag → Bioinformatics”).
6. **Ambient particle cloud:** Remove textual marquee entirely; show floating labelled particles that drift slowly within the glass tube. Particles enlarge when they cross center, giving the user time to read.

---

## 8. Experiment Backlog & Research Tasks

| Priority | Idea | Hypothesis | Prototype Notes |
|----------|------|------------|-----------------|
| P0 | Dim glows + slow marquee | Lower light intensity reduces dizziness while keeping current structure | CSS-only tweak; capture before/after video for comparison |
| P1 | Two-tone palette | A calmer palette harmonises with Hola and Academic Journey | Introduce theme variables, update CSS, review in both themes |
| P1 | Curated statements | Grouped statements improve comprehension vs. random shuffle | Prepare 3 story-driven statements, rotate via `framer-motion` |
| P2 | Pause / tap to freeze | Giving control lowers motion fatigue | Add floating control or long-press gesture; monitor discoverability |
| P2 | Reduced-motion alternative | Need to respect motion-sensitive users | Provide static chip grid + gentle opacity pulse when `prefers-reduced-motion` |
| P3 | Helical ticker prototype | DNA metaphor may enhance storytelling if motion is controlled | Build off-main prototype using R3F; evaluate performance and comfort |

---

## 9. Measurement & Feedback Plan
- **Qualitative pulse:** ask 3–5 peers to describe how the banner makes them feel (1-word) and whether they remember at least two skills after scrolling past it.
- **Comfort rating:** quick 1–5 rating (“How comfortable was the motion/light?”) before and after tweaks.
- **Performance telemetry:** use Chrome DevTools to monitor FPS and paint times; target 55+ fps on mid-tier laptop for both themes.
- **Accessibility checklist:** run through WCAG motion guidelines, ensure there’s a non-animated alternative when `prefers-reduced-motion` is on.
- **Narrative continuity test:** have testers narrate the story: Hero → Hola → Banner → Timeline. If the banner disrupts the sequence, note where and why.

---

## 10. Implementation Paths

| Path | Effort | Description | When to choose |
|------|--------|-------------|----------------|
| **Quick Refinement** | Low | Reduce glow opacity, slow marquee, add reduced-motion fallback. Minor CSS tweaks, no structural change. | Need relief ASAP without rethinking layout. |
| **Balanced Refresh** | Medium | Swap gradients for a two-tone palette, add center-aligned 1400 px container, introduce micro-pauses + tooltip captions. | Want a calmer presentation that still shows motion. |
| **Story-led Redesign** | High | Replace the marquees with a guided “skills helix” or cards that slide in sequence, syncing with Hola/Timeline cues. Requires component rewrite. | Aim for a cohesive narrative arc, not just a banner. |

---

## 11. Reflection & Planning Quiz

Use these prompts to clarify the intended tone and interaction, then choose a path:

1. **Primary emotion after Hola:**  
   - A) Calm curiosity  
   - B) High-energy excitement  
   - C) Other: __________

2. **How important is showcasing the entire skills list at once?**  
   - A) Critical — the viewer must see breadth instantly  
   - B) Helpful but secondary (depth matters more)  
   - C) Prefer a curated snapshot

3. **What’s the acceptable motion intensity?**  
   - A) Subtle background motion only  
   - B) Noticeable but slow (e.g., gentle drift)  
   - C) High-energy kinetic marquee

4. **Should the banner invite interaction?**  
   - A) Yes, give the user control (pause/next)  
   - B) Optional — motion is decorative  
   - C) No, keep it purely informational

5. **Dark vs. light parity:**  
   - A) Identical styling in both themes  
   - B) Dark can be punchier, light should be softer  
   - C) Different layouts per theme (experimental)

6. **How does the banner feed the Academic Journey?**  
   - A) Acts as a summary of capabilities leading into evidence  
   - B) Should foreshadow the timeline’s themes  
   - C) Maybe the timeline itself could carry the skill labels instead

7. **Success metric:**  
   - A) Viewer reaches the timeline without distraction  
   - B) Viewer reads and remembers key skills  
   - C) Viewer feels the lab vibe strongly

After answering, select the implementation path and note any non-negotiables (e.g., “keep glass aesthetic,” “must match hero glow”). Use this sheet to brief the next iteration sprint or to align with collaborators.

---

## 12. Implementation Roadmap
1. Complete the quiz, capture answers inline, and note any non-negotiables (palette, typography, motion tolerance).  
2. Choose an implementation path (Quick, Balanced, Story-led) and outline scope.  
3. Draft low-fidelity storyboard frames (Figma or hand sketches) to validate pacing with Hola and the timeline.  
4. Break work into tickets referencing the spacing contract (`SectionSpacingReview.md`) and width guidelines (`WIDTH_ANALYSIS.md`).  
5. Prototype in a branch, exercising both dark/light themes and `prefers-reduced-motion`.  
6. Gather feedback (comfort rating, comprehension), iterate, and document outcomes + next steps in this file.

Document prepared for discussion; update with chosen direction and implementation notes once decisions are made.

---

## 13. References & Inspiration Sources
- `docs/ForwardPlaybook.md` – design principles for motion pacing, width consistency, and responsive parity.
- `docs/SectionSpacingReview.md` – spacing contract that keeps sections aligned; use when adjusting banner padding/placement.
- `docs/WIDTH_ANALYSIS.md` – width rationale per section, helpful if shifting from full-bleed to 1400 px max width.
- `docs/guides/COMPONENTS.md` – catalog of existing reusable patterns that might replace the marquee with card-based layouts.
- Inspirational sources to gather: scientific editorial layouts (e.g., Nature feature spreads), calm motion references (Apple Fitness+ stats cards), data storytelling banners (Observable, NYT interactive features).
