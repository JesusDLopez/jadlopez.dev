# Website Content for Review

This document contains all the user-facing text from the website's components and posts for easy review and revision.

---

## Hero Section Workspace

Use this block to focus your edits on the hero copy before moving on to other sections.

### Current Copy Snapshot

#### `src/components/hero/HeroContent.jsx`

- Jesús López O'Rourke
- Bioinformatics & Genetic Counselling
- Inspect DNA
- Click to scroll

#### `src/components/hero/InfoPanels.jsx`

- **Controls:**
- 🖱️ Left-click + drag to **rotate**
- 🖱️ Right-click + drag to **pan**
- 🖱️ Scroll to **zoom**

- **DNA Double Helix Panel**
- **Title:** DNA Double Helix
- **Category:** STRUCTURE · GENETICS
- **Meta:** 12 base pairs · B-form DNA · PDB 1BNA
- **Body:**
    - <span class="info-panel__term">DNA is the code that organizes life.</span> This double helix stores hereditary instructions, held together by base pairing and a sugar–phosphate backbone.
    - This segment captures a 12-base-pair fragment of <span class="info-panel__term">B-form DNA</span> (CGCGAATTCGCG), a benchmark sequence in structural biology.
    - This structure was resolved through crystallography in 1981 at <span class="info-panel__term">1.9 Å</span> resolution and remains one of the most recognizable examples in molecular biology, showing canonical A–T and G–C pairings, a right-handed twist, and pronounced major and minor grooves.
