import React, { useState, useEffect } from "react";

const HolaBrandNew = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use fixed positioning on mobile to ensure visibility
  const containerStyle = isMobile ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    minHeight: '100vh',
    padding: '80px 20px 20px 20px',
    zIndex: 10,
    overflow: 'auto'
  } : {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    zIndex: 10
  };

  return (
    <div style={containerStyle}>
      <h1 style={{
        fontSize: '80px',
        color: '#ff6b35',
        fontWeight: 'bold',
        margin: '0 0 40px 0',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 99999,
        WebkitTextFillColor: '#ff6b35',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textShadow: '0 0 1px rgba(0,0,0,0.01)',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        ¡HOLA! TEST
      </h1>

      <p style={{
        fontSize: '24px',
        color: 'white',
        margin: '0 0 20px 0',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 99999,
        WebkitTextFillColor: 'white',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        I'm Jesús A. López O'Rourke.
      </p>

      <p style={{
        fontSize: '24px',
        color: 'white',
        margin: '0 0 20px 0',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 99999,
        WebkitTextFillColor: 'white',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        I started in biotechnology, trained in genetic counseling, and now I visualise genomic data.
      </p>

      <p style={{
        fontSize: '24px',
        color: 'white',
        margin: '0 0 20px 0',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 99999,
        WebkitTextFillColor: 'white',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        I've studied genomic medicine, supported patients, and translated science into practice.
      </p>

      <p style={{
        fontSize: '24px',
        color: 'white',
        margin: '0',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 99999,
        WebkitTextFillColor: 'white',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}>
        Now I build tools that guide genetic counsellors through genetics.
      </p>
    </div>
  );
};

export default HolaBrandNew;
