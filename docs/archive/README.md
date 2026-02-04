# Archive Directory

This directory contains code and documentation that has been archived during cleanup sessions. These files are kept for historical reference and can be restored if needed.

## Directory Structure

### `sessions/` - Development Session Logs
Detailed session logs documenting development progress, decisions, and implementations.

**Contents:**
- SESSION-2025-11-08.md - Academic Journey refactoring & protein viewer transparency
- SESSION-2025-11-12.md - Spacing fixes, cell membrane breathing, publication shelf
- SESSION-2025-11-13.md - Height system optimization, footer implementation

**Status:** Historical documentation, keep for reference

---

### `fallbacks/` - Fallback Component Versions
Backup versions of components created before major refactoring, marked with `.FALLBACK-MODAL` suffix.

**Contents:**
- About.jsx.FALLBACK-MODAL
- ProteinViewer.jsx.FALLBACK-MODAL
- About.css.FALLBACK-MODAL

**Archived:** 2025-11-14
**Reason:** Current versions are stable, fallbacks no longer needed
**Restore if:** Need to revert major About section changes

---

### `debug-tools/` - Debug & Development Tools
Debug components and context created for development but not integrated into production app.

**Contents:**
- DebugModeContext.jsx - Debug mode state management
- DebugOverlay.jsx - Composite debug overlay (Shift+D toggle)
- DesignOverlay.jsx - Design grid overlay
- GlobalDebugStats.jsx - Page metrics panel
- ScrollDebugOverlay.jsx - Scroll position visualization
- ScrollTracker.jsx - Section tracking
- SectionDebugInfo.jsx - Per-section metrics
- SectionSpacingDebug.jsx - Spacing visualization

**Archived:** 2025-11-14
**Reason:** Created but never integrated into App.jsx, DebugModeProvider not wrapped
**Restore if:** Need debugging tools for development sessions

---

### `experimental/backgrounds/` - Unused Background Components
Alternative background experiments that were never integrated.

**Contents:**
- ChromosomeAuroraBackground.jsx
- CytoplasmFogBackground.jsx
- CytoplasmFogPlane.jsx
- ElectrophoresisBackground.jsx
- GeneticRainBackground.jsx
- ShaderBackground.jsx

**Archived:** 2025-11-14
**Reason:** Never imported anywhere, BackgroundScene.jsx is the active background
**Note:** ShaderBackground.jsx is different from BackgroundScene (which is used in Layout.jsx)
**Restore if:** Want to experiment with alternative background styles

---

### `experimental/about-variants/` - About/Hola Section Experiments
Experimental and duplicate versions of About/Hola section components.

**Contents:**
- AboutIntroDuplicate.jsx - Duplicate of AboutIntro
- AboutIntroMobile.jsx - Mobile-specific variant (unused)
- HolaBrandNew.jsx - Experimental Hola variant
- HolaSimpleMobile.jsx - Mobile variant
- SimpleHolaMobile.jsx - Another mobile variant

**Archived:** 2025-11-14
**Reason:** Never imported anywhere, responsive behavior is handled in AboutIntroMerged.jsx
**Note:** Current active components are AboutIntro.jsx (used by AboutIntroMerged.jsx) and AboutIntroMerged.jsx (used in App.jsx)
**Restore if:** Need to reference alternative implementations or mobile-specific layouts

---

## Restoration Instructions

If you need to restore any archived file:

1. Copy the file from `docs/archive/[category]/` back to its original location
2. Check git history for original location if unsure
3. Verify all imports and dependencies are still valid
4. Test thoroughly before committing

## Archive Policy

**What gets archived:**
- Fallback/backup versions after stable implementation
- Experimental code that was never integrated
- Debug tools not needed in production
- Duplicate components
- Session logs (moved from docs/ root to keep organized)

**What stays active:**
- Any component imported in App.jsx or other active files
- Components used in routing
- All CSS files for active components
- Active hooks and contexts

---

**Last Updated:** 2025-11-14
**Total Archived Files:** 22 (3 fallbacks, 6 backgrounds, 8 debug tools, 5 about-variants)
