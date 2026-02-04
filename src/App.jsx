// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Hero from "./components/hero/Hero";
import AboutIntroMerged from "./components/about/AboutIntroMerged";
import AcademicJourney from "./components/about/AcademicJourney";
import Work from "./components/work/WorkSection";
import Blog from "./components/blog/BlogSection";
import BlogPostPage from "./components/blog/BlogPostPage.jsx";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Layout from "./Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import SectionSpacer from "./components/common/SectionSpacer";
import PasswordGate from "./components/PasswordGate";

// Lazy load project reports
const HearingLossReport = lazy(() => import("./components/projects/HearingLoss"));
const MelanomaWorkshopReport = lazy(() => import("./components/projects/MelanomaWorkshop"));

import "./App.css";

function AboutPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Reset any height manipulations from HomePage
    document.body.style.height = '';
    document.body.style.minHeight = '';
    document.body.style.maxHeight = '';
    document.documentElement.style.height = '';
  }, []);

  return (
    <>
      {/* Hola + Banner Section */}
      <section
        id="about"
        className="screen-section section--about-merged"
      >
        <AboutIntroMerged animateOnLoad={true} />
      </section>

      {/* Academic Journey Timeline */}
      <section
        id="journey"
        className="screen-section section--auto-height"
      >
        <AcademicJourney />
      </section>

      <Footer />
    </>
  );
}

function WorkPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Reset any height manipulations from HomePage
    document.body.style.height = '';
    document.body.style.minHeight = '';
    document.body.style.maxHeight = '';
    document.documentElement.style.height = '';
  }, []);

  return (
    <>
      <Work mode="full" />
      <Footer />
    </>
  );
}

function HomePage() {
  useEffect(() => {
    const setCorrectPageHeight = () => {
      // Only run on desktop - mobile handles scroll naturally
      if (window.innerWidth <= 768) {
        // Reset any previous height manipulations on mobile
        document.body.style.height = '';
        document.body.style.minHeight = '';
        document.body.style.maxHeight = '';
        document.documentElement.style.height = '';
        return;
      }

      const contact = document.querySelector('.contact-wrapper-minimal');
      if (contact) {
        // Get where Contact actually ends visually
        const contactRect = contact.getBoundingClientRect();
        const contactBottom = contactRect.bottom + window.scrollY;

        // Force the page to end exactly where Contact ends
        document.body.style.height = `${contactBottom}px`;
        document.body.style.minHeight = `${contactBottom}px`;
        document.body.style.maxHeight = `${contactBottom}px`;
        document.documentElement.style.height = `${contactBottom}px`;
        document.documentElement.style.overflow = 'auto';
      }
    };

    // Run multiple times to catch layout changes
    setTimeout(setCorrectPageHeight, 100);
    setTimeout(setCorrectPageHeight, 500);
    setTimeout(setCorrectPageHeight, 1000);

    window.addEventListener('resize', setCorrectPageHeight);

    return () => window.removeEventListener('resize', setCorrectPageHeight);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="screen-section section--flush"
      >
        <Hero />
      </section>

      {/* NEW: Merged Hola + Banner Section */}
      <section
        id="about"
        className="screen-section section--about-merged"
      >
        <AboutIntroMerged />
      </section>

      {/* NEW: Standalone Academic Journey Section */}
      <section
        id="journey"
        className="screen-section section--auto-height"
      >
        <AcademicJourney />
      </section>

      {/* Work, Blog, Contact have their own <section> wrapper - no double wrapping */}
      <Work />
      <Blog />
      <Contact />

      {/* Footer - always at the bottom */}
      <Footer />
    </>
  );
}

function App() {
  const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

  // Check if password protection is enabled
  const isPasswordProtected = import.meta.env.VITE_ACCESS_PASSWORD;

  const appContent = (
    <ThemeProvider>
      <Router basename={basename}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog mode="full" />
              </Layout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Layout>
                <BlogPostPage />
              </Layout>
            }
          />
          <Route
            path="/work"
            element={
              <Layout>
                <WorkPage />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact mode="full" />
              </Layout>
            }
          />
          <Route
            path="/projects/hearing-loss-diabetes"
            element={
              <Layout>
                <Suspense fallback={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    color: 'var(--text-color)',
                    fontSize: '1.125rem'
                  }}>
                    Loading Hearing Loss Report...
                  </div>
                }>
                  <HearingLossReport />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/projects/melanoma-workshop"
            element={
              <Layout>
                <Suspense fallback={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    color: 'var(--text-color)',
                    fontSize: '1.125rem'
                  }}>
                    Loading Melanoma Workshop Report...
                  </div>
                }>
                  <MelanomaWorkshopReport />
                </Suspense>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );

  // Only wrap with PasswordGate if password is set
  if (isPasswordProtected) {
    return <PasswordGate>{appContent}</PasswordGate>;
  }

  return appContent;
}

export default App;
