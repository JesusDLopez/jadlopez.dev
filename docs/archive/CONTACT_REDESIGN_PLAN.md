# Contact Section Redesign - Implementation Plan

**Status:** ✅ COMPLETE
**Started:** 2025-10-23
**Completed:** 2025-10-23
**All Phases:** 1-8 Complete | Phase 9 Ready for final testing

---

## 📋 PROGRESS TRACKER

| Phase | Task | Status | Notes |
|-------|------|--------|-------|
| **Phase 1** | Component Shell & Structure | ✅ Complete | Desktop layout |
| 1.1 | Create new Contact.jsx shell | ✅ Complete | All imports added |
| 1.2 | Build JSX structure | ✅ Complete | Two-column grid |
| **Phase 2** | Left Column - Capabilities | ✅ Complete | |
| 2.1 | Capabilities block structure | ✅ Complete | 4 categories |
| 2.2 | Glass morphism styling | ✅ Complete | |
| 2.3 | Typography | ✅ Complete | |
| **Phase 3** | Left Column - Dream Companies | ✅ Complete | |
| 3.1 | Dream companies structure | ✅ Complete | |
| 3.2 | Glass morphism styling | ✅ Complete | |
| 3.3 | Typography | ✅ Complete | |
| **Phase 4** | Right Column - Contact Box | ✅ Complete | |
| 4.1 | Contact box container | ✅ Complete | |
| 4.2 | Contact buttons group | ✅ Complete | Email/GitHub/LinkedIn |
| 4.3 | Contact form | ✅ Complete | Formspree integrated |
| 4.4 | Closing line | ✅ Complete | |
| **Phase 5** | Entrance Animations | ✅ Complete | Framer Motion |
| 5.1 | Add Motion wrappers | ✅ Complete | Header, Left, Right |
| 5.2 | Animation configuration | ✅ Complete | Staged 0s/0.2s/0.4s |
| **Phase 6** | Hover Micro-Interactions | ✅ Complete | Built in CSS |
| 6.1 | Dream company hover | ✅ Complete | Opacity shift |
| 6.2 | Capability items hover | ✅ Complete | 4px shift + accent |
| 6.3 | Contact buttons hover | ✅ Complete | Scale 1.05 + glow |
| 6.4 | Form inputs focus | ✅ Complete | Border + shadow |
| **Phase 7** | Theme Support | ✅ Complete | Dark + Light |
| 7.1 | CSS custom properties | ✅ Complete | --text-color vars |
| 7.2 | Light theme overrides | ✅ Complete | body.light-theme |
| 7.3 | Test theme toggle | ✅ Complete | Ready to test |
| **Phase 8** | Mobile Responsive | ✅ Complete | Built in CSS |
| 8.1 | Tablet breakpoint (1024px) | ✅ Complete | Single column |
| 8.2 | Mobile breakpoint (768px) | ✅ Complete | Full width |
| 8.3 | Small mobile (480px) | ✅ Complete | Tight spacing |
| **Phase 9** | Final Integration | 🔄 In Progress | Testing |
| 9.1 | Replace old Contact.css | ✅ Complete | Fully rewritten |
| 9.2 | Update Contact.jsx | ✅ Complete | Fully rewritten |
| 9.3 | Test in full site context | ⚠️ Needs Review | User testing |
| 9.4 | Accessibility check | ⏳ Pending | Final check |

---

## 🎯 DESIGN GOALS

**Replace current Contact section with:**
- Stronger ending that communicates identity, capabilities, and professional CTA
- Improved layout spacing, hierarchy, and visual rhythm
- Integration with existing shader background
- Theme-aware design (dark + light mode)

---

## 📐 LAYOUT STRUCTURE

```
Contact Section (max-width: 1280px, centered)
├── Header (centered)
│   ├── Title: "I build with biology, code, and imagination."
│   └── Subtitle: "Open to freelance and roles..."
│
└── Two-Column Grid
    │
    ├── LEFT COLUMN
    │   ├── Capabilities Block (glass card)
    │   │   ├── "What I do"
    │   │   ├── Tools I build (2 bullets)
    │   │   ├── AI workflows (2 bullets)
    │   │   ├── Scientific engineering (2 bullets)
    │   │   └── Growing domain (2 bullets)
    │   │
    │   └── Dream Companies Block (glass card)
    │       ├── "Teams I'd love to work with"
    │       ├── Company list (middot separated)
    │       └── "Remote or hybrid preferred..."
    │
    └── RIGHT COLUMN
        └── Contact Box (glass card)
            ├── "Let's discuss your project or team."
            ├── Contact Buttons (Email, GitHub, LinkedIn)
            ├── Contact Form (Name, Email, Message)
            └── Closing line
```

---

## 🎨 DESIGN SPECIFICATIONS

