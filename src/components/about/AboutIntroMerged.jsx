// src/components/about/AboutIntroMerged.jsx
// Merged component: Hola intro text + Skills banner
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AboutIntro from "./AboutIntro";
import SkillsBannerGlass from "../SkillsBannerGlass";
import "../../Styles/AboutIntroMerged.css";

function AboutIntroMerged({ animateOnLoad = false }) {
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

  return (
    <div className="about-intro-merged-wrapper">
      {/* Hola section - top portion */}
      <div className={`about-intro-section ${isMobile ? "about-intro-section-mobile" : ""}`}>
        <AboutIntro animateOnLoad={animateOnLoad} />
      </div>

      {/* Skills Banner - bottom portion */}
      <div className="skills-section-merged">
        <div className="skills-banners-container">
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={3}
            speed={100}
          />
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={2}
            speed={120}
          />
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={1}
            speed={140}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutIntroMerged;
