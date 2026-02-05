# Hero Section Mobile Fixes

Goal: Fix the Hero section's DNA inspection mode on mobile.

## Changes Implemented

### 1. DNA Info Panel - Made Compact
**File:** `src/components/hero/InfoPanels.jsx`

- Updated `dnaPanelContent.title` to include PDB link inline: `DNA Double Helix (1BNA)`
- Removed category, meta, and citation from mobile render
- Shortened `mobileSummary` to: "12 base pairs of B-form DNA with canonical pairing and right-handed twist."
- Simplified controls hint to: "Drag · Pan · Pinch to zoom"

### 2. Nucleotide Info Boxes - Repositioned
**File:** `src/Styles/Hero.css` (line 529)

- Changed `bottom: 8rem` to `bottom: 5.5rem` - now just above "Click to scroll" button

### 3. Button Glow - Allow Overflow
**File:** `src/Styles/Hero.css` (lines 8, 394)

- Changed `overflow: hidden` to `overflow-x: hidden` in both desktop and mobile `.hero` rules
- Allows button glow to extend vertically into next section

## Status

- [x] Code changes implemented
- [ ] Build verified (passed)
- [ ] Commit pending - waiting to batch with other section fixes
- [ ] Deploy to Vercel
- [ ] Test on iPhone Safari

## Verification Checklist

1. [ ] DNA info panel is compact (title with link, no subtitles)
2. [ ] Instructions fit on one line
3. [ ] Nucleotide boxes appear just above "Click to scroll"
4. [ ] Button glow extends smoothly past hero section
5. [ ] Desktop - no regressions
