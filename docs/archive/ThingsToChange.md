 JLO Portfolio — Pre-Launch QA & Polish Plan

Global (Light & Dark Mode)

I am going to keep writing things here:
I think the scientific report should ne expanded to be 1440 px wide isnteawd of what I ahve which is too anrrow. I needd to change the size of the words too. and the font also. Be inspired by anthropics thignsd

I do not know where I would override here, but I think the dark mdoe feels to colorful, I would simplify everything in terms of colours shown. FOr example "Hola" is okay like that, bnut the change of background from the hero to about makes it weird. The lights of the CV sectionalso lookt oo much. The cards that hold the proteins look boring as fuck, we shoudl hbeab lke to do something about them. I need some fucking good text for the licing cell of work, and produce a proper title with some good stylings. Somethjing cool. The organelles are to colourfully. WE need to fix taht. MAke them coloured depending on being published or not, the state of the project. I need to chaneg the all the headers such as blog. they are cool buit ahmmmm. I could do something with them.

Delay appearance of 'Jesús A. López O’Rourke' + subtitle.

For thisa one I would like to know where the modualtor of this is to play with the timing myself.

💬 ChatGPT: Likely handled in your Hero component via a Framer Motion transition.delay or GSAP timeline. You can expose that timing value as a prop (e.g., nameDelay) so you can tweak it in context.

Remove temporary debug borders except scroll tracker.

There is to o much stuff. Lets remove all the debug system completely and make it so taht we can turn it on at some time.

Add a message opof we are ON! or something like that

💬 ChatGPT: Good call. Add a global DEBUG_MODE flag in your config, and wrap any debug visuals (borders, grids) in a conditional. The message could appear via a small corner toast or overlay.

Review background color shift between sections in dark mode.

I would like to try it monocolour, give me the possibility to switch between a couple of tehm.

💬 ChatGPT: You can keep both options using CSS custom properties or a toggle state (useState('themeVariant')). Monochrome will unify transitions, but a subtle gradient shift could add spatial depth.

Navbar emoji toggle — remove grey border or use transparent SVG.

Thast is quite annoying. It takes away from the professionality

💬 ChatGPT: Definitely. The border likely comes from the emoji PNG alpha channel. Replace it with a clean SVG sun/moon pair, or use an emoji rendered via text instead of an image.

Test all breakpoints: mobile, tablet, vertical desktop.

💬 ChatGPT: Include a quick window.innerWidth logger or responsive view test in Chrome dev tools. Pay attention to your vertical screen layout (important for your coding setup).

Hero Section

Modify DNA Inspect logic — enrich displayed info.

💬 ChatGPT: Structure it as an array of helix nodes ([{ name, description, color, link }]) and map through it dynamically when Inspect is active. This lets you later pull content from markdown or JSON.

Adjust helix info box styling and layout.

💬 ChatGPT: Try anchoring the box to your 6-column grid and using CSS backdrop blur for a soft-science aesthetic. Consistent corner radius and drop shadow will integrate it visually.

Fix reverse drag direction for proteins to match DNA.

💬 ChatGPT: This is likely a Three.js OrbitControls inversion. Set controls.rotateSpeed = -1 or invert mouse delta mapping to mirror the DNA logic.

Add smoother idle rotation + continuous spin loop fix.

💬 ChatGPT: Use GSAP's modifiers plugin or a quaternion interpolation to avoid the visible reset. Keep spin low-speed to preserve realism.

About Section

Oh shit, definitely revise what the fuck I say there. Now looking at it it feels corny as fuck. Revise all content, from intro through the content of teh cards and its metaphors. I need to do an anlysis of what Iw ant to show.

💬 ChatGPT: 100%. Before rewriting, outline what emotions or phases each card represents. Write in plain tone first, then stylize. Maybe structure each entry as What / When / Why it mattered.

Compact section so all items fit one screen.

💬 ChatGPT: You can do this with CSS grid and scale() transitions on active cards, or by using a scroll container limited to viewport height.

Rework timeline flow and visibility.

💬 ChatGPT: Align with scroll center using IntersectionObserver or Framer Motion's useScroll. Your previous debug tracker can assist fine-tuning.

