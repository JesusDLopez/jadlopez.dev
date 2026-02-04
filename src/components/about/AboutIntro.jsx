import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../Styles/AboutIntro.css";

const AboutIntro = ({ animateOnLoad = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Scroll-linked animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
    // Line 1: Current professional activities
    line1: [
      "engineer data pipelines",
      "develop interactive reports",
      "craft data narratives",
      "translate research into tools",
      "automate research workflows"
    ],
    // INACTIVE - Future activities (uncomment when ready):
    // "build clinical software",
    // "model biological systems",
    // "design visual interfaces"

    // Line 2: Educational background (mixed: hard science + computing)
    line2: [
      "bioinformatics",
      "molecular biology",
      "data visualization",
      "biochemistry",
      "machine learning",
      "statistical genetics",
      "3D graphics programming",
      "pharmacology",
      "UX/UI principles",
      "genomics",
      "scientific visualization",
      "counseling theory",
      "thermodynamics",
      "software engineering"
    ],
    // INACTIVE - Future studies (uncomment when ready):
    // "cloud computing",
    // "full stack development",
    // "informatics"

    // Line 3: Target audiences (mixed collaborator types)
    line3: [
      "genetic counselors",
      "patients",
      "students",
      "clinical teams",
      "researchers",
      "families",
      "pharmacists",
      "startups",
      "clinicians",
      "dermatologists",
      "geneticists",
      "lab technicians"
    ]
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

  // Create scroll-linked animations for each line (used when animateOnLoad is false)
  // Title appears first (0-15% of scroll) - faster
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.05, 0.25], [50, 0]);

  // Lines appear sequentially as you scroll - compressed timeline
  const line1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.15, 0.35], [50, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

  const line3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.35, 0.55], [50, 0]);

  const line4Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const line4Y = useTransform(scrollYProgress, [0.45, 0.65], [50, 0]);

  // Time-based animation variants (used when animateOnLoad is true)
  const sequentialVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] // Smooth ease-out
      }
    })
  };

  return (
    <div ref={containerRef} className={containerClass}>
      <div className={blockClass}>
        <motion.h1
          className={titleClass}
          {...(animateOnLoad
            ? {
                initial: "hidden",
                animate: "visible",
                variants: sequentialVariants,
                custom: 0.1
              }
            : {
                style: { opacity: titleOpacity, y: titleY }
              }
          )}
        >
          ¡Hola!
        </motion.h1>

        <div className={contentClass}>
          <motion.p
            className={lineClass}
            {...(animateOnLoad
              ? {
                  initial: "hidden",
                  animate: "visible",
                  variants: sequentialVariants,
                  custom: 0.3
                }
              : {
                  style: { opacity: line1Opacity, y: line1Y }
                }
            )}
          >
            I'm <span className="emphasis-word">Jesús A. López O'Rourke</span>
          </motion.p>

          <motion.p
            className={lineClass}
            {...(animateOnLoad
              ? {
                  initial: "hidden",
                  animate: "visible",
                  variants: sequentialVariants,
                  custom: 0.5
                }
              : {
                  style: { opacity: line2Opacity, y: line2Y }
                }
            )}
          >
            I started in biotechnology, trained in genetic counseling,
            {!isMobile && <br />}
            {isMobile ? ' ' : ''}and now I{' '}
            <span className="rotating-word-wrapper">
              <span className={`${emphasisClass} rotating-word`}>
                {rotatingWords.line1[currentIndices.line1]}
              </span>
            </span>
          </motion.p>

          <motion.p
            className={lineClass}
            {...(animateOnLoad
              ? {
                  initial: "hidden",
                  animate: "visible",
                  variants: sequentialVariants,
                  custom: 0.7
                }
              : {
                  style: { opacity: line3Opacity, y: line3Y }
                }
            )}
          >
            I've studied{' '}
            <span className="rotating-word-wrapper">
              <span className={`${emphasisClass} rotating-word`}>
                {rotatingWords.line2[currentIndices.line2]}
              </span>
            </span>, supported patients, and
            {!isMobile && <br />}
            {isMobile ? ' ' : ''}translated science into practice
          </motion.p>

          <motion.p
            className={lineClass}
            {...(animateOnLoad
              ? {
                  initial: "hidden",
                  animate: "visible",
                  variants: sequentialVariants,
                  custom: 0.9
                }
              : {
                  style: { opacity: line4Opacity, y: line4Y }
                }
            )}
          >
            Now I build tools that guide{' '}
            <span className="rotating-word-wrapper">
              <span className={`${emphasisClass} rotating-word`}>
                {rotatingWords.line3[currentIndices.line3]}
              </span>
            </span>{' '}
            through genetics.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;

