# Mobile Section Layout Audit & Fixes

Goal: Fix all mobile layout issues across sections. The shader background bands may be a symptom of broken section layouts.

## Sections to audit (in page order):

- [ ] **Hero** - DNA model, title, subtitle, CTA button
- [ ] **About** ("¡Hola!") - Intro text, links
- [ ] **Work** - Project cards
- [ ] **Blog** - Blog post cards
- [ ] **Contact** - Contact form/info
- [ ] **Navbar** - Mobile navigation
- [ ] **Footer** - Footer links

## Known issues:
- Sections appear cut off
- Content pops up in weird places
- Black/white bands at top/bottom (may resolve once sections fixed)

## Testing device:
- iPhone Safari (primary)
- Check both portrait and landscape

## Approach:
1. Test each section individually on iPhone
2. Identify specific CSS/layout issues
3. Fix one section at a time
4. Commit and deploy to test on device

## Notes:
- Desktop layout is working correctly after repo migration fixes
- Shader background issue may be related to section overflow/height problems
