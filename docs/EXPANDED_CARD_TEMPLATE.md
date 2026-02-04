# Expanded Card Template - Standard Format

**Last Updated:** November 21, 2024

This document defines the standardized layout and structure for all protein experience cards in the Academic Journey timeline.

---

## Overview

Each protein card tells a three-part story when expanded:
1. **Scientific Facts** - What the protein does and why it's structurally interesting
2. **Control Center** - Interactive controls and hover information display
3. **Personal Journey** - How this protein relates to your academic/research story

---

## Visual Layout

```
┌─────────────────────────────────────────────┐
│  [3D Protein Viewer - 2/3 width]            │
│  - Toggle buttons in viewport (top-right)   │
│  - OrbitControls enabled                    │
│  - Hover detection active                   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  SECTION 1: PROTEIN NAME                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Frosted glass container]                  │
│                                              │
│  Histone H1                    (2.2rem)     │
│                                              │
│  Scientific description with color-coded    │
│  structure terms that glow when you hover   │
│  over the 3D protein. (1.1rem)              │
│                                              │
│  Terms highlighted:                          │
│  - alpha-helix, helices → green/pink        │
│  - beta-sheet, sheets → blue/yellow         │
│  - lysine, lysines → green                  │
│  - coils, loops → teal/peach                │
│  - surface → white/sky blue                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  SECTION 2: CONTROL CENTER                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Subtle background container]              │
│                                              │
│  Control Center                (1.2rem)     │
│                                              │
│  ┌──────────┬─────────────────────────────┐ │
│  │ [Show/  │  Hover Info Display         │ │
│  │  Hide   │  ┌───────────────────────┐  │ │
│  │ Lysines]│  │ Alpha Helix           │  │ │
│  │         │  │ [Description...]      │  │ │
│  │ [Show/  │  └───────────────────────┘  │ │
│  │  Hide   │  (Color-coded border)       │ │
│  │ Surface]│                             │ │
│  └──────────┴─────────────────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  SECTION 3: MY JOURNEY                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [No background - minimalistic]             │
│                                              │
│  My Journey                    (1.6rem)     │
│  UNIVERSIDAD EUROPEA • 2016-2019 (0.9rem)   │
│                                              │
│  Personal narrative about what you did      │
│  during this period... (1.05rem)            │
│                                              │
│  Why this period mattered to your journey   │
│  and how it shaped your path... (1.05rem)   │
└─────────────────────────────────────────────┘
```

---

## Data Structure

```javascript
{
  id: 1,
  title: "Universidad Europea de Madrid",
  years: "2016–2019",
  description: "Short card description for timeline view",
  expandedContent: {
    scientific: {
      proteinName: "Histone H1",
      description: "Scientific description with structure terms like alpha-helix, beta-sheet, lysine residues, and molecular surface that will be color-coded and interactive."
    },
    personal: {
      whatIDid: "Paragraph about your activities, courses, and experiences during this period.",
      whyItMattered: "Paragraph about the impact and significance of this period in your journey."
    }
  },
  component: (
    <ProteinViewer
      path={proteinGLBFile}
      position={[0, 0, 0]}
      scale={[1.0, 1.0, 1.0]}
      cameraZ={40}
      tooltip="Protein Name (PDB: ID)"
    />
  ),
}
```

---

## Section 1: Scientific Facts

### Purpose
Explain what makes this protein structurally and functionally interesting. Connect the 3D visualization to the written explanation through color-coded interactive terms.

### Styling
- **Container:** Frosted glass effect with subtle border
  - Dark: `rgba(255, 255, 255, 0.05)` background, `rgba(255, 255, 255, 0.1)` border
  - Light: `rgba(0, 0, 0, 0.03)` background, `rgba(0, 0, 0, 0.08)` border
- **Protein Name:** 2.2rem, bold (700), prominent
- **Text:** 1.1rem, line-height 1.7
- **Interactive Terms:** Color-coded to match protein structure colors
  - Glow with text-shadow when hovering over corresponding 3D structure

### Color Mapping (Dark Mode → Light Mode)
- `alpha-helix/helices` → `#00ff88` → `#ff9ec2`
- `beta-sheet/sheets` → `#60d5ff` → `#ffd966`
- `coils/loops` → `#00e5cc` → `#ffb899`
- `lysine/lysines` → `#4CAF50` → `#4CAF50`
- `surface` → `#ffffff` → `#78B4DC`

### Content Guidelines
- 3-5 sentences maximum
- Focus on structural features visible in the 3D model
- Use structure terms that will be color-coded
- Explain functional significance tied to structure

---

## Section 2: Control Center

### Purpose
Provide interactive controls for toggling protein features and display real-time information about hovered structures.

### Layout
Two-column grid:
- **Left Column (auto width):** Toggle buttons stacked vertically
- **Right Column (1fr):** Hover info display area

### Toggle Buttons
**Show/Hide Lysines:**
- Color: `#4CAF50` (green)
- Active state: Bolder border (2px), darker background, bold text (700)
- Inactive state: Thinner border (1px), lighter background, regular text (600)

