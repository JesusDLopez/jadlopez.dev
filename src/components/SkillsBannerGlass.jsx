import { useMemo } from "react";
import "../Styles/SkillsBannerGlass.css";
import { getWeightedConnector } from "../data/geneConnectors";

const SkillsBannerGlass = ({
  direction = "right-to-left", // "right-to-left" or "left-to-right"
  inclination = 0, // Rotation in degrees (small values like -1, 0, 1)
  zIndex = 1, // For stacking order
  speed = 100 // Animation duration in seconds (default 100s)
}) => {
  // No entry animations - banners are just present

  // Skills organized as genomic regions - Exons, UTRs, and Regulatory elements
  // Visual metaphor: different DNA regions = different skill categories
  // EXPANDED to 38 items: comprehensive showcase of interdisciplinary expertise
  const skills = [
    // EXONS (Core programming languages/frameworks)
    { name: "Python", type: "exon", category: "technical" },
    { name: "R", type: "exon", category: "technical" },
    { name: "JavaScript", type: "exon", category: "technical" },
    { name: "React", type: "exon", category: "technical" },

    // UTRs (Domain expertise & Key Concepts)
    { name: "Statistical Genomics", type: "utr", category: "domain" },
    { name: "Clinical Genetics", type: "utr", category: "domain" },
    { name: "Genetic Counseling", type: "utr", category: "domain" },
    { name: "Variant Interpretation", type: "utr", category: "domain" },
    { name: "Bioinformatics", type: "utr", category: "domain" },

    // REGULATORY (Technical tools, libraries, methods)
    { name: "Pandas", type: "regulatory", category: "tools" },
    { name: "NumPy", type: "regulatory", category: "tools" },
    { name: "Scikit-learn", type: "regulatory", category: "tools" },
    { name: "Tidyverse", type: "regulatory", category: "tools" },
    { name: "ggplot2", type: "regulatory", category: "tools" },
    { name: "D3.js", type: "regulatory", category: "tools" },
    { name: "Three.js", type: "regulatory", category: "tools" },
    { name: "Blender", type: "regulatory", category: "tools" },
    { name: "UI/UX Design", type: "regulatory", category: "tools" },
    { name: "Data Storytelling", type: "regulatory", category: "tools" },
    { name: "Git", type: "regulatory", category: "tools" },
    { name: "GitHub", type: "regulatory", category: "tools" },
    { name: "SQL", type: "regulatory", category: "tools" },
  ];

  // Create genomic code sequence with skills and connectors
  const genomicSequence = useMemo(() => {
    // Smart shuffle that prevents more than 3 consecutive items of same type
    const smartShuffle = (array) => {
      const shuffled = [...array];
      const maxAttempts = 1000;
      let attempts = 0;

      while (attempts < maxAttempts) {
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Check if we have more than 3 consecutive items of same type
        let hasLongRun = false;
        for (let i = 0; i < shuffled.length - 3; i++) {
          if (
            shuffled[i].type === shuffled[i + 1].type &&
            shuffled[i].type === shuffled[i + 2].type &&
            shuffled[i].type === shuffled[i + 3].type
          ) {
            hasLongRun = true;
            break;
          }
        }

        if (!hasLongRun) {
          return shuffled; // Good shuffle, return it
        }

        attempts++;
      }

      // Fallback: if we couldn't find a good shuffle, return last attempt
      return shuffled;
    };

    const shuffledSkills = smartShuffle(skills);

    // Inject connectors (introns) between skills with bundling logic
    const sequence = [];
    let bundleCount = 0; // Track consecutive items without connectors

    shuffledSkills.forEach((skill, index) => {
      sequence.push({ ...skill, id: `skill-${index}` });

      // Don't add connector after last skill
      if (index < shuffledSkills.length - 1) {
        // Bundling logic: 40% chance to skip connector (bundle items together)
        // But never bundle more than 3 items in a row
        const shouldBundle = Math.random() < 0.4 && bundleCount < 2;

        if (shouldBundle) {
          // Skip connector - items will appear bundled together
          bundleCount++;
        } else {
          // Add connector (intron)
          const connector = getWeightedConnector();
          sequence.push({
            ...connector,
            type: 'intron',
            id: `${connector.id}-${index}`
          });
          bundleCount = 0; // Reset bundle counter
        }
      }
    });

    // Duplicate sequence for seamless loop
    return [...sequence, ...sequence];
  }, []); // Empty deps - only generate once on mount

  return (
    <div
      className="skills-banner-wrapper-glass"
      style={{
        transform: `rotate(${inclination}deg)`,
        zIndex: zIndex
      }}
    >
      {/* Cylindrical glass tube - static, no animations */}
      <div className="skills-banner-tube-glass">
        {/* Curved borders that bow outward at edges - simulate cut tube */}
        <div className="tube-border-top"></div>
        <div className="tube-border-bottom"></div>

        {/* Genomic code sequence - skills as gene regions with connectors */}
        <div
          className="skills-banner-track-glass"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction === 'left-to-right' ? 'reverse' : 'normal'
          }}
        >
          {genomicSequence.map((element, index) => {
            const key = `${element.id}-${index}`;
            // Render different genomic elements based on type
            if (element.type === 'intron') {
              // Intron connector - nucleotide sequence (A, T, G, C)
              return (
                <div key={key} className="gene-intron" style={{ width: `${element.width}px` }}>
                  <span className="gene-intron-text">{element.sequence}</span>
                </div>
              );
            } else if (element.type === 'exon') {
              // Exon - filled box (core technical skills)
              return (
                <div key={key} className="gene-exon">
                  <span className="gene-element-text">{element.name}</span>
                </div>
              );
            } else if (element.type === 'utr') {
              // UTR - outlined box (soft skills)
              return (
                <div key={key} className="gene-utr">
                  <span className="gene-element-text">{element.name}</span>
                </div>
              );
            } else if (element.type === 'regulatory') {
              // Regulatory - small badge (tools/methods)
              return (
                <div key={key} className="gene-regulatory">
                  <span className="gene-element-text">{element.name}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsBannerGlass;
