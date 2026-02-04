# MVP ROADMAP - Portfolio Launch
**Goal:** Ship a professional portfolio ready for LinkedIn, CV, and Le Wagon careers team by end of week.

**Last Updated:** 2024-12-16
**Status:** Planning Phase → Execution

---

## 🎯 MVP SUCCESS CRITERIA
- [ ] Portfolio tells clear bio/tech intersection story
- [ ] All animations and interactions work smoothly
- [ ] Mobile experience is polished
- [ ] No broken links or placeholder pages
- [ ] Skills reflect data scientist positioning
- [ ] Deployed to domain with proper build
- [ ] GitHub linked and visible

---

## 📋 PHASE 1: POLISH & FIX (Priority: HIGH)
**Goal:** Fix broken/incomplete features, improve UX

### 1.1 DNA Animation & Inspect Button
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/components/hero/Hero.jsx`, `src/components/DNA.jsx`

**Problem:** Inspect button appears before DNA animation completes, creates jarring UX.

**Tasks:**
- [ ] Find where DNA animation duration is defined
- [ ] Find where Inspect button visibility is controlled
- [ ] Add state/timer to sync button appearance with animation completion
- [ ] Test on both desktop and mobile

**Acceptance Criteria:**
- Inspect button fades in only after DNA fully renders
- Timing feels natural (not too fast, not too slow)
- Works consistently across page loads

---

### 1.2 Improve "Hola!" Section Entry Animation
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/components/about/AboutIntro.jsx`, `src/Styles/AboutIntro.css`

**Current State:** Scroll-linked animation with rotating words.

**Tasks:**
- [ ] Review current animation implementation
- [ ] Define what "improved" means (smoother? faster? more dramatic?)
- [ ] Implement improvements
- [ ] Test scroll behavior on mobile

**Acceptance Criteria:**
- Animation feels polished and professional
- No jank or layout shifts
- Rotating words transition smoothly
- Works on mobile without issues

**Notes:** User needs to define what improvement looks like. Current animation uses scroll-linked transforms.

---

### 1.3 Mobile Experience Polish
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** All responsive CSS, mobile-specific components

**Tasks:**
- [ ] Test Hero section on mobile (DNA, Inspect button, layout)
- [ ] Test Hola section on mobile (text sizing, rotating words)
- [ ] Test Academic Journey timeline on mobile (cards, proteins)
- [ ] Test Work section on mobile (organelles, membrane interaction)
- [ ] Test Blog section on mobile (cards, layout)
- [ ] Test Contact section on mobile (form, layout)
- [ ] Check navbar behavior on mobile
- [ ] Test scroll performance

**Acceptance Criteria:**
- All sections render correctly on mobile (375px, 414px viewports)
- No horizontal scroll
- Touch interactions work smoothly
- Text is readable without zooming
- Animations perform well (no lag)

---

### 1.4 Navbar Navigation Behavior
**Status:** 🔴 TODO
**Priority:** MEDIUM
**Files:** `src/components/Navbar.jsx` (or wherever nav is), `src/App.jsx`

**Tasks:**
- [ ] Click "About" link - verify behavior (scroll? route change?)
- [ ] Click "Work" link - verify behavior
- [ ] Click "Blog" link - verify behavior
- [ ] Click "Contact" link - verify behavior
- [ ] Verify smooth scrolling if same-page navigation
- [ ] Verify routing if different pages
- [ ] Check mobile menu behavior

**Acceptance Criteria:**
- Clicking nav links takes user to correct section/page
- Scroll behavior is smooth (not jumpy)
- Active section is highlighted in nav
- Mobile menu opens/closes properly

---

## 📋 PHASE 2: CONTENT UPDATES (Priority: HIGH)
**Goal:** Align copy with career positioning as data scientist

