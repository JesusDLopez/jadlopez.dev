# UI Fixes & Polish Implementation Plan

**Status:** 10/10 groups completed ✅ ALL DONE!
**Last Updated:** 2025-10-23

---

## Group 1: Blog Cleanup ✅
**Estimated Time:** 5 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Remove blog entries except "How AI Has Affected Biotechnology and Genetics"

**Files to Modify:**
- `src/posts/index.js:1-17`

**Changes:**
```javascript
// Remove these imports:
// - CodeToKinase
// - MastersOrigin
// - ScrollSystems

// Keep only:
// - AiBiotechGenetics

// Filter posts array to only include ai-biotech-genetics
```

**Testing:**
- Navigate to `/blog` and verify only one blog post appears

---

## Group 2: Organelle Physics - Minimum Speed ⚡
**Estimated Time:** 5 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Increase minimum organelle speed so they never appear stationary

**Files to Modify:**
- `src/components/work/OrganellePhysics.js:13`

**Changes:**
```javascript
// Current: this.minSpeed = 1.2;
// Change to: this.minSpeed = 2.0;
```

**Testing:**
- Watch organelles in Work section - they should maintain constant visible movement
- No organelle should ever appear completely still

---

## Group 3: Protein Card Sequential Animations 🎬
**Estimated Time:** 20 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Change protein card animations from staggered to strict sequential
- [x] Each card fully completes animation before next begins
- [x] Only trigger on scroll down (ignore scroll up)

**Files to Modify:**
- `src/components/about/About.jsx:123-1013`

**Current Behavior:**
- Cards animate with overlapping delays
- Cards: UQ (2016), Monash (2019), IGM (2022), UTS (2022), UniMelb (2025)

**New Behavior:**
- Use `onAnimationComplete` callbacks to chain animations
- Card 1 completes → trigger Card 2
- Card 2 completes → trigger Card 3
- etc.

**Specific Changes:**
- Modify `show2019Cards`, `show2022Cards`, `showUTSCard`, `show2025Cards` state triggers
- Add `onAnimationComplete` to motion.div components
- Remove or reduce delay values since cards now wait for previous completion

**Testing:**
- Scroll down slowly - each card should finish before next starts
- No overlapping animations
- Smooth cascade effect

---

## Group 4: Protein Card Width & Collapse Prevention 📏
**Estimated Time:** 15 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Prevent cards from collapsing toward center at intermediate desktop widths
- [x] Maintain 16.5% left/right positioning until mobile breakpoint
- [x] Cards should reach screen edges before collapsing

**Files to Modify:**
- `src/Styles/About.css:327-331` (existing breakpoint)
- Add new intermediate breakpoint rules

**Current Issue:**
```css
/* Cards use: width: min(500px, 30vw) */
/* At widths < 1667px, cards shrink due to 30vw */
```

**Solution:**
```css
/* Add intermediate breakpoints */
@media (min-width: 1200px) and (max-width: 1400px) {
  .about-card {
    width: min(480px, calc(100vw * 0.33 - 32px));
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .about-card {
    width: min(450px, calc(100vw * 0.35 - 32px));
  }
}

/* Ensure cards reach edges before collapse */
/* At 768px, switch to mobile layout */
```

**Testing:**
- Resize browser from 1920px down to 768px
- Cards should maintain position at 16.5% left/right
- No premature shrinking
- Clean collapse at 768px mobile breakpoint

---

## Group 5: Organelle Visuals - Size & Texture 🎨
**Estimated Time:** 25 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Reduce desktop organelle size from 220px to 170px
- [x] Add protein-like pattern/texture to organelles

**Files to Modify:**
- `src/components/work/WorkSection.jsx:86,158`
- `src/components/work/OrganelleNew.jsx:13` (default size prop)
- `src/Styles/Work.css:117-118` (base .organelle styles)

**Size Changes:**
```javascript
// WorkSection.jsx:86, 158
// Current: const organelleSize = isMobile ? 90 : 220;
// Change to: const organelleSize = isMobile ? 90 : 170;
```

**Texture Options (Choose One):**

**Option A - CSS Pattern:**
```css
.organelle::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 2px, transparent 2px),
              radial-gradient(circle at 70% 50%, rgba(255,255,255,0.15) 1.5px, transparent 1.5px),
              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.18) 2.5px, transparent 2.5px);
  background-size: 20px 20px, 15px 15px, 25px 25px;
  pointer-events: none;
}
```

**Option B - SVG Pattern (Recommended):**
- Add SVG pattern def in OrganelleNew.jsx
- Pattern with small circles/dots
- Apply as background-image

**Testing:**
- Organelles should appear smaller and less crowded
- Texture should be subtle but visible
- Texture should work in both light/dark modes

---

## Group 6: Organelle Scaling Bug Fix 🐛
**Estimated Time:** 20 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Fix text rearrangement glitch during organelle expansion
- [x] Prevent layout reflow during animation

