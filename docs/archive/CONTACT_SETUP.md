# Contact Section Setup Guide

## What's Been Built

The contact section has been completely redesigned with:

### Layout
- **Split Layout**: Left side (signature + services) | Right side (contact form)
- **Sticky Left Side**: On desktop, left side stays visible while scrolling
- **Mobile Responsive**: Stacks vertically on tablets and phones

### Features Implemented

#### Left Side
- ✅ **Animated Signature**: SVG stroke animation that triggers on scroll
- ✅ **Orbiting Social Icons**: 3 icons with rotation + sine-wave motion
- ✅ **Services Section**: Glass morphism card with placeholder services
- ✅ **Tagline**: Minimal call-to-action text

#### Right Side
- ✅ **Contact Form**: Full form with name, email, and message fields
- ✅ **Formspree Integration**: Ready to connect (needs your form ID)
- ✅ **Spam Protection**: Honeypot field included
- ✅ **Success/Error States**: Toast-style feedback messages
- ✅ **Form Validation**: HTML5 required fields

#### Design Features
- ✅ **Glass Morphism**: Subtle backdrop blur and transparency
- ✅ **Fade-in Animations**: Staggered entrance animations
- ✅ **Hover Effects**: Interactive button and card states
- ✅ **Responsive Typography**: Scales properly on all devices
- ✅ **Dark Mode Ready**: Uses CSS variables for theming

---

## Required Configuration

### 1. Update Formspree Form ID

In `src/components/Contact.jsx` line 28, replace:
```javascript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

With your actual Formspree form ID:
1. Go to https://formspree.io
2. Sign up and create a new form
3. Copy your form ID (e.g., `xpznabcd`)
4. Replace `YOUR_FORM_ID` with your ID

### 2. Update Social Links

In `src/components/OrbitingIcons.jsx`:
- Line 43: Replace `jesus.lopez@example.com` with your email
- Line 51: Replace `https://github.com/yourusername` with your GitHub
- Line 62: Replace `https://linkedin.com/in/yourprofile` with your LinkedIn

### 3. Customize Services (Later)

In `src/components/Contact.jsx` lines 62-68, you have placeholder services:
- Scientific Visualization
- Interactive Reports
- Creative Web Design

You mentioned you want to work hard on this section later - these are ready to be customized!

---

## Technical Details

### File Structure
```
src/
├── components/
│   ├── Contact.jsx          # Main contact component
│   ├── AnimatedSignature.jsx # SVG signature with GSAP animation
│   └── OrbitingIcons.jsx    # Social icons with sine-wave motion
└── styles/
    └── Contact.css          # All contact section styles
```

### Dependencies Used
- **React Hooks**: useState, useEffect, useRef
- **GSAP**: For signature stroke animation
- **Intersection Observer**: Scroll-triggered animations
- **Formspree**: Form backend (needs setup)

### Animations
1. **Signature**: Stroke draws on scroll + fills with color
2. **Orbit Icons**: Continuous rotation (20s) + sine wave (3px)
3. **Fade In Up**: Staggered delays (0.2s, 0.3s, 0.4s, 0.6s)
4. **Hover States**: Transform + shadow on buttons and cards

### Responsive Breakpoints
- **Desktop**: 1024px+ (split layout)
- **Tablet**: 768-1023px (stacked layout)
- **Mobile**: 480-767px (optimized spacing)
- **Small Mobile**: <480px (compact design)

---

## Testing Checklist

- [ ] Update Formspree form ID
- [ ] Update all social links with real URLs
- [ ] Test form submission
- [ ] Check mobile responsiveness (especially form fields)
- [ ] Verify signature animation triggers on scroll
- [ ] Test icon hover effects
- [ ] Review services description (customize later)
- [ ] Check accessibility (keyboard navigation, labels)

---

## Next Steps (From Your Plan)

According to `LAUNCH_PLAN.md`, after Contact section:

1. **Pre-Launch Final Checks** (Phase 11)
   - SEO metadata
   - Lighthouse audit
   - Cross-browser testing
   - Spell check

2. **Launch** (Phase 12)
   - Deploy to production
   - Announce on social media

---

## Notes

- Form uses honeypot `_gotcha` field for spam protection
- All external links open in new tabs with `noopener noreferrer`
- Touch targets are 44px minimum for mobile accessibility
- Glass morphism works best on dark backgrounds
- Signature uses Space Grotesk font (matches your brand)