### 2.1 Fix GFP (Card 2) Material Issues
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/assets/1GFL_GFP_protein_v1.glb` (Blender source if available)
**Workflow Reference:** `PROTEIN_VISUALIZATION_TUTORIAL.md` Part 3

**Problem:** GFP surface looks weird when rotating - materials not applied per object during export.

**Root Cause:** When exporting from Mol*, didn't create materials for every object. Need to go back to Blender and add materials per object.

**Tasks:**
- [ ] Open GFP Blender file (or re-import GLB from Mol*)
- [ ] Review Histone H1 setup as reference (working correctly)
- [ ] For each GFP object (Struct_Helix, Struct_Sheet, etc.):
  - [ ] Select object
  - [ ] Add material (if missing)
  - [ ] Set appropriate base color
  - [ ] Configure material properties (roughness, metallic, etc.)
- [ ] Test rotation in Blender viewport - surface should look smooth
- [ ] Re-export following workflow:
  - [ ] Select `Protein_Root` only
  - [ ] File > Export > glTF 2.0 (.glb)
  - [ ] Settings: Selected Objects ✓, +Y Up ✓, Draco Compression ✓
  - [ ] Save to `src/assets/` (overwrite or version)
- [ ] Test in React - verify rotation looks smooth
- [ ] Verify controls and hover effects still work

**Acceptance Criteria:**
- GFP surface renders smoothly during rotation
- No weird visual artifacts
- Matches quality of Histone H1 (card 1)
- All interactive features still work (hover, controls)

---

### 2.2 DECISION: Protein Changes for Cards 3, 4, 5
**Status:** 🟢 DECIDED
**Priority:** HIGH

**DECISIONS MADE:** ✅
- **Card 3 (UTS)**: Change from BRCA1 → **FOXP2** (language protein)
- **Card 4 (IGM)**: Change from Cas9 → **p53** (guardian of genome)
- **Card 5 (Lanzarote)**: **Keep RNA Pol II** (synthesis metaphor works)

**Complexity Progression:**
1. Histone H1 (~21 kDa) ✅
2. GFP (~27 kDa) ✅
3. FOXP2 (~80 kDa) 📈 Moderate jump
4. p53 tetramer (~200 kDa) 📈 Moderate jump
5. RNA Pol II (~500 kDa) 📈 Large complex

---

### 2.3 PROTEIN SWAP: FOXP2 for Card 3 (UTS - Genetic Counseling)
**Status:** 🔴 TODO
**Priority:** HIGH
**Workflow Reference:** `PROTEIN_VISUALIZATION_TUTORIAL.md` (full pipeline)

**New Protein:** FOXP2 - "The Language Protein"
**Metaphor:** Communication, translation, speaking with patients
**PDB ID:** Need to research best structure

#### Subtasks (Follow Tutorial Workflow):

**Phase 0: Pre-Visualization Research** 📋
- [ ] Find best PDB structure for FOXP2
- [ ] Research biological function (speech/language development)
- [ ] Identify structural significance (DNA-binding domain, zinc fingers)
- [ ] Determine key features to highlight (DNA-binding region, domains)
- [ ] Plan which amino acids to emphasize (if any)
- [ ] Draft metaphor text connecting to genetic counseling
- [ ] Document in `PROTEIN_VISUALIZATION_TUTORIAL.md` (use template)

**Phase 1: Mol* Export** 🧬
- [ ] Load PDB structure in Mol*
- [ ] Create components with correct naming:
  - [ ] `Struct_Helix` (alpha helices)
  - [ ] `Struct_Sheet` (beta sheets)
  - [ ] `Mol_Surface` (molecular surface)
  - [ ] `Protein` (full overlay - optional)
  - [ ] Any specific residues if highlighting binding site
- [ ] Export as GLB format
- [ ] Save as `FOXP2_raw.glb` (temporary)

**Phase 2: Blender Cleanup** 🎨
- [ ] Import `FOXP2_raw.glb` into Blender
- [ ] Delete default scene (cube, camera, light)
- [ ] Create `Protein_Root` Empty (Shift+A > Empty > Plain Axes)
- [ ] Parent all protein objects to `Protein_Root` (Ctrl+P > Object Keep Transform)
- [ ] Center `Protein_Root` at origin (N panel > Location X,Y,Z = 0)
- [ ] Apply -90° X rotation to `Protein_Root` (R > X > -90 > Enter, then Ctrl+A > Rotation)
- [ ] **CRITICAL**: Add materials to each object:
  - [ ] Select each object (Struct_Helix, Struct_Sheet, etc.)
  - [ ] Add material in Material Properties panel
  - [ ] Set base color (will be overridden by React, but needed for export)
  - [ ] Set roughness/metallic as needed
- [ ] Test rotation in Blender - should look smooth
- [ ] Export GLB:
  - [ ] Select `Protein_Root` only
  - [ ] File > Export > glTF 2.0 (.glb)
  - [ ] Settings: Selected Objects ✓, +Y Up ✓, Draco Compression ✓
  - [ ] Save as `src/assets/FOXP2.glb`

**Phase 3: React Implementation** ⚛️
- [ ] Update `About.jsx` imports (add FOXP2 import)
- [ ] Update Card 3 (UTS) experience object:
  - [ ] Change `title` if needed (keep "University of Technology Sydney")
  - [ ] Update `description` if needed
  - [ ] Update `expandedContent.whatIDid` (mention communication, translation)
  - [ ] Update `expandedContent.whyItMattered` (bridge science and human experience)
  - [ ] Update `expandedContent.proteinChoice` with FOXP2 metaphor text
  - [ ] Update `component` to use FOXP2:
    ```jsx
    path={foxp2}
    position={[0, 0, 0]}
    scale={[1.0, 1.0, 1.0]}
    cameraZ={60}  // Adjust as needed
    tooltip="FOXP2 (PDB: [ID])"
    ```
- [ ] Test in browser:
  - [ ] Protein loads correctly
  - [ ] Hover effects work
  - [ ] Theme switching works (dark/light mode)
  - [ ] Modal expansion works
  - [ ] Rotation is smooth
  - [ ] Adjust `cameraZ` if needed (zoom level)

**Phase 4: Testing & Polish** ✨
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Verify metaphor text reads well
- [ ] Check complexity progression (visually more complex than GFP?)
- [ ] Get user approval

**Acceptance Criteria:**
- FOXP2 metaphor clearly connects to genetic counseling work
- Protein renders smoothly with no artifacts
- All interactive features work
- Visual complexity progression is clear
- User is excited about the result

---

### 2.4 PROTEIN SWAP: p53 for Card 4 (IGM - Bioinformatics)
**Status:** 🔴 TODO
**Priority:** HIGH
**Workflow Reference:** `PROTEIN_VISUALIZATION_TUTORIAL.md` (full pipeline)

**New Protein:** p53 - "Guardian of the Genome"
**Metaphor:** Quality control, data monitoring, decision-making
**PDB ID:** Need to research best structure (many available)

#### Subtasks (Follow Tutorial Workflow):

**Phase 0: Pre-Visualization Research** 📋
- [ ] Find best PDB structure for p53 (tetramer preferred for complexity)
- [ ] Research biological function (tumor suppressor, monitors DNA damage)
- [ ] Identify structural significance (DNA-binding domain, tetramer interface)
- [ ] Determine key features to highlight (DNA-binding region, oligomerization)
- [ ] Plan which amino acids to emphasize (if any)
- [ ] Draft metaphor text connecting to bioinformatics/data QC
- [ ] Document in `PROTEIN_VISUALIZATION_TUTORIAL.md` (use template)

**Phase 1: Mol* Export** 🧬
- [ ] Load PDB structure in Mol* (prefer tetramer for visual complexity)
- [ ] Create components with correct naming:
  - [ ] `Struct_Helix` (alpha helices)
  - [ ] `Struct_Sheet` (beta sheets)
  - [ ] `Mol_Surface` (molecular surface)
  - [ ] `Protein` (full overlay - optional)
  - [ ] Consider highlighting DNA-binding domain if relevant
- [ ] Export as GLB format
- [ ] Save as `p53_raw.glb` (temporary)

**Phase 2: Blender Cleanup** 🎨
- [ ] Import `p53_raw.glb` into Blender
- [ ] Delete default scene (cube, camera, light)
- [ ] Create `Protein_Root` Empty (Shift+A > Empty > Plain Axes)
- [ ] Parent all protein objects to `Protein_Root` (Ctrl+P > Object Keep Transform)
- [ ] Center `Protein_Root` at origin (N panel > Location X,Y,Z = 0)
- [ ] Apply -90° X rotation to `Protein_Root` (R > X > -90 > Enter, then Ctrl+A > Rotation)
- [ ] **CRITICAL**: Add materials to each object:
  - [ ] Select each object (Struct_Helix, Struct_Sheet, etc.)
  - [ ] Add material in Material Properties panel
  - [ ] Set base color
  - [ ] Set roughness/metallic
- [ ] Test rotation in Blender - should look smooth
- [ ] Export GLB:
  - [ ] Select `Protein_Root` only
  - [ ] File > Export > glTF 2.0 (.glb)
  - [ ] Settings: Selected Objects ✓, +Y Up ✓, Draco Compression ✓
  - [ ] Save as `src/assets/p53.glb`

**Phase 3: React Implementation** ⚛️
- [ ] Update `About.jsx` imports (add p53 import)
- [ ] Update Card 4 (IGM) experience object:
  - [ ] Keep `title` ("IGM Team")
  - [ ] Keep `description` ("Applied bioinformatics in melanoma genetics research")
  - [ ] Update `expandedContent.proteinChoice` with p53 metaphor:
    - "p53 monitors genomic integrity and decides when intervention is needed. At IGM, I built systems to monitor genetic variant data and flag what clinicians needed to act on."
  - [ ] Update `component` to use p53:
    ```jsx
    path={p53}
    position={[0, 0, 0]}
    scale={[0.8, 0.8, 0.8]}  // Adjust as needed
    cameraZ={70}  // Adjust as needed
    tooltip="p53 (PDB: [ID])"
    ```
- [ ] Test in browser:
  - [ ] Protein loads correctly
  - [ ] Hover effects work
  - [ ] Theme switching works
  - [ ] Modal expansion works
  - [ ] Rotation is smooth
  - [ ] Adjust `cameraZ` and `scale` if needed

**Phase 4: Testing & Polish** ✨
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Verify metaphor text reads well
- [ ] Check complexity progression (visually more complex than FOXP2?)
- [ ] Get user approval

**Acceptance Criteria:**
- p53 metaphor clearly connects to bioinformatics/data analysis work
- Protein renders smoothly with no artifacts
- All interactive features work
- Visual complexity progression is clear (larger/more complex than FOXP2)
- User is excited about the result

---

### 2.2 Update Skills Section - Data Scientist Focus
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/components/SkillsBannerGlass.jsx` or skills data file