**Files to Modify:**
- `src/components/work/OrganelleNew.jsx:27-89`
- `src/Styles/Work.css:112-248`

**Current Issue:**
- When organelle expands, text/icon jump around
- Layout recalculates during animation causing visual glitch

**Solution:**
```jsx
// OrganelleNew.jsx - Add these properties to motion.div
style={{
  // ... existing styles
  overflow: 'hidden', // Hide content during resize
}}

// Optionally: Pre-calculate layout
// Add will-change hint for browser optimization
willChange: active ? 'width, height, transform' : 'auto'
```

```css
/* Work.css - Ensure stable text positioning */
.organelle-title,
.organelle-icon,
.view-project {
  position: relative;
  will-change: transform;
  backface-visibility: hidden;
}
```

**Testing:**
- Click organelle to expand
- Text should scale smoothly without jumping
- No layout shift during animation
- Close animation should also be smooth

---

## Group 7: Membrane Collision Reactivity 💥
**Estimated Time:** 30 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Make membrane react more dramatically to organelle collisions
- [x] Add collision detection callback from physics to membrane
- [x] Increase membrane deformation at collision points

**Files to Modify:**
- `src/components/work/OrganellePhysics.js:182-213,373-380`
- `src/components/work/OrganicBlob.jsx:42-93`
- `src/components/work/WorkSection.jsx:59-121`

**Architecture:**
1. **Physics Manager:** Detect wall collisions, emit events
2. **WorkSection:** Pass collision data to OrganicBlob
3. **OrganicBlob:** Deform membrane at collision points

**Changes:**

**OrganellePhysics.js:**
```javascript
// Add collision tracking
this.recentCollisions = []; // Store recent collision points

// In handleEllipseBoundary():
if (distance >= 1) {
  // ... existing code

  // Record collision
  this.recentCollisions.push({
    x: organelle.x,
    y: organelle.y,
    timestamp: Date.now(),
    force: Math.abs(dot) // Impact strength
  });

  // Clear old collisions (> 500ms)
  this.recentCollisions = this.recentCollisions.filter(
    c => Date.now() - c.timestamp < 500
  );
}

// Add getter
getRecentCollisions() {
  return this.recentCollisions;
}
```

**WorkSection.jsx:**
```javascript
const [membraneCollisions, setMembraneCollisions] = useState([]);

// In update interval:
if (physicsManagerRef.current) {
  const collisions = physicsManagerRef.current.getRecentCollisions();
  setMembraneCollisions(collisions);
}
```

**OrganicBlob.jsx:**
```jsx
// Accept collision prop
export default function OrganicBlob({ children, isMobile, collisions = [] }) {

  // In generateOrganicBlobPath, apply local deformation at collision points
  // Increase radius where collisions occurred
}
```

**Testing:**
- Organelles should cause visible membrane ripples on collision
- Membrane should "bulge" at impact points
- Effect should fade over 500ms
- More dramatic than current subtle wobble

---

## Group 8: Academic Journey Timeline Layout 📐
**Estimated Time:** 60 minutes
**Status:** ✅ Completed (2025-10-23)
**Actual Implementation:** Timeline intro block + card repositioning (NOT 25/75 grid)

### Tasks Completed:
- [x] Added intro block (title/subtitle/description) at first card position (top left)
- [x] Fixed vertical overlapping of all protein cards
- [x] Corrected left/right positioning of cards (IGM to right, UTS to left)
- [x] Updated all year labels to align with cards
- [x] Adjusted laser animation heights
- [x] Increased timeline container height to 2600px

**Files Modified:**
- `src/components/about/About.jsx` - Lines 487-982
- `src/Styles/About.css:157-164` - Timeline height

**What Was Actually Implemented:**

Instead of a 25/75 grid (which broke absolute positioning), we:

1. **Added Intro Block** at top left (50px):
   - Title: "Academic Journey"
   - Subtitle: "From Biotechnology to Bioinformatics"
   - Description paragraph
   - Positioned at `left: 16.5%, top: 50px`
   - Hidden on mobile

2. **Fixed Card Vertical Spacing** (to prevent overlap):
   - Intro block: 50px (left)
   - UEM 2016: 50px (right) - aligned with 2016 label
   - UQ 2019: 600px (left) - 550px spacing
   - IGM 2022: 1150px (right) - 550px spacing
   - UTS 2022: 1400px (left) - 250px spacing (same year)
   - Lanzarote 2025: 1950px (right) - 550px spacing

3. **Fixed Card Left/Right Positioning**:
   - Card 3 (IGM): Changed from LEFT to RIGHT ✓
   - Card 4 (UTS): Changed from RIGHT to LEFT ✓

4. **Updated Year Labels** to match card positions:
   - 2016: 50px (at very top)
   - 2019: 600px
   - 2022: 1150px
   - 2025: 1950px

