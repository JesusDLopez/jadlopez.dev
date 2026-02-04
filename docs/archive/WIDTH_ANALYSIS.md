# Width Organization Analysis - Section by Section

## Overview
Each section has different width constraints and positioning systems. This document explains why content appears at different horizontal positions across sections.

---

## 🎯 HERO SECTION
**Container Width:** Full viewport (100vw)
**Content Positioning:** Centered
**Max Width:** None

**Layout:**
- Background: Full screen DNA helix
- Name/Subtitle: Centered in viewport
- No width constraints - uses full available space

**Why it's different:** Hero needs to be edge-to-edge for dramatic impact.

---

## 📖 ABOUT SECTION (Hola Text)
**Container Width:** Full viewport (100vw)
**Content Positioning:** Anchor-based absolute positioning
**Max Width:** None (uses percentage positioning)

**Layout:**
```
Left margin: 8% (Anchor 1)
Title "¡Hola!": starts at 8%
Text content: starts at 16.5% (Anchor 1.5)
Right margin: 8%
Actual text width: ~75.5% of viewport
```

**Why it's different:** Uses a custom anchor point system for precise asymmetric layout. Content starts further left (16.5%) than other sections to create visual interest.

---

## 🎓 ABOUT SECTION (Skills Banner)
**Container Width:** Full viewport
**Content Positioning:** Centered with padding
**Padding:** 6vh top/bottom

**Layout:**
- Banner tubes: Full width edge-to-edge
- Skills scroll horizontally across screen
- No max-width constraint

**Why it's different:** Needs full width for continuous scrolling banner effect.

---

## 📚 ABOUT SECTION (Academic Journey/Timeline)
**Container Width:** Constrained by CSS variables
**Frame Width:** `min(95vw, calc(100% - 2 * var(--timeline-frame-margin)))`
**Frame Margin:** `clamp(0.5rem, 1vh, 1rem)`
**Max Width:** 95vw

**Layout:**
```
Left margin: ~2.5vw
Timeline frame: ~95vw
Right margin: ~2.5vw
Cards: 500px max, positioned at 16.5% and 75% anchors
```

**Why it's different:** Timeline needs breathing room (95vw) but uses same anchor system as Hola text for visual consistency.

---

## 🔬 WORK SECTION (Interactive Laboratory)
**Container Width:** `min(90vw, calc(100% - 2 * var(--section-padding-x)))`
**Section Padding X:** `clamp(1.5rem, 8vw, 6rem)`
**Max Width:** 1400px ✓
**Grid:** 75% / 25% (Cell / Sidebar)

**Layout:**
```
Left margin: ~5vw (section padding)
Cell (organelles): 75% of content width
Sidebar (text): 25% of content width
Right margin: ~5vw (section padding)
Total content: max 1400px, centered
```

**Why 1400px:** Standard width for content consistency. Provides good balance between interactive canvas space and text readability.

---

## 📝 BLOG SECTION (Field Notes)
**Container Width:** 100% of section
**Grid Max Width:** 1400px ✓
**Grid Layout:** `repeat(auto-fit, minmax(260px, 1fr))`

**Layout:**
```
Left margin: auto (centered)
Blog grid: max 1400px
Right margin: auto (centered)
Cards: Responsive grid, 260px minimum
Gap: 1.5rem between cards
```

**Why 1400px:** Standard width for content consistency. Gives blog cards more breathing room than previous 1200px.

---

## 📬 CONTACT SECTION
**Container Width:** 100% of section
**Form Max Width:** 1400px ✓
**Alignment:** Centered

**Layout:**
```
Left margin: auto (centered)
Contact container: max 1400px
Right margin: auto (centered)
Padding: 2rem internal
Form elements: Can be narrower within container
```

**Why 1400px:** Standard width for alignment consistency. Form elements within may use narrower width for optimal readability.

---

## 📊 Width Comparison Summary

| Section | Container | Max Content Width | Horizontal Positioning |
|---------|-----------|-------------------|------------------------|
| Hero | 100vw | None | Centered |
| About (Hola) | 100vw | ~75.5vw | Left: 16.5%, Right: 8% |
| About (Banner) | 100vw | None | Edge-to-edge |
| About (Timeline) | ~95vw | 95vw | Centered with margins |
| **Work** | ~90vw | **1400px** ✓ | Centered, 75/25 grid |
| **Blog** | 100% | **1400px** ✓ | Centered |
| **Contact** | 100% | **1400px** ✓ | Centered |

---

## 🎨 Design Principles Behind Width Choices

1. **Hero (Full width):** Maximum impact, no distractions
2. **About Hola (Asymmetric):** Creates visual rhythm, guides eye through narrative
3. **About Banner (Full width):** Continuous scrolling effect needs edge-to-edge
4. **About Timeline (95vw):** Breathing room for glass-morphic frame
5. **Work/Blog/Contact (1400px):** **Consistent standard width** for all content sections

---

## 🔍 New Consistent Width System

**Standard Content Width: 1400px**
- Work, Blog, and Contact now share the same max-width
- Creates visual consistency and alignment across content sections
- Provides optimal balance between:
  - Interactive elements (Work organelles)
  - Reading content (Blog cards)
  - Form elements (Contact)

**Special Cases:**
- **Hero & Banner:** Full width for impact
- **Hola Text:** Asymmetric positioning for storytelling
- **Timeline:** 95vw for frame breathing room

This creates a clear visual hierarchy: full-bleed dramatic sections (Hero/Banner) → narrative sections (Hola/Timeline) → consistent content sections (Work/Blog/Contact at 1400px).