**Current Skills:** Need to review what's currently shown

**Target Skills (Based on Le Wagon + Career Goals):**

**Programming & Data Science:**
- Python (pandas, numpy, scikit-learn, Biopython)
- R (tidyverse, Bioconductor, ggplot2, statistical genomics)
- SQL (data querying, database design)
- JavaScript/React (data visualization, interactive tools)

**Machine Learning & AI:**
- PyTorch (learning/goal)
- Statistical modeling
- Predictive analytics
- Genomic variant analysis

**Data Visualization:**
- D3.js (interactive charts)
- Three.js (3D molecular visualization)
- Shiny (R dashboards)
- Observable notebooks

**Bioinformatics & Domain:**
- Genomic data analysis (VCF, FASTQ, BAM files)
- GATK, samtools, bcftools
- Variant interpretation
- Clinical genetics knowledge
- Genetic counseling communication skills

**Tools & Infrastructure:**
- Git/GitHub (version control)
- Docker (containerization - learning)
- Cloud platforms (AWS/GCP/Azure - exploring)
- LaTeX (scientific documentation)
- Jupyter notebooks

**Tasks:**
- [ ] Find where skills are defined (component or data file)
- [ ] Review current skills list
- [ ] Replace/update with data scientist focused skills
- [ ] Organize into logical categories
- [ ] Ensure visual display works with new content

