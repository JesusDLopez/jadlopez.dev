// src/components/Hero/Hero.jsx
import "../../styles/Hero.css";
import { useState, useEffect } from "react";
import DNAHelixScene from "./DNAHelixScene";
import HeroContent from "./HeroContent";
import InfoPanels from "./InfoPanels";

const HERO_TEXT_DELAY_MS = 3200;
const HERO_NAV_DELAY_MS = 2000;
const HERO_TITLE_STAGGER_SEC = 0;
const HERO_SUBTITLE_STAGGER_SEC = 0.25;

export default function Hero() {
  const [isSpinning, setIsSpinning] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hoveredNucleotide, setHoveredNucleotide] = useState(null);
  const [showText, setShowText] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [wiggleDuration, setWiggleDuration] = useState(0);
  const [forceInfoVisible, setForceInfoVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitingToScroll, setExitingToScroll] = useState(false);
  const [showInspectButton, setShowInspectButton] = useState(false);

  const INSPECT_FADE_DURATION = 1.5; // seconds before DNA settles to begin CTA fade-in

  const lockScroll = () => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("prevent-scroll");
    document.documentElement.classList.add("prevent-scroll");
  };

  const unlockScroll = () => {
    if (typeof window === "undefined") return;

    const scrollY = document.body.style.top;
    document.body.classList.remove("prevent-scroll");
    document.documentElement.classList.remove("prevent-scroll");
    document.body.style.top = "";

    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );

    // Lock scroll on mount - save position for mobile
    lockScroll();

    let observer;
    const checkUI = () => {
      if (document.body.classList.contains("reveal-ui")) {
        unlockScroll();
        setAnimationFinished(true);
        if (observer) {
          observer.disconnect();
        }
      }
    };

    observer = new MutationObserver(checkUI);
    checkUI();
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), HERO_TEXT_DELAY_MS);
    const navTimer = setTimeout(() => setShowNavbar(true), HERO_NAV_DELAY_MS);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };
  }, []);

  useEffect(() => {
    if (animationFinished) {
      setShowInspectButton(true);
    }
  }, [animationFinished]);

  // Add heavy-pulse state to body for theme toggle
  useEffect(() => {
    if (showInspectButton && isSpinning) {
      document.body.setAttribute('data-hero-ready', 'true');
    } else {
      document.body.removeAttribute('data-hero-ready');
    }
  }, [showInspectButton, isSpinning]);

  useEffect(() => {
    if (showNavbar) {
      document.body.classList.add("show-nav");
    }
  }, [showNavbar]);

  // Lock page scroll when inspecting the DNA and scroll to the top if needed
  useEffect(() => {
    if (!isSpinning) {
      lockScroll();
    } else if (animationFinished) {
      unlockScroll();
    }
  }, [isSpinning, animationFinished]);

  useEffect(() => {
    if (!isSpinning) {
      setForceInfoVisible(true);
    } else {
      setForceInfoVisible(false);
    }
  }, [isSpinning]);

  const toggleSpin = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // If currently not spinning (inspect mode) and about to scroll
    if (!isSpinning) {
      setExitingToScroll(true);
      setShowInfo(false);
      setHoveredNucleotide(null);
      setForceInfoVisible(false);

      // Animate out the text boxes before resuming spin
      setTimeout(() => {
        setIsSpinning(true);
        unlockScroll();

        setTimeout(() => {
          setIsTransitioning(false);
          setExitingToScroll(false);
        }, 500);
      }, 600); // Wait for text boxes to animate out
    } else {
      // Entering inspect mode - SCROLL BEFORE changing state
      // Remove scroll lock temporarily to allow scroll
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        // If not at top, scroll to top first
        unlockScroll();
        window.scrollTo(0, 0);

        // Wait a frame for scroll to complete, then lock again
        requestAnimationFrame(() => {
          lockScroll();

          setIsSpinning(false);
          setShowInfo(false);
          setHoveredNucleotide(null);

          setTimeout(() => {
            setIsTransitioning(false);
          }, 500);
        });
      } else {
        // Already at top, just change state
        lockScroll();
        setIsSpinning(false);
        setShowInfo(false);
        setHoveredNucleotide(null);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    }
  };

  return (
    <section className={`hero ${isSpinning ? "" : "inspect-mode"}`}>
      <div className="dna-background">
        <DNAHelixScene
          isSpinning={isSpinning}
          setShowInfo={setShowInfo}
          setHoveredNucleotide={setHoveredNucleotide}
          onWiggleDuration={setWiggleDuration}
        />
      </div>

      {/* Grid overlay now handled globally in App.jsx */}

      <HeroContent
        showText={showText}
        animationFinished={animationFinished}
        inspectReady={showInspectButton}
        isSpinning={isSpinning}
        toggleSpin={toggleSpin}
        disableToggle={isTransitioning}
        titleDelay={HERO_TITLE_STAGGER_SEC}
        subtitleDelay={HERO_SUBTITLE_STAGGER_SEC}
      />

      <InfoPanels
        isSpinning={isSpinning}
        showInfo={showInfo || forceInfoVisible}
        hoveredNucleotide={hoveredNucleotide}
        exitingToScroll={exitingToScroll}
      />
    </section>
  );
}
