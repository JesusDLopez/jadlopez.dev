import React from "react";
import "../../Styles/AboutIntro.css";

const AboutIntroMobile = ({ debugEnabled: debugEnabledProp = false }) => {
  const sectionRef = React.useRef(null);

  const effectiveDebug = React.useMemo(() => {
    if (debugEnabledProp) return true;
    if (typeof window === "undefined") return false;
    // Temporarily enabled to show debug overlay on mobile
    if (import.meta.env?.DEV) return true;
    const params = new URLSearchParams(window.location.search);
    return params.has("holaDebug") || params.get("debug") === "hola";
  }, [debugEnabledProp]);

  const [diagnostics, setDiagnostics] = React.useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : null,
    height: typeof window !== "undefined" ? window.innerHeight : null,
    scrollY: typeof window !== "undefined" ? window.scrollY : null,
    rectTop: null,
    rectBottom: null,
    rectHeight: null,
    visibility: "unknown",
    obstructingElement: "n/a"
  }));

  React.useEffect(() => {
    if (!effectiveDebug || typeof window === "undefined") return;

    let rafId = null;
    let lastUpdate = 0;
    const THROTTLE_MS = 500; // Only update every 500ms

    const updateDiagnostics = () => {
      const now = Date.now();
      if (now - lastUpdate < THROTTLE_MS) return;
      lastUpdate = now;

      const rect = sectionRef.current?.getBoundingClientRect();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scrollY = window.scrollY;
      let visibility = "unknown";

      if (rect) {
        if (rect.bottom < 0) {
          visibility = "above viewport";
        } else if (rect.top > height) {
          visibility = "below viewport";
        } else {
          visibility = "onscreen";
        }
      }

      let obstructingElement = "none";
      const probeY = Math.min(80, Math.round(height * 0.15));
      const elementAtTop = document.elementFromPoint(width / 2, probeY);
      if (elementAtTop) {
        const classList = elementAtTop.classList?.value || "";
        obstructingElement = `${elementAtTop.tagName.toLowerCase()}${classList ? "." + classList.replace(/\s+/g, ".") : ""}`;
      }

      setDiagnostics({
        width,
        height,
        scrollY,
        rectTop: rect?.top ?? null,
        rectBottom: rect?.bottom ?? null,
        rectHeight: rect?.height ?? null,
        visibility,
        obstructingElement
      });
    };

    const throttledUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateDiagnostics();
        rafId = null;
      });
    };

    updateDiagnostics();
    window.addEventListener("resize", throttledUpdate);
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    const intervalId = window.setInterval(updateDiagnostics, 2000);

    return () => {
      window.removeEventListener("resize", throttledUpdate);
      window.removeEventListener("scroll", throttledUpdate);
      window.clearInterval(intervalId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [effectiveDebug]);

  const rotatingActions = [
    "visualise genomic data",
    "design intelligent lab tools",
    "code for science teams",
    "automate variant workflows"
  ];

  const rotatingSubjects = [
    "genomic medicine",
    "molecular diagnostics",
    "clinical genetics pathways",
    "data storytelling for healthcare"
  ];

  const rotatingProfessions = [
    "genetic counsellors",
    "clinical teams",
    "research partners",
    "students"
  ];

  const [actionIndex, setActionIndex] = React.useState(0);
  const [subjectIndex, setSubjectIndex] = React.useState(0);
  const [professionIndex, setProfessionIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActionIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSubjectIndex((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const debugLines = [
    "Hola Debug",
    "----------------------",
    `viewport: ${diagnostics.width} x ${diagnostics.height}`,
    `scrollY : ${Math.round(diagnostics.scrollY ?? 0)}`,
    `rect.top: ${diagnostics.rectTop !== null ? Math.round(diagnostics.rectTop) : "n/a"}`,
    `rect.bottom: ${diagnostics.rectBottom !== null ? Math.round(diagnostics.rectBottom) : "n/a"}`,
    `rect.height: ${diagnostics.rectHeight !== null ? Math.round(diagnostics.rectHeight) : "n/a"}`,
    `visibility: ${diagnostics.visibility}`,
    `at 15% y: ${diagnostics.obstructingElement}`
  ].join("\n");

  const sharedLineStyle = {
    fontSize: "32px",
    color: "black",
    background: "lime",
    padding: "10px",
    margin: "0 0 2rem 0",
    display: "block",
    width: "100%",
    lineHeight: "1.5",
    fontFamily: "IBM Plex Serif, Georgia, serif",
    opacity: 1,
    visibility: "visible"
  };

  // Disabled - was flooding console
  // console.log('AboutIntroMobile: RENDERING with text:', {
  //   title: '¡Hola!',
  //   action: rotatingActions[actionIndex],
  //   debug: effectiveDebug
  // });

  return (
    <section
      ref={sectionRef}
      className="about-intro-section about-intro-mobile"
      style={
        effectiveDebug
          ? {
              outline: "4px dashed rgba(255, 255, 0, 0.8)",
              position: "relative"
            }
          : undefined
      }
    >
      <div
        className="about-intro-container"
        style={{
          display: "block",
          width: "100%",
          minHeight: "400px",
          opacity: 1,
          visibility: "visible",
          overflow: "visible",
          position: "relative",
          zIndex: 9999
        }}
      >
        <div
          className="about-intro-block"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            opacity: 1,
            visibility: "visible",
            overflow: "visible",
            position: "relative",
            zIndex: 10000
          }}
        >
          <h1
            className="about-intro-title"
            style={{
              fontSize: "120px",
              color: "#FF0000",
              background: "#FFFF00",
              border: "20px solid #00FF00",
              padding: "40px",
              margin: "20px",
              display: "block",
              width: "calc(100% - 40px)",
              minHeight: "200px",
              lineHeight: "1.2",
              fontFamily: "Arial, sans-serif",
              fontWeight: "900",
              opacity: 1,
              visibility: "visible",
              position: "relative",
              zIndex: 99999,
              textShadow: "0 0 20px red",
              boxShadow: "0 0 50px blue"
            }}
          >
            ¡HOLA! TEST TEXT
          </h1>
          <div className="about-intro-content">
            <p className="about-intro-line" style={sharedLineStyle}>
              I'm Jesús A. López O'Rourke.
            </p>
            <p className="about-intro-line" style={sharedLineStyle}>
              I started in biotechnology, trained in genetic counseling, and now I {rotatingActions[actionIndex]}.
            </p>
            <p className="about-intro-line" style={sharedLineStyle}>
              I've studied {rotatingSubjects[subjectIndex]}, supported patients, and translated science into practice.
            </p>
            <p className="about-intro-line" style={sharedLineStyle}>
              Now I build tools that guide {rotatingProfessions[professionIndex]} through genetics.
            </p>
          </div>
        </div>
      </div>
      {effectiveDebug && (
        <div className="hola-debug-overlay">
          <button
            type="button"
            className="hola-debug-refresh"
            onClick={() => setDiagnostics((prev) => ({ ...prev }))}
          >
            refresh
          </button>
          <pre>{debugLines}</pre>
        </div>
      )}
    </section>
  );
};

export default AboutIntroMobile;