Refine typography hierarchy and legibility.

💬 ChatGPT: Consider pairing Space Grotesk (titles) with Inter (body). Use consistent vertical rhythm (1.2–1.5 line height) for a professional, journal-like tone.

CV / Proteins Section

Dark mode: change card color from grey ® black.

💬 ChatGPT: Matte black will look cleaner. Add a subtle inner glow or border gradient for separation without losing depth.

Light mode: review font color contrast and style.

💬 ChatGPT: Consider slightly reducing opacity for the left-side text and increasing contrast for the right technical column.

Fix reversed drag direction for proteins.

💬 ChatGPT: Same fix as Hero — unify rotation direction for all 3D objects so it feels natural.

Adjust protein zoom and central balance.

💬 ChatGPT: You can set a consistent camera distance via camera.position.set(z) or use bounding box normalization so all models feel proportionate.

Again, revise the fucking content of teh cards, I need to see how much of myself I am showing there.

💬 ChatGPT: Great instinct. Think of each protein as a symbolic capsule: half technical (methods, datasets) and half personal (what you learned). Keep tone factual, not self-promotional.

Work / Living Cell Section

Fix square expansion glitch on organelle click.

💬 ChatGPT: Check your animation chain; likely conflicting scale + opacity tweens. Stagger or sequence them cleanly with Framer Motion or GSAP timeline.

Improve animation of moving circles/organelles.

💬 ChatGPT: Introduce slightly randomized motion (Perlin noise or sin wave offsets) for a more cellular, living feel.

Add 'Coming soon' placeholders for missing projects.

💬 ChatGPT: You could design an animated placeholder that pulses softly or uses text like Culturing... instead of static "coming soon." Matches your biological motif.

Ensure hover/expansion consistency.

💬 ChatGPT: Keep same scale factor, easing curve, and duration across all interactive organelles.

Blog Section

Add 'Coming soon' for unpublished posts.

💬 ChatGPT: You can reuse your card component and just flag unpublished posts (draft: true). Style them as faded or translucent.

Rework the aesthetics of the blog section. The unpublished posts have to have something going on.

MAybe its a line of placeholders behind this document, kind of a trail over the hills, but there is no hills, just the compelxity of what we have for baackground. And it would signal taht a lot is yet to come, and with every post I would get

💬 ChatGPT: That visual metaphor is brilliant. Maybe have a blurred depth line with silhouettes of future posts or data points glowing in the distance—subtle and poetic.

Keep AI in Biotech post unpublished until revised.

💬 ChatGPT: When ready, make this your flagship article. Could include your interactive graph of publications over time.

Refine hover/load animation of blog cards.

💬 ChatGPT: Try small y translation on hover and fade-in gradient overlay for depth. Keep transitions soft (150–200ms).

Contact Section

In general, just do something here. There is nothing...

💬 ChatGPT: Start with a simple split layout: left = animated signature + links, right = contact form. Minimal but elegant.

Add all social links + email.

💬 ChatGPT: Make sure external links open in new tabs (target='_blank' rel='noopener').

Add contact form (Formspree, Vercel, etc.).

💬 ChatGPT: Formspree or Resend are quick setups. Add spam protection and a success toast.

Include services section with examples.

💬 ChatGPT: A short bullet list works best: Scientific Visualization, Interactive Reports, Creative Web Design.

Animate signature + orbit icons.

💬 ChatGPT: The orbit icons can follow slow sine-wave motion for elegance. Signature fade-in should happen on scroll or section entry.

Jesús: I HAVE REVISED up until here. ChatGPT will probably add some comemtns and add them just after me.

### Hearing Loss Project
- Add clear Back/Reset interaction and UX hint box.
- Fix 'All Types Diabetes' button visibility in dark mode.
- Reposition 'Back' button (avoid cutoff).
- Send to Karen for feedback.
### Suggested Final Checks
- Add SEO metadata (title, description, OpenGraph).
- Setup analytics (Plausible, GA, Splitbee).
- Purchase & connect custom domain.
- Lighthouse audit 90+; check responsiveness.
- Add favicon variants and privacy note.
- Update README with live link and changelog.
- Prepare LinkedIn announcement.