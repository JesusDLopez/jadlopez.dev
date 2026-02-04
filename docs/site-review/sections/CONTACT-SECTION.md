# 📬 Contact Section

**Last Updated:** January 13, 2026
**Related Docs:** [BLOG-SECTION.md](./BLOG-SECTION.md) | [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) | [MASTER-OVERVIEW.md](../MASTER-OVERVIEW.md)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [Form System](#form-system)
4. [Expandable Capabilities](#expandable-capabilities)
5. [Social Links](#social-links)
6. [Formspree Integration](#formspree-integration)
7. [Animation System](#animation-system)
8. [Nucleotide Color Coding](#nucleotide-color-coding)
9. [Accessibility Features](#accessibility-features)
10. [Mobile Responsiveness](#mobile-responsiveness)

---

## Overview

The Contact Section is a **minimalist contact interface** with expandable capabilities, social links, and a functional contact form.

### Design Philosophy

**Simplicity + Biological Metaphor**: Clean, professional contact form with DNA nucleotide colors marking capability categories.

### Key Features

- **Clean Layout**: Title, subtitle, expandable section, social links, form
- **Expandable Capabilities**: Collapsible "What I do" section with 4 categories
- **Nucleotide Color Coding**: ATCG colors marking different skill areas
- **Formspree Integration**: Serverless form submission
- **Social Links**: Email, GitHub, LinkedIn with icons
- **Form Validation**: Required fields, email validation
- **Status Messages**: Success/error feedback
- **Honeypot Protection**: Basic spam prevention

---

## Component Structure

### File Structure

```
src/
├── components/
│   └── Contact.jsx                   # Main contact component (290 lines)
└── styles/
    └── Contact.css                   # Contact styles
```

### Component Hierarchy

```
<Contact>
└── <main className="contact-wrapper-minimal">
    └── <div className="contact-container-minimal">
        ├── <motion.div className="contact-header-minimal">
        │   ├── <h1> Title
        │   └── <p> Subtitle
        ├── <motion.div className="expandable-section">
        │   ├── <button className="expand-trigger">
        │   │   ├── <span> "What I do"
        │   │   └── <FaChevronDown> Icon
        │   └── <AnimatePresence>
        │       └── <motion.div className="expandable-content">
        │           └── <div className="capabilities-grid">
        │               ├── <div className="capability-item"> × 4
        │               │   ├── <span className="nucleotide-dot adenine">
        │               │   ├── <h3> Category title
        │               │   └── <ul> Capabilities list
        └── <motion.div className="contact-section-minimal">
            ├── <h2> "Would love to hear from you..."
            ├── <div className="contact-buttons-minimal">
            │   ├── <a> Email (FaEnvelope)
            │   ├── <a> GitHub (FaGithub)
            │   └── <a> LinkedIn (FaLinkedin)
            └── <form className="contact-form-minimal">
                ├── <input name="name">
                ├── <input name="email">
                ├── <textarea name="message">
                ├── <input name="_gotcha"> (Honeypot)
                ├── <button type="submit">
                └── Status messages (success/error)
```

### State Management

**4 State Variables**:

```javascript
const [isWhatIDoExpanded, setIsWhatIDoExpanded] = useState(false);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const [formStatus, setFormStatus] = useState('idle');
// States: 'idle', 'submitting', 'success', 'error'
```

---

## Form System

### Form Fields

**3 Input Fields**:

```jsx
{/* Name Field */}
<input
  type="text"
  id="name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  placeholder="Name"
/>

{/* Email Field */}
<input
  type="email"
  id="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  required
  placeholder="Email"
/>

{/* Message Field */}
<textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  required
  rows="4"
  placeholder="Tell me about your project or opportunity..."
/>
```

### Form State Management

**Controlled Inputs**:

```javascript
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

**How It Works**:
1. User types in `name` field
2. `onChange` fires → `handleChange` called with `e`
3. `e.target.name` = `"name"`, `e.target.value` = `"John"`
4. Spread existing `formData`, update `name` field
5. `setFormData({ name: 'John', email: '', message: '' })`
6. Component re-renders with new value in input

**Why Spread Operator?**
- Preserves other fields (email, message) while updating one
- Pure function (doesn't mutate original state)

### Form Submission

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();              // Prevent default form submission (page reload)
  setFormStatus('submitting');     // Show "Sending..." button

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setTimeout(() => setFormStatus('idle'), 5000);      // Reset after 5s
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  } catch (error) {
    setFormStatus('error');
    setTimeout(() => setFormStatus('idle'), 5000);
  }
};
```

**Flow Diagram**:

```
User clicks "Send Message"
         ↓
preventDefault() (no page reload)
         ↓
Set status to 'submitting' (button shows "Sending...")
         ↓
POST to Formspree API with form data
         ↓
    ┌────────┴────────┐
    ↓                 ↓
Success (200)      Error (4xx/5xx)
    ↓                 ↓
Set 'success'    Set 'error'
Clear form       Keep form
    ↓                 ↓
    └────────┬────────┘
             ↓
After 5 seconds: Reset to 'idle'
```

### Form Validation

**Browser Validation**:
- `required` attribute → Prevents empty submission
- `type="email"` → Validates email format

**Custom Validation** (could add):

```javascript
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(formData.email)) {
    setFormStatus('error');
    return;
  }

  // ... rest of submit logic
};
```

---

## Expandable Capabilities

### Expandable Section Structure

**Toggle Button**:

```jsx
<button
  className="expand-trigger"
  onClick={() => setIsWhatIDoExpanded(!isWhatIDoExpanded)}
  aria-expanded={isWhatIDoExpanded}
>
  <span>What I do</span>
  <FaChevronDown
    className={`chevron-icon ${isWhatIDoExpanded ? 'rotated' : ''}`}
  />
</button>
```

**ARIA Attribute**: `aria-expanded={isWhatIDoExpanded}` tells screen readers if section is open/closed.

**Chevron Icon**: Rotates 180° when expanded (CSS transition).

### Framer Motion Collapse

**AnimatePresence + Height Animation**:

```jsx
<AnimatePresence>
  {isWhatIDoExpanded && (
    <motion.div
      className="expandable-content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Content */}
    </motion.div>
  )}
</AnimatePresence>
```

**How It Works**:
1. **Closed**: Component not rendered (`isWhatIDoExpanded === false`)
2. **Opening**:
   - `initial={{ height: 0, opacity: 0 }}`
   - Animates to `{ height: 'auto', opacity: 1 }`
   - Duration: 300ms
3. **Closing**:
   - Animates to `exit={{ height: 0, opacity: 0 }}`
   - Component removed from DOM after animation

**Why AnimatePresence?**
- Allows exit animations (component stays in DOM during animation)
- Without it, component disappears instantly

### Capabilities Grid

**4 Capability Categories**:

```jsx
<div className="capabilities-grid">
  {/* 1. Tools I build - Adenine Red */}
  <div className="capability-item">
    <div className="capability-header">
      <span className="nucleotide-dot adenine"></span>
      <h3>Tools I build</h3>
    </div>
    <ul>
      <li>Scientific web apps & visual platforms</li>
      <li>Statistical interactive reports for research and biotech teams</li>
    </ul>
  </div>

  {/* 2. Scientific engineering - Cytosine Blue */}
  <div className="capability-item">
    <div className="capability-header">
      <span className="nucleotide-dot cytosine"></span>
      <h3>Scientific engineering</h3>
    </div>
    <ul>
      <li>Functional prototypes for genomics & precision medicine</li>
      <li>Systems that connect data, biology, and human understanding</li>
    </ul>
  </div>

  {/* 3. AI workflows - Guanine Green */}
  <div className="capability-item">
    <div className="capability-header">
      <span className="nucleotide-dot guanine"></span>
      <h3>AI workflows</h3>
    </div>
    <ul>
      <li>Custom agent systems for research productivity</li>
      <li>AI-assisted pipelines and experimental coding environments</li>
    </ul>
  </div>

  {/* 4. Growing domain - Thymine Yellow */}
  <div className="capability-item">
    <div className="capability-header">
      <span className="nucleotide-dot thymine"></span>
      <h3>Growing domain</h3>
    </div>
    <ul>
      <li>Bioinformatics tooling (VCF, GWAS, variant analysis)</li>
      <li>Clinical genomics & data interpretation (in development)</li>
    </ul>
  </div>
</div>
```

**Grid Layout** (expected CSS):

```css
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 2rem;
}

@media (max-width: 768px) {
  .capabilities-grid {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }
}
```

**Visual Layout**:

**Desktop** (2×2 grid):
```
┌─────────────────────┬─────────────────────┐
│ 🔴 Tools I build    │ 🔵 Scientific eng.  │
│ • Web apps          │ • Prototypes        │
│ • Reports           │ • Data systems      │
├─────────────────────┼─────────────────────┤
│ 🟢 AI workflows     │ 🟡 Growing domain   │
│ • Agent systems     │ • Bioinformatics    │
│ • AI pipelines      │ • Clinical genomics │
└─────────────────────┴─────────────────────┘
```

**Mobile** (stacked):
```
┌─────────────────────┐
│ 🔴 Tools I build    │
│ • Web apps          │
│ • Reports           │
├─────────────────────┤
│ 🔵 Scientific eng.  │
│ • Prototypes        │
│ • Data systems      │
├─────────────────────┤
│ 🟢 AI workflows     │
│ • Agent systems     │
│ • AI pipelines      │
├─────────────────────┤
│ 🟡 Growing domain   │
│ • Bioinformatics    │
│ • Clinical genomics │
└─────────────────────┘
```

---

## Social Links

### Link Buttons

**3 Social Platforms**:

```jsx
<div className="contact-buttons-minimal">
  {/* Email */}
  <a
    href="mailto:your.email@example.com"
    className="contact-btn-minimal"
    aria-label="Send email"
  >
    <FaEnvelope />
    <span>Email</span>
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/JesusDLopez"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-btn-minimal"
    aria-label="Visit GitHub profile"
  >
    <FaGithub />
    <span>GitHub</span>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/jesus-lopez-orourke/"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-btn-minimal"
    aria-label="Visit LinkedIn profile"
  >
    <FaLinkedin />
    <span>LinkedIn</span>
  </a>
</div>
```

### React Icons

**Icons from `react-icons/fa`**:
- `FaEnvelope` → Email icon (✉️)
- `FaGithub` → GitHub logo
- `FaLinkedin` → LinkedIn logo
- `FaChevronDown` → Chevron/arrow down (expandable section)

**How React Icons Works**:

```javascript
import { FaEnvelope } from 'react-icons/fa';

<FaEnvelope />  // Renders as SVG icon
```

**Why React Icons?**
- **Lightweight**: Only imports used icons (tree-shaking)
- **Consistent**: All icons same size, same API
- **Accessible**: SVG icons scale perfectly
- **Customizable**: Can style with CSS (color, size)

### Link Attributes

**`target="_blank"`**: Opens link in new tab

**`rel="noopener noreferrer"`**: Security attributes
- **noopener**: Prevents new page from accessing `window.opener` (security)
- **noreferrer**: Doesn't send referrer header (privacy)

**`aria-label`**: Screen reader label (since icon-only buttons)

---

## Formspree Integration

### What is Formspree?

**Serverless Form Backend**: Third-party service that handles form submissions without backend code.

**How It Works**:

```
User fills form → Submits
         ↓
POST to Formspree API
         ↓
Formspree processes
         ↓
Sends email to your inbox
         ↓
Returns success/error response
         ↓
App shows status message
```

### Setup Steps

**1. Get Formspree ID**:
- Sign up at [formspree.io](https://formspree.io)
- Create new form
- Get form ID (e.g., `mvojzyqr`)

**2. Update Component**:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // Replace YOUR_FORM_ID with actual ID: mvojzyqr
```

**3. Configure Formspree**:
- Set email recipient
- Customize thank you message
- Enable spam filtering
- Set form name

### Alternative: Custom Backend

**Without Formspree** (requires backend):

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus('submitting');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // ... handle response
  } catch (error) {
    // ... handle error
  }
};
```

**Backend Route** (Node.js example):

```javascript
// /api/contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Send email via nodemailer, SendGrid, etc.
  await sendEmail({
    to: 'your@email.com',
    subject: `Contact from ${name}`,
    text: message,
    replyTo: email
  });

  res.json({ success: true });
});
```

---

## Animation System

### Staggered Entry Animations

**3 Sections with Incremental Delays**:

```javascript
// Header (no delay)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>

// Expandable section (0.05s delay)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
>

// Contact section (0.1s delay)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
>
```

**Animation Timeline**:

```
t=0s:     Header starts fading in (from 20px below)
t=0.05s:  Expandable section starts fading in
t=0.1s:   Contact section starts fading in
t=0.4s:   Header fully visible
t=0.45s:  Expandable section fully visible
t=0.5s:   Contact section fully visible
```

**Visual Effect**: Cascading appearance as user scrolls to section.

### Viewport Trigger

**`whileInView` Hook**:

```javascript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
```

**How It Works**:
- **viewport**: Intersection Observer settings
- **once: true**: Animate only on first view (not on scroll back)
- **amount: 0.3**: Trigger when 30% of element is visible

**Why 30%?**
- **Too Low (10%)**: Triggers too early (element still mostly hidden)
- **Too High (50%)**: Triggers late (user already scrolled past)
- **30%**: Sweet spot (visible but not fully scrolled past)

---

## Nucleotide Color Coding

### DNA Base Colors

**4 Nucleotides** mapped to capability categories:

| Nucleotide | Color | Category | Hex |
|------------|-------|----------|-----|
| **Adenine (A)** | Red | Tools I build | `#e74c3c` |
| **Cytosine (C)** | Blue | Scientific engineering | `#3498db` |
| **Guanine (G)** | Green | AI workflows | `#2ecc71` |
| **Thymine (T)** | Yellow | Growing domain | `#f39c12` |

**Why This Mapping?**
- **Adenine (Red)**: Tools = Foundation (A is first nucleotide)
- **Cytosine (Blue)**: Scientific = Systematic (C = structured)
- **Guanine (Green)**: AI = Growth (G = emerging tech)
- **Thymine (Yellow)**: Growing = In development (T = transitional)

### Nucleotide Dots

**Visual Markers**:

```jsx
<span className="nucleotide-dot adenine"></span>
<span className="nucleotide-dot cytosine"></span>
<span className="nucleotide-dot guanine"></span>
<span className="nucleotide-dot thymine"></span>
```

**Expected CSS**:

```css
.nucleotide-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.nucleotide-dot.adenine {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 0 8px rgba(231, 76, 60, 0.4);
}

.nucleotide-dot.cytosine {
  background: linear-gradient(135deg, #3498db, #2980b9);
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
}

.nucleotide-dot.guanine {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.4);
}

.nucleotide-dot.thymine {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  box-shadow: 0 0 8px rgba(243, 156, 18, 0.4);
}
```

**Visual Effect**: Small colored dots with gradient and glow, visually linking to DNA theme throughout portfolio.

---

## Accessibility Features

### Form Accessibility

**Labels and Placeholders**:

```jsx
<input
  type="text"
  id="name"
  name="name"
  placeholder="Name"
  required
/>
```

**Why No Explicit Labels?**
- **Placeholder as Label**: Placeholder text acts as label
- **Minimal Design**: Keeps form visually clean
- **Better Practice**: Add `aria-label` or hidden `<label>`:

```jsx
<label htmlFor="name" className="sr-only">Name</label>
<input id="name" name="name" placeholder="Name" />
```

### ARIA Attributes

**Expandable Section**:

```jsx
<button
  className="expand-trigger"
  aria-expanded={isWhatIDoExpanded}
>
  <span>What I do</span>
  <FaChevronDown />
</button>
```

**`aria-expanded`**: Tells screen readers if content is expanded or collapsed.

**Social Links**:

```jsx
<a
  href="mailto:your.email@example.com"
  aria-label="Send email"
>
  <FaEnvelope />
  <span>Email</span>
</a>
```

**Why aria-label?**
- **Icon Context**: Icon alone may not be clear to screen readers
- **Descriptive Action**: "Send email" more descriptive than "Email"

### Keyboard Navigation

**Tab Order**:
1. Expand trigger button
2. Email link
3. GitHub link
4. LinkedIn link
5. Name input
6. Email input
7. Message textarea
8. Submit button

**Enter Key**:
- On form submit button → Submits form
- On expand trigger → Toggles expansion

### Honeypot Anti-Spam

**Hidden Field**:

```jsx
<input
  type="text"
  name="_gotcha"
  style={{ display: 'none' }}
  tabIndex="-1"
  autoComplete="off"
/>
```

**How It Works**:
- **Invisible to humans**: `display: none`
- **Visible to bots**: Bots fill all fields automatically
- **Detection**: If `_gotcha` filled → Reject submission (spam)
- **tabIndex="-1"**: Keyboard skip (accessibility)
- **autoComplete="off"**: Prevents browser autofill

**Formspree Integration**: Formspree automatically checks `_gotcha` field.

---

## Mobile Responsiveness

### Layout Breakpoints

**768px Breakpoint**:

```css
/* Desktop (> 768px) */
.contact-container-minimal {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.capabilities-grid {
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
}

.contact-buttons-minimal {
  display: flex;
  gap: 1.5rem;
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
  .contact-container-minimal {
    padding: 2rem 1rem;
  }

  .capabilities-grid {
    grid-template-columns: 1fr; /* 1 column */
  }

  .contact-buttons-minimal {
    flex-direction: column; /* Stack vertically */
  }

  .contact-btn-minimal {
    width: 100%; /* Full width */
  }
}
```

### Form Row Breakpoint

**Desktop** (side-by-side):

```jsx
<div className="form-row">
  <div className="form-group-minimal">
    <input name="name" />
  </div>
  <div className="form-group-minimal">
    <input name="email" />
  </div>
</div>
```

**Expected CSS**:

```css
/* Desktop */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 equal columns */
  gap: 1.5rem;
}

/* Mobile */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr; /* Stack vertically */
  }
}
```

**Visual Change**:

**Desktop**:
```
┌─────────────────────┬─────────────────────┐
│ Name                │ Email               │
└─────────────────────┴─────────────────────┘
┌───────────────────────────────────────────┐
│ Message                                   │
└───────────────────────────────────────────┘
```

**Mobile**:
```
┌───────────────────────────────────────────┐
│ Name                                      │
├───────────────────────────────────────────┤
│ Email                                     │
├───────────────────────────────────────────┤
│ Message                                   │
└───────────────────────────────────────────┘
```

---

## Future Enhancements

### Potential Additions

1. **Email Validation Feedback**
   - **Current**: Browser validation only
   - **Enhancement**: Real-time validation with visual feedback
   - **Implementation**: onChange validation, show checkmark/error icon

2. **Character Counter**
   - **Current**: No length limits shown
   - **Enhancement**: "500/500 characters" counter on message field
   - **Implementation**: Track message.length, show remaining chars

3. **File Attachments**
   - **Current**: No file upload
   - **Enhancement**: Allow resume/portfolio PDF upload
   - **Implementation**: File input, Formspree file upload API

4. **Recaptcha Integration**
   - **Current**: Honeypot only
   - **Enhancement**: Google reCAPTCHA v3
   - **Implementation**: Invisible reCAPTCHA, score-based filtering

5. **Form Analytics**
   - **Current**: No tracking
   - **Enhancement**: Track form views, submissions, abandonment rate
   - **Implementation**: Google Analytics events

6. **Thank You Page**
   - **Current**: Inline success message
   - **Enhancement**: Redirect to `/thank-you` page
   - **Implementation**: React Router navigate on success

7. **Email Confirmation**
   - **Current**: No confirmation email
   - **Enhancement**: Send auto-reply to submitter
   - **Implementation**: Formspree auto-response or custom backend

8. **Social Proof**
   - **Current**: No testimonials
   - **Enhancement**: Client testimonials near contact form
   - **Implementation**: Testimonials component above form

9. **Availability Calendar**
   - **Current**: No availability shown
   - **Enhancement**: Calendly integration showing available times
   - **Implementation**: Embed Calendly widget

10. **Multi-Language Support**
    - **Current**: English only
    - **Enhancement**: Spanish translation toggle
    - **Implementation**: i18n library, language state

---

## Related Documentation

- [BLOG-SECTION.md](./BLOG-SECTION.md) - Previous section
- [HERO-SECTION.md](./HERO-SECTION.md) - First section (DNA helix)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) - Component hierarchy
- [STATE-MANAGEMENT.md](../architecture/STATE-MANAGEMENT.md) - Form state patterns
- [MASTER-OVERVIEW.md](../MASTER-OVERVIEW.md) - Full portfolio overview

---

## Quick Reference

### Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `Contact.jsx` | 290 | Main contact component |
| `Contact.css` | — | Contact styling |

### Form States

| State | Button Text | Behavior |
|-------|-------------|----------|
| **idle** | "Send Message" | Form ready, no feedback |
| **submitting** | "Sending..." | Button disabled, submitting |
| **success** | "Send Message" | Green message, form cleared, resets after 5s |
| **error** | "Send Message" | Red message, form intact, resets after 5s |

### Nucleotide Colors

| Class | Color | Category | Hex |
|-------|-------|----------|-----|
| `.adenine` | Red | Tools I build | `#e74c3c` |
| `.cytosine` | Blue | Scientific engineering | `#3498db` |
| `.guanine` | Green | AI workflows | `#2ecc71` |
| `.thymine` | Yellow | Growing domain | `#f39c12` |

### Social Links

| Platform | Icon | URL |
|----------|------|-----|
| **Email** | `<FaEnvelope>` | `mailto:your.email@example.com` |
| **GitHub** | `<FaGithub>` | `https://github.com/JesusDLopez` |
| **LinkedIn** | `<FaLinkedin>` | `https://www.linkedin.com/in/jesus-lopez-orourke/` |

### Animation Delays

| Section | Delay | Total Time to Visible |
|---------|-------|----------------------|
| **Header** | 0s | 0.4s |
| **Expandable** | 0.05s | 0.45s |
| **Contact Form** | 0.1s | 0.5s |

---

*This contact section balances minimalism with functionality, providing multiple contact methods while maintaining the portfolio's biological design language.*
