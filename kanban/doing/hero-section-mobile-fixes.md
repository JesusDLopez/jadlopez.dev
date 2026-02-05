# Hero Section Mobile Fixes

Goal: Fix the Hero section's DNA inspection mode on mobile.

## Changes Implemented

### 1. DNA Info Panel - Made Compact
**File:** `src/components/hero/InfoPanels.jsx`

- Updated `dnaPanelContent.title` to include PDB link inline: `DNA Double Helix (1BNA)`
- Removed category, meta, and citation from mobile render
- Shortened `mobileSummary` to: "12 base pairs of B-form DNA with canonical pairing and right-handed twist."
- Updated controls hint with emojis: "☝️ Drag · ✌️ Pan · 🤏 Pinch · Touch DNA to explore"

### 2. PDB Link - Made Visually Distinct
**File:** `src/Styles/Hero.css`

- Added cyan/blue color and underline to the (1BNA) link so users know it's clickable
- Dark mode: `#60d5ff` (cyan)
- Light mode: `#0066cc` (blue)

### 3. Nucleotide Info Boxes - Repositioned Closer
**File:** `src/Styles/Hero.css`

- Changed `bottom: 8rem` → `bottom: 4rem` - very close to "Click to scroll" button

### 4. Button Glow - Disabled on Mobile
**File:** `src/Styles/Hero.css`

- Removed overflow change (didn't work)
- Instead, disabled the pulse animation entirely on mobile: `animation: none !important;`

## Status

- [x] Code changes implemented
- [x] Build verified (passed)
- [ ] Commit pending
- [ ] Deploy to Vercel
- [ ] Test on iPhone Safari

## Verification Checklist

1. [ ] DNA info panel is compact (title with link, no subtitles)
2. [ ] PDB link is visually distinct (cyan/blue, underlined)
3. [ ] Controls hint shows emojis and "Touch DNA to explore"
4. [ ] Nucleotide boxes appear very close to "Click to scroll"
5. [ ] No distracting button glow animation on mobile
6. [ ] Desktop - no regressions
