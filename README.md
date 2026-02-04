<div align="center">

# 🧬 Jesús D. López - Interactive Portfolio

### Bioinformatics meets Web Development

*Where science, data, and code converge into storytelling*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Portfolio-06b6d4?style=for-the-badge)](https://portfolio-kodas.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Portfolio_Repo-181717?style=for-the-badge&logo=github)](https://github.com/JesusDLopez/portfolio-kodas)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.176-000000?logo=three.js&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-7-F9A03C?logo=d3.js&logoColor=white)

</div>

---

## 🎭 About This Project

This portfolio is more than just a website—it's an **interactive scientific experience** that showcases the intersection of bioinformatics, data science, and creative web development.

Built entirely from scratch as a learning journey, this project transforms complex scientific concepts into engaging visual narratives using cutting-edge web technologies.

### 🌟 What Makes This Special

```
🧬 Biological Storytelling → Scientific metaphors guide the user experience
📊 Data Visualization    → Interactive D3.js charts bring data to life
🎨 3D Experiences        → Three.js animations create immersive environments
🌓 Adaptive Themes       → Seamless dark/light mode transitions
📱 Responsive Design     → Beautiful on any device
⚡ Modern Performance    → React 19, Vite 6, optimized for speed
```

---

## 🎯 Key Features

<table>
<tr>
<td width="50%">

### 🧪 **Interactive Scientific Reports**
Real research projects transformed into interactive web experiences with:
- Statistical visualizations
- Data-driven insights
- Educational content
- Publication-ready quality

</td>
<td width="50%">

### 🎨 **Biological Theme System**
Every element tells a story:
- **DNA Helix** animations
- **Organelles** as project containers
- **Cellular** navigation patterns
- **Molecular** design language

</td>
</tr>
<tr>
<td width="50%">

### 📝 **Dynamic Content System**
- Auto-discovering blog posts
- Modular project components
- Reusable visualization library
- Markdown-friendly content

</td>
<td width="50%">

### 🚀 **Modern Tech Stack**
Built with bleeding-edge technologies:
- React 19 with hooks
- React Router 7
- Framer Motion & GSAP
- Three.js for 3D graphics

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:------|:------------|
| **Frontend** | React 19 • React Router 7 |
| **3D Graphics** | Three.js • React Three Fiber • Drei |
| **Data Viz** | D3.js 7 • Custom charts |
| **Animation** | Framer Motion • GSAP |
| **Build** | Vite 6 • ESLint |
| **Styling** | CSS3 • CSS Variables • Responsive Design |
| **Deployment** | Vercel • CI/CD |

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm 7+ or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JesusDLopez/portfolio-kodas.git
cd portfolio-kodas

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** to see the magic happen! ✨

### Production Build

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
portfolio-kodas/
│
├── src/
│   ├── components/
│   │   ├── hero/          # Landing with 3D DNA animations
│   │   ├── about/         # Bio section with interactive elements
│   │   ├── work/          # Projects as biological organelles
│   │   ├── blog/          # Dynamic blog system
│   │   └── projects/      # Scientific report modules
│   │       ├── HearingLoss/      # Diabetes & hearing loss analysis
│   │       └── MelanomaWorkshop/ # Workshop evaluation report
│   │
│   ├── posts/             # Blog content (auto-discovered)
│   ├── contexts/          # Theme & global state
│   ├── Styles/            # Component-specific CSS
│   └── App.jsx            # Main app & routing
│
├── public/
│   ├── data/              # JSON datasets for visualizations
│   └── images/            # Static assets
│
└── docs/                  # Comprehensive documentation
    ├── guides/            # Development guides
    └── architecture/      # System design docs
```

---

## 🎨 Design Philosophy

This portfolio follows a unique **biological metaphor** design system:

```
DNA Helix      → Building blocks of identity
Cell Membrane  → Container and boundary
Organelles     → Specialized project modules
Nucleus        → Core skills and expertise
Cytoplasm      → Background and environment
```

### Theme System

A sophisticated **dark/light mode** system built with CSS custom properties, providing seamless transitions and consistent theming across all components.

---

## 🌐 Featured Projects

### 📊 Hearing Loss & Diabetes Study
Interactive statistical analysis exploring the relationship between diabetes and hearing loss in the elderly population.

**Tech:** D3.js visualizations • Statistical analysis • Educational flip cards

### 🎓 Melanoma Workshop Evaluation
Comprehensive evaluation report of a bioinformatics workshop with interactive feedback analysis.

**Tech:** Dumbbell charts • Likert scale visualizations • Performance metrics

---

## 📚 Documentation

Comprehensive guides for developers:

- **[📖 Portfolio Guide](./docs/guides/PORTFOLIO-GUIDE.md)** - Complete technical overview
- **[🧩 Components](./docs/guides/COMPONENTS.md)** - Reusable component library
- **[➕ Adding Projects](./docs/guides/ADDING-PROJECTS.md)** - How to add new content
- **[🤖 Claude Code Guide](./docs/GUIA-CLAUDE-CODE.md)** - AI-assisted development workflow (Spanish)

---

## 🎓 Learning Journey

This project was built **from zero to production** as a self-taught web development journey:

| Phase | Focus | Achievements |
|:------|:------|:------------|
| **Phase 1** | React Basics | Component architecture, JSX, props |
| **Phase 2** | Advanced React | Hooks, context, routing, state management |
| **Phase 3** | Visualization | D3.js integration, Three.js 3D scenes |
| **Phase 4** | Production | Performance optimization, deployment, CI/CD |

Every component, every line of code was written with intention and learning in mind.

---

## 🚢 Deployment

This portfolio is deployed on **Vercel** with automatic CI/CD:

- **Production:** [portfolio-kodas.vercel.app](https://portfolio-kodas.vercel.app)
- **Auto-deploy:** Push to `main` triggers deployment
- **Preview branches:** Every PR gets a preview URL

### Environment Variables

```bash
# vite.config.js
export default defineConfig({
  base: '/',           # Base URL for routing
  // ... other config
})
```

---

## 💡 Key Technical Highlights

### 🎯 Code Splitting & Lazy Loading
```jsx
const HearingLossReport = lazy(() => import('./components/projects/HearingLoss'));

<Suspense fallback={<Loading />}>
  <HearingLossReport />
</Suspense>
```

### 📊 D3 + React Integration
Seamless integration of D3's powerful data visualization with React's component lifecycle.

### 🎨 CSS Custom Properties
Dynamic theming system that cascades through all components for consistent design.

### 🧬 3D Graphics
Three.js scenes rendered with React Three Fiber for smooth, performant 3D experiences.

---

## 🛠️ Development

### Available Commands

```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
```

### Debug Tools

Built-in debug overlays for development:
- **🐛 Debug Overlay** - Scroll tracking, section monitoring
- **🎯 Design Overlay** - Grid lines, spacing visualization

---

## 🤝 Contributing

This is a personal portfolio project, but I'm always open to:
- 💡 Suggestions and feedback
- 🐛 Bug reports
- 🎨 Design ideas
- 📚 Documentation improvements

Feel free to open an issue or reach out!

---

## 📄 License

This project is open source for educational purposes. Feel free to learn from it, but please don't copy it wholesale for your own portfolio.

---

## 👨‍💻 About Me

**Jesús D. López**

Bioinformatician • Data Scientist • Web Developer

I bridge the gap between biological sciences and software development, creating tools and visualizations that make complex data accessible and engaging.

### Connect

- 🌐 [Portfolio](https://portfolio-kodas.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/jesus-d-lopez)
- 🐙 [GitHub](https://github.com/JesusDLopez)

---

## 🙏 Acknowledgments

Built with the support of:
- 📚 Official documentation (React, Vite, D3, Three.js)
- 🌍 Open source community
- 🤖 AI assistance (Claude Code) for debugging and learning
- ☕ Lots of coffee and determination

---

<div align="center">

### ⭐ If you find this project interesting, consider giving it a star!

**Built with passion, science, and code**

![Visitor Count](https://img.shields.io/badge/dynamic/json?color=06b6d4&label=visitors&query=value&url=https://api.countapi.xyz/hit/portfolio-kodas/readme)

*Last Updated: November 2025*

</div>
