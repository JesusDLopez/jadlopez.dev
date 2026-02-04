# Mobile Hola Visibility Investigation

## Engineering Summary
First, isolate why the Hola section disappears on mobile. Hypothesis: another block (skills banners or timeline) sits above it. Observations show bright debug colors when we force styles, but the block is still hidden. Need precise measurements.

### Immediate Steps
1. Load `/?holaDebug=1` on actual device
2. Scroll to Hola
3. Read overlay values: `rect.top`, `rect.bottom`, `visibility`, `at 15% y`
4. Determine the obstruction element; probably `.skills-banners-container` or timeline frame.
5. Log screenshot or raw data.

## Design Considerations
If Hola genuinely needs full-screen hero on mobile, consider a dedicated `<section>` that sits above banners and timeline contents.

### Option 1: Keep single component with responsive layout
- Fix stacked banners to appear below Hola in DOM order
- Remove negative margins / absolute positioning that pulled banners over Hola

### Option 2: Split mobile-specific section
- Introduce `AboutIntroMobileSection` as separate `screen-section`
- Place Hola block at top of mobile stack
- Move banners/timeline into subsequent sections
- Pros: clearer layout, no giant debug styles
- Cons: duplicated content, more maintenance

## Action Plan (pending data)
- Collect overlay metrics
- Inspect DOM layering through dev tools (z-index, position)
- Prototype minimal separate mobile section to validate idea without rewriting entire flow
