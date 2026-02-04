# Forward Playbook Notes & Narrative

## 1. User Brief (Verbatim)
> Yooo chat, I have done quite a lot of work on the website both with claude code, and a little bit with you. I have improved teh layout of teh inspect mode info for the hero section, both in mobile and desktop. It now has a slick look, the info, the font is amazing. I love this one. Ohh and by the way, in this message, I will be reviewing all the website and telling you what was done, along with important messages to note down. So we will basically have a chat about this, and your role will be to organise everything I say nicely so it is actionable and reflectable. Okay, so teh only thing that we would need to do with the hero section, is that the DNAs final spot is closer to the hero title than to the inspect mode, it would be cool if we could lower its final spot. In this way. it will be at a mid point between the inspect button and the text, you know, it would feel better at the eye. This would be a comment taht can be made into an action.
> The Hola section on phone: the hola is nicely animated but it is too big, teh same with the text, too big, and the text is not animated, every line should have a sequential entry animation, and that entry animation should also uncover bit by bit. In desktop the hola section is cool in size and the layout should remain untouched, the only thing needed is an entry animation for each line of the text.
> The Academic Journey section on desktop, here we did a cool modification by which the title subtitle and introduction text was added in a nicer way, by which it would occupy the spot of the first protein card. I think it is improvable but this is a design I really do resonate, it finally makes sense. I have never been happy with the section titles. This one feels something replicatable and that is consistent with the rest of the styling ion the web. We are still missing including this in the phone version. We need to remove the other white minimal title from desktop and mobile. We need to refine the entry animations so they have an appropriate order, and we can appreciate the hierarchy or order, as well as give time for the content to reveal to the user. Also, everything here should be scxroll trigered, so that when some point of the screen is reached, then the thing appears, and animations should only be time based if they are meant to appear at the same tiem as an object in the same group or in other words, they are at teh same height as rthe other object taht is scroll triggered to entry. The mobiole phone version for this section also eneds nice entry animations for each card.
> For the Work section, now known as Interactive Laboratory, we need to remove the old title "Work" from both mohbile and desktop. For the mobile phone version, the cell is not centered in the screen, and teh organelles, which were made smaller in both dektop/mobile, look cool, but the speed was also increased in both, for mobile phone needs to be reduced a bit, in desktop it looks cool. Also, we need to make it a biphophstee membrane to make it properly have an adequate complexity. I will put work in there. On the mobile phone I would like to be able to lcose the expanded organelles by just clicking outside of them. Nothing to add for now that is different in desktop. I do need to note that there is work to be done on teh melanoma workshops project. Ohhh and we should add some markers to put certain words ro categories when the organelle is expanded.
> Blog section needs an appropriate integration of the title subtitle and intro text structure taht we are using now. In desktop it shoudl be located at teh right and be the first thing to appeazr, then the blog posts would appear from red to left, with the newest ones at the right, and the direction would also be in depth additional than to the left, so if I had one hundred posts, they would start going to the distance, and we could end up having a scroll or something taht could move through all the blog entries. In mobile phone the blog entry card is super thin, its broken, it needs fix. 
> Teh contact section I am in the process of remaking it, it is the part I am working now, and I will update any information when I get it. 
> Go for it, how are you going to pack all this information into an appropriate way of moving forward as well as marking wht we have done, and also highlight any important information for design diurection? Go through any document you need, but we are going to create a compeltely new one with new rules of moving forward. what do you think?

---

## 2. Narrative by Section

### Global Visual System & Infrastructure
- **Current Thoughts:** The historical scratchpad captured a few ideas worth preserving:
  - Expand scientific report canvases to roughly 1440 px and refresh typography, drawing inspiration from Anthropics’ editorial layouts.
  - Dark mode currently shifts through several bright accent palettes (Hola transition, CV “lights,” organelle colors). Test a monochrome baseline with optional accent variants to tighten cohesion.
  - Consolidate debug helpers behind a single `DEBUG_MODE` flag with a subtle “debug active” indicator instead of persistent borders/overlays.
  - Replace the navbar emoji toggle asset with a clean SVG/symbol treatment to eliminate the grey halo.
  - Keep multi-breakpoint QA (tablet, vertical desktop, ultra-wide) on the schedule, especially once the new animations ship.