**Acceptance Criteria:**
- Skills clearly position user as data scientist at bio/tech intersection
- All listed skills are genuine (no fake expertise)
- Skills align with Le Wagon careers goals
- Visual display looks good (not overcrowded)

---

### 2.2 Rewrite "Interactive Laboratory" Text
**Status:** 🔴 TODO
**Priority:** MEDIUM
**Files:** `src/components/work/WorkSection.jsx` (lines 229-237)

**Current Text:**
```
Interactive Laboratory
Projects circulating through my scientific practice

Each organelle holds a live system I designed for research teams,
counselling practice, or automation pipelines. Tap any structure to
expand it—the membrane flexes on mobile, and on desktop it docks at
the nucleus so you can inspect the project details.
```

**Goal:** Make it clearer, more direct, better for recruiters

**Tasks:**
- [ ] Draft new copy that:
  - Clearly states these are real projects with impact
  - Emphasizes data science / bioinformatics skills
  - Connects to career goals (tools that bridge research & practice)
  - Maintains scientific metaphor but keeps it accessible
- [ ] Get user feedback on draft
- [ ] Implement approved version

**Acceptance Criteria:**
- Text is clear and professional
- Positions projects as serious work (not just demos)
- Works for both technical and non-technical readers
- User approves the copy

**Draft Ideas to Explore:**
- Focus on impact ("tools deployed to clinical teams")
- Emphasize data scale ("328k patient records", "production workflows")
- Connect to career story ("bridging genomics research and clinical practice")

