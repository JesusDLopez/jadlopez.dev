import React from "react";

/**
 * ULTRA-SIMPLE Mobile Hola Section
 * Zero dependencies on existing CSS - completely self-contained
 * Only renders on screens <= 768px
 */
const SimpleHolaMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '2rem 1.5rem',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 100
      }}
    >
      <h1
        style={{
          fontSize: '72px',
          fontWeight: '700',
          margin: '0 0 2rem 0',
          color: '#ffffff',
          fontFamily: 'DM Sans, Arial, sans-serif'
        }}
      >
        ¡Hola!
      </h1>

      <p
        style={{
          fontSize: '20px',
          lineHeight: '1.6',
          margin: '0 0 1.5rem 0',
          color: '#e0e0e0',
          fontFamily: 'IBM Plex Serif, Georgia, serif'
        }}
      >
        I'm Jesús A. López O'Rourke.
      </p>

      <p
        style={{
          fontSize: '20px',
          lineHeight: '1.6',
          margin: '0 0 1.5rem 0',
          color: '#e0e0e0',
          fontFamily: 'IBM Plex Serif, Georgia, serif'
        }}
      >
        I started in biotechnology, trained in genetic counseling, and now I visualise genomic data.
      </p>

      <p
        style={{
          fontSize: '20px',
          lineHeight: '1.6',
          margin: '0 0 1.5rem 0',
          color: '#e0e0e0',
          fontFamily: 'IBM Plex Serif, Georgia, serif'
        }}
      >
        I've studied molecular biology, supported patients, and translated science into practice.
      </p>

      <p
        style={{
          fontSize: '20px',
          lineHeight: '1.6',
          margin: '0',
          color: '#e0e0e0',
          fontFamily: 'IBM Plex Serif, Georgia, serif'
        }}
      >
        Now I build tools that guide clinicians through genetics.
      </p>
    </div>
  );
};

export default SimpleHolaMobile;