- **Codex Session (Jan 2025):** Added a shared section spacing contract (`SectionSpacer`, spacing tokens) and removed legacy scroll-debug overlays across the homepage. Academic Journey now provides an opt-in glass debug HUD only while tuning.
- **My Read:** Fold the report-width goal into the reports roadmap, plan a targeted dark-theme polish pass after the current wave, and log discrete tasks for the debug toggle and navbar icon swap.

### Hero • DNA Inspect Experience
- **Current Look & Feel:** The inspect-panel redesign landed well: glass panels, typographic hierarchy, and scientific labels now match the site’s tone on both desktop and mobile. Animations are smooth and the button timing aligns with the DNA wiggle landing.
- **User Observation:** The helix settles too close to the hero title. Visually the scene would breathe more if the DNA’s rest position drifted lower, roughly halfway between the hero text and the Inspect CTA.
- **My Read:** Adjusting the final transform target keeps all prior work intact while improving spatial balance. Implementation lives in the DNA animation completion handler—no need to rework the timeline, just tweak the resting Y.
- **Additional Note:** Expose the hero name/subtitle delay (currently hard-coded in Framer Motion/GSAP) so it can be tuned alongside the DNA movement. Future inspect content should come from a structured data array rather than inline JSX to keep copy iteration simple.
- **Status Update (current pass):** Updated the hero camera/scale so the helix settles lower in the frame, and set a baseline float offset (with reduced amplitude) so the DNA rests midway between the title block and CTA.

### Hola Introduction
- **Current State:** Desktop typography and layout are in a comfortable place, but motion ends once the section appears. Mobile keeps the same scale, which now feels oversized; the text drops in immediately, making the block feel heavy.
- **User Observation:** On phone, the “Hola” heading and copy are too large, and the text lacks sequential animation. User wants each line to reveal in order, with an uncover/glide effect. Desktop should keep size but adopt the same staggered text entry.
- **My Read:** We should treat phone and desktop separately: mobile needs responsive sizing plus a mask/stagger for each line; desktop can reuse the animation timeline without changing layout. Consider using Framer Motion/GSAP timeline tied to intersection observer for scroll-triggered entry.
- **Status Update (current pass):** Mobile typography has been tightened, the layout stretches to fill the viewport height, and each line now reveals with a sequential mask animation on scroll.

### Academic Journey
- **Current State:** Desktop gained a new intro block occupying the first card slot—a win for hierarchy and visual cohesion. The minimal white title still exists elsewhere, creating redundancy. Mobile hasn’t received the new structure yet.
- **User Observation:** Loves the new desktop composition, wants it replicated on mobile, and wants the old white title removed everywhere. Entry animations should follow a clear hierarchy, activated via scroll triggers. Time-based overlaps should only occur for elements sharing vertical alignment. Mobile cards also need thoughtful reveal timing.
- **My Read:** This section should adopt a single animation controller triggered once the intro hits the viewport: reveal intro group, then stagger cards. For mobile, reflow the layout so the intro sits above the card list and apply matching animation discipline. Remove the legacy title assets.
- **Additional Note:** Pair the animation pass with a copy overhaul—structure each card around clear What / When / Why points and refresh dark-mode styling so the cards feel richer than the current flat grey.
- **Status Update (current pass):** Removed the legacy SectionSeparator title and made the intro block responsive so mobile renders the new hero copy in-flow before the cards.
- **Codex Session (Jan 2025):** Implemented a 95 % viewport glass frame with snap-to-pin behaviour (attach when `frameTop ≤ 160`, release at inner scroll ≈1500, upward detachment animates to `FrameTop ≈ 1200`). Added right-edge debug HUD to surface pinned state, cooldown, and scroll metrics.