---

### 2.3 Rewrite "Field Notes" Text
**Status:** 🔴 TODO
**Priority:** MEDIUM
**Files:** `src/components/blog/BlogSection.jsx` (lines 16-18)

**Current Text:**
```
Field Notes
Stories from data, clinics, and code

I write about the bridges between genetic counselling, bioinformatics,
and interactive storytelling. Read the latest pieces or dive into the
archive of experiments and reflections.
```

**Goal:** Adjust tone/content for MVP (since blog is mostly placeholders)

**Tasks:**
- [ ] Decide: Keep ambitious tone or acknowledge it's early?
- [ ] Draft new copy options:
  - Option A: Keep aspirational ("Coming soon: stories from...")
  - Option B: Honest placeholder ("Blog launching soon")
  - Option C: Frame as "in progress" work
- [ ] Get user feedback
- [ ] Implement approved version

**Acceptance Criteria:**
- Text doesn't overpromise (only 1 post + placeholders currently)
- Still feels professional and intentional
- Sets expectation appropriately
- User approves the copy

---

### 2.4 Add GitHub Link
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/components/Contact.jsx`, possibly `src/components/Footer.jsx`

**Tasks:**
- [ ] Decide where GitHub link should go (Contact? Footer? Both? Hero?)
- [ ] Add link with appropriate icon/styling
- [ ] Verify link opens in new tab
- [ ] Ensure it matches design system
- [ ] Test on mobile

**Acceptance Criteria:**
- GitHub link is visible and obvious
- Opens to correct profile: github.com/JesusDLopez (verify username)
- Styled consistently with rest of site
- Works on mobile

**User GitHub:** Need to confirm - is it github.com/JesusDLopez?

---

### 2.5 Add Le Wagon to 2025-Present Section
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `src/components/about/About.jsx` (lines 114-134)

**DECISION: YES - Add Le Wagon** ✅

**Current Text (2025-Present):**
Says returned to Canary Islands, tried startup, shifted to building portfolio and deepening skills. Mentions "actively seeking roles."

**Tasks:**
- [ ] Draft new text that includes Le Wagon bootcamp
- [ ] Integrate with existing narrative about portfolio building
- [ ] Emphasize: formal training + self-directed work = complete package
- [ ] Get user approval on draft
- [ ] Implement approved version

**Draft to explore:**
"After five years in Australia, I returned home to the Canary Islands. I initially set out to build a startup — an application to communicate complex genetic variants to patients. But I realized I needed stronger programming fundamentals first.

I enrolled in Le Wagon's Data Science & AI bootcamp to formalize my full-stack skills and learn production-level software engineering. Alongside the intensive coursework, I've been building this portfolio — documenting my work in melanoma genetics, hearing loss research, and interactive data visualization.

Now I'm in the careers module, preparing to join teams where I can apply bioinformatics and machine learning to real-world genomics challenges."

**Acceptance Criteria:**
- Le Wagon is clearly mentioned
- Doesn't overshadow previous accomplishments
- Shows intentionality and commitment
- Connects bootcamp to career goals
- User approves the copy

---

## 📋 PHASE 3: TECHNICAL VALIDATION (Priority: MEDIUM)
**Goal:** Ensure everything works correctly

### 3.1 Verify Project Showcase Pages Work
**Status:** 🔴 TODO
**Priority:** MEDIUM
**Files:** Project component files

**Tasks:**
- [ ] Click "Melanoma Genetics Workshop" organelle
- [ ] Verify route `/projects/melanoma-workshop` loads correctly
- [ ] Check content, layout, data visualization
- [ ] Click "Hearing Loss Study" organelle
- [ ] Verify route `/projects/hearing-loss-diabetes` loads correctly
- [ ] Check content, layout, data visualization
- [ ] Note: Other projects (PRS Tool, Clinical Calc) link to `/work/...` - verify these are intentionally placeholders

**Acceptance Criteria:**
- Melanoma page loads without errors
- Hearing Loss page loads without errors
- Content displays correctly
- Back navigation works
- Mobile rendering is acceptable

**Note:** User mentioned leaving these "half-done" for now. Define what "good enough for MVP" means for each.

---

### 3.2 Style Placeholder Project Cards
**Status:** 🔴 TODO
**Priority:** MEDIUM
**Files:** `src/components/work/WorkSection.jsx`, `src/components/work/OrganelleNew.jsx`, CSS files

**DECISION: Grey/muted with "Coming Soon" or "Finishing coding the transfer"** ✅

**Current Placeholder Links:**
- `/work/prs-generator` (Automated PRS Booklet Tool)
- `/work/dermcalc` (Clinical Calculator)

**Tasks:**
- [ ] Add visual styling to indicate placeholder status:
  - Grey/muted colors (desaturated)
  - Subtle indicator badge or text
  - Maybe reduced opacity or different border
- [ ] Add text like "Coming Soon" or "Finishing coding the transfer"
- [ ] Decide: Should they be clickable or not?
  - If clickable: Create simple coming soon page
  - If not: Show tooltip on hover explaining status
- [ ] Make sure styling is clear but not jarring
- [ ] Test on both desktop and mobile

**Acceptance Criteria:**
- Placeholder projects are clearly distinguished from live projects
- User understands these are in progress
- Doesn't hurt overall polish of the portfolio
- Styling is subtle and professional

---

## 📋 PHASE 4: BUILD & DEPLOY (Priority: HIGH)
**Goal:** Get it live on a domain

### 4.1 Build Production Bundle
**Status:** 🔴 TODO
**Priority:** HIGH
**Files:** `vite.config.js`, `package.json`, build scripts

**Tasks:**
- [ ] Run `npm run build` (or equivalent)
- [ ] Check for build errors
- [ ] Fix any errors that appear
- [ ] Verify bundle size is reasonable
- [ ] Test build locally (`npm run preview` or serve dist/)
- [ ] Check that all assets load correctly
- [ ] Verify routing works in production build
- [ ] Test on mobile device

**Acceptance Criteria:**
- Build completes without errors
- Production bundle runs locally
- All features work in production mode
- No console errors
- Assets load correctly (images, 3D models, etc.)

**Known Considerations:**
- Large protein model files (GFP_v2.glb, HistoneH1_V2.glb) - check sizes
- Base URL configuration for deployment path
- Environment variables (if any)

---

### 4.2 Deployment Setup
**Status:** 🔴 TODO
**Priority:** HIGH

**DECISIONS:** ✅
- Platform: **Vercel** (already set up)
- Domain: **Need to purchase**

**Tasks:**
- [ ] Help user choose domain name (suggestions based on branding)
- [ ] Purchase domain (Namecheap, Google Domains, etc.)
- [ ] Configure Vercel project
- [ ] Connect GitHub repo to Vercel
- [ ] Set up custom domain in Vercel
- [ ] Configure DNS records
- [ ] Deploy
- [ ] Verify live site works
- [ ] Test on multiple devices
- [ ] Share link with user

**Acceptance Criteria:**
- Site is live on custom domain
- All features work in production
- SSL certificate is active (HTTPS)
- Site loads quickly
- Mobile experience is good

**Domain Name Ideas:**
- jesuslopez.bio
- jesuslopez.dev
- jalopez.bio
- jesusdlopez.com
- kodas.bio (if personal branding)
- (User to decide)

---

## 📋 PHASE 5: FINAL CHECKS (Priority: MEDIUM)
**Goal:** Polish and QA before sharing with Le Wagon / recruiters

### 5.1 Cross-Browser Testing
**Status:** 🔴 TODO
**Priority:** MEDIUM

**Tasks:**
- [ ] Test in Chrome (desktop & mobile)
- [ ] Test in Safari (desktop & mobile)
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Note any browser-specific issues
- [ ] Fix critical issues

---

### 5.2 Performance Check
**Status:** 🔴 TODO
**Priority:** MEDIUM

**Tasks:**
- [ ] Run Lighthouse audit
- [ ] Check load times
- [ ] Verify 3D models load efficiently
- [ ] Check scroll performance
- [ ] Optimize if needed

---

### 5.3 Content Proofread
**Status:** 🔴 TODO
**Priority:** MEDIUM

**Tasks:**
- [ ] Proofread all text for typos
- [ ] Check for spelling errors
- [ ] Verify links are correct
- [ ] Ensure consistent tone
- [ ] Get second pair of eyes if possible

---

## 📋 OUT OF SCOPE (Post-MVP)
**Things explicitly NOT needed for MVP launch:**

- ❌ Blender protein improvements (user doing separately, can add later)
- ❌ Complete Melanoma Workshop project (leave half-done)
- ❌ Complete other project pages (placeholders OK)
- ❌ Blog posts (placeholders are fine)
- ❌ Perfect animations (good enough is good enough)
- ❌ Every skill ever learned (focus on data science positioning)

---

## 🔄 HOW TO USE THIS DOCUMENT

**When starting a session:**
"Chat, read MVP_ROADMAP.md and tell me what we need to do next"

**When completing a task:**
- Update status from 🔴 TODO → 🟡 IN PROGRESS → 🟢 DONE
- Check off completed subtasks
- Add notes on what was done
- Update "Last Updated" date

**When blocked:**
- Mark task with ⚠️ BLOCKED
- Add note explaining blocker
- Move to next available task

**Status Legend:**
- 🔴 TODO - Not started
- 🟡 IN PROGRESS - Currently working on
- 🟢 DONE - Completed and verified
- ⚠️ BLOCKED - Can't proceed (needs decision/external work)
- 🔵 DECISION NEEDED - User needs to make a choice

---

## 📊 PROGRESS TRACKER

**Phase 1 (Polish & Fix):** 0/4 tasks complete
**Phase 2 (Content Updates):** 0/5 tasks complete
**Phase 3 (Technical Validation):** 0/2 tasks complete
**Phase 4 (Build & Deploy):** 0/2 tasks complete
**Phase 5 (Final Checks):** 0/3 tasks complete

**Overall MVP Progress:** 0% (0/16 tasks)

**Target Completion:** End of week (3-4 days)

---

## 🎯 RECOMMENDED WORK ORDER

**Session 1 (Current):**
1. ✅ Create this roadmap
2. Review with user - get alignment on priorities
3. Make any decision needed (Le Wagon mention? Placeholder strategy?)

**Session 2:**
1. Quick wins: GitHub link, text rewrites
2. Skills section update

**Session 3:**
1. DNA animation fix
2. Hola animation improvements

**Session 4:**
1. Mobile polish
2. Navbar behavior check

**Session 5:**
1. Build production bundle
2. Deploy to domain

**Session 6:**
1. Final testing & QA
2. Cross-browser check
3. Ship it! 🚀

---

## 📝 NOTES & DECISIONS LOG

**2024-12-16:**
- Created initial roadmap
- User priorities: DNA animation, skills update, text rewrites, mobile polish
- Blender work out of scope (user doing separately)
- Project pages can be half-done/placeholder for MVP
- Need decisions on: Le Wagon mention, placeholder link strategy, domain details
