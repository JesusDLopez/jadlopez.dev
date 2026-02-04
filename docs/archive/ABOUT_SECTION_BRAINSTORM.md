# Brainstorming for the "Hola" (About) Section

This document is a collaborative space to refine the rotating words in the "About" section introduction. It's structured to help brainstorm, reflect, and select the most accurate and impactful language.

---

### Sentence 1: "...and now I [verb phrase]"

*   **Original Words:** `visualize genomic data`, `produce stats reports`, `build web apps`, `counsel patients in genetics`
*   **Guiding Question:** What do I *do* now? What actions define my current professional identity as a bridge between genetics and code?

#### My Reflections & Analysis
Your concern about "counsel patients" being outdated is valid. While your counseling background is a huge asset that informs your work, your current *actions* seem more focused on building and analyzing. The goal is to find verbs that capture this "builder/analyst" identity who is informed by a clinical perspective. The phrases should be active and results-oriented.

#### My Brainstormed Ideas
*   engineer data pipelines
*   develop interactive reports
*   craft data narratives
*   model biological systems
*   translate research into tools
*   build clinical software
*   design visual interfaces
*   automate research workflows
- architect data-driven platforms

#### Codex Thoughts (2025-02-15)
*   Favor action verbs with measurable outcomes—`engineer data pipelines` + `develop interactive reports` + `build clinical software` reads like a crisp trio that covers data, visualization, and regulated environments without rehashing counseling.
*   `craft data narratives` and `translate research into tools` feel closer to taglines than verbs; consider folding that nuance into the paragraph body instead of the rotating list to keep the motion words punchy.
*   If you want one wildcard slot, `automate research workflows` is the best “systems” phrase because it implies both genomics and AI assistants you’ve been prototyping.

---

### Sentence 2: "I've studied [subject]"

*   **Original Words:** `statistical genetics`, `molecular biology`, `thermodynamics`, `counseling theory`, `pharmacology`, `genomic medicine`, `software engineering`
*   **Guiding Question:** What are all the key domains I have studied that contribute to my unique skillset?

#### My Reflections & Analysis
The existing list is strong and diverse. We can expand it by looking at the implicit skills demonstrated in your projects. For example, this portfolio itself shows strong evidence of UI/UX design, 3D graphics, and data visualization principles. We can make this list even more representative of your full capabilities.

#### My Brainstormed Ideas
*   bioinformatics
*   human-computer interaction
*   data visualization
*   epidemiology
*   machine learning
*   cloud computing
*   full-stack development
*   interaction design
*   computational biology
*   3D graphics programming
*   UX/UI principles

#### Codex Thoughts (2025-02-15)
*   The first list already telegraphs hard science credentials, so in the rotation I’d blend them with the design/infra items: e.g., `statistical genetics · human-computer interaction · cloud computing`.
*   `3D graphics programming` and `interaction design` overlap with “data visualization”; maybe collapse into `scientific visualization` so the motion stays smooth.
*   Slotting `machine learning` next to `bioinformatics` keeps the genomics → AI arc obvious, especially since your dashboards already embed ML assists.

---

### Sentence 3: "...Now I build tools that guide [audience] through genetics."

*   **Original Words:** `genetic counselors`, `students`, `medical doctors`, `researchers`
*   **Guiding Question:** Who are the people that benefit from the tools I build? Who is the audience for my work?

#### My Reflections & Analysis
First, I strongly support your decision to stick with "I build." It's confident, not arrogant. Your portfolio contains concrete evidence of completed projects (`Melanoma Genetics Workshop`, `Hearing Loss & Gestational Diabetes Study`, `Automated PRS Booklet Tool`). You *have built* these things. "Aim to build" would undersell your actual accomplishments.

For the audience, we can think more broadly about the entire ecosystem around genetics.

#### My Brainstormed Ideas
*   patients and families
*   biotech startups
*   clinical teams
*   public health officials
- pharmaceutical scientists
*   data scientists
*   educators
*   lab technicians
*   policy makers

#### Codex Thoughts (2025-02-15)
*   I'd group audiences by scenario: `clinical teams`, `patients and families`, `researchers & biotech startups`. That keeps three beats that mirror the story beats in About.jsx.
*   `Public health officials` and `policy makers` are compelling but make the promise broader than your showcased case studies; maybe save them for the long-form copy instead of the rotating words.
*   Consider ending with `patients and families`—it loops back to your counseling roots and softens the builder-heavy verbs from sentence 1.

---

## ✅ FINAL DECISIONS & IMPLEMENTATION (2025-11-19)

### Status: COMPLETED

All changes have been implemented in `src/components/about/AboutIntro.jsx:36-87`

### Sentence 1: "...and now I [verb phrase]"

**SELECTED & ACTIVE (5 items):**
1. engineer data pipelines
2. develop interactive reports
3. craft data narratives
4. translate research into tools
5. automate research workflows

**RESERVED FOR FUTURE (commented in code):**
- build clinical software
- model biological systems
- design visual interfaces

**Rationale:** Focus on current capabilities with evidence in the portfolio. "Counsel patients" removed as outdated. Future items preserved for when projects are ready.

---

### Sentence 2: "I've studied [subject]"

**SELECTED & ACTIVE (14 items, alternating science/computing):**
1. bioinformatics
2. molecular biology
3. data visualization
4. biochemistry
5. machine learning
6. statistical genetics
7. 3D graphics programming
8. pharmacology
9. UX/UI principles
10. genomics
11. scientific visualization
12. counseling theory
13. thermodynamics
14. software engineering

**RESERVED FOR FUTURE (commented in code):**
- cloud computing
- full stack development
- informatics

**Rationale:** Comprehensive representation of interdisciplinary training. Items alternate between hard science and computing to maintain balanced presentation throughout rotation. "Scientific visualization" specifically highlights molecular visualization expertise (PyMOL, ChimeraX). "Genomic medicine" consolidated to "genomics" for brevity.

---

### Sentence 3: "...Now I build tools that guide [audience] through genetics."

**SELECTED & ACTIVE (12 items, mixed):**
1. genetic counselors
2. patients
3. students
4. clinical teams
5. researchers
6. families
7. pharmacists
8. startups
9. clinicians
10. dermatologists
11. geneticists
12. lab technicians

**Rationale:** Expanded from 4 to 12 audiences to reflect the full ecosystem of genetics work. Mixed ordering (not grouped by type) maintains variety. "Medical doctors" replaced with more specific "clinicians". "Pharmaceutical scientists" replaced with "pharmacists" for brevity and clarity. Includes both professional collaborators and end users (patients, families).

---

### Implementation Notes

- All rotating words use 4-second intervals with slight offsets (line2: +500ms, line3: +1000ms)
- Animation uses fade-in/fade-out transitions
- Inactive options preserved as comments for easy future activation
- Build tested successfully - no errors
- File modified: `src/components/about/AboutIntro.jsx`

### Next Steps

- Monitor which rotating words resonate most with visitors
- Activate reserved items as corresponding projects/skills develop
- Consider A/B testing rotation speed if engagement metrics become available

---

**Document Status:** ✅ FINALIZED - Implementation complete, brainstorming phase closed.
