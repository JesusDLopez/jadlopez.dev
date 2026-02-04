import React, { useState, useEffect } from "react";
import "../../Styles/AboutIntro.css";

const AboutIntroDuplicate = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use different class names for mobile vs desktop
  const sectionClass = isMobile ? "about-intro-section-mobile" : "about-intro-section";
  const containerClass = isMobile ? "about-intro-container-mobile" : "about-intro-container";
  const blockClass = isMobile ? "about-intro-block-mobile" : "about-intro-block";
  const titleClass = isMobile ? "about-intro-title-mobile" : "about-intro-title";
  const contentClass = isMobile ? "about-intro-content-mobile" : "about-intro-content";
  const lineClass = isMobile ? "about-intro-line-mobile" : "about-intro-line";
  const emphasisClass = isMobile ? "emphasis-word-mobile" : "emphasis-word";

  // Rotating words configuration
  const rotatingWords = {
    line1: ["visualise genomic data", "produce stats reports", "build web apps", "counsel patients in genetics"],
    line2: ["statistical genetics", "molecular biology", "thermodynamics", "counselling theory", "pharmacology", "genomic medicine", "software engineering"],
    line3: ["genetic counsellors", "students", "medical doctors", "researchers"]
  };

  const [currentIndices, setCurrentIndices] = useState({
    line1: 0,
    line2: 0,
    line3: 0
  });

  useEffect(() => {
    const TRANSITION_DURATION = 4000; // Must match CSS animation duration (4s)

    const intervals = {
      line1: setInterval(() => {
        setCurrentIndices(prev => ({
          ...prev,
          line1: (prev.line1 + 1) % rotatingWords.line1.length
        }));
      }, TRANSITION_DURATION),

      line2: setInterval(() => {
        setCurrentIndices(prev => ({
          ...prev,
          line2: (prev.line2 + 1) % rotatingWords.line2.length
        }));
      }, TRANSITION_DURATION + 500), // Slightly offset for variety

      line3: setInterval(() => {
        setCurrentIndices(prev => ({
          ...prev,
          line3: (prev.line3 + 1) % rotatingWords.line3.length
        }));
      }, TRANSITION_DURATION + 1000) // More offset
    };

    return () => {
      clearInterval(intervals.line1);
      clearInterval(intervals.line2);
      clearInterval(intervals.line3);
    };
  }, []);

  return (
    <section className={sectionClass}>
        <div className={containerClass}>
          <div className={blockClass}>
            <h1 className={titleClass} style={isMobile ? {
              // NUCLEAR OPTION: Force rendering on mobile with inline styles
              color: '#ff6b35',
              WebkitTextFillColor: '#ff6b35',
              background: 'none',
              backgroundClip: 'unset',
              WebkitBackgroundClip: 'unset',
              opacity: 1,
              visibility: 'visible',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
              willChange: 'auto',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            } : {}}>
              ¡Hola!
            </h1>

            <div className={contentClass}>
              <p className={lineClass} style={isMobile ? {
                color: 'rgba(255, 255, 255, 0.95)',
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.95)',
                background: 'none',
                backgroundClip: 'unset',
                WebkitBackgroundClip: 'unset',
                opacity: 1,
                visibility: 'visible',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : {}}>
                I'm <span className="emphasis-word">Jesús A. López O'Rourke</span>
              </p>

              <p className={lineClass} style={isMobile ? {
                color: 'rgba(255, 255, 255, 0.95)',
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.95)',
                background: 'none',
                backgroundClip: 'unset',
                WebkitBackgroundClip: 'unset',
                opacity: 1,
                visibility: 'visible',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : {}}>
                I started in biotechnology, trained in genetic counseling, and now I{' '}
                <span className="rotating-word-wrapper">
                  <span
                    className={`${emphasisClass} rotating-word`}
                    style={isMobile ? {color: 'white', WebkitTextFillColor: 'white', background: 'none', backgroundClip: 'unset', WebkitBackgroundClip: 'unset'} : {}}
                  >
                    {rotatingWords.line1[currentIndices.line1]}
                  </span>
                </span>
              </p>

              <p className={lineClass} style={isMobile ? {
                color: 'rgba(255, 255, 255, 0.95)',
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.95)',
                background: 'none',
                backgroundClip: 'unset',
                WebkitBackgroundClip: 'unset',
                opacity: 1,
                visibility: 'visible',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : {}}>
                I've studied{' '}
                <span className="rotating-word-wrapper">
                  <span
                    className={`${emphasisClass} rotating-word`}
                    style={isMobile ? {color: 'white', WebkitTextFillColor: 'white', background: 'none', backgroundClip: 'unset', WebkitBackgroundClip: 'unset'} : {}}
                  >
                    {rotatingWords.line2[currentIndices.line2]}
                  </span>
                </span>, supported patients, and translated
                {!isMobile && <br />}
                {isMobile ? ' ' : ''}science into practice
              </p>

              <p className={lineClass} style={isMobile ? {
                color: 'rgba(255, 255, 255, 0.95)',
                WebkitTextFillColor: 'rgba(255, 255, 255, 0.95)',
                background: 'none',
                backgroundClip: 'unset',
                WebkitBackgroundClip: 'unset',
                opacity: 1,
                visibility: 'visible',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : {}}>
                Now I build tools that guide{' '}
                <span className="rotating-word-wrapper">
                  <span
                    className={`${emphasisClass} rotating-word`}
                    style={isMobile ? {color: 'white', WebkitTextFillColor: 'white', background: 'none', backgroundClip: 'unset', WebkitBackgroundClip: 'unset'} : {}}
                  >
                    {rotatingWords.line3[currentIndices.line3]}
                  </span>
                </span>{' '}
                through genetics.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutIntroDuplicate;