**Show/Hide Surface:**
- Color: `#60d5ff` (dark) / `#78B4DC` (light)
- Same active/inactive states as Lysines button

### Hover Info Display
**Default State:**
- Dashed border placeholder box
- Center-aligned text: "Hover over the protein structure to see detailed information"
- Subtle background: `rgba(255, 255, 255, 0.02)` (dark) / `rgba(0, 0, 0, 0.01)` (light)

**Active State (when hovering):**
- Color-coded border (2px solid) matching structure color
- Tinted background (structure color at 20% opacity)
- Structure name in bold (1.1rem, weight 700) in structure color
- Description text (0.9rem) with detailed information

### Structure Information
Define for each protein's unique features. Example:
```javascript
{
  'Struct_Helix': {
    name: 'Alpha Helix',
    description: 'Spiral structure stabilized by hydrogen bonds. Provides structural support and flexibility.'
  },
  'Balls_Lysine': {
    name: 'Lysine Residue',
    description: 'Positively charged amino acid. Often found on protein surfaces, involved in binding interactions.'
  }
}
```

---

## Section 3: My Journey

### Purpose
Connect the protein to your personal academic/research story. Make it human and relatable.

### Styling
- **No background container** - minimalistic, clean
- **Title:** "My Journey" (1.6rem, weight 600)
- **Subtitle:** Institution name and years in caps (0.9rem, 70% opacity)
- **Text:** 1.05rem, line-height 1.6, muted color (70% opacity)

### Content Structure
Two paragraphs:
1. **What I Did:** Activities, courses, projects, challenges during this period
2. **Why It Mattered:** Impact on your journey, skills gained, perspective shifts

### Content Guidelines
- First person narrative
- Honest and reflective tone
- Connect to the protein metaphorically if appropriate
- 2-4 sentences per paragraph
- Focus on transformation and learning

---

## Interactive Features

### Hover Synchronization
When user hovers over protein structures:
1. **3D Model:** Structure glows brighter (0.8 emissive intensity in structure's own color)
2. **Scientific Text:** Matching terms glow with text-shadow
3. **Control Center:** Hover info box appears with color-coded border and details

### State Management
- `hoveredStructure`: Tracks currently hovered structure name (e.g., "Struct_Helix")
- `showLysines`: Boolean for lysine visibility
- `showSurface`: Boolean for surface visibility
- All managed at AcademicJourney component level, passed to ProteinViewer

### Responsive Behavior
- Mobile: Single column layout, reduced font sizes
- Desktop: Two-column layout (protein left, text right)
- Text column scrollable independently

---

## Implementation Checklist

For each new protein card:

### Part 0: Pre-Visualization (see PROTEIN_VISUALIZATION_TUTORIAL.md)
- [ ] Research protein function and structure
- [ ] Identify key structural features to highlight
- [ ] Determine personal connection to this period
- [ ] Plan which amino acids or features to show

### Part 1: Content Writing
- [ ] Write scientific description (3-5 sentences)
- [ ] Include color-coded structure terms
- [ ] Write "What I Did" paragraph
- [ ] Write "Why It Mattered" paragraph
- [ ] Choose institution name and years

### Part 2: Data Structure
- [ ] Update experience object with scientific/personal content
- [ ] Ensure protein name matches GLB file
- [ ] Set correct PDB ID in tooltip

### Part 3: Control Center Customization
- [ ] Define structure info for hover display
- [ ] Decide which toggle controls to include
- [ ] Test hover info for all visible structures

### Part 4: Visual Testing
- [ ] Verify color-coded terms match 3D structures
- [ ] Test hover synchronization (text ↔ protein)
- [ ] Check toggle buttons functionality
- [ ] Ensure three sections align properly
- [ ] Test both dark and light modes

---

## File References

**Related Documentation:**
- `PROTEIN_VISUALIZATION_TUTORIAL.md` - How to create protein 3D models (Mol* → Blender → React)
- `CONTENT_REVIEW.md` - Overall content strategy and tone
- `ABOUT_SECTION_BRAINSTORM.md` - Initial concept development

**Key Files:**
- `/src/components/about/AcademicJourney.jsx` - Main timeline component
- `/src/components/about/ProteinViewer.jsx` - 3D protein renderer
- `/src/assets/` - GLB protein model files

---

## Design Principles

1. **Information Hierarchy:** Scientific → Interactive → Personal
2. **Progressive Disclosure:** Start with facts, reveal details through interaction
3. **Visual Consistency:** All cards follow same three-section structure
4. **Meaningful Interaction:** Every hover, click, and toggle serves understanding
5. **Personal Connection:** Science is the hook, story is the heart

---

## Future Customization

Each protein can have unique:
- **Structure terms** in scientific description
- **Toggle controls** (not all proteins need lysines/surface)
- **Hover info structures** (highlight what's functionally important)
- **Color schemes** (adjust for protein-specific features)

The template is flexible while maintaining consistency.

---

**This is the new standard. Every protein card will follow this format.**
