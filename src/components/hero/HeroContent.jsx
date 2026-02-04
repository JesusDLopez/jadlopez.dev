// src/components/Hero/HeroContent.jsx
import { motion } from "framer-motion";

export default function HeroContent({
  showText,
  animationFinished,
  isSpinning,
  toggleSpin,
  disableToggle,
  inspectReady,
  titleDelay = 0.5,
  subtitleDelay = 0.7,
}) {
  // Slower entry for the title and subtitle for a smoother feel
  const textDuration = 1.2;
  return (
    <>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={showText ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: titleDelay, duration: textDuration, ease: "easeOut" }}
        >
          Jesús López O'Rourke
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: subtitleDelay, duration: textDuration, ease: "easeOut" }}
        >
          Clinical Genomics and Data Science
        </motion.p>
      </motion.div>

      <motion.button
        className={`spin-toggle ${!isSpinning ? 'active' : ''} ${inspectReady && isSpinning ? 'heavy-pulse' : ''}`}
        onClick={toggleSpin}
        style={{ x: '-50%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inspectReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: textDuration, ease: "easeOut" }}
        disabled={!animationFinished || disableToggle}
      >
        {isSpinning ? "Inspect DNA" : "Click to scroll"}
      </motion.button>
    </>
  );
}
