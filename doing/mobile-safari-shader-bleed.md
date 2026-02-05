# Mobile Safari shader background not filling top/bottom

Goal: Investigate and fix iPhone Safari showing white/black bands at the top and bottom instead of full shader background.

Acceptance criteria:
1. On iPhone Safari (light and dark mode), the shader background fills the entire viewport, including top/bottom safe areas.
2. Any related rendering or performance issues are identified with a clear mitigation plan.

## Root Cause Analysis

The black/white bands are iOS **safe areas** (notch at top, home indicator at bottom). The WebGL canvas respects these boundaries by default and doesn't render into them.

### What we've tried:
1. ❌ `window.innerHeight` instead of `100dvh` - didn't work, wrong measurement
2. ❌ `visualViewport.height` - better but still respects safe areas
3. ❌ `position: fixed; top: 0; bottom: 0;` - still respects safe areas on iOS
4. 🔄 **Current attempt**: Negative positioning to extend INTO safe areas:
   ```css
   top: calc(-1 * env(safe-area-inset-top, 0px));
   bottom: calc(-1 * env(safe-area-inset-bottom, 0px));
   height: calc(100% + safe-area-top + safe-area-bottom);
   ```

### Key findings:
- `viewport-fit=cover` is required but not sufficient
- iOS Safari's `position: fixed` with `top: 0` starts AFTER the safe area
- Need to use negative margins/positioning to extend into safe areas
- Desktop rendering is now correct after case-sensitivity fixes

### Files involved:
- `src/components/BackgroundScene.jsx` - Canvas container and viewport tracking
- `index.html` - CSS for `.shader-background-container`
- `src/components/TopographicCytoplasmPlane.jsx` - The actual shader

### Also fixed:
- ✅ Case-sensitive imports (`Styles` vs `styles`) for Linux builds
- ✅ Disabled particles on mobile for performance
- ✅ Desktop rendering no longer oversized

## References:
- https://iifx.dev/en/articles/457735260/webgl-on-ios-taming-fullscreen-and-fixed-position-canvases
- https://stripearmy.medium.com/ios-26-0-be-prepared-for-viewport-changes-in-safari-e867d7eace43
