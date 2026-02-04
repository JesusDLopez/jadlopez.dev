# 🧬 Portfolio Master Overview

**Last Updated:** January 13, 2026
**Version:** 1.0.0
**Live Site:** [jadlopez.dev](https://jadlopez.dev)
**Repository:** [github.com/JesusDLopez/portfolio-kodas](https://github.com/JesusDLopez/portfolio-kodas)

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| **Total Lines of Code** | ~16,000 |
| **JavaScript/JSX Files** | 91 |
| **CSS Files** | 39 |
| **Main Sections** | 7 (Hero, About, Academic Journey, Work, Blog, Contact, Footer) |
| **Scientific Reports** | 2 (Hearing Loss, Melanoma Workshop) |
| **3D Protein Models** | 5 GLB files |
| **Build Tool** | Vite 6.2.0 |
| **React Version** | 19.0.0 |

---

## 🎯 Project Purpose

An interactive bioinformatics portfolio showcasing the intersection of genetics, data science, and web development. Features immersive 3D visualizations, scientific data reports, and animated storytelling to demonstrate technical expertise in both biology and programming.

### Target Audience
- **Recruiters** - Quick understanding of skills and projects
- **Collaborators** - Technical documentation for contributions
- **Future Self** - Reference for maintenance and updates

---

## 🏗️ Architecture Overview

### Tech Stack

#### Core Framework
- **React 19.0.0** - Latest React with modern hooks and concurrent features
- **Vite 6.2.0** - Fast build tool with HMR
- **React Router DOM 7.6.0** - Client-side routing with lazy loading

#### 3D Graphics & Animation
- **Three.js 0.176.0** - WebGL 3D graphics engine
- **@react-three/fiber 9.1.2** - React renderer for Three.js
- **@react-three/drei 10.0.7** - Useful Three.js helpers
- **Framer Motion 12.18.1** - React animation library
- **GSAP 3.13.0** - Professional-grade animation

#### Data Visualization
- **D3.js 7.9.0** - Data-driven documents for charts and graphs

#### Utilities
- **react-icons 5.5.0** - Icon library
- **buffer 6.0.3** - Node.js buffer for browser

### Project Structure

```
react-card/
├── src/
│   ├── components/          # All React components
│   │   ├── hero/           # Landing section with DNA helix
│   │   ├── about/          # Hola intro + Skills Banner
│   │   ├── work/           # Cell/organelle visualization
│   │   ├── blog/           # Blog posts with auto-discovery
│   │   ├── projects/       # Scientific report components
│   │   │   ├── HearingLoss/
│   │   │   ├── MelanomaWorkshop/
│   │   │   ├── common/     # Shared report components
│   │   │   └── reports-core/
│   │   ├── common/         # Shared UI components
│   │   └── debug/          # Development tools
│   ├── styles/             # Global CSS (lowercase)
│   ├── Styles/             # Component CSS (capitalized - to be reorganized)
│   ├── contexts/           # React contexts (Theme)
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Static data files
│   ├── posts/              # Blog post content
│   ├── assets/             # 3D models, images, icons
│   ├── App.jsx             # Main app component
│   ├── Layout.jsx          # Layout wrapper
│   └── main.jsx            # Entry point
├── public/                 # Static assets
│   ├── data/               # JSON data for reports
│   └── Posts Images/       # Blog post images
├── docs/                   # Documentation
│   ├── architecture/       # System architecture docs
│   ├── sections/           # Section-specific docs
│   ├── components/         # Component docs
│   ├── styling/            # CSS and theme docs
│   ├── guides/             # How-to guides
│   └── mobile/             # Mobile audit docs
├── index.html
├── package.json
├── vite.config.js
└── vercel.json             # Deployment config
```

---

## 🎨 Main Sections

### 1. Hero Section
**Component:** `src/components/hero/Hero.jsx`
**Features:**
- Interactive 3D DNA double helix (Three.js)
- Scroll-triggered animations
- "Inspect DNA" mode with nucleotide details
- Responsive camera positioning for mobile
- Scroll locking during interactions

**Key Technologies:** React Three Fiber, GSAP, Framer Motion

[→ Detailed Documentation](./sections/HERO-SECTION.md) *(coming soon)*

---

### 2. About Section (Hola + Skills Banner)
**Components:**
- `src/components/about/AboutIntroMerged.jsx`
- `src/components/about/AboutIntro.jsx` (Hola narrative)
- `src/components/SkillsBannerGlass.jsx` (skills marquee)

**Features:**
- Animated "¡Hola!" introduction with rotating specialties
- Infinite-scroll skills banner with theme-aware gradients
- Responsive typography and spacing
- Mobile-optimized layout

**Key Technologies:** Framer Motion, CSS animations, theme system

[→ Detailed Documentation](./sections/ABOUT-SECTION.md) *(coming soon)*

---

### 3. Academic Journey Section
**Component:** `src/components/about/AcademicJourney.jsx` (1469 lines - most complex)
**Features:**
- Interactive timeline with protein 3D models
- 5 career cards with expandable modals
- Protein viewer with interactive controls (lysines, surface, chromophore toggles)
- Scientific text with color-coded structural terms
- Desktop: sticky timeline with animations
- Mobile: vertical stack with year badges

**3D Protein Models:**
1. Histone H1 (21 kDa) - DNA packaging
2. GFP (27 kDa) - Green fluorescent protein
3. BRCA1 (cancer research)
4. Cas9 (CRISPR gene editing)
5. RNA Polymerase II (500 kDa) - Transcription

**Key Technologies:** React Three Fiber, GLB models, ReactDOM.createPortal (modals), Framer Motion

[→ Detailed Documentation](./sections/ACADEMIC-JOURNEY.md) *(coming soon)*

---

### 4. Work Section (Cell Visualization)
**Component:** `src/components/work/WorkSection.jsx`
**Features:**
- Cell membrane metaphor with organelles as projects
- Physics-based organelle interactions
- Breathing membrane animation
- Expandable project cards
- Mobile-optimized physics parameters

**Projects Visualized:**
1. Melanoma Genetics Workshop (education)
2. Hearing Loss Study (research)
3. Automated PRS Booklet Tool (automation)
4. Clinical Calculator (coming soon)

**Key Technologies:** Custom physics engine, Canvas API, GSAP

[→ Detailed Documentation](./sections/WORK-SECTION.md) *(coming soon)*

---

### 5. Blog Section
**Component:** `src/components/blog/BlogSection.jsx`
**Features:**
- Auto-discovery system using `import.meta.glob`
- Featured post highlighting
- Placeholder cards for coming soon posts
- Dynamic routing to individual posts

**Posts:**
- AI Meets Genetics
- Code to Kinase
- Masters Origin Story
- Scroll Systems (design deep-dive)

**Key Technologies:** Vite glob imports, React Router, MDX (planned)

[→ Detailed Documentation](./sections/BLOG-SECTION.md) *(coming soon)*

---

### 6. Contact Section
**Component:** `src/components/Contact.jsx`
**Features:**
- Contact form (Formspree integration - to be implemented)
- Expandable "What I Do" section with nucleotide-coded capabilities
- Social links (GitHub, email, Twitter)
- Animated signature

**Key Technologies:** React hooks, Framer Motion

[→ Detailed Documentation](./sections/CONTACT-SECTION.md) *(coming soon)*

---

### 7. Scientific Reports (Lazy Loaded)

#### Hearing Loss & Diabetes Study
**Route:** `/projects/hearing-loss-diabetes`
**Component:** `src/components/projects/HearingLoss/`

**Features:**
- Statistical analysis of 328,000 patient records
- D3.js data visualizations (forest plot, demographics, risk factors)
- Interactive flip cards for methodology
- Mobile-responsive charts
- Theme-aware color scales

**Data:** JSON files in `public/data/hearing-loss/`

[→ Detailed Documentation](./guides/BUILDING-REPORTS-FRAMEWORK.md)

---

#### Melanoma Workshop Evaluation
**Route:** `/projects/melanoma-workshop`
**Component:** `src/components/projects/MelanomaWorkshop/`

**Features:**
- Pre/post workshop analysis
- Knowledge change metrics
- Qualitative response visualization
- Statistical testing results
- Interactive donut charts and bar charts

**Data:** JSON files in `public/data/melanoma-workshop/`

[→ Detailed Documentation](./guides/BUILDING-REPORTS-FRAMEWORK.md)

---

## 🎨 Design System

### Theme System
**Implementation:** `src/contexts/ThemeContext.jsx`

- **Dark Mode** (default): Charcoal background, cyan/teal accents, neon highlights
- **Light Mode**: Off-white background, warm orange/pink gradients, clean borders
- **Persistence**: localStorage
- **Switching:** Body class toggle (`dark-theme` / `light-theme`)
- **CSS Variables:** Defined in `src/styles/index.css` (`:root` and `body.light-theme`)

### Color Palette

#### Dark Mode
- Background: `#0b0b0b` (charcoal)
- Primary: `#06b6d4` (cyan)
- Secondary: `#14b8a6` (teal)
- Text: `#ffffff`, `rgba(255,255,255,0.9)`
- Gradients: Cyan → Blue → Teal

#### Light Mode
- Background: `#f8fafc` (off-white)
- Primary: `#ff6b35` (orange)
- Secondary: `#e91e63` (pink)
- Text: `#1f2937`, `#374151`
- Gradients: Orange → Pink → Red

### Typography
- **Headings:** Inter (sans-serif) - weights 300, 400, 500, 600
- **Body:** IBM Plex Sans
- **Monospace:** JetBrains Mono (for code/debug)
- **Narrative Text:** IBM Plex Serif (About section)

### Responsive Breakpoints
- **Mobile:** ≤768px
- **Desktop:** >768px
- **Detection:** `window.innerWidth` checks in components
- **CSS:** Media queries at 768px

[→ Detailed Documentation](./styling/THEME-SYSTEM.md) *(coming soon)*

---

## 🔄 State Management

### Global State
- **ThemeContext** - Dark/light mode toggle
  - Provider: `ThemeProvider` in App.jsx
  - Consumer: `useTheme()` custom hook

### Local State
- Component-level `useState` for UI interactions
- `useEffect` for lifecycle management
- Scroll position tracking (Hero section)
- Modal open/close states (Academic Journey)

### Data Loading
- Report data: Loaded via `fetch` in DataContext components
- Blog posts: Auto-discovered via Vite `import.meta.glob`
- 3D models: Lazy loaded with React Suspense

[→ Detailed Documentation](./architecture/STATE-MANAGEMENT.md) *(coming soon)*

---

## 🚀 Routing

### Route Structure
```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="projects/hearing-loss-diabetes" element={<HearingLossReport />} />
    <Route path="projects/melanoma-workshop" element={<MelanomaWorkshopReport />} />
    <Route path="blog/:slug" element={<BlogPostPage />} />
  </Route>
</Routes>
```

### Lazy Loading
Scientific reports are lazy loaded to reduce initial bundle size:

```jsx
const HearingLossReport = lazy(() => import("./components/projects/HearingLoss"));
const MelanomaWorkshopReport = lazy(() => import("./components/projects/MelanomaWorkshop"));
```

Wrapped in `<Suspense fallback={null}>` for loading states.

[→ Detailed Documentation](./architecture/ROUTING.md) *(coming soon)*

---

## 🎬 Animation Strategy

### Framer Motion
- **Viewport triggers:** `whileInView` for section entry animations
- **Viewport options:** `once: true` to prevent re-triggering
- **Stagger children:** For timeline cards and organelles
- **Modal animations:** Scale and opacity transitions

### GSAP
- **Timeline animations:** Academic Journey timeline
- **Scroll-linked:** Hero section DNA interactions
- **Color transitions:** Shader background color morphing
- **Physics:** Work section organelle movements

### CSS Animations
- **Marquee:** Skills banner infinite scroll
- **Keyframes:** Protein rotation, breathing membrane
- **Transitions:** Button hovers, card expansions

[→ Detailed Documentation](./components/ANIMATION-SYSTEMS.md) *(coming soon)*

---

## 📱 Mobile Responsiveness

### Mobile Strategy
- **Mobile-first CSS:** Media queries at 768px
- **Component-level detection:** `isMobile` state from `window.innerWidth`
- **Touch-optimized:** 44x44px minimum touch targets
- **Performance:** Reduced particle counts, optimized physics
- **Viewport:** Using `100dvh` for reliable mobile coverage

### Recent Mobile Fixes (Jan 13, 2026)
1. **Shader background coverage:** Changed from `100%` to `100dvh` to fix white stripes on iPhone
2. **Scrolling issue:** Changed About section from `overflow: hidden` to `overflow: visible`

### Mobile Audit
**Status:** In progress
[→ Mobile Audit Report](./mobile/MOBILE-AUDIT-REPORT.md) *(coming soon)*

---

## 🏗️ Build & Deployment

### Development
```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build to /dist
npm run preview      # Preview production build
npm run lint         # ESLint check
```

### Deployment
- **Platform:** Vercel
- **Branch:** `main` → Production (jadlopez.dev)
- **Preview:** Every PR gets preview deployment
- **Auto-deploy:** Commits to `main` trigger deployment

### Build Output
- Bundled JavaScript with code splitting
- Optimized assets (images, 3D models)
- CSS extracted and minified
- Source maps in development only

---

## 📚 Documentation Index

### Architecture
- [Architecture Overview](./architecture/ARCHITECTURE.md) *(coming soon)*
- [Routing System](./architecture/ROUTING.md) *(coming soon)*
- [State Management](./architecture/STATE-MANAGEMENT.md) *(coming soon)*
- [Design System Analysis](./architecture/DESIGN_SYSTEM_ANALYSIS.md) ✅
- [Projects Architecture](./architecture/PROJECTS_ARCHITECTURE.md) ✅

### Sections
- [Hero Section](./sections/HERO-SECTION.md) *(coming soon)*
- [About Section](./sections/ABOUT-SECTION.md) *(coming soon)*
- [Academic Journey](./sections/ACADEMIC-JOURNEY.md) *(coming soon)*
- [Work Section](./sections/WORK-SECTION.md) *(coming soon)*
- [Blog Section](./sections/BLOG-SECTION.md) *(coming soon)*
- [Contact Section](./sections/CONTACT-SECTION.md) *(coming soon)*

### Components
- [Three.js Components](./components/THREE-JS-COMPONENTS.md) *(coming soon)*
- [D3 Visualizations](./components/D3-VISUALIZATIONS.md) *(coming soon)*
- [Animation Systems](./components/ANIMATION-SYSTEMS.md) *(coming soon)*
- [Components Catalog](./guides/COMPONENTS.md) ✅

### Styling
- [CSS Organization](./styling/CSS-ORGANIZATION.md) *(coming soon)*
- [Theme System](./styling/THEME-SYSTEM.md) *(coming soon)*
- [Responsive Design](./styling/RESPONSIVE-DESIGN.md) *(coming soon)*

### Guides
- [Portfolio Guide](./guides/PORTFOLIO-GUIDE.md) ✅
- [Adding Projects](./guides/ADDING-PROJECTS.md) ✅
- [Building Reports Framework](./guides/BUILDING-REPORTS-FRAMEWORK.md) ✅

### Mobile
- [Mobile Audit Report](./mobile/MOBILE-AUDIT-REPORT.md) *(coming soon)*

---

## 🔧 Development Workflow

### Git Workflow
- **Main branch:** `main` (production)
- **Feature branches:** `feature/description` or `fix/description`
- **Pull Requests:** Required for merging to main
- **Commit messages:** Conventional commits (`fix:`, `feat:`, `docs:`, `chore:`)

### Testing on Mobile
1. Push changes to GitHub (any branch)
2. Vercel creates preview deployment
3. Test on physical mobile device via preview URL
4. Iterate until fixed
5. Merge to main for production deployment

### File Organization (In Progress)
**Status:** Planning phase
**Goal:** Colocate CSS with components, group by feature
[→ Reorganization Guide](./REORGANIZATION-GUIDE.md) *(coming soon)*

---

## 🐛 Known Issues

### High Priority
- [x] Mobile shader background coverage (Fixed: Jan 13, 2026)
- [x] Mobile scrolling past About section (Fixed: Jan 13, 2026)
- [ ] Skills Banner UX improvements (see SKILLS-BANNER-UX-REVIEW.md)
- [ ] GFP protein surface rendering issues

### Medium Priority
- [ ] Contact form backend integration
- [ ] Blog post MDX support
- [ ] Placeholder project pages
- [ ] Accessibility audit

### Low Priority
- [ ] Performance optimizations
- [ ] Bundle size reduction
- [ ] Service worker for offline support

---

## 📈 Recent Changes

### January 13, 2026
- ✅ Fixed mobile shader background coverage (`100dvh`)
- ✅ Fixed mobile scrolling issue (`overflow: visible`)
- ✅ Added comprehensive MVP roadmap
- ✅ Pushed all changes to GitHub main branch
- ✅ Created master documentation plan

### December 16, 2025
- ✅ Major cleanup and consolidation for MVP
- ✅ Preserved AcademicJourney with scientific content
- ✅ Typography and gradient refinements

### November 6, 2025
- ✅ Typography improvements (Hola section)
- ✅ DNA gradient theme implementation
- ✅ Multiple viewport coverage attempts

---

## 🚦 Next Steps

### Immediate (This Week)
1. ✅ Create MASTER-OVERVIEW.md (this document)
2. ⏳ Create foundation architecture docs
3. ⏳ Begin mobile audit (Hero → About → Academic Journey)
4. ⏳ Document Hero section

### Short-term (Next 2 Weeks)
1. Complete all section documentation
2. Finish mobile audit for all sections
3. Begin file reorganization (CSS colocation)
4. Fix high-priority mobile issues

### Long-term (Next Month)
1. Complete file organization
2. Implement accessibility improvements
3. Optimize performance
4. Create developer onboarding guide

---

## 📞 Contact & Contribution

**Portfolio Owner:** Jesús D. López
**Email:** [your-email]
**GitHub:** [@JesusDLopez](https://github.com/JesusDLopez)
**Live Site:** [jadlopez.dev](https://jadlopez.dev)

### Contributing
This is a personal portfolio, but documentation improvements and bug reports are welcome via GitHub issues.

---

## 📝 Maintenance Notes

**Documentation Review:** Quarterly (April, July, October, January)
**Dependency Updates:** Monthly
**Security Audits:** After major dependency updates
**Performance Audits:** Before major launches

---

*This document serves as the single source of truth for the portfolio project. All other documentation branches from here.*