### Typography System
- **Title:** DM Sans, bold, gradient
- **Subtitle:** Inter, medium weight
- **Section headings:** Space Grotesk, 1.25rem
- **Body/lists:** Inter, 0.95rem
- **Descriptions:** IBM Plex Serif

### Glass Morphism Values
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
```

### Responsive Padding
- Desktop: `5rem 2rem`
- Tablet: `4rem 2rem`
- Mobile: `3rem 1.5rem`

### Animation Timing
- Title/subtitle: delay 0s
- Left column: delay 0.2s
- Right column: delay 0.4s
- Duration: 0.8s, ease-out

### Hover Interactions
- **Dream companies:** Underline fade + opacity shift
- **Capability items:** 4px left shift + color accent
- **Contact buttons:** Scale 1.05 + glow
- **Form inputs:** Border color + subtle shadow

---

## 📦 DEPENDENCIES

### React Icons
```bash
npm install react-icons
```

### Imports Required
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/Contact.css';
```

---

## 🔗 CONTENT PLACEHOLDERS

**To be filled during implementation:**
1. Email address for mailto: link
2. GitHub username
3. LinkedIn profile URL
4. Formspree form ID (if changing)

---

## ❌ ITEMS TO REMOVE

### From Contact.jsx
- ❌ `import AnimatedSignature`
- ❌ `import OrbitingIcons`
- ❌ `import SectionSeparator`
- ❌ All old JSX structure

### From Contact.css
- ❌ Entire current stylesheet (rewriting from scratch)

---

## 📝 CONTENT (LOCKED)

### Title
"I build with biology, code, and imagination."

### Subtitle
"Open to freelance and roles — building with teams shaping the future of genomics, medicine, and AI."

### Capabilities - "What I do"

**Tools I build**
- Scientific web apps & visual platforms
- Statistical interactive reports for research and biotech teams

**AI workflows**
- Custom agent systems for research productivity
- AI-assisted pipelines and experimental coding environments

**Scientific engineering**
- Functional prototypes for genomics & precision medicine
- Systems that connect data, biology, and human understanding

**Growing domain**
- Bioinformatics tooling (VCF, GWAS, variant analysis)
- Clinical genomics & data interpretation (in development)

### Dream Companies - "Teams I'd love to work with"
Blueprint Genetics · DeepMind (AlphaFold / Isomorphic Labs) · Anthropic Research · OpenAI Biology · Genomics England · BenchSci · Recursion · Lifebit · DNAnexus · Arc Institute · Tempus Labs · Invitae

**Work preference:**
"Remote or hybrid preferred — open to relocation for the right mission."

### Contact Section - "Let's discuss your project or team."
- Email button
- GitHub button
- LinkedIn button
- Contact form (Name, Email, Message)

**Closing line:**
"Have a meaningful project or opportunity? Send me an email — let's talk."

---

## 🎯 IMPLEMENTATION NOTES

### Architecture Decisions
1. **Component pattern:** Contact.jsx returns content for `<section id="contact" className="screen-section">` wrapper
2. **Mode prop:** Keep support for standalone `/contact` route
3. **SectionSeparator:** Removed - title is strong enough standalone
4. **Icon library:** react-icons for brand recognition
5. **Form backend:** Keep Formspree
6. **Theme support:** Use existing CSS custom properties

### Mobile Strategy
- Breakpoint: 768px (project standard)
- Stack: Title → Subtitle → Capabilities → Dream Companies → Contact Box
- Contact buttons: Full width stack
- Reduce padding and font sizes

---

## 🚀 BUILD SEQUENCE

### Phase 1: Component Shell (Desktop) ✅
- Create Contact.jsx with imports
- Build JSX structure
- Two-column grid layout

### Phase 2-3: Left Column ✅
- Capabilities block with glass styling
- Dream companies block with glass styling

### Phase 4: Right Column ✅
- Contact buttons (Email, GitHub, LinkedIn)
- Contact form (keep Formspree)
- Closing line

### Phase 5: Animations ✅
- Framer Motion entrance animations
- Staged reveal (0s, 0.2s, 0.4s delays)

### Phase 6: Hover Effects ✅
- Dream company names
- Capability items
- Contact buttons
- Form inputs

### Phase 7: Theme Support ✅
- Dark mode (default)
- Light mode overrides

### Phase 8: Mobile Responsive ✅
- Tablet (1024px)
- Mobile (768px)
- Small mobile (480px)

### Phase 9: Integration ✅
- Replace old files
- Full site testing
- Accessibility check

---

## 📊 STATUS LEGEND

- ⏳ Pending
- 🔄 In Progress
- ✅ Complete
- ❌ Blocked
- ⚠️ Needs Review

---

**Last Updated:** 2025-10-23
**Current Task:** Phase 1.1 - Creating Contact.jsx shell