- **Mobile Summary:** 12 base pairs of B-form DNA (CGCGAATTCGCG) from PDB 1BNA with canonical pairing, right-handed twist, and major/minor grooves.
- **Citation:** Source: [RCSB PDB](https://www.rcsb.org/structure/1BNA) · ID: 1BNA
- **Mobile Controls Hint:** ☝️ Drag to rotate · ✌️ Two fingers to pan · 🤏 Pinch to zoom

- **Nucleotide Details Panels**
- **Adenine (A):**
    - **Category:** BASE CHEMISTRY · ENERGY
    - **Meta:** Purine · pairs with thymine · 2 hydrogen bonds
    - **Body:**
        - <span class="info-panel__term">Purine</span> with a fused two-ring scaffold that pairs exclusively with <span class="info-panel__term">thymine</span> through two hydrogen bonds, reinforcing the helix.
        - Powers cellular energy transfer as a core component of <span class="info-panel__term">ATP</span> and related nucleotide cofactors, echoing its Greek root <em>aden</em> (gland).
    - **Mobile Summary:** Purine partner for thymine, locking in two hydrogen bonds and energising ATP-driven chemistry.
- **Thymine (T):**
    - **Category:** BASE CHEMISTRY · FIDELITY
    - **Meta:** Pyrimidine · pairs with adenine · 2 hydrogen bonds
    - **Body:**
        - Single-ring <span class="info-panel__term">pyrimidine</span> that binds only <span class="info-panel__term">adenine</span> via two hydrogen bonds, keeping replication precise.
        - Its thymus-derived name nods to the tissue where it was isolated and to its role in genomic proofreading.
    - **Mobile Summary:** Pyrimidine base that pairs only with adenine, providing consistent two-bond fidelity during replication.
- **Cytosine (C):**
    - **Category:** BASE CHEMISTRY · EPIGENETICS
    - **Meta:** Pyrimidine · pairs with guanine · 3 hydrogen bonds
    - **Body:**
        - <span class="info-panel__term">Pyrimidine</span> partner to <span class="info-panel__term">guanine</span>, forming three hydrogen bonds that give the helix extra tensile strength.
        - Frequent site of <span class="info-panel__term">DNA methylation</span>, toggling gene activity without changing sequence.
    - **Mobile Summary:** Triple-bonding pyrimidine for guanine; common methylation site guiding gene regulation.
- **Guanine (G):**
    - **Category:** BASE CHEMISTRY · SIGNALING
    - **Meta:** Purine · pairs with cytosine · 3 hydrogen bonds
    - **Body:**
        - Two-ring <span class="info-panel__term">purine</span> that bonds with cytosine through three hydrogen bridges, the helix’s most stable base pair.
        - Fuels cellular signalling as part of <span class="info-panel__term">GTP</span> and other guanine nucleotides first isolated from guano.
    - **Mobile Summary:** Purine matched to cytosine with three hydrogen bridges; key to GTP-mediated signalling.
- **Backbone:**
    - **Category:** STRUCTURAL SCAFFOLD
    - **Meta:** Sugar–phosphate chain · directional 5′→3′ links
    - **Body:**
        - Alternating <span class="info-panel__term">deoxyribose</span> sugars and phosphate groups create a directional spine anchoring each nucleotide.
        - <span class="info-panel__term">Phosphodiester bonds</span> hold the rails together and orient bases for precise Watson–Crick pairing.
    - **Mobile Summary:** Sugar–phosphate spine with 5′→3′ phosphodiester links positioning bases for accurate pairing.

### Your Observations & Tweaks
- [x] **HERO SECTION - COMPLETED** ✓
  - Simplified first paragraph with clear opening: "DNA is the code that organizes life"
  - Made third paragraph more personable with crystallography history (1981)
  - Removed parentheses from last paragraph
  - Added hyperlink to RCSB PDB source

### Follow-up Feedback (Gemini/Claude/others)
- [x] Hero section reviewed and finalized (2025-11-19)

---

## About Section Workspace

Use this workspace to keep Gemini's brainstorm, your edits, and Claude's follow-ups aligned.

### Current Copy Snapshot
- See the `src/components/about` entries below for the full text that Gemini generated.

### Codex Feedback on Gemini Draft (2025-11-19)
- **Keep the specificity, trim the essay:** The timeline paragraphs in `About.jsx` (#200–244) are vivid but dense; condensing each card to ~3 sentences with a leading metric or proof point will make the journey scannable while preserving the tactile detail.
- **Lead with a thesis before the fragments:** `AboutIntro.jsx` (#259–279) opens with sentence fragments that feel like scaffolding; swap in a direct two-sentence opener about who you help today, then keep the capability bullets as supporting detail.
- **Tie past → present benefits:** After every “Why It Mattered” block, add one forward-looking line that states how that phase fuels your current services (AI workflows, counseling-ready tools, etc.) so readers see what they gain without reading every modal word-for-word.
- **Tone/style consistency:** The mix of underscored campus names, heavy protein tooltips, and long introspective paragraphs can feel lab-notebook heavy; consider moving the lore into hover tooltips and keep the visible copy conversational to match the counseling voice you use elsewhere.

### Your Observations & Tweaks
- [ ] Capture what feels off, what to test, and drafts you're exploring.

### Follow-up Feedback (Claude/others)
- [ ] Drop AI or collaborator reactions to your notes above.

---

## `src/App.jsx`

- Loading Hearing Loss Report...
- Loading Melanoma Workshop Report...

---

## `src/components/AnimatedSignature.jsx`

- Jesús López

---

## `src/components/Contact.jsx`

- I code and build with biological and clinical insight.
- - I am open to freelance, or working long term with a team. -<br /> Any involvement on exciting projects where I can help will be welcomed, but my main objective is to keep learning genetics (counselling and/or bioinformatics).
- What I do
- Tools I build
- Scientific web apps & visual platforms
- Statistical interactive reports for research and biotech teams
- Scientific engineering
- Functional prototypes for genomics & precision medicine
- Systems that connect data, biology, and human understanding
- AI workflows
- Custom agent systems for research productivity
- AI-assisted pipelines and experimental coding environments
- Growing domain
- Bioinformatics tooling (VCF, GWAS, variant analysis)
- Clinical genomics & data interpretation (in development)
- Would love to hear from you and your ideas
- Email
- GitHub
- LinkedIn
- Name
- Email
- Tell me about your project or opportunity...
- Sending...
- Send Message
- Message sent! I'll get back to you soon.
- Something went wrong. Please try again or email me directly.

---

## `src/components/Footer.jsx`

- Thanks for stopping by and exploring my work
- I built this website on my own, combining my passion for genetics and code
- Built with **React**, **Three.js**, **Framer Motion**, and **Blender**
- Features: Interactive DNA explorer with educational insights • Custom DNA helix • Interactive protein viewer (Mol*) • Cellular physics engine
- © 2024 Jesus D. Lopez

---

## `src/components/Navbar.jsx`

- JLO
- About
- Work
- Blog
- Contact

---

## `src/components/OrbitingIcons.jsx`

- Email
- GitHub
- LinkedIn

---

## `src/components/PasswordGate.jsx`

- 🧬 Portfolio Access
- This portfolio is currently in development. Enter password to continue.
- Enter password
- Incorrect password
- Unlock Portfolio
- Need access? Contact me at jlopezorourke@gmail.com

---

## `src/components/SkillsBanner.jsx`

- Genetic Counseling
- Clinical Genetics
- Variant Interpretation
- Patient Communication
- R
- Python
- JavaScript
- React
- Three.js
- Statistical Genomics
- Bioinformatics
- Data Analysis
- Biostatistics
- Melanoma Research
- Genomic Medicine
- Clinical Research
- Data Visualization

---

## `src/components/ThemeToggle.jsx`

- Switch to light mode
- Switch to dark mode

---

## `src/components/about/About.jsx`

- **Modal Title:** Universidad Europea de Madrid
- **Years:** 2016–2019
- **Description:** Foundation in molecular biology and quantitative sciences.
- **What I Did:** I immersed myself in foundational courses across molecular biology, genetics, immunology, pharmacology, thermodynamics, mathematics, and chemistry. This was my first exposure to the scientific world — learning not just to memorize facts, but to understand biological and physical mechanisms as systems I could model and predict.
- **Why It Mattered:** This is where I learned to think quantitatively about biology. Every course opened new ways of seeing how life works at the molecular level. The foundation built here — mathematical thinking applied to biological problems — became essential for everything that followed.
- **Protein Choice:** Histone H1 packages DNA into structured nucleosomes.
- **Tooltip:** Histone H1 (PDB: 1HST)

- **Modal Title:** University of Queens_land
- **Years:** 2019–2022
- **Description:** Advanced training in genomics and programming.
- **What I Did:** U_Q raised the bar significantly. I repeated some courses from Madrid and realized how much deeper I could go. I was surrounded by researchers who showed me what it meant to apply knowledge, not just collect it.

I went deeper into thermodynamics, biochemistry, genomics, and statistics. Most importantly, this is where I first started programming: R for biostatistics, introductory software engineering, and early bioinformatics. It was challenging — I struggled through many assignments — but this is where the technical skills that define my work today first took root.
- **Why It Mattered:** I learned to push through difficulty and make knowledge useful. Programming was hard at first, but it became the tool that would eventually allow me to contribute most effectively. This period prepared me for the blend of technical and clinical work that came next.
- **Protein Choice:** GFP makes the invisible visible through fluorescence.
- **Tooltip:** GFP (PDB: 1GFL)

- **Modal Title:** University of Tech_nology Syd_ney
- **Years:** 2022–2024
- **Description:** Explored the human side of genomics.
- **What I Did:** I completed a Master's in Genetic Counseling at U_TS, a program that combined scientific rigor with human connection. I learned how to explain complex genetic concepts in accessible ways, adapt communication to different families, and support patients through difficult decisions about testing, treatment, and family planning.

The curriculum covered counseling frameworks like narrative therapy, family systems theory, and logotherapy — tools for helping people find meaning in challenging diagnoses. Clinical placements in oncology, cancer genetics, prenatal, and general clinics gave me hands-on experience. I learned genetics is never only about DNA — it's about people, their identities, their values, and the decisions they need to make.
- **Why It Mattered:** This training taught me to bridge scientific data and human experience. I gained confidence not only in handling genetic information, but in guiding people through complex decisions with clarity and empathy. It shaped how I think about the purpose of genetic knowledge: not as an endpoint, but as something that must be translated into meaningful action for patients and families.
- **Protein Choice:** BRCA1 mutations impact cancer risk and influence decisions about prevention, family planning, and genetic testing.
- **Tooltip:** BRCA1 (PDB: 1T15)

- **Modal Title:** I_GM Team
- **Years:** 2022–2025
- **Description:** Applied bioinformatics in melanoma genetics research.
- **What I Did:** During my last semester at U_Q, a guest lecture by Aid_een McIn_erney introduced me to genetic counseling. After class, we met for coffee — a conversation that changed the trajectory of my career. She became my mentor, encouraged me to pursue the Master's program, and invited me to join her team at Integr_ating Gen_omics into Medi_cine (I_GM).

At I_GM, I stepped into my first professional role working with real patient data in melanoma genetics research. I collaborated with genetic counselors and dermatologists, applying statistics and bioinformatics to analyze genomic data. I built tools and workflows that made complex datasets usable for clinicians. I presented findings at conferences, supported workshops teaching dermatologists about melanoma genetic testing, and completed further training in statistical genomics.
- **Why It Mattered:** This was the turning point where I stopped only studying science and began practicing it. I discovered where I could contribute most: building tools and methods that bring genomics into clinical practice. This clarified my career direction and showed me the work I want to do — bridging the gap between research data and patient care.
- **Protein Choice:** Cas9 is a programmable enzyme that cuts DNA at specific sequences, enabling precise genome editing.
- **Tooltip:** Cas9 (PDB: 4CMP)

- **Modal Title:** Lanzarote & Beyond
- **Years:** 2025–Present
- **Description:** Building skills and portfolio in bioinformatics.
- **What I Did:** After five years in Australia, I returned home to the Canary Islands. It was both a homecoming and a turning point. I initially set out to build a startup — an application to communicate complex genetic variants to patients in accessible ways. But within a few months, I realized the project wasn't ready to succeed. I needed more experience in programming and bioinformatics before I could make it real.

So I shifted focus. Instead of pushing a startup prematurely, I began building this portfolio — documenting my work in melanoma genetics, hearing loss research, and interactive data visualization. I'm deepening my technical skills in R, JavaScript, and bioinformatics workflows while actively seeking roles where I can apply these skills professionally.
- **Why It Mattered:** This period is about consolidation and preparation. Rather than seeing the startup pivot as a setback, I'm investing in the technical foundation I need to contribute meaningfully. By documenting what I've built and continuing to develop my skills, I'm preparing for opportunities where I can both grow and be useful — whether in bioinformatics roles, freelance scientific visualization, or eventually revisiting the patient communication tools I believe are needed.
- **Protein Choice:** RNA Polymerase II is a large multimeric complex that transcribes DNA into RNA, coordinating multiple subunits to synthesize genetic messages.
- **Tooltip:** RNA Polymerase II (PDB: 1I3Q)

- **Modal Close Button:** ×
- **Modal Instructions:** Click and drag to rotate the protein structure. Use your mouse wheel to zoom in and out for a detailed view.
- **Timeline Title:** Academic Journey
- **Timeline Subtitle:** From Biotechnology to Bioinformatics
- **Timeline Description:** Each protein structure represents a milestone in my journey through genetics, research, and computational biology. Click any card to explore the story behind each stage.
- **Card Placeholder:** Click to view in modal

---

## `src/components/about/AboutIntro.jsx`

- ¡Hola!
- I'm Jesús A. López O'Rourke
- I started in biotechnology, trained in genetic counseling, and now I 
- visualize genomic data
- produce stats reports
- build web apps
- counsel patients in genetics
- I've studied 
- statistical genetics
- molecular biology
- thermodynamics
- counseling theory
- pharmacology
- genomic medicine
- software engineering
- , supported patients, and translated science into practice
- Now I build tools that guide 
- genetic counselors
- students
- medical doctors
- researchers
- through genetics.

---

## `src/components/about/AcademicJourney.jsx`

- (Content is identical to `src/components/about/About.jsx` and has been omitted to avoid duplication.)

---

## `src/components/blog/BlogItem.jsx`

- (This component dynamically displays post data, no static text to extract.)

---

## `src/components/blog/BlogPostPage.jsx`

- 404 - Post Not Found
- Loading...

---

## `src/components/blog/BlogSection.jsx`

- Field Notes
- Stories from data, clinics, and code
- I write about the bridges between genetic counselling, bioinformatics, and interactive storytelling. Read the latest pieces or dive into the archive of experiments and reflections.

---

## `src/components/blog/PlaceholderCard.jsx`

- 📝
- Coming Soon

---

## `src/components/work/WorkSection.jsx`

- **Sidebar Title:** Interactive Laboratory
- **Sidebar Subtitle:** Projects circulating through my scientific practice
- **Sidebar Description:** Each organelle holds a live system I designed for research teams, counselling practice, or automation pipelines. Tap any structure to expand it—the membrane flexes on mobile, and on desktop it docks at the nucleus so you can inspect the project details.
- **Organelle Titles:**
    - Melanoma Genetics Workshop
    - Hearing Loss & Gestational Diabetes Study
    - Automated PRS Booklet Tool
    - Clinical Calculator for DermClinic
- **Expanded View Button:** View Project →

---

## `src/posts/ai-biotech-genetics.mdx` & `.jsx`

- **Title:** Artificial Intelligence Meets Genetics: A Brief History
- **Excerpt:** From statistical models to foundation models, a look at how AI is reshaping biotechnology.
- **Content:**
    - I. Introduction: A Double Helix Meets an Algorithm
    - The convergence of Artificial Intelligence (AI) with the life sciences—specifically biotechnology, genetics, and bioinformatics—has catalyzed a paradigm shift in how we decode, manipulate, and engineer biological systems...
    - II. From Statistical Genomics to Early ML (2000s – 2012)
    - ...
    - (And so on for the rest of the article content)

---

## `src/posts/code-to-kinase.mdx` & `.jsx`

- **Title:** From Code to Kinase: A Personal Path into Genomics
- **Excerpt:** On writing code as a mirror of molecular structure, and the future of visualization.
- **Content:** Thoughts on the intersection of software and molecular biology.

---

## `src/posts/masters-origin.mdx` & `.jsx`

- **Title:** Why I'm Building My Own Master's Program
- **Excerpt:** A reflection on education, autonomy, and scientific voice in a post-academic world.
- **Content:** This is placeholder content for the post describing the motivations behind creating a self-directed curriculum.

---

## `src/posts/scroll-systems.mdx` & `.jsx`

- **Title:** Scroll Systems for Scientific Storytelling
- **Excerpt:** How I use GSAP and scroll-linked animations to map narrative structure to web design.
- **Content:** An exploration of scroll-based narratives in digital science communication.

---
## `src/components/projects/HearingLoss`

### `HeroSection.jsx`
- Hearing Loss & Gestational Diabetes
- A comprehensive analysis of risk factors for congenital hearing loss in Queensland health data
- My Contribution
- This project showcases my statistical work on an unpublished study of ~330,000 pregnancies from Queensland, Australia. The research team was investigating whether maternal gestational diabetes increased the risk of congenital hearing loss in newborns.
- I was responsible for data processing, building logistic regression models, producing diagnostics, and generating clear figures and tables. This page reproduces my work in Python (originally built in R) and presents the results through interactive, JavaScript-based visualizations.
- Disclaimer: This study remains unpublished. The content here reflects only my contribution (statistical methods and results). It is presented for demonstration in my portfolio and should not be interpreted as final peer-reviewed findings.
- Pregnancies Analyzed
- Complete maternal-infant records from Queensland health database
- Hearing Loss Cases
- Permanent congenital hearing loss (0.33% prevalence)
- Gestational Diabetes
- Mothers with gestational diabetes (11.7% prevalence)
- This study examines the relationship between maternal gestational diabetes and permanent congenital hearing loss in offspring using population-based health administrative data from Queensland, Australia.

### `MethodsSection.jsx`
- My Analytical Approach
- How I tackled this complex epidemiological question using advanced statistical methods and data visualization
- Portfolio Highlight: I designed and executed a comprehensive analysis pipeline combining descriptive statistics, statistical testing, and multivariable modeling to investigate gestational diabetes as a risk factor for congenital hearing loss.
- My Analysis Strategy
- I approached this research question systematically, building from exploratory analysis to sophisticated statistical modeling:
- 1. Data Exploration & Demographics: I examined population characteristics and created interactive visualizations to understand the data structure.
- 2. Risk Factor Analysis: I calculated odds ratios for all potential risk factors to create a comprehensive risk landscape.
- 3. Primary Statistical Comparison: I performed chi-square testing to compare hearing loss rates and calculated confidence intervals.
- 4. Multivariable Modeling: I built logistic regression models to control for confounding variables and assess independent effects.
- Statistical Methods I Used
- From Analysis to Insights
- With my analytical framework established, I now present the findings from my comprehensive investigation into gestational diabetes and hearing loss associations. Each visualization represents a different aspect of my statistical analysis pipeline.

### `DemographicsSection.jsx`
- Study Population Demographics
- Understanding the characteristics of mothers and infants in our analysis
- Key Finding: Our study captures a representative sample of Queensland pregnancies, with balanced demographics that allow for robust statistical analysis of hearing loss risk factors.
- Population Demographics Overview
- Maternal Age Distribution
- Infant Gender Distribution
- Clinical Characteristics
- Delivery Methods
- Birth Weight Distribution
- Additional variables including maternal BMI, ethnicity, hypertension status, and delivery complications are examined in subsequent risk factor analyses. Note that not all variables analyzed are presented in this project report.
- From Demographics to Risk Factor Analysis
- Having established the baseline characteristics of our study population, we now examine how various maternal and pregnancy-related factors are associated with congenital hearing loss through comprehensive risk factor analysis.

### `RiskFactorsSection.jsx`
- Risk Factor Landscape
- Exploring the prevalence and impact of various risk factors on hearing loss incidence
- Analysis Focus: This section presents univariate logistic regression results for a selection of risk factors. For the main narrative of this report, only gestational diabetes will be retained as the primary exposure variable in subsequent multivariable analyses.
- Key Finding: Multiple risk factors documented in the literature demonstrated significant associations with congenital hearing loss in our cohort. While several diabetes subtypes, including gestational diabetes, exhibited modest odds ratios (OR > 1), these preliminary univariate associations require multivariable adjustment to account for potential confounding and establish independent effects.
- Hearing Loss Rates by Risk Factor
- Clinical Context: Strong vs. Modifiable Risk Factors
- The strongest univariate associations—craniofacial abnormalities (OR=82.8), syndromic conditions (OR=53.5), and family history (OR=14.4)—represent well-established, largely non-modifiable risk factors... In contrast, gestational diabetes, despite its modest univariate odds ratio (OR=1.19), represents a potentially preventable maternal condition...
- From Broad Risk Factor Screening to Focused Analysis
- Having examined multiple risk factors in isolation, we now turn our attention to gestational diabetes—our primary predictor of interest...

### `ComparisonSection.jsx`
- Group Comparison Analysis
- Comparing hearing loss rates between gestational diabetes and non-diabetes groups
- Bivariate Statistical Analysis: This section examines the direct relationship between gestational diabetes and hearing loss through bivariate statistical testing...
- Key Finding: There is no statistically significant difference in hearing loss rates between gestational diabetes (0.330%) and no diabetes (0.320%) groups (p = 0.345).
- Hearing Loss Rate Comparison
- Group Comparison
- Statistical Conclusion: No Association
- Study Context: Hearing loss affects approximately 3.2 per 1,000 births in the general population. Both groups show rates consistent with this baseline...
- From Simple Comparison to Comprehensive Statistical Modeling
- While this bivariate comparison found no significant difference (p = 0.345), this null finding does not necessarily mean gestational diabetes has no effect...

### `ForestPlotSection.jsx`
- The Complete Picture: Multivariable Analysis
- Adjusted odds ratios accounting for confounding variables and their interactions
- Multivariable Logistic Regression Approach: We employ multivariable logistic regression to control for potential confounding variables...
- Key Finding: After controlling for all significant risk factors in a multivariable model, gestational diabetes shows no independent association with hearing loss (adjusted OR = 1.093, p = 0.348).
- Forest Plot: Adjusted Odds Ratios
- Adjusted Analysis: Primary Finding and Clinical Context
- Primary Finding: Gestational diabetes (OR = 1.093, p = 0.348) shows no independent association with hearing loss after adjusting...
- Significant Risk Factors: 11 factors showed significant associations...
- Clinical Implications: These results suggest that gestational diabetes management protocols do not need specific hearing screening modifications...
- From Forest Plot to Model Statistics
- Having visualized the adjusted odds ratios and their confidence intervals, we now examine the detailed statistical model performance metrics...

### `ModelStatisticsSection.jsx`
- Model Diagnostics & Validation
- Comprehensive evaluation of model performance, calibration, and clinical utility
- Understanding Model Validation: After building our multivariable logistic regression model, we need to validate that it's reliable and performs well...
- Key Finding: The final multivariable model shows good calibration (Hosmer-Lemeshow p = 0.131) and moderate discrimination (C-statistic = 0.582), with a low Pseudo R² of 0.024...
- Model Development & Comparison
- Model Diagnostics
- Clinical Interpretation & Study Context
- Study Conclusion: This comprehensive analysis of 328,751 pregnancies demonstrates that gestational diabetes does not independently increase the risk of congenital hearing loss...

---
## `src/components/projects/MelanomaWorkshop`

### `HeroSection.jsx`
- Melanoma Genetic Testing Workshop
- Educational impact evaluation of a professional development workshop for dermatologists
- My Contribution: This analysis evaluates a melanoma genetic testing workshop for 47 dermatologists... I conducted all statistical analyses...
- Disclaimer: This study remains unpublished... 
- Participants: 47
- Skills Improved: 12/12
- Moratorium Awareness: 95.5%
- The workshop succeeded in building capability and motivation, but 95% of implementation barriers were systemic... 

### `MethodsSection.jsx`
- Methodology
- Robust paired pre-post evaluation design
- Study Details
- My Analysis Strategy
- Study Strengths

### `SkillsSection.jsx`
- PRIMARY OUTCOME: Clinical Skills Transformation
- All 12 confidence skills significantly improved (p<0.001*** for all)
- All 12 Skills: Pre vs Post
- Top 3 Skill Improvements
- Interconnected Learning
- What This Means

### `KnowledgeSection.jsx`
- Knowledge Transformation
- Most dramatic change: Insurance moratorium awareness
- PRE-WORKSHOP: 25% aware
- POST-WORKSHOP: 95.5% aware
- What is the 2019 Insurance Moratorium?
- Strategic Importance

### `SatisfactionSection.jsx`
- Workshop Satisfaction
- High satisfaction, but an implementation gap emerges
- Overall Satisfaction: 9.0/10
- Satisfaction Predicts Learning: r = 0.50
- Implementation Confidence: 7.3/10
- The Gap: ~30%
- The Implementation Gap
- Strategic Interpretation

### `BarriersSection.jsx`
- Implementation Barriers: The Paradox
- 95% of barriers are systemic, not educational
- The Implementation Paradox
- Q10: Barriers to Implementation (Thematic Analysis)
- Word Frequency Validation
- Sample Responses (Q10)
- COM-B Framework Interpretation
- Q12: Proposed Solution

### `RecommendationsSection.jsx`
- Recommendations & Future Directions
- From Education to Systemic Change
- Key Recommendations
- Future Research Directions
- Final Thoughts

---

---

## Infinite Loop Banner Brainstorm (SkillsBanner.jsx)

This section is for brainstorming additional content for the scrolling skills banner to make it more dynamic and comprehensive.

### Current Content Categories:
- Genetic Counseling
- Programming
- Statistics
- Research

### Brainstormed Ideas for Additional Content:

#### 1. More Specific Tools & Technologies:
*   **Frontend:** `HTML5`, `CSS3`, `Vite`, `Framer Motion`, `GSAP`
*   **3D/Graphics:** `Blender`, `WebGL`, `GLSL`
*   **Data Science/ML:** `Pandas`, `NumPy`, `Scikit-learn`, `TensorFlow`, `PyTorch`, `Jupyter`
*   **Backend:** `Node.js`, `Express.js`, `Flask`, `FastAPI`
*   **Databases:** `SQL`, `PostgreSQL`, `MongoDB`
*   **DevOps/Cloud:** `Git`, `GitHub`, `Docker`, `Vercel`, `AWS`
*   **Bioinformatics Tools:** `GATK`, `Samtools`, `PLINK`, `Bioconductor`

#### 2. Broader Concepts & Methodologies:
*   **Software Development:** `Agile`, `Scrum`, `CI/CD`, `TDD (Test-Driven Development)`
*   **Design:** `UI/UX Design`, `Data Storytelling`, `Responsive Design`
*   **Statistics/Modeling:** `Logistic Regression`, `Machine Learning`, `Bayesian Statistics`, `Time Series Analysis`
*   **Genetics Concepts:** `Population Genetics`, `Epigenetics`, `Transcriptomics`, `Proteomics`

#### 3. Project-Related Keywords:
*   `Melanoma Genetics`
*   `Congenital Hearing Loss`
*   `Gestational Diabetes`
*   `Polygenic Risk Scores (PRS)`
*   `Clinical Decision Support`
*   `Interactive Data Visualization`

#### 4. Personal & Creative Interests (to add a human touch):
*   `Scientific Storytelling`
*   `Creative Coding`
*   `3D Art`
*   `Molecular Animation`
*   `Open Source Contribution`

### Implementation Notes:
- We could potentially color-code the pills by category to make the banner more visually interesting.
- We could also consider adding icons next to some of the skills (e.g., the React logo).
- The new items should be integrated into the existing categories or new categories should be created.

---

## Academic Journey - Review (Gemini organizing Jesus' thoughts)

This section is divided into two parts:
1.  **Design & Logic:** A list of specific visual and functional issues for Claude to address.
2.  **Content & Narrative:** My reflections on the story of each milestone, with questions to help Jesus expand the content.

---

### 1. Design & Logic (Instructions for Claude)

Here are the specific items that need to be addressed in the "Academic Journey" section:

*   **Task 1: Adjust the "Academic Journey" Title Block**
    *   **Observation:** The main title ("Academic Journey"), subtitle ("From Biotechnology to Bioinformatics"), and the introductory paragraph currently feel disconnected and too small, especially when placed next to the first university card. It appears too high and doesn't have enough visual weight.
    *   **Request:** Please propose and implement CSS adjustments to give this introductory block more presence. Consider increasing the font sizes, adjusting the margins/padding, or changing the layout to make it feel more like a proper section header. The goal is to make it visually balanced with the timeline cards.

*   **Task 2: Refine the Expanded Protein Modal Style (Light Mode)**
    *   **Observation:** In light mode, when a protein card is clicked and the modal view opens, the background is a bit bland. There also appears to be a strange white stroke or outline around the 3D model.
    *   **Request:** Please suggest a more appealing background color for the modal in light mode. Also, investigate the cause of the white stroke around the protein model and remove it. The goal is to make the protein "pop" more and look cleaner.

*   **Task 3: Fix the Protein Model Rotation Controls**
    *   **Observation:** The orbit controls for the protein models are behaving differently from the main DNA helix on the hero page. When the user clicks and drags to the right, the protein model rotates to the left (and vice-versa). This is counter-intuitive and inconsistent.
    *   **Request:** Please examine the implementation of the `OrbitControls` for the protein models in `src/components/about/About.jsx`. Identify why the rotation is inverted and correct it. The rotation should be natural and consistent with the DNA helix: dragging right should rotate the model to the right.

*   **Task 4: Calibrate Protein Zoom Levels**
    *   **Observation:** There's a mismatch in the zoom levels for the proteins. They appear too small and distant when viewed in their cards on the timeline. When the modal is opened, they are often too large, causing parts of the model to be clipped off-screen.
    *   **Request:** Please adjust the camera settings for each protein model. You will likely need to find the right `camera` position and `zoom` level in two places:
        1.  The initial card view within the timeline.
        2.  The expanded modal view.
    *   The goal is to have each protein well-framed and centered in both views, providing a good preview in the card and a complete, detailed view in the modal without clipping.

---

### 2. Content & Narrative (Gemini's Reflections for Jesus)

Here are some reflections and questions on each milestone to help you brainstorm and enrich the narrative.

*   **Milestone 1: Universidad Europea de Madrid**
    *   **Reflection:** This section does a great job of setting the stage. It establishes the "quantitative thinking" foundation. The phrase "learning not just to memorize facts, but to understand biological and physical mechanisms as systems" is very strong.
    *   **Questions to consider:**
        *   Was there a specific "aha!" moment or a particularly challenging course (like thermodynamics or advanced math) that solidified this new way of thinking for you?
        *   You mention modeling and predicting systems. Can you give a small, concrete example of what that looked like for a student? (e.g., "I remember trying to model enzyme kinetics in a spreadsheet...")

*   **Milestone 2: University of Queensland**
    *   **Reflection:** The theme of "raising the bar" and the struggle with programming comes through clearly. It feels honest and relatable. The transition from "collecting knowledge" to "applying knowledge" is a key insight.
    *   **Questions to consider:**
        *   You say you "struggled through many assignments." Could you briefly mention one? (e.g., "My first bioinformatics script to parse a FASTA file was a mess, but when it finally worked...") This adds a great "show, don't tell" element.
        *   Who was one of the researchers that inspired you? You don't have to name them, but what did they do that was so different?

*   **Milestone 3: University of Technology Sydney**
    *   **Reflection:** This is a powerful pivot in the story, moving from the purely technical to the "human side of genomics." The mention of specific counseling frameworks (narrative therapy, etc.) adds a lot of credibility.
    *   **Questions to consider:**
        *   What was the most surprising or challenging thing you learned from a patient interaction during your clinical placements?
        *   How did learning to "translate" complex genetics for families change how you approached your own technical work? Did it make you think differently about data visualization or communication?

*   **Milestone 4: IGM Team**
    *   **Reflection:** This is the perfect "origin story" for your current career path. The coffee meeting with your mentor is a fantastic narrative anchor. It clearly shows the moment theory turned into practice.
    *   **Questions to consider:**
        *   You say you "built tools and workflows." Can you give a non-technical name to one of them? (e.g., "I developed a 'Variant Report Summarizer' that...")
        *   What was it like to present your findings at a conference for the first time? What did that feel like?

*   **Milestone 5: Lanzarote & Beyond**
    *   **Reflection:** This is a very mature and self-aware reflection. Admitting the startup wasn't ready and pivoting to skill-building is a sign of strength. It frames the present not as a failure, but as a strategic preparation phase.
    *   **Questions to consider:**
        *   What is the core idea of the "application to communicate complex genetic variants" that you still believe in? What problem were you trying to solve?
        *   You're "deepening your technical skills." What's one new thing you've learned recently that you're excited about? (e.g., "I've been diving into Framer Motion to create more fluid data visualizations...")

---

### 3. Claude's Technical Analysis (2025-11-20)

#### Response to Gemini's Design & Logic Tasks

**Task 1: Academic Journey Title Block**
- **Agreement:** The intro block does feel undersized compared to the timeline cards. Looking at `AcademicJourney.jsx:451-456`, the title uses `timeline-intro-title` class and is positioned absolutely on desktop.
- **Technical approach:**
  - Increase font sizes: title from current size to ~2.5rem, subtitle to ~1.2rem
  - Add more vertical spacing (padding/margin) to create breathing room
  - Consider adding a subtle background or border to make it feel more like a "section entrance"
  - On mobile, it's already positioned relatively with good margins, so focus on desktop improvements
- **CSS file:** Changes would go in `src/styles/AcademicJourney.css` targeting `.timeline-intro-title`, `.timeline-intro-subtitle`, `.timeline-intro-description`

**Task 2: Modal Style in Light Mode**
- **Agreement:** Looking at `About.jsx:254` and `AcademicJourney.jsx:229`, the light mode uses `rgba(255, 255, 255, 0.35)` which is quite transparent and might feel washed out.
- **White stroke investigation:** This is likely coming from:
  1. The `border: '1px solid rgba(255, 255, 255, 0.4)'` on line 255 (About.jsx) / 230 (AcademicJourney.jsx)
  2. Or potentially from the ProteinViewer canvas renderer itself
- **Recommendations:**
  - Try a warmer light mode background: `rgba(250, 248, 246, 0.45)` or a subtle cream tone
  - Reduce or remove the white border in light mode, replace with a subtle gray: `1px solid rgba(0, 0, 0, 0.1)`
  - Check `ProteinViewer.jsx` for any canvas edge styling that might be creating the stroke

**Task 3: Inverted Rotation Controls**
- **ROOT CAUSE FOUND:** Comparing `DNAHelixScene.jsx:8` with `ProteinViewer.jsx:87-99`:
  - **DNA Helix:** Uses bare `<OrbitControls />` with ALL DEFAULT settings
  - **Protein Viewer:** Uses heavily configured OrbitControls with custom `rotateSpeed={0.4}`
- **The issue:** The configured `rotateSpeed` or other OrbitControls settings might be creating the inverted behavior
- **Why it happens:** OrbitControls default behavior uses right-hand coordinate system. Custom camera positioning or model orientation can invert perceived rotation direction
- **Solution options:**
  1. **Match DNA behavior:** Remove all custom OrbitControls props, use `<OrbitControls />` just like DNA helix
  2. **Invert rotateSpeed:** Try `rotateSpeed={-0.4}` to flip rotation direction
  3. **Check camera position:** Verify camera isn't on opposite side of model compared to DNA helix
- **Quick test:** In `ProteinViewer.jsx:93`, change `rotateSpeed={0.4}` to `rotateSpeed={-0.4}` and test
- **Recommended fix:** Start by matching DNA's simple `<OrbitControls />` setup, then add back only necessary custom props

**Task 4: Zoom Level Calibration**
- **Current setup analysis:**
  Looking at `AcademicJourney.jsx:15-121`, each protein has different `position`, `scale`, and `cameraZ` values:
  - Histone H1: `position={[0, 0, -15]}`, `scale={[0.9, 0.9, 0.9]}`, `cameraZ={15}`
  - GFP: `position={[0, 0, -35]}`, `scale={[0.9, 0.9, 0.9]}`, `cameraZ={15}`
  - BRCA1: `position={[0.6, -0.2, -45]}`, `scale={[0.9, 0.9, 0.9]}`, `cameraZ={15}`
  - Cas9: `position={[0, -0.1, -120]}`, `scale={[1.1, 1.1, 1.1]}`, `cameraZ={15}`
  - RNA Pol II: `position={[0, 5, -75]}`, `scale={[0.6, 0.6, 0.6]}`, `cameraZ={20}`
- **Problem identification:**
  - The `position[2]` (z-axis) values are wildly inconsistent: -15, -35, -45, -120, -75
  - This suggests each protein model has different bounding box sizes
  - The `expanded={true}` prop is passed to modal view (line 287) but might not be adjusting camera appropriately
- **Solution approach:**
  1. In ProteinViewer, add logic to calculate bounding box of each model and auto-adjust camera distance
  2. OR manually test and set optimal z-position for each protein in both card and modal views
  3. Add different scale values for `expanded={false}` (card) vs `expanded={true}` (modal)
  4. Consider using Three.js `camera.lookAt()` and automatic framing based on bounding sphere

**Additional observations:**
- Both `About.jsx` and `AcademicJourney.jsx` contain identical content - this is code duplication. Consider consolidating.
- The modal uses `ReactDOM.createPortal` which is good for avoiding z-index stacking issues
- Mobile vs desktop handling is well-implemented with the `isMobile` state

#### Recommendations for Implementation Order

1. **Start with Task 3 (rotation controls)** - This is likely a simple sign flip or config fix
2. **Then Task 4 (zoom calibration)** - This requires testing each protein individually
3. **Then Task 2 (modal styling)** - Quick CSS changes once rotation/zoom are working
4. **Finally Task 1 (title block)** - Polish/refinement

Would you like me to start implementing any of these fixes?

---

### 4. Deep Rotation Analysis: DNA vs Proteins (2025-11-20)

After completing styling fixes, investigated why rotation is still inverted despite simplifying OrbitControls.

#### Key Architectural Differences

**DNA Helix Setup (`DNA.jsx` + `DNAHelixScene.jsx`):**
```javascript
// DNA.jsx - Component
- Loads GLB: useGLTF(DNA_URL)
- Returns: <primitive ref={group} object={scene} {...props} />
- NO OrbitControls in component
- Has manual rotation: group.current.rotation.z = Math.PI / 2 (mobile)
- Camera: position={[0, -2, -60]} (desktop), fov: 45

// DNAHelixScene.jsx - Scene wrapper
- OrbitControls: <OrbitControls /> (NO props, all defaults)
- Conditional: !isSpinning ? <OrbitControls /> : null
```

**Protein Viewer Setup (`ProteinViewer.jsx`):**
```javascript
// ProteinViewer - Component AND Scene
- Loads GLB: useGLTF(path)
- Returns: <primitive ref={ref} object={scene} position={position} scale={scale} />
- OrbitControls: INSIDE Canvas, only when expanded={true}
- Has auto-rotation when NOT expanded: ref.current.rotation.y += 0.003
- Camera: position={[0, 0, adjustedCameraZ]} (dynamic based on cameraZ prop)
```

#### Critical Findings

1. **Camera Position Difference:**
   - DNA: Camera at `[0, -2, -60]` (offset on Y-axis, far on Z)
   - Proteins: Camera at `[0, 0, 18-25]` (centered, closer)
   - **Impact:** OrbitControls rotation direction is relative to camera position. Different camera positions can make the same drag motion appear inverted.

2. **OrbitControls Placement:**
   - DNA: OrbitControls in parent scene, controls the entire view
   - Proteins: OrbitControls inside protein component, controls within modal
   - **Impact:** Might have different target/reference points

3. **GLB File Coordinate Systems:**
   - DNA GLB: `Metallic_1BNA_3.0.glb` - may have specific orientation
   - Protein GLBs: 5 different files (histoneH1, GFP, brca1, Cas9, RNApol2)
   - **Critical Question:** Were proteins exported from Blender with different Up-axis or coordinate system?
   - **Common Issue:** Blender uses Z-up, Three.js often assumes Y-up

4. **Auto-rotation Direction:**
   - Proteins: `rotation.y += 0.003` (positive Y rotation)
   - This rotates counter-clockwise when viewed from above
   - **Question:** Does this match the expected OrbitControls direction?

#### Potential Root Causes

**Theory 1: Camera Y-offset** ✓ Most Likely
- DNA camera has Y offset: `[0, -2, -60]`
- Proteins camera centered: `[0, 0, Z]`
- OrbitControls uses camera up-vector and position to determine rotation axes
- **Test:** Try setting protein camera to `[0, -2, adjustedCameraZ]` to match DNA

**Theory 2: GLB Export Settings** ✓ Possible
- Blender export settings might have different coordinate systems
- Check if protein GLBs need rotation correction like DNA's mobile rotation
- **Test:** Add initial rotation to protein models: `rotation.x = Math.PI` or similar

**Theory 3: OrbitControls Target** ⚠️ Less Likely
- OrbitControls might have different targets/centers
- **Test:** Explicitly set OrbitControls target: `<OrbitControls target={[0, 0, 0]} />`

#### Recommended Investigation Steps

1. **Test Camera Position Match:**
   ```javascript
   // In ProteinViewer.jsx, change:
   camera={{ position: [0, 0, adjustedCameraZ] }}
   // To:
   camera={{ position: [0, -2, adjustedCameraZ] }}
   ```

2. **Check GLB Orientation in Blender:**
   - Open protein GLB files in Blender
   - Check export settings (Y-up vs Z-up, forward axis)
   - Compare with DNA GLB orientation
   - Look for any pre-applied rotations on root objects

3. **Test Explicit OrbitControls Configuration:**
   ```javascript
   <OrbitControls
     target={[0, 0, 0]}
     up={[0, 1, 0]}  // Y-up
   />
   ```

4. **Test Model Rotation Correction:**
   ```javascript
   // In ProteinModel component, try:
   <primitive
     ref={ref}
     object={scene}
     position={position}
     scale={scale}
     rotation={[0, Math.PI, 0]}  // Test 180° Y rotation
   />
   ```

#### Next Steps

⚠️ **User needs to check Blender export settings for protein GLB files**
- Export axis settings (Y-up vs Z-up)
- Forward axis
- Apply transforms before export
- Compare with DNA GLB settings

🔧 **Quick code test:** Try camera position match first (easiest to test)

---
## Histone H1 Content Brainstorm

This section is for brainstorming the narrative and interactive elements for the Histone H1 protein card in the "Academic Journey" section.

### User Goals:
- Make the content shorter and more direct.
- Focus on skills gained, not just the story.
- Refine the metaphor for the histone's function.
- Add interactivity: toggle a molecular surface to see how specific amino acids fit inside.
- Talk about a specific, common amino acid and its role.

### Brainstorm Ideas & Drafts:

#### 1. Revised Metaphor:
*   **From:** "Histone H1 packages DNA..." (very technical).
*   **To (more evocative):** "Histones are the genome's librarians, deciding which chapters of our DNA are read and which remain shelved. This is where I learned to read the library."
*   **Alternative:** "If DNA is the book of life, histones are the clips and bookmarks that keep it organized. My journey began by learning how to unclip the stories."

#### 2. Shorter, Skills-Focused Text:
*   **Current "What I Did":** A long paragraph about foundational courses.
*   **Proposed "What I Learned" (more direct):**
    > I learned to see biology as a system of rules—in thermodynamics, genetics, and molecular mechanics. This wasn't about memorizing facts; it was about building a quantitative framework to model and predict how life works.
*   **Skills Gained (new, explicit section):**
    *   Quantitative Biological Modeling
    *   First-Principles Thinking
    *   Scientific Literature Analysis
    *   Laboratory Fundamentals

#### 3. Interactive Element - Surface Toggle & Amino Acid Highlight:
*   **Concept:** The user can click a button on the modal to toggle the visibility of the histone's molecular surface. When the surface is on, it could be semi-transparent. When it's off, specific amino acid residues (e.g., Lysine) become highlighted.
*   **Narrative Integration:**
    > The surface of the histone is studded with positively-charged amino acids, like **Lysine**. These act as molecular magnets for the negatively-charged DNA backbone.
    >
    > **[Toggle Surface]** - Click to see how these Lysine residues are positioned to grip the DNA.
*   **Technical Implementation Notes:**
    *   We'll need to create two versions of the histone model or have a way to selectively show/hide the surface and highlight residues in the `ProteinViewer.jsx` component.
    *   This will likely require adding a new state variable (e.g., `isSurfaceVisible`) and a button to the modal.
    *   The specific amino acids to highlight would need to be identified and perhaps colored differently in the model itself or selected programmatically if the GLB structure allows.

#### 4. Combining It All - A Draft for the Modal:

*   **Title:** Universidad Europea de Madrid
*   **Years:** 2016–2019
*   **Description:** Building a quantitative foundation in biology.
*   **Narrative:**
    > This is where I learned to shelve the genome with intention. If DNA is the book of life, histones are the clips that keep it organized, and my journey began by learning how to decide which chapters stayed open. I learned to think quantitatively about biology, modeling the systems that underpin life.
*   **Interactive Element:**
    > Histone H1 uses positively-charged amino acids (like **Lysine**) to grip the negatively-charged DNA, controlling which genes are expressed.
    >
    > **[Button: Toggle Molecular Surface]**
    > * Surface ON: feel the electrostatic cage wrapping DNA.
    > * Surface OFF: spot the lysine hooks poised for epigenetic negotiation.
    >
    > *Click the button to see how these key residues are positioned on the protein's core structure.*
*   **Skills Gained:**
    *   Quantitative Biological Modeling — turning thermodynamics into intuition
    *   First-Principles Thinking — reducing complex pathways to core rules
    *   Scientific Literature Analysis — distilling dense protein papers into design briefs