### Interactive Laboratory (Work)
- **Current State:** Renaming done; organelles were rescaled. However, mobile layout still shows misalignment, and motion speed increases made small screens feel frantic. Membrane still resembles a single surface, and expanded organelles lack metadata markers.
- **User Observation:** Remove “Work” title on all breakpoints. Center the cell on mobile, slow organelle motion there, and upgrade to a bilayer membrane. Add tap-out-to-close behaviour on mobile for expanded organelles. Desktop speed is acceptable. Need to add markers/tags when organelles expand and revisit the Melanoma Workshops project content.
- **My Read:** This section needs a mix of layout tweaks (center canvas, responsive membrane) and interaction updates (outside-click, metadata labels). Implementation will likely touch Three.js scene config, CSS positioning, and the organelle expansion handler. Flag the Melanoma Workshops card for content/design follow-up.
- **Additional Note:** Explore palette logic that encodes project status (published, in-progress, concept) and draft new copy for the main Living Cell description to match the elevated tone planned elsewhere.

### Blog
- **Current State:** Title system hadn’t matched the newer sections; desktop cards rendered left-to-right and mobile cards collapsed in width.
- **User Observation:** Desktop needs the new title/subtitle/intro block anchored on the right, appearing before posts. Posts should animate emerging from right to left with an added depth axis for large archives; navigation should support deep lists. Mobile cards must be fixed—they’re far too thin—and should receive cohesive entry animation once layout is stable.
- **Status Update (current pass):** Blog layout now features the shared intro pattern (title, subtitle, intro copy) pinned to the right with cards flowing to the left on desktop.
- **My Read:** Next step is to layer in the depth animation and ensure the mobile grid receives the same polish.
- **Additional Note:** Revisit the “trail of unpublished posts” metaphor—layer a blurred depth line or silhouette queue to hint at future entries, and keep the AI-in-Biotech article in draft until the narrative is polished.

### Contact
- **Current State:** Being actively redesigned by the user; no finalized direction yet.
- **User Observation:** Will provide updated requirements once ready.
- **My Read:** Pause changes until fresh guidance lands. Once available, apply the same design principles (title block, scroll-trigger, responsive polish).
- **Codex Session (Jan 2025):** Interim polish—headline split into two lines with italic lead, animated separator line, and per-line hover glow while preserving the gradient treatment.

---

## 3. Action Checklist by Section

### Hero
- (Done) Adjusted DNA rest transform/scale so the helix sits between hero copy and the Inspect CTA.
- Validate that timing and scroll lock remain unaffected after the position shift.

### Hola Section
- **Mobile**
  - Scale down “Hola” and body copy for small screens.
  - Implement line-by-line stagger with mask/uncover effect.
- **Desktop**
  - Keep current sizing.
  - Add matching staggered text animation triggered on scroll.

### Academic Journey
- (Done) Removed the old white minimal title and let the new intro block render on mobile.
- Implement scroll-triggered reveal sequence: intro block → cards.
- Tune timing so grouped elements animate together only when aligned in viewport.

### Interactive Laboratory
- Strip “Work” labels across breakpoints.
- Center the cell on mobile; adjust organelle drift speed downward there.
- Update the shader/geometry to a visible bilayer membrane.
- Enable tap/click outside an expanded organelle to collapse it (mobile-first).
- Add taxonomy/keyword markers to expanded organelle content.
- Schedule additional work on the Melanoma Workshops project card.

### Blog
- Desktop: introduce title/subtitle/intro block (right-aligned) and animate posts emerging right-to-left with depth stacking; plan archive navigation for long lists.
- Mobile: fix card width/stacking; after layout fix, add cohesive entry animation.
- Sketch the depth-line motif for unpublished posts and keep “AI in Biotech” flagged as draft until copy is ready.

### Contact
- Hold for user’s upcoming redesign brief; capture requirements once available.

---

## 4. Next Steps & Maintenance
- Cross-link these notes from `ForwardPlaybook.md` so the strategy doc and narrative stay in sync.
- Convert action checklist items into tracker tasks (grouped by section) to monitor progress.
- Update this notes file whenever new observations arrive or sections ship, keeping both narrative and plan aligned.
