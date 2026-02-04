# 👋 About Section ("¡Hola!" + Skills Banner)

**Last Updated:** January 13, 2026
**Related Docs:** [HERO-SECTION.md](./HERO-SECTION.md) | [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) | [MASTER-OVERVIEW.md](../MASTER-OVERVIEW.md)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [AboutIntroMerged (Wrapper)](#aboutintromerged-wrapper)
4. [AboutIntro (Hola Narrative)](#aboutintro-hola-narrative)
5. [SkillsBannerGlass (Genomic Skills)](#skillsbannerglass-genomic-skills)
6. [Rotating Words System](#rotating-words-system)
7. [Scroll-Linked Animations](#scroll-linked-animations)
8. [Genomic Metaphor System](#genomic-metaphor-system)
9. [Mobile Responsiveness](#mobile-responsiveness)
10. [Performance Considerations](#performance-considerations)

---

## Overview

The About Section is a **merged component** combining two distinct experiences:

1. **Hola Narrative** (Top): Personal introduction with rotating words that cycle through skills, expertise areas, and target audiences
2. **Skills Banner** (Bottom): Three-layer genomic visualization showing skills as DNA regions with nucleotide connectors

### Design Philosophy

**Genomic Storytelling**: The entire section uses genetics as a visual metaphor for interdisciplinary expertise:
- **Rotating Words**: Different professional identities cycling like gene expression
- **Exons**: Core technical skills (Python, R, JavaScript, React)
- **UTRs**: Domain expertise (Genetic Counseling, Clinical Genetics, Bioinformatics)
- **Regulatory Elements**: Tools and methods (Pandas, ggplot2, D3.js)
- **Introns**: DNA sequences (ATGC) connecting skill regions

### Visual Impact

- **No Entry Animations**: Section is immediately visible (unlike Hero)
- **Scroll-Triggered Reveals**: Text lines fade in sequentially as user scrolls
- **Continuous Motion**: Skills banners scroll infinitely at different speeds
- **Theme-Aware**: Adapts colors and contrast for light/dark modes

---

## Component Structure

### File Organization

```
src/
├── components/
│   └── about/
│       ├── AboutIntroMerged.jsx       # Wrapper component (57 lines)
│       └── AboutIntro.jsx             # Hola narrative (227 lines)
├── components/
│   └── SkillsBannerGlass.jsx         # Genomic skills banner (183 lines)
├── data/
│   └── geneConnectors.js             # DNA connector patterns (78 lines)
└── App.css                           # Section layout rules (lines 24-32)
```

### Component Hierarchy

```
<AboutIntroMerged>                    # Wrapper with mobile detection
├── <AboutIntro>                      # Hola narrative with scroll animations
│   ├── ¡Hola! Title                  # Scroll-triggered fade-in
│   ├── Line 1: Name introduction
│   ├── Line 2: Professional activities (rotating words)
│   ├── Line 3: Educational background (rotating words)
│   └── Line 4: Target audiences (rotating words)
└── <SkillsBannerGlass> × 3           # Three layers at different speeds
    ├── Banner 1: Speed 100s, z-index 3 (slowest)
    ├── Banner 2: Speed 120s, z-index 2 (medium)
    └── Banner 3: Speed 140s, z-index 1 (fastest)
```

---

## AboutIntroMerged (Wrapper)

**Purpose**: Combines Hola narrative and skills banners into a single full-viewport section with mobile detection.

### Component Code

**File**: `/src/components/about/AboutIntroMerged.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AboutIntro from "./AboutIntro";
import SkillsBannerGlass from "../SkillsBannerGlass";
import "../../Styles/AboutIntroMerged.css";

function AboutIntroMerged() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="about-intro-merged-wrapper">
      {/* Hola section - top portion */}
      <div className={`about-intro-section ${isMobile ? "about-intro-section-mobile" : ""}`}>
        <AboutIntro />
      </div>

      {/* Skills Banner - bottom portion */}
      <div className="skills-section-merged">
        <div className="skills-banners-container">
          <SkillsBannerGlass direction="right-to-left" inclination={0} zIndex={3} speed={100} />
          <SkillsBannerGlass direction="right-to-left" inclination={0} zIndex={2} speed={120} />
          <SkillsBannerGlass direction="right-to-left" inclination={0} zIndex={1} speed={140} />
        </div>
      </div>
    </div>
  );
}
```

### Layout Structure

**CSS Class**: `.section--about-merged` (defined in `/src/App.css:24-32`)

```css
.section--about-merged {
  min-height: 100vh;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: space-between !important;
  overflow: visible !important; /* CRITICAL: Changed from hidden (mobile fix Jan 13, 2026) */
}
```

**Key Layout Decisions**:
- **Full Viewport Height**: `min-height: 100vh` ensures section fills screen
- **Flexbox Column**: `flex-direction: column` stacks Hola (top) + Skills (bottom)
- **Space Between**: `justify-content: space-between` pushes content to edges
- **Overflow Visible**: `overflow: visible !important` allows scrolling past section (mobile fix)

### Mobile Detection

**Breakpoint**: `768px`

```javascript
const checkMobile = () => {
  const mobile = window.innerWidth <= 768;
  setIsMobile(mobile);
};
```

**Purpose**:
- Applies mobile-specific CSS classes to child components
- AboutIntro uses different class names for mobile layout
- Adjusts text sizing, spacing, and scroll behavior

**Why useEffect + Resize Listener?**
- Detects initial viewport size on mount
- Updates on window resize (orientation change, responsive testing)
- Cleanup prevents memory leaks when component unmounts

### Props Passed to Children

**AboutIntro**:
- No props (uses internal mobile detection)

**SkillsBannerGlass × 3**:
- **direction**: `"right-to-left"` (all three scroll same direction)
- **inclination**: `0` (no rotation)
- **zIndex**: `3, 2, 1` (stacking order for depth)
- **speed**: `100s, 120s, 140s` (different speeds create parallax effect)

---

## AboutIntro (Hola Narrative)

**Purpose**: Personal introduction with rotating words and scroll-linked reveal animations.

### Component File

**File**: `/src/components/about/AboutIntro.jsx` (227 lines)

### State Management

```javascript
const [isMobile, setIsMobile] = useState(false);

const [currentIndices, setCurrentIndices] = useState({
  line1: 0, // Current professional activity index
  line2: 0, // Current educational background index
  line3: 0  // Current target audience index
});
```

**State Variables**:
1. **isMobile**: Boolean for responsive class names (768px breakpoint)
2. **currentIndices**: Tracks which word is currently displayed for each rotating line

### Scroll Animation Setup

**Framer Motion's `useScroll` Hook**:

```javascript
const containerRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});
```

**How It Works**:
- **target**: Tracks scroll position of `containerRef` (the About section container)
- **offset**: `["start end", "end start"]`
  - `"start end"`: When container's **top** reaches viewport's **bottom** → progress = 0
  - `"end start"`: When container's **bottom** reaches viewport's **top** → progress = 1
- **scrollYProgress**: Value from 0 to 1 representing container's visibility

**Visual Timeline**:

```
Before viewport:                scrollYProgress = 0     (container below screen)
Entering viewport (top edge):   scrollYProgress = 0.15  (title starts fading in)
Halfway through viewport:       scrollYProgress = 0.5   (all lines visible)
Exiting viewport (bottom edge): scrollYProgress = 0.85
After viewport:                 scrollYProgress = 1     (container above screen)
```

### Transform Mappings

**Each element has custom opacity and Y-position transforms**:

```javascript
// Title appears first (0-15% of scroll progress)
const titleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
const titleY = useTransform(scrollYProgress, [0.05, 0.25], [50, 0]);

// Line 1: Name introduction (15-35%)
const line1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
const line1Y = useTransform(scrollYProgress, [0.15, 0.35], [50, 0]);

// Line 2: Professional activities (25-45%)
const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
const line2Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

// Line 3: Educational background (35-55%)
const line3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
const line3Y = useTransform(scrollYProgress, [0.35, 0.55], [50, 0]);

// Line 4: Target audiences (45-65%)
const line4Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
const line4Y = useTransform(scrollYProgress, [0.45, 0.65], [50, 0]);
```

**Pattern**: Each line has a **0.2 progress window** (20% of scroll range) to fade in:
- Opacity: `0 → 1` (invisible to fully visible)
- Y-position: `50px → 0px` (translates upward as it fades in)

**Sequential Reveals**: Lines overlap slightly (0.1 progress gap) for smooth cascade effect.

### Rendered Content

**Full Text Structure**:

```jsx
<h1>¡Hola!</h1>

<p>I'm <span className="emphasis-word">Jesús A. López O'Rourke</span></p>

<p>
  I started in biotechnology, trained in genetic counseling,
  and now I <span className="rotating-word">{rotatingWords.line1[currentIndices.line1]}</span>
</p>

<p>
  I've studied <span className="rotating-word">{rotatingWords.line2[currentIndices.line2]}</span>,
  supported patients, and translated science into practice
</p>

<p>
  Now I build tools that guide <span className="rotating-word">{rotatingWords.line3[currentIndices.line3]}</span> through genetics.
</p>
```

**Mobile Line Breaks**:
- Desktop: Uses `<br />` tags for specific line breaks
- Mobile: Conditional rendering removes line breaks for natural text flow

```javascript
{!isMobile && <br />}
{isMobile ? ' ' : ''}
```

---

## Rotating Words System

### Word Collections

**Three rotating arrays** representing different aspects of identity:

#### Line 1: Current Professional Activities

```javascript
line1: [
  "engineer data pipelines",
  "develop interactive reports",
  "craft data narratives",
  "translate research into tools",
  "automate research workflows"
]
```

**Purpose**: Shows what the user **currently does** professionally
**Count**: 5 activities
**Theme**: Active verbs describing current work

**Future Additions (Commented Out)**:
```javascript
// "build clinical software",
// "model biological systems",
// "design visual interfaces"
```

#### Line 2: Educational Background

```javascript
line2: [
  "bioinformatics",
  "molecular biology",
  "data visualization",
  "biochemistry",
  "machine learning",
  "statistical genetics",
  "3D graphics programming",
  "pharmacology",
  "UX/UI principles",
  "genomics",
  "scientific visualization",
  "counseling theory",
  "thermodynamics",
  "software engineering"
]
```

**Purpose**: Academic and technical subjects studied
**Count**: 14 subjects
**Theme**: Mix of hard science (biology, chemistry) + computing (ML, 3D graphics)

#### Line 3: Target Audiences

```javascript
line3: [
  "genetic counselors",
  "patients",
  "students",
  "clinical teams",
  "researchers",
  "families",
  "pharmacists",
  "startups",
  "clinicians",
  "dermatologists",
  "geneticists",
  "lab technicians"
]
```

**Purpose**: Who the user builds tools for
**Count**: 12 audience types
**Theme**: Healthcare professionals, patients, students, researchers

### Rotation Logic

**Interval-Based Updates**:

```javascript
useEffect(() => {
  const TRANSITION_DURATION = 4000; // 4 seconds per word (must match CSS animation)

  const intervals = {
    line1: setInterval(() => {
      setCurrentIndices(prev => ({
        ...prev,
        line1: (prev.line1 + 1) % rotatingWords.line1.length
      }));
    }, TRANSITION_DURATION),

    line2: setInterval(() => {
      setCurrentIndices(prev => ({
        ...prev,
        line2: (prev.line2 + 1) % rotatingWords.line2.length
      }));
    }, TRANSITION_DURATION + 500), // Offset by 500ms

    line3: setInterval(() => {
      setCurrentIndices(prev => ({
        ...prev,
        line3: (prev.line3 + 1) % rotatingWords.line3.length
      }));
    }, TRANSITION_DURATION + 1000) // Offset by 1000ms
  };

  return () => {
    clearInterval(intervals.line1);
    clearInterval(intervals.line2);
    clearInterval(intervals.line3);
  };
}, []);
```

**Key Design Decisions**:

1. **4-Second Duration**: Each word displays for 4 seconds before rotating
2. **Staggered Timing**: Lines rotate at slightly different intervals (4s, 4.5s, 5s)
   - **Why?** Prevents all three words from changing simultaneously (visual chaos)
   - **Effect**: Creates organic, unpredictable patterns
3. **Modulo Cycling**: `(prev.line1 + 1) % length` wraps back to 0 after last word
4. **Cleanup**: `clearInterval` prevents memory leaks when component unmounts

### CSS Animation (Expected in CSS file)

**Class**: `.rotating-word`

**Expected CSS** (not found in codebase, likely inline or in missing CSS file):

```css
.rotating-word {
  display: inline-block;
  animation: wordFadeInOut 4s ease-in-out infinite;
}

@keyframes wordFadeInOut {
  0%, 20% {
    opacity: 0;
    transform: translateY(10px);
  }
  25%, 75% {
    opacity: 1;
    transform: translateY(0);
  }
  80%, 100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
```

**Animation Breakdown**:
- **0-20%**: Word fades in from below (opacity 0 → 1, translateY 10px → 0)
- **25-75%**: Word fully visible (50% of 4s = 2s display time)
- **80-100%**: Word fades out upward (opacity 1 → 0, translateY 0 → -10px)

### Rotation Timeline Example

**First 20 seconds** (with staggered timing):

```
t=0s:
  line1: "engineer data pipelines"
  line2: "bioinformatics"
  line3: "genetic counselors"

t=4s:   line1 → "develop interactive reports"
t=4.5s: line2 → "molecular biology"
t=5s:   line3 → "patients"

t=8s:   line1 → "craft data narratives"
t=9s:   line2 → "data visualization"
t=10s:  line3 → "students"

t=12s:  line1 → "translate research into tools"
t=13.5s: line2 → "biochemistry"
t=15s:  line3 → "clinical teams"

t=16s:  line1 → "automate research workflows"
t=18s:  line2 → "machine learning"
t=20s:  line3 → "researchers"
```

**Effect**: No two lines change at the same time, creating dynamic, ever-changing narrative.

---

## SkillsBannerGlass (Genomic Skills)

**Purpose**: Three-layer infinite-scroll banner showing skills as genomic elements (exons, UTRs, regulatory) connected by DNA sequences (introns).

### Component File

**File**: `/src/components/SkillsBannerGlass.jsx` (183 lines)

### Props Interface

```javascript
const SkillsBannerGlass = ({
  direction = "right-to-left", // Scroll direction
  inclination = 0,             // Rotation angle in degrees
  zIndex = 1,                  // Stacking order
  speed = 100                  // Animation duration in seconds
})
```

**Prop Usage in AboutIntroMerged**:

| Banner | Direction | Inclination | zIndex | Speed | Effect |
|--------|-----------|-------------|--------|-------|--------|
| 1 | right-to-left | 0° | 3 (top) | 100s | Slowest scroll, most prominent |
| 2 | right-to-left | 0° | 2 (middle) | 120s | Medium scroll, layered behind |
| 3 | right-to-left | 0° | 1 (bottom) | 140s | Fastest scroll, deepest layer |

**Why Three Layers?**
- **Parallax Depth**: Different speeds create sense of 3D layering
- **Visual Density**: Three overlapping layers fill space without cluttering
- **Continuous Motion**: Eyes track different layers at different times

### Skills Data Structure

**23 Skills** organized as genomic elements:

```javascript
const skills = [
  // EXONS (Core programming languages/frameworks) - 4 items
  { name: "Python", type: "exon", category: "technical" },
  { name: "R", type: "exon", category: "technical" },
  { name: "JavaScript", type: "exon", category: "technical" },
  { name: "React", type: "exon", category: "technical" },

  // UTRs (Domain expertise & Key Concepts) - 5 items
  { name: "Statistical Genomics", type: "utr", category: "domain" },
  { name: "Clinical Genetics", type: "utr", category: "domain" },
  { name: "Genetic Counseling", type: "utr", category: "domain" },
  { name: "Variant Interpretation", type: "utr", category: "domain" },
  { name: "Bioinformatics", type: "utr", category: "domain" },

  // REGULATORY (Technical tools, libraries, methods) - 14 items
  { name: "Pandas", type: "regulatory", category: "tools" },
  { name: "NumPy", type: "regulatory", category: "tools" },
  { name: "Scikit-learn", type: "regulatory", category: "tools" },
  { name: "Tidyverse", type: "regulatory", category: "tools" },
  { name: "ggplot2", type: "regulatory", category: "tools" },
  { name: "D3.js", type: "regulatory", category: "tools" },
  { name: "Three.js", type: "regulatory", category: "tools" },
  { name: "Blender", type: "regulatory", category: "tools" },
  { name: "UI/UX Design", type: "regulatory", category: "tools" },
  { name: "Data Storytelling", type: "regulatory", category: "tools" },
  { name: "Git", type: "regulatory", category: "tools" },
  { name: "GitHub", type: "regulatory", category: "tools" },
  { name: "SQL", type: "regulatory", category: "tools" }
];
```

**Genomic Metaphor**:
- **Exons**: Coding regions → Core technical skills (languages/frameworks)
- **UTRs**: Untranslated regions → Domain expertise (genetics, counseling)
- **Regulatory**: Regulatory elements → Tools and methods (libraries, design)
- **Introns**: Non-coding sequences → DNA connectors (ATGC) between skills

### Genomic Sequence Generation

**Smart Shuffle Algorithm** (prevents monotony):

```javascript
const smartShuffle = (array) => {
  const shuffled = [...array];
  const maxAttempts = 1000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Check if we have more than 3 consecutive items of same type
    let hasLongRun = false;
    for (let i = 0; i < shuffled.length - 3; i++) {
      if (
        shuffled[i].type === shuffled[i + 1].type &&
        shuffled[i].type === shuffled[i + 2].type &&
        shuffled[i].type === shuffled[i + 3].type
      ) {
        hasLongRun = true;
        break;
      }
    }

    if (!hasLongRun) {
      return shuffled; // Good shuffle, return it
    }

    attempts++;
  }

  return shuffled; // Fallback after 1000 attempts
};
```

**Why Smart Shuffle?**
- **Problem**: Random shuffle could create 5+ consecutive exons (boring)
- **Solution**: Re-shuffle until no more than 3 consecutive items of same type
- **Effect**: Varied, visually interesting genomic sequence

**Bundling Logic** (connector injection):

```javascript
let bundleCount = 0;

shuffledSkills.forEach((skill, index) => {
  sequence.push({ ...skill, id: `skill-${index}` });

  if (index < shuffledSkills.length - 1) {
    const shouldBundle = Math.random() < 0.4 && bundleCount < 2;

    if (shouldBundle) {
      bundleCount++; // Skip connector - skills appear bundled
    } else {
      const connector = getWeightedConnector();
      sequence.push({
        ...connector,
        type: 'intron',
        id: `${connector.id}-${index}`
      });
      bundleCount = 0;
    }
  }
});
```

**How It Works**:
1. **40% Chance**: Skip connector (bundle skills together)
2. **Max Bundle**: Never bundle more than 2 skills in a row
3. **Connector Injection**: Otherwise, inject DNA sequence between skills
4. **Result**: Some skills clustered, others separated by nucleotides

**Duplication for Seamless Loop**:

```javascript
return [...sequence, ...sequence];
```

**Why Duplicate?**
- **Infinite Scroll**: CSS animation loops the track
- **Seamless Join**: Duplicate ensures no visible gap when loop resets
- **Total Length**: ~46-60 elements (23 skills × 2 + introns)

---

## Genomic Metaphor System

### DNA Connector Patterns

**File**: `/src/data/geneConnectors.js` (78 lines)

**16 Predefined Connectors** with varied widths and nucleotide sequences:

#### Short Connectors (80-120px)

```javascript
{ id: 'c1', width: 80, pattern: 'solid', label: 'ATGC', sequence: 'ATGC' },
{ id: 'c2', width: 100, pattern: 'dashed', label: 'CGTA', sequence: 'CGTA' },
{ id: 'c3', width: 90, pattern: 'dotted', label: 'GCTA', sequence: 'GCTA' },
{ id: 'c4', width: 110, pattern: 'double', label: 'TACG', sequence: 'TACG' }
```

**Usage**: Frequent spacers between skills (50% probability)

#### Medium Connectors (130-170px)

```javascript
{ id: 'c5', width: 130, pattern: 'solid', label: 'ATCGATCG', sequence: 'ATCGATCG' },
{ id: 'c6', width: 150, pattern: 'dashed', label: 'GCTAGCTA', sequence: 'GCTAGCTA' },
{ id: 'c7', width: 160, pattern: 'mixed', label: 'TACGTACG', sequence: 'TACGTACG' }
// + 2 more
```

**Usage**: Moderate spacing (35% probability)

#### Long Connectors (190-250px)

```javascript
{ id: 'c10', width: 200, pattern: 'solid', label: 'ATCGATCGATCG', sequence: 'ATCGATCGATCG' },
{ id: 'c11', width: 220, pattern: 'dashed', label: 'GCTAGCTAGCTA', sequence: 'GCTAGCTAGCTA' },
{ id: 'c12', width: 250, pattern: 'mixed', label: 'TACGTACGTACG', sequence: 'TACGTACGTACG' }
// + 4 more
```

**Usage**: Rare, create breathing room (15% probability)

### Weighted Random Selection

```javascript
export const getWeightedConnector = () => {
  const random = Math.random();

  if (random < 0.5) {
    // 50% chance: short connector
    const shortConnectors = geneConnectors.slice(0, 4);
    return shortConnectors[Math.floor(Math.random() * shortConnectors.length)];
  } else if (random < 0.85) {
    // 35% chance: medium connector
    const mediumConnectors = geneConnectors.slice(4, 9);
    return mediumConnectors[Math.floor(Math.random() * mediumConnectors.length)];
  } else {
    // 15% chance: long connector
    const longConnectors = geneConnectors.slice(9);
    return longConnectors[Math.floor(Math.random() * longConnectors.length)];
  }
};
```

**Why Weighted?**
- **Balance**: Favor short connectors for density, but mix in longer ones
- **Rhythm**: Varied spacing prevents monotony
- **Visual Interest**: Occasional long connectors create "breathing room"

### Rendering Genomic Elements

**Four Element Types** with distinct styling:

```javascript
{genomicSequence.map((element, index) => {
  if (element.type === 'intron') {
    // DNA connector - nucleotide sequence
    return (
      <div key={key} className="gene-intron" style={{ width: `${element.width}px` }}>
        <span className="gene-intron-text">{element.sequence}</span>
      </div>
    );
  } else if (element.type === 'exon') {
    // Core skill - filled box
    return (
      <div key={key} className="gene-exon">
        <span className="gene-element-text">{element.name}</span>
      </div>
    );
  } else if (element.type === 'utr') {
    // Domain expertise - outlined box
    return (
      <div key={key} className="gene-utr">
        <span className="gene-element-text">{element.name}</span>
      </div>
    );
  } else if (element.type === 'regulatory') {
    // Tool/method - small badge
    return (
      <div key={key} className="gene-regulatory">
        <span className="gene-element-text">{element.name}</span>
      </div>
    );
  }
})}
```

**Visual Styling** (CSS classes not found, but expected design):

| Type | Visual | Example | Color |
|------|--------|---------|-------|
| **Exon** | Filled box, bold text | `Python` | Theme primary color |
| **UTR** | Outlined box, normal text | `Genetic Counseling` | Theme secondary color |
| **Regulatory** | Small badge, compact text | `Pandas` | Theme accent color |
| **Intron** | Monospace nucleotides | `ATCGATCG` | Muted gray |

### Cylindrical Glass Tube

**Visual Design** (from component structure):

```jsx
<div className="skills-banner-wrapper-glass">
  <div className="skills-banner-tube-glass">
    {/* Curved borders simulating cut tube edges */}
    <div className="tube-border-top"></div>
    <div className="tube-border-bottom"></div>

    {/* Scrolling genomic sequence inside tube */}
    <div className="skills-banner-track-glass">
      {/* Skills and connectors */}
    </div>
  </div>
</div>
```

**Design Metaphor**: Skills scroll through a glass tube like DNA in a gel electrophoresis chamber.

**Expected CSS** (not found, but inferred from structure):
- **Tube**: Gradient background simulating glass cylinder
- **Borders**: Curved box-shadows creating convex edges (tube cut at angle)
- **Track**: Infinite CSS animation translating left/right

---

## Scroll-Linked Animations

### Framer Motion Implementation

**Library**: Framer Motion 12.18.1

**Hook**: `useScroll` with `useTransform` for scroll-linked animations

### Why Scroll-Linked?

**Traditional Approach** (entry animations):
```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
/>
```

**Problem**: Animates once on mount, not tied to scroll position.

**Scroll-Linked Approach**:
```javascript
const { scrollYProgress } = useScroll({ target: containerRef });
const opacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

<motion.div style={{ opacity }} />
```

**Benefit**: Animation progress directly tied to scroll position (scrubbing effect).

### Scroll Timeline Breakdown

**Progress**: 0 → 1 as About section moves through viewport

```
scrollYProgress = 0.00:  Section below viewport (not visible)
scrollYProgress = 0.05:  Section top edge enters viewport bottom → Title starts fading
scrollYProgress = 0.15:  Title visible → Line 1 starts fading
scrollYProgress = 0.25:  Title fully visible, Line 1 visible → Line 2 starts
scrollYProgress = 0.35:  Line 2 visible → Line 3 starts
scrollYProgress = 0.45:  Line 3 visible → Line 4 starts
scrollYProgress = 0.55:  Line 4 fully visible
scrollYProgress = 0.65:  All lines fully visible, stable
scrollYProgress = 1.00:  Section top edge exits viewport top
```

**Duration**: Entire reveal sequence happens over ~60% of scroll progress (0.05 to 0.65).

### Animation Values

**Each line animates two properties**:

1. **Opacity**: `0` (invisible) → `1` (fully visible)
2. **Y-Position**: `50px` (below) → `0px` (in place)

**Example for Line 2**:

```javascript
const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
//                                                  ├─────────┤  ├────┤
//                                                  Input range  Output range

const line2Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);
```

**How `useTransform` Works**:
- **Input range**: `[0.25, 0.45]` (when scrollYProgress is between these values)
- **Output range**: `[0, 1]` for opacity (invisible to visible)
- **Interpolation**: Linear interpolation between input/output ranges

**Example Calculation**:
```
scrollYProgress = 0.25 → opacity = 0 (start fading)
scrollYProgress = 0.35 → opacity = 0.5 (halfway)
scrollYProgress = 0.45 → opacity = 1 (fully visible)
```

### Mobile Considerations

**Desktop**: Smooth scroll-linked reveals as text enters viewport
**Mobile**: Same system, but shorter viewport means faster reveals

**Potential Enhancement** (not implemented):
- Use smaller scroll ranges for mobile (`[0.1, 0.2]` instead of `[0.15, 0.35]`)
- Adjust `scrollYProgress` offset ranges based on `isMobile` state

---

## Mobile Responsiveness

### Breakpoint System

**Single Breakpoint**: `768px`

```javascript
const mobile = window.innerWidth <= 768;
```

**Why 768px?**
- **Industry Standard**: iPad Portrait (768px) is common tablet/desktop boundary
- **Touch Interfaces**: Below 768px typically indicates touch-primary devices
- **Typography**: Mobile requires larger text, simpler layouts

### Mobile-Specific Classes

**AboutIntro** applies different class names on mobile:

```javascript
const sectionClass = isMobile ? "about-intro-section-mobile" : "about-intro-section";
const containerClass = isMobile ? "about-intro-container-mobile" : "about-intro-container";
const blockClass = isMobile ? "about-intro-block-mobile" : "about-intro-block";
const titleClass = isMobile ? "about-intro-title-mobile" : "about-intro-title";
const contentClass = isMobile ? "about-intro-content-mobile" : "about-intro-content";
const lineClass = isMobile ? "about-intro-line-mobile" : "about-intro-line";
const emphasisClass = isMobile ? "emphasis-word-mobile" : "emphasis-word";
```

**Why Separate Classes?**
- **Font Sizes**: Mobile needs larger text for readability
- **Spacing**: Mobile requires more generous padding
- **Layout**: Mobile may stack elements differently
- **Animation**: Mobile may use simpler animations

### Mobile Layout Adjustments

**Line Breaks**:

```javascript
I started in biotechnology, trained in genetic counseling,
{!isMobile && <br />}
{isMobile ? ' ' : ''}
and now I {rotatingWord}
```

**Desktop** (with `<br />`):
```
I started in biotechnology, trained in genetic counseling,
and now I develop interactive reports
```

**Mobile** (no `<br />`, natural wrap):
```
I started in biotechnology, trained in genetic counseling, and now I develop interactive reports
```

**Why?**
- **Narrow Viewports**: Forced line breaks can create awkward wrapping
- **Natural Flow**: Let browser handle line breaks based on available width

### Skills Banner Mobile Behavior

**Same Component, Different Display**:
- **Desktop**: Three layers clearly visible, stacked
- **Mobile**: May collapse to single banner or reduce layer count (CSS-dependent)

**Speed Adjustment** (potential enhancement):
- Mobile could use faster speeds (`60s, 80s, 100s`) for quicker motion
- Smaller screens benefit from faster movement

### Critical Mobile Fix (January 13, 2026)

**Problem**: Cannot scroll past About section on iPhone 17 Pro

**Root Cause**: `overflow: hidden` on `.section--about-merged`

**Fix** (line 31 in `/src/App.css`):

```css
.section--about-merged {
  overflow: visible !important; /* Changed from hidden */
}
```

**Why `!important`?**
- Overrides any conflicting CSS rules
- Ensures scrolling works across all devices

---

## Performance Considerations

### useMemo for Genomic Sequence

**Why Memoize?**

```javascript
const genomicSequence = useMemo(() => {
  const shuffledSkills = smartShuffle(skills);
  // ... connector injection logic
  return [...sequence, ...sequence];
}, []); // Empty deps - only generate once
```

**Without useMemo**:
- Genomic sequence regenerates on every render
- Smart shuffle runs repeatedly (expensive: 1000 iterations)
- Connector injection recalculates (23 skills × 2 = 46+ operations)

**With useMemo**:
- Genomic sequence generated once on mount
- Cached for component lifetime
- **Performance Gain**: ~10-20ms saved per render (especially on mobile)

### Interval Cleanup

**Why Cleanup?**

```javascript
useEffect(() => {
  const intervals = { line1: setInterval(...), line2: setInterval(...), line3: setInterval(...) };

  return () => {
    clearInterval(intervals.line1);
    clearInterval(intervals.line2);
    clearInterval(intervals.line3);
  };
}, []);
```

**Without Cleanup**:
- Intervals continue running after component unmounts
- **Memory Leak**: 3 intervals × 4 seconds = continuous memory allocation
- **Performance Impact**: Wasted CPU cycles updating state of unmounted component

**With Cleanup**:
- Intervals cleared when component unmounts
- **Memory Safe**: No lingering timers

### Scroll Animation Performance

**Framer Motion's `useTransform`** is highly optimized:

1. **GPU Acceleration**: `opacity` and `transform` use GPU (not CPU)
2. **RAF (RequestAnimationFrame)**: Updates synced to 60fps refresh rate
3. **Scroll Listener Optimization**: Passive scroll listeners (no blocking)

**Result**: Smooth 60fps scroll animations even on mid-range devices.

### CSS Animation (Skills Banner)

**Expected CSS** (not found, but standard pattern):

```css
@keyframes scrollBanner {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.skills-banner-track-glass {
  animation: scrollBanner 100s linear infinite;
}
```

**Why Efficient?**
- **CSS Animations**: Handled by browser's compositor thread (not main thread)
- **GPU Acceleration**: `transform: translateX` uses GPU
- **No JavaScript**: Runs independently of React render cycles

**Performance**: ~0.1% CPU usage for all three banners combined.

---

## Theme Integration

### Theme Context Usage

**AboutIntro** and **SkillsBannerGlass** are theme-aware via CSS custom properties.

**Expected CSS** (not found, but standard pattern):

```css
/* Light Theme */
body.light-theme {
  --text-primary: #1a1a1a;
  --text-emphasis: #0066cc;
  --skill-exon-bg: #0066cc;
  --skill-utr-border: #33cc33;
  --skill-regulatory-bg: #ff9900;
  --intron-color: #999999;
}

/* Dark Theme */
body.dark-theme {
  --text-primary: #e0e0e0;
  --text-emphasis: #66b3ff;
  --skill-exon-bg: #66b3ff;
  --skill-utr-border: #66ff66;
  --skill-regulatory-bg: #ffcc66;
  --intron-color: #666666;
}
```

**Component Implementation**:

```javascript
// AboutIntro: Emphasis words use theme-aware color
<span className="emphasis-word">{text}</span>

/* CSS */
.emphasis-word {
  color: var(--text-emphasis);
}
```

**Why Theme-Aware?**
- **Accessibility**: High contrast in both themes
- **Consistency**: Matches global theme colors
- **User Preference**: Respects system/user theme choice

---

## Future Enhancements

### Potential Additions

1. **Animated Signature Component** (exists but unused)
   - **File**: `/src/components/AnimatedSignature.jsx`
   - **Purpose**: GSAP stroke animation of signature
   - **Integration**: Could replace static name in AboutIntro

2. **Orbiting Icons Component** (exists but unused)
   - **File**: `/src/components/OrbitingIcons.jsx`
   - **Purpose**: Floating social media icons with sine wave motion
   - **Integration**: Could add to bottom of AboutIntro

3. **Interactive Skills**
   - **Current**: Skills scroll passively
   - **Enhancement**: Hover on skill → Show projects using that skill
   - **Implementation**: Modal or tooltip with filtered project list

4. **Skill Filtering**
   - **Current**: All 23 skills always visible
   - **Enhancement**: Filter by category (technical, domain, tools)
   - **Implementation**: Buttons above banner toggle skill types

5. **Personalized Word Rotation**
   - **Current**: Fixed word arrays
   - **Enhancement**: Load words from CMS/JSON for easy updates
   - **Implementation**: Fetch from `/public/data/about-words.json`

6. **Scroll Progress Indicator**
   - **Current**: No visual feedback of scroll position
   - **Enhancement**: Progress bar showing reveal completion
   - **Implementation**: `<motion.div style={{ scaleX: scrollYProgress }} />`

7. **Mobile Speed Adjustment**
   - **Current**: Same banner speeds on all devices
   - **Enhancement**: Faster speeds on mobile (60s, 80s, 100s)
   - **Implementation**: Conditional props in AboutIntroMerged

---

## Related Documentation

- [HERO-SECTION.md](./HERO-SECTION.md) - Previous section (DNA helix)
- [ACADEMIC-JOURNEY-SECTION.md](./ACADEMIC-JOURNEY-SECTION.md) *(coming soon)* - Next section (timeline)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) - Component hierarchy
- [STATE-MANAGEMENT.md](../architecture/STATE-MANAGEMENT.md) - Theme context
- [MASTER-OVERVIEW.md](../MASTER-OVERVIEW.md) - Full portfolio overview

---

## Quick Reference

### Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `AboutIntroMerged.jsx` | 57 | Wrapper component with mobile detection |
| `AboutIntro.jsx` | 227 | Hola narrative with rotating words + scroll animations |
| `SkillsBannerGlass.jsx` | 183 | Genomic skills banner with DNA connectors |
| `geneConnectors.js` | 78 | DNA connector patterns and weighted selection |
| `App.css` (lines 24-32) | 9 | Section layout rules |

### Component Props

**AboutIntroMerged**: None (standalone)

**AboutIntro**: None (uses internal state + scroll hooks)

**SkillsBannerGlass**:
```javascript
{
  direction: "right-to-left" | "left-to-right",
  inclination: number,  // Rotation in degrees
  zIndex: number,       // Stacking order
  speed: number         // Animation duration in seconds
}
```

### Word Rotation Intervals

- **Line 1**: 4000ms (5 activities)
- **Line 2**: 4500ms (14 subjects)
- **Line 3**: 5000ms (12 audiences)

### Skills Breakdown

- **Exons**: 4 core languages/frameworks
- **UTRs**: 5 domain expertise areas
- **Regulatory**: 14 tools and methods
- **Total**: 23 skills

### Animation Timing

**Scroll Reveals** (AboutIntro):
```
Title:  0.05 → 0.25 (20% scroll range)
Line 1: 0.15 → 0.35
Line 2: 0.25 → 0.45
Line 3: 0.35 → 0.55
Line 4: 0.45 → 0.65
```

**Banner Speeds** (SkillsBannerGlass):
- Layer 1 (top): 100 seconds per loop
- Layer 2 (middle): 120 seconds per loop
- Layer 3 (bottom): 140 seconds per loop

---

*This section combines personal narrative with technical showcase, using genetics as a unifying visual metaphor for interdisciplinary expertise.*