5. **Adjusted Laser Animations**:
   - Laser 1 (2016→2019): height 534px, starts at 66px
   - Laser 2 (2019→2022): height 534px, starts at 616px
   - Laser 3 (2022→2025): height 784px, starts at 1166px

6. **Timeline Container**: Increased from 2000px to 2600px

**Visual Order (top to bottom):**
```
Left Side                    Center                Right Side
-----------                  ------                -----------
Intro Block (50px)           • 2016 (50px)        UEM 2016 (50px)
                             |
UQ 2019 (600px)             • 2019 (600px)
                             |
                             • 2022 (1150px)      IGM 2022 (1150px)
UTS 2022 (1400px)            |
                             |
                             • 2025 (1950px)      Lanzarote 2025 (1950px)
```

**Testing Results:**
- ✅ Cards no longer overlap vertically
- ✅ 2016 year label at very top of timeline
- ✅ Correct zigzag pattern: L→R→L→R→L→R
- ✅ Intro block occupies first card position conceptually
- ✅ Proper spacing (550px between different years)
- ✅ Mobile layout unaffected (intro block hidden, cards stack)

---

## Group 9: Light Mode Text Readability 💡
**Estimated Time:** 10 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Fix AboutIntro section text readability in light mode
- [x] Adjust scroll-controlled opacity for better contrast

**Files to Modify:**
- `src/components/about/AboutIntro.jsx:46-60`
- `src/Styles/AboutIntro.css:72-92`

**Current Issue:**
```javascript
// AboutIntro.jsx:47
const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
// Starting at 0.5 opacity is too faint in light mode
```

**Solution:**
```javascript
// Option 1: Higher starting opacity
const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

// Option 2: Theme-aware opacity
const { isDark } = useTheme();
const opacity = useTransform(
  scrollYProgress,
  [0, 1],
  isDark ? [0.5, 1] : [0.75, 1]
);
```

**CSS Enhancement:**
```css
/* AboutIntro.css:89-92 */
body.light-theme .about-intro-line {
  /* Ensure sufficient contrast */
  color: rgba(31, 41, 55, 0.9); /* Darker, more readable */
  text-shadow: none;
}
```

**Testing:**
- Switch to light mode
- Scroll through AboutIntro section
- Text should be clearly readable at all scroll positions
- No strain to read at start of scroll

---

## Group 10: Section Spacing Optimization 📏
**Estimated Time:** 20 minutes
**Status:** ✅ Completed

### Tasks:
- [x] Review spacing between all major sections
- [x] Reduce excessive dead space
- [x] Ensure consistent flow

**Files to Modify:**
- `src/App.css`
- `src/Styles/AboutIntro.css`
- `src/Styles/About.css`
- `src/Styles/Work.css`
- `src/Styles/Blog.css`
- `src/Styles/Hero.css`

**Review Points:**
```css
/* Check these section spacings: */

/* Hero → AboutIntro */
.hero-section { padding-bottom: ?; }
.about-intro-section { padding-top: ?; }

/* AboutIntro → About (Timeline) */
.about-intro-section { padding-bottom: ?; }
.about-timeline { padding-top: ?; }

/* About → Work */
.about-section { padding-bottom: ?; }
.work-wrapper { padding-top: ?; }

/* Work → Blog */
.work-wrapper { padding-bottom: ?; }
.blog-wrapper { padding-top: ?; }
```

**Goal Spacing:**
- Consistent 5-10vh between major sections
- No more than 15vh dead space anywhere
- Smooth visual flow when scrolling

**Testing:**
- Full page scroll through all sections
- No awkward gaps
- Sections feel connected but distinct
- Mobile spacing also reviewed

---

## Progress Tracker

| Group | Name | Status | Date Completed |
|-------|------|--------|----------------|
| 1 | Blog Cleanup | ✅ | 2025-10-23 |
| 2 | Organelle Speed | ✅ | 2025-10-23 |
| 3 | Card Animations | ✅ | 2025-10-23 |
| 4 | Card Width | ✅ | 2025-10-23 |
| 5 | Organelle Visuals | ✅ | 2025-10-23 |
| 6 | Scaling Bug | ✅ | 2025-10-23 |
| 7 | Membrane Collisions | ✅ | 2025-10-23 |
| 8 | Sidebar Layout | ✅ | 2025-10-23 |
| 9 | Light Mode Text | ✅ | 2025-10-23 |
| 10 | Section Spacing | ✅ | 2025-10-23 |

---

## Notes

- Each group is designed to be completed in one message/session
- Groups are ordered by complexity (easiest first)
- Quick wins early for motivation
- Complex tasks at end when momentum is built
- Test after each group before moving to next
- Update checkboxes and dates as you go

---

## Dependencies

- Groups 1, 2, 9, 10: Independent, can be done in any order
- Group 3 should be done before Group 4 (both affect cards)
- Group 5 should be done before Group 6 (both affect organelles)
- Group 7 requires understanding from Group 2 (both physics)
- Group 8 is largest and most complex - save for when you have time
