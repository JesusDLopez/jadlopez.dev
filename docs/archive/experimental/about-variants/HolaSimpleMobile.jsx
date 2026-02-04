import React from "react";

/**
 * NUCLEAR OPTION: Ultra-simple mobile Hola component
 *
 * This component uses ONLY inline styles to completely bypass CSS conflicts.
 * Maximum z-index, fixed positioning, and solid colors ensure visibility.
 *
 * If this doesn't show text on mobile, the problem is browser-level (cache/rendering bug).
 */
const HolaSimpleMobile = () => {
  console.log("🚀 HolaSimpleMobile: RENDERING - If you see this, component is loading!");

  // Container style - relative positioning that flows with page
  const containerStyle = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    padding: "80px 20px 60px 20px",
    margin: 0,
    backgroundColor: "#1a1a1a", // Dark background
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    zIndex: 1, // Normal stacking, not covering everything
    overflow: "visible"
  };

  // Title style - IMPOSSIBLE TO MISS
  const titleStyle = {
    fontSize: "80px",
    fontWeight: "900",
    color: "#FF6B35", // Bright orange
    background: "transparent",
    margin: "0 0 40px 0",
    padding: "20px",
    lineHeight: "1",
    fontFamily: "DM Sans, Arial, sans-serif",
    display: "block",
    width: "100%",
    textAlign: "left",
    zIndex: 100000,
    WebkitFontSmoothing: "antialiased",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    letterSpacing: "0.05em"
  };

  // Content text style - Bright and visible
  const textStyle = {
    fontSize: "24px",
    fontWeight: "400",
    color: "#FFFFFF", // Pure white
    background: "transparent",
    margin: "0 0 24px 0",
    padding: "10px 20px",
    lineHeight: "1.6",
    fontFamily: "IBM Plex Serif, Georgia, serif",
    display: "block",
    width: "100%",
    zIndex: 100000
  };

  const emphasisStyle = {
    fontWeight: "600",
    color: "#FF8E53" // Lighter orange for emphasis
  };

  return (
    <section style={containerStyle}>
      {/* Debug console log on render */}
      {console.log("✅ HolaSimpleMobile: SECTION RENDERED")}

      {/* Title */}
      <h1 style={titleStyle}>
        ¡Hola!
      </h1>

      {/* Content */}
      <div style={{ width: "100%", zIndex: 100000 }}>
        <p style={textStyle}>
          I'm <span style={emphasisStyle}>Jesús A. López O'Rourke</span>.
        </p>

        <p style={textStyle}>
          I started in biotechnology, trained in genetic counseling, and now I <span style={emphasisStyle}>visualise genomic data</span>.
        </p>

        <p style={textStyle}>
          I've studied <span style={emphasisStyle}>genomic medicine</span>, supported patients, and translated science into practice.
        </p>

        <p style={textStyle}>
          Now I build tools that guide <span style={emphasisStyle}>genetic counsellors</span> through genetics.
        </p>
      </div>

      {/* Visual confirmation - visible debug box at bottom */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(255, 107, 53, 0.9)",
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 999999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}>
        HolaSimpleMobile Active ✓<br/>
        Width: {window.innerWidth}px
      </div>
    </section>
  );
};

export default HolaSimpleMobile;
