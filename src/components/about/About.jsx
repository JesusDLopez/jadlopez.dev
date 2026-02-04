import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../../Styles/About.css";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ProteinViewer from "./ProteinViewer";
import AboutIntro from "./AboutIntro";
import SkillsBannerGlass from "../SkillsBannerGlass";
import { useTheme } from "../../contexts/ThemeContext";
import histoneH1 from "../../assets/HistoneH1_V2.glb";
import GFP from "../../assets/1GFL_GFP_protein_v1.glb";
import brca1 from "../../assets/BRCA1.glb";
import Cas9 from "../../assets/Cas9prot.glb";
import RNApol2 from "../../assets/RNApol2.glb";

// Helper component to render scientific text with color-coded structure terms
function ScientificText({ text, hoveredStructure, isDark, isMobile }) {
  // Define color mapping for each structure type
  const structureColors = {
    dark: {
      'Struct_Helix': '#00ff88',        // Neon green
      'Struct_Sheet': '#60d5ff',        // Light blue
      'Balls_Chromophore_SYG': '#00ff88', // Green for chromophore
      'Sticks_Chromophore_SYG': '#00ff88',
      'Interaction_HBonds': '#60d5ff',  // Light blue for bonds
      'Mol_Surface': '#ffffff',         // White
      'Protein': '#9333ea',             // Purple for protein overlay
    },
    light: {
      'Struct_Helix': '#ff9ec2',        // Pink
      'Struct_Sheet': '#ffd966',        // Yellow
      'Balls_Chromophore_SYG': '#4CAF50', // Green for chromophore
      'Sticks_Chromophore_SYG': '#4CAF50',
      'Interaction_HBonds': '#ffd966',  // Yellow for bonds
      'Mol_Surface': '#78B4DC',         // Sky blue
      'Protein': '#c084fc',             // Light purple for protein overlay
    }
  };

  // Map terms in text to structure names
  const termToStructure = {
    // Beta barrel (both helices and sheets)
    'beta-barrel': 'Struct_Sheet',
    'beta barrel': 'Struct_Sheet',
    'beta-can': 'Struct_Sheet',
    'beta can': 'Struct_Sheet',
    '11-stranded': 'Struct_Sheet',
    // Standard structure terms
    'alpha-helix': 'Struct_Helix',
    'alpha helix': 'Struct_Helix',
    'helices': 'Struct_Helix',
    'helix': 'Struct_Helix',
    'beta-sheet': 'Struct_Sheet',
    'beta sheet': 'Struct_Sheet',
    'sheets': 'Struct_Sheet',
    'sheet': 'Struct_Sheet',
    // GFP-specific terms
    'chromophore': 'Balls_Chromophore_SYG',
    'Ser65': 'Balls_Chromophore_SYG',
    'Tyr66': 'Balls_Chromophore_SYG',
    'Gly67': 'Balls_Chromophore_SYG',
    'stabilizing bonds': 'Interaction_HBonds',
    'hydrogen bonds': 'Interaction_HBonds',
    'bonds': 'Interaction_HBonds',
    'interactions': 'Interaction_HBonds',
    'surface': 'Mol_Surface',
    'molecular surface': 'Mol_Surface',
  };

  const colorScheme = isDark ? structureColors.dark : structureColors.light;

  // Split text by structure terms and render with colors
  const renderColoredText = () => {
    let remainingText = text;
    const parts = [];
    let key = 0;

    // Create regex pattern from all terms (case insensitive)
    const pattern = new RegExp(
      `(${Object.keys(termToStructure).join('|')})`,
      'gi'
    );

    let match;
    let lastIndex = 0;

    while ((match = pattern.exec(remainingText)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>
            {remainingText.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add colored term
      const term = match[0];
      const structureName = termToStructure[term.toLowerCase()];
      const isHovered = hoveredStructure === structureName;
      const baseColor = colorScheme[structureName];

      parts.push(
        <span
          key={`term-${key++}`}
          style={{
            color: baseColor,
            fontWeight: isHovered ? '700' : '600',
            textShadow: isHovered
              ? `0 0 12px ${baseColor}, 0 0 6px ${baseColor}`
              : 'none',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          {term}
        </span>
      );

      lastIndex = pattern.lastIndex;
    }

    // Add remaining text
    if (lastIndex < remainingText.length) {
      parts.push(
        <span key={`text-${key++}`}>
          {remainingText.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <p
      style={{
        margin: '0 0 1rem 0',
        lineHeight: '1.7',
        fontSize: isMobile ? '1rem' : '1.1rem',
        color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(31, 41, 55, 0.85)',
      }}
    >
      {renderColoredText()}
    </p>
  );
}

const experiences = [
  {
    id: 1,
    title: "Universidad Europea de Madrid",
    years: "2016–2019",
    description: "Forging a first-principles toolkit for biology.",
    expandedContent: {
      whatIDid:
        "This is where I forged the intellectual scaffold for everything to come. I learned that biology wasn't a collection of facts to be memorized, but a system of physical rules—in thermodynamics, chemistry, and kinetics—to be deconstructed. This initial exposure to the scientific method across diverse disciplines—from immunology to pharmacology—provided the foundational frame to connect and expand my understanding.",
      whyItMattered:
        "This period instilled a new level of discipline, especially in grappling with concepts in mathematics and physics. The reward was a robust framework that allowed me to approach any biological problem by reducing it to its core principles. It was in these fundamental interactions that I first began to appreciate the elegant control systems within life, providing an essential scaffold for my later work in protein folding and genomics.",
      proteinChoice: "Histone H1. If DNA is the library of life, histones are the librarians deciding which volumes are read. This control is physical: histones are studded with positively-charged amino acids like Lysine, which act as molecular 'hooks' to grip the negatively-charged DNA backbone. This interaction is key to gene regulation. [Interactive: Toggle Lysine residues to see how these fundamental 'hooks' organize the genome.]",
    },
    component: (
      <ProteinViewer
        path={histoneH1}
        position={[0, 0, 0]}
        scale={[1.0, 1.0, 1.0]}
        cameraZ={40}
        tooltip="Histone H1 (PDB: 1HST)"
      />
    ),
  },
  {
    id: 2,
    title: "University of Queens_land",
    years: "2019–2022",
    description: "Advanced training in genomics and programming.",
    expandedContent: {
      scientific: {
        proteinName: "Green Fluorescent Protein (GFP)",
        description: "GFP is a revolutionary tool in molecular biology, acting as a 'reporter' to make cellular processes visible. Its iconic 11-stranded beta-barrel structure, often called a 'beta-can', protects a central alpha-helix. Nestled within this barrel, the chromophore (formed by residues Ser65, Tyr66, and Gly67) emits a bright green light when excited, allowing scientists to track proteins and watch life happen in real-time."
      },
      personal: {
        whatIDid: "At the University of Queensland, my work shifted towards advanced genomics, biostatistics, and programming. This was where I first learned to write code to analyze and visualize complex biological data, moving from pure theory into practical application.",
        whyItMattered: "GFP perfectly symbolizes this period. It represents the moment abstract biological concepts—like gene expression—became tangible and 'visible' through technology. Learning to code was like gaining the ability to make my own 'fluorescent tags' for data, turning raw numbers into insightful stories."
      }
    },
    component: (
      <ProteinViewer
        path={GFP}
        position={[0, 0, 0]}
        scale={[1.0, 1.0, 1.0]}
        rotation={[0, 0, 0]}
        cameraZ={55}
        tooltip="GFP (PDB: 1GFL)"
      />
    ),
  },
  {
    id: 3,
    title: "University of Tech_nology Syd_ney",
    years: "2022–2024",
    description: "Explored the human side of genomics.",
    expandedContent: {
      whatIDid:
        "I completed a Master's in Genetic Counseling at U_TS, a program that combined scientific rigor with human connection. I learned how to explain complex genetic concepts in accessible ways, adapt communication to different families, and support patients through difficult decisions about testing, treatment, and family planning.\n\nThe curriculum covered counseling frameworks like narrative therapy, family systems theory, and logotherapy — tools for helping people find meaning in challenging diagnoses. Clinical placements in oncology, cancer genetics, prenatal, and general clinics gave me hands-on experience. I learned genetics is never only about DNA — it's about people, their identities, their values, and the decisions they need to make.",
      whyItMattered:
        "This training taught me to bridge scientific data and human experience. I gained confidence not only in handling genetic information, but in guiding people through complex decisions with clarity and empathy. It shaped how I think about the purpose of genetic knowledge: not as an endpoint, but as something that must be translated into meaningful action for patients and families.",
      proteinChoice:
        "BRCA1 mutations impact cancer risk and influence decisions about prevention, family planning, and genetic testing.",
    },
    component: (
      <ProteinViewer
        path={brca1}
        position={[0, 0, 0]}
        scale={[0.95, 0.95, 0.95]}
        cameraZ={73}
        tooltip="BRCA1 (PDB: 1T15)"
      />
    ),
  },
  {
    id: 4,
    title: "I_GM Team",
    years: "2022–2025",
    description: "Applied bioinformatics in melanoma genetics research.",
    expandedContent: {
      whatIDid:
        "During my last semester at U_Q, a guest lecture by Aid_een McIn_erney introduced me to genetic counseling. After class, we met for coffee — a conversation that changed the trajectory of my career. She became my mentor, encouraged me to pursue the Master's program, and invited me to join her team at Integr_ating Gen_omics into Medi_cine (I_GM).\n\nAt I_GM, I stepped into my first professional role working with real patient data in melanoma genetics research. I collaborated with genetic counselors and dermatologists, applying statistics and bioinformatics to analyze genomic data. I built tools and workflows that made complex datasets usable for clinicians. I presented findings at conferences, supported workshops teaching dermatologists about melanoma genetic testing, and completed further training in statistical genomics.",
      whyItMattered:
        "This was the turning point where I stopped only studying science and began practicing it. I discovered where I could contribute most: building tools and methods that bring genomics into clinical practice. This clarified my career direction and showed me the work I want to do — bridging the gap between research data and patient care.",
      proteinChoice:
        "Cas9 is a programmable enzyme that cuts DNA at specific sequences, enabling precise genome editing.",
    },
    component: (
      <ProteinViewer
        path={Cas9}
        position={[0, 0, 0]}
        scale={[0.7, 0.7, 0.7]}
        cameraZ={80}
        tooltip="Cas9 (PDB: 4CMP)"
      />
    ),
  },
  {
    id: 5,
    title: "Lanzarote & Beyond",
    years: "2025–Present",
    description: "Building skills and portfolio in bioinformatics.",
    expandedContent: {
      whatIDid:
        "After returning to the Canary Islands, I attempted to launch a patient communication startup. But as I designed the product, I hit a wall: the gap between the biological complexity I wanted to model and my technical ability to build it was too wide. I realized I couldn't just 'manage' this technology—I needed to master it.\n\nI made the decision to close that chapter and enroll in Le Wagon's Data Science & AI bootcamp. I've dedicated this time to mastering the full engineering lifecycle, transitioning from scientific scripting to building production-grade software and machine learning systems.",
      whyItMattered:
        "This was a fundamental shift in perspective. Learning the mathematics of machine learning and the structure of software engineering didn't just add skills; it unlocked a new way of seeing biological problems. I no longer just interpret the data; I can now build the systems that process it. I have the technical agency to take a complex genetic question and engineer a complete, end-to-end solution.",
      proteinChoice:
        "RNA Polymerase II is a large multimeric complex that transcribes DNA into RNA, coordinating multiple subunits to synthesize genetic messages.",
    },
    component: (
      <ProteinViewer
        path={RNApol2}
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        cameraZ={90}
        tooltip="RNA Polymerase II (PDB: 1I3Q)"
      />
    ),
  },
];

function About({ mode = "home" }) {
  const { isDark } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStructure, setHoveredStructure] = useState(null);

  // Generic controls
  const [showSurface, setShowSurface] = useState(true);

  // GFP-specific controls
  const [showBarrel, setShowBarrel] = useState(true);
  const [showChromophore, setShowChromophore] = useState(true);
  const [showInteractions, setShowInteractions] = useState(false);

  // Refs for timeline elements
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);

  // Set up scroll tracking for timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Removed: Custom scroll-trap logic (handleWheel useEffect)
  // Now using native CSS position: sticky instead

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Removed state-based animations - now using whileInView

  // Spine center alignment verified - debug logs removed

  // Simple timeline structure

  const handleCardClick = (experience) => {
    // Lock scroll IMMEDIATELY before any state changes to prevent visual jump
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("prevent-scroll");
    document.body.classList.add("modal-active");

    // Now update state to show modal
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && selectedExperience !== null) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedExperience]);

  // Handle scroll unlock when modal closes
  useEffect(() => {
    if (!selectedExperience) {
      // Restore scroll position when modal is closed
      const scrollY = document.body.style.top;
      document.body.classList.remove("prevent-scroll");
      document.body.classList.remove("modal-active");
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    // Note: scroll lock is handled synchronously in handleCardClick to prevent visual jump

    // Cleanup on unmount
    return () => {
      const scrollY = document.body.style.top;
      document.body.classList.remove("prevent-scroll");
      document.body.classList.remove("modal-active");
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [selectedExperience]);

  // Render modal using Portal to escape About section's stacking context
  const modalContent =
    selectedExperience &&
    ReactDOM.createPortal(
      <>
        <div
          className="modal-overlay"
          onClick={closeModal}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle dark overlay
            backdropFilter: "blur(8px)", // Blur the background
            WebkitBackdropFilter: "blur(8px)", // Safari support
            zIndex: 9998,
            overflow: "hidden",
          }}
        />
        <div
          className="modal-content"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: isMobile ? "2vh" : "80px", // Just below navbar (navbar is ~70px high)
            left: isMobile ? "2vw" : "2vw",
            right: isMobile ? "2vw" : "2vw",
            bottom: isMobile ? "2vh" : "2vh",
            borderRadius: "1.5rem",
            zIndex: 9999,
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile
            overflow: "hidden",

            // Glass morphism base
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",

            // Theme-aware glass effect - black in dark mode, warm cream in light mode
            background: isDark
              ? "rgba(0, 0, 0, 0.85)"
              : "rgba(250, 248, 246, 0.5)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.15)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isDark
              ? "0 20px 60px rgba(0, 0, 0, 0.9), 0 8px 24px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.3)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: isDark ? "#ffffff" : "#1f2937",
              fontSize: "1.5rem",
              zIndex: 10000,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDark
                ? "rgba(255, 255, 255, 0.25)"
                : "rgba(255, 255, 255, 0.5)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1)";
            }}
          >
            ×
          </button>

          {/* Protein viewer */}
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              flex: isMobile ? "0 0 50%" : "2", // Fixed 50% height on mobile, flex 2 on desktop
              height: isMobile ? "50%" : "100%",
              background: "transparent",
              borderRadius: isMobile ? "12px 12px 0 0" : "12px 0 0 12px", // Top corners on mobile, left corners on desktop
              overflow: "hidden",
              filter: "none",
              backdropFilter: "none",
            }}
          >
            {selectedExperience && (
              <ProteinViewer
                path={selectedExperience.component.props.path}
                position={selectedExperience.component.props.position}
                rotation={selectedExperience.component.props.rotation}
                scale={selectedExperience.component.props.scale}
                cameraZ={selectedExperience.component.props.cameraZ}
                tooltip={selectedExperience.component.props.tooltip}
                expanded={true}
                onHoverChange={setHoveredStructure}
                showSurface={showSurface}
                showHelices={selectedExperience.id === 2 ? showBarrel : true}
                showSheets={selectedExperience.id === 2 ? showBarrel : true}
                showChromophore={showChromophore}
                showInteractions={showInteractions}
                key={`modal-direct-${selectedExperience.id}`}
              />
            )}
          </div>

          {/* Content */}
          <div
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              flex: isMobile ? "0 0 50%" : "1", // Fixed 50% height on mobile, flex 1 on desktop
              height: isMobile ? "50%" : "100%",
              padding: isMobile ? "1.5rem" : "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              color: isDark ? "#ffffff" : "#1f2937",
              overflow: "auto",
              overscrollBehavior: "contain", // Prevent scroll chaining to background
              textShadow: "none",
              filter: "none",
              fontSmooth: "always",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "optimizeLegibility",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                opacity: "0.7",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              {selectedExperience.years}
            </span>
            <h3
              style={{
                margin: "0 0 1rem 0",
                fontSize: isMobile ? "1.4rem" : "1.8rem",
                fontWeight: "600",
                color: isDark
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(31, 41, 55, 1)",
              }}
            >
              {selectedExperience.title}
            </h3>

            {/* Display expanded content if available, otherwise fallback to description */}
            {selectedExperience.expandedContent ? (
              <div>
                {/* Scientific Section - New structure with ScientificText */}
                {selectedExperience.expandedContent.scientific && (
                  <div
                    style={{
                      background: isDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.03)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: isMobile ? "1.2rem" : "2rem",
                      marginBottom: "2rem",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 1.5rem 0",
                        fontSize: isMobile ? "1.8rem" : "2.2rem",
                        fontWeight: "700",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(31, 41, 55, 1)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {selectedExperience.expandedContent.scientific.proteinName}
                    </h4>
                    <ScientificText
                      text={
                        selectedExperience.expandedContent.scientific.description
                      }
                      hoveredStructure={hoveredStructure}
                      isDark={isDark}
                      isMobile={isMobile}
                    />
                  </div>
                )}

                {/* Control Center - Toggle Buttons & Hover Info */}
                {selectedExperience.expandedContent.scientific && (
                  <div
                    style={{
                      background: isDark
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(0, 0, 0, 0.02)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      padding: isMobile ? "1rem" : "1.5rem",
                      marginBottom: "2rem",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 1rem 0",
                        fontSize: isMobile ? "1.1rem" : "1.2rem",
                        fontWeight: "600",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(31, 41, 55, 0.8)",
                      }}
                    >
                      Control Center
                    </h4>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
                        gap: "1rem",
                        alignItems: "start",
                      }}
                    >
                      {/* Left side: Toggle Buttons */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1rem",
                        }}
                      >
                        {/* GFP Toggle Buttons (id === 2) - Fancy animated toggles */}
                        {selectedExperience.id === 2 && (
                          <>
                            {/* Surface Toggle */}
                            <button
                              onClick={() => setShowSurface(!showSurface)}
                              style={{
                                padding: 0,
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                width: "110px",
                                height: "36px",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  background: showSurface
                                    ? isDark
                                      ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)"
                                      : "linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)"
                                    : "rgba(120, 120, 128, 0.16)",
                                  borderRadius: "18px",
                                  transition:
                                    "background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 6px",
                                }}
                              >
                                <motion.div
                                  animate={{ x: showSurface ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28,
                                  }}
                                  style={{
                                    position: "absolute",
                                    width: "24px",
                                    height: "24px",
                                    background: "#ffffff",
                                    borderRadius: "50%",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    zIndex: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: showSurface ? "12px" : "34px",
                                    fontSize: "0.9rem",
                                    fontWeight: showSurface ? "500" : "400",
                                    letterSpacing: "0.02em",
                                    color: showSurface
                                      ? isDark
                                        ? "#0b0b0b"
                                        : "#ffffff"
                                      : isDark
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgba(0, 0, 0, 0.5)",
                                    transition:
                                      "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    zIndex: 1,
                                  }}
                                >
                                  Surface
                                </span>
                              </div>
                            </button>

                            {/* Beta Barrel Toggle */}
                            <button
                              onClick={() => setShowBarrel(!showBarrel)}
                              style={{
                                padding: 0,
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                width: "110px",
                                height: "36px",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  background: showBarrel
                                    ? isDark
                                      ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)"
                                      : "linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)"
                                    : "rgba(120, 120, 128, 0.16)",
                                  borderRadius: "18px",
                                  transition:
                                    "background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 6px",
                                }}
                              >
                                <motion.div
                                  animate={{ x: showBarrel ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28,
                                  }}
                                  style={{
                                    position: "absolute",
                                    width: "24px",
                                    height: "24px",
                                    background: "#ffffff",
                                    borderRadius: "50%",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    zIndex: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: showBarrel ? "16px" : "38px",
                                    fontSize: "0.85rem",
                                    fontWeight: showBarrel ? "500" : "400",
                                    letterSpacing: "0.02em",
                                    color: showBarrel
                                      ? isDark
                                        ? "#0b0b0b"
                                        : "#ffffff"
                                      : isDark
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgba(0, 0, 0, 0.5)",
                                    transition:
                                      "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    zIndex: 1,
                                  }}
                                >
                                  Barrel
                                </span>
                              </div>
                            </button>

                            {/* Chromophore Toggle */}
                            <button
                              onClick={() =>
                                setShowChromophore(!showChromophore)
                              }
                              style={{
                                padding: 0,
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                width: "110px",
                                height: "36px",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  background: showChromophore
                                    ? isDark
                                      ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)"
                                      : "linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)"
                                    : "rgba(120, 120, 128, 0.16)",
                                  borderRadius: "18px",
                                  transition:
                                    "background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 6px",
                                }}
                              >
                                <motion.div
                                  animate={{ x: showChromophore ? 64 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28,
                                  }}
                                  style={{
                                    position: "absolute",
                                    width: "24px",
                                    height: "24px",
                                    background: "#ffffff",
                                    borderRadius: "50%",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    zIndex: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: showChromophore ? "8px" : "32px",
                                    fontSize: "0.75rem",
                                    fontWeight: showChromophore ? "500" : "400",
                                    letterSpacing: "0.02em",
                                    color: showChromophore
                                      ? isDark
                                        ? "#0b0b0b"
                                        : "#ffffff"
                                      : isDark
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgba(0, 0, 0, 0.5)",
                                    transition:
                                      "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    zIndex: 1,
                                  }}
                                >
                                  Chromoph
                                </span>
                              </div>
                            </button>

                            {/* Stabilizing Bonds Toggle */}
                            <button
                              onClick={() =>
                                setShowInteractions(!showInteractions)
                              }
                              style={{
                                padding: 0,
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                width: "110px",
                                height: "36px",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  background: showInteractions
                                    ? isDark
                                      ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)"
                                      : "linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)"
                                    : "rgba(120, 120, 128, 0.16)",
                                  borderRadius: "18px",
                                  transition:
                                    "background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 6px",
                                }}
                              >
                                <motion.div
                                  animate={{ x: showInteractions ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28,
                                  }}
                                  style={{
                                    position: "absolute",
                                    width: "24px",
                                    height: "24px",
                                    background: "#ffffff",
                                    borderRadius: "50%",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    zIndex: 2,
                                  }}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    left: showInteractions ? "18px" : "40px",
                                    fontSize: "0.8rem",
                                    fontWeight: showInteractions ? "500" : "400",
                                    letterSpacing: "0.02em",
                                    color: showInteractions
                                      ? isDark
                                        ? "#0b0b0b"
                                        : "#ffffff"
                                      : isDark
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgba(0, 0, 0, 0.5)",
                                    transition:
                                      "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    zIndex: 1,
                                  }}
                                >
                                  Bonds
                                </span>
                              </div>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Right side: Hover Info Display */}
                      {hoveredStructure
                        ? (() => {
                            // Define colors for each structure (GFP-specific)
                            const structureColors = {
                              dark: {
                                Struct_Helix: "#00ff88",
                                Struct_Sheet: "#60d5ff",
                                Balls_Chromophore_SYG: "#00ff88",
                                Sticks_Chromophore_SYG: "#00ff88",
                                Interaction_HBonds: "#60d5ff",
                                Mol_Surface: "#ffffff",
                                Protein: "#9333ea",
                              },
                              light: {
                                Struct_Helix: "#ff9ec2",
                                Struct_Sheet: "#ffd966",
                                Balls_Chromophore_SYG: "#4CAF50",
                                Sticks_Chromophore_SYG: "#4CAF50",
                                Interaction_HBonds: "#ffd966",
                                Mol_Surface: "#78B4DC",
                                Protein: "#c084fc",
                              },
                            };

                            const structureNames = {
                              Struct_Helix: "Alpha Helix",
                              Struct_Sheet: "Beta Sheet",
                              Balls_Chromophore_SYG: "Chromophore",
                              Sticks_Chromophore_SYG: "Chromophore",
                              Interaction_HBonds: "Stabilizing Bonds",
                              Mol_Surface: "Molecular Surface",
                              Protein: "Protein Outline",
                            };

                            const structureDescriptions = {
                              Struct_Helix:
                                "Part of the beta-barrel structure. Provides structural support and protects the chromophore.",
                              Struct_Sheet:
                                "Beta strands forming the 11-stranded barrel. This 'beta-can' structure shields the chromophore from quenching.",
                              Balls_Chromophore_SYG:
                                "The fluorescent heart of GFP. Formed by Ser65-Tyr66-Gly67, it emits bright green light when excited.",
                              Sticks_Chromophore_SYG:
                                "The fluorescent heart of GFP. Formed by Ser65-Tyr66-Gly67, it emits bright green light when excited.",
                              Interaction_HBonds:
                                "Hydrogen bonds stabilizing the protein structure and protecting the chromophore.",
                              Mol_Surface:
                                "Overall molecular surface showing GFP's compact, barrel-like shape.",
                              Protein:
                                "Transparent overlay showing the full protein backbone and connectivity.",
                            };

                            const color = isDark
                              ? structureColors.dark[hoveredStructure]
                              : structureColors.light[hoveredStructure];
                            const name = structureNames[hoveredStructure];
                            const description =
                              structureDescriptions[hoveredStructure];

                            return (
                              <div
                                style={{
                                  padding: "1rem 1.25rem",
                                  background: color
                                    ? `${color}20`
                                    : "rgba(255, 255, 255, 0.1)",
                                  border: color
                                    ? `2px solid ${color}`
                                    : "2px solid rgba(255, 255, 255, 0.3)",
                                  borderRadius: "8px",
                                  animation: "fadeIn 0.2s ease-out",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: isMobile ? "1rem" : "1.1rem",
                                    fontWeight: "700",
                                    color:
                                      color || (isDark ? "#ffffff" : "#000000"),
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  {name}
                                </div>
                                <div
                                  style={{
                                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                                    color: isDark
                                      ? "rgba(255, 255, 255, 0.8)"
                                      : "rgba(31, 41, 55, 0.8)",
                                    lineHeight: "1.5",
                                  }}
                                >
                                  {description}
                                </div>
                              </div>
                            );
                          })()
                        : (
                          <div
                            style={{
                              padding: "1rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: isDark
                                ? "rgba(255, 255, 255, 0.02)"
                                : "rgba(0, 0, 0, 0.01)",
                              border: isDark
                                ? "1px dashed rgba(255, 255, 255, 0.2)"
                                : "1px dashed rgba(0, 0, 0, 0.15)",
                              borderRadius: "8px",
                              minHeight: "80px",
                              color: isDark
                                ? "rgba(255, 255, 255, 0.5)"
                                : "rgba(31, 41, 55, 0.5)",
                              fontSize: isMobile ? "0.85rem" : "0.9rem",
                              textAlign: "center",
                            }}
                          >
                            Hover over the protein structure to see detailed
                            information
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Personal Journey Section */}
                {selectedExperience.expandedContent.personal && (
                  <div
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 0.5rem 0",
                        fontSize: isMobile ? "1.4rem" : "1.6rem",
                        fontWeight: "600",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(31, 41, 55, 0.8)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      My Journey
                    </h4>
                    <span
                      style={{
                        display: "block",
                        fontSize: isMobile ? "0.85rem" : "0.9rem",
                        opacity: "0.7",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "1rem",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(31, 41, 55, 0.6)",
                      }}
                    >
                      {selectedExperience.title} • {selectedExperience.years}
                    </span>
                    <p
                      style={{
                        margin: "0 0 1rem 0",
                        lineHeight: "1.6",
                        fontSize: isMobile ? "1rem" : "1.05rem",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(31, 41, 55, 0.7)",
                      }}
                    >
                      {selectedExperience.expandedContent.personal.whatIDid}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        lineHeight: "1.6",
                        fontSize: isMobile ? "1rem" : "1.05rem",
                        color: isDark
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(31, 41, 55, 0.7)",
                      }}
                    >
                      {selectedExperience.expandedContent.personal.whyItMattered}
                    </p>
                  </div>
                )}

                {/* Fallback for old data structure (Histone H1 and others) */}
                {!selectedExperience.expandedContent.scientific &&
                  !selectedExperience.expandedContent.personal && (
                    <div>
                      <h4
                        style={{
                          margin: "0 0 0.75rem 0",
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          fontWeight: "600",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(31, 41, 55, 0.9)",
                        }}
                      >
                        What I Did
                      </h4>
                      <p
                        style={{
                          margin: "0 0 1rem 0",
                          lineHeight: "1.5",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(31, 41, 55, 0.8)",
                        }}
                      >
                        {selectedExperience.expandedContent.whatIDid}
                      </p>

                      <h4
                        style={{
                          margin: "0 0 0.75rem 0",
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          fontWeight: "600",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(31, 41, 55, 0.9)",
                        }}
                      >
                        Why It Mattered
                      </h4>
                      <p
                        style={{
                          margin: "0 0 1rem 0",
                          lineHeight: "1.5",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(31, 41, 55, 0.8)",
                        }}
                      >
                        {selectedExperience.expandedContent.whyItMattered}
                      </p>

                      <h4
                        style={{
                          margin: "0 0 0.75rem 0",
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          fontWeight: "600",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgba(31, 41, 55, 0.9)",
                        }}
                      >
                        Protein Choice – Histone H1 (PDB: 1hst)
                      </h4>
                      <p
                        style={{
                          margin: "0 0 1rem 0",
                          lineHeight: "1.5",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          color: isDark
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(31, 41, 55, 0.8)",
                        }}
                      >
                        {selectedExperience.expandedContent.proteinChoice}
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <p
                style={{
                  margin: "0 0 1rem 0",
                  lineHeight: "1.5",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  color: isDark
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(31, 41, 55, 0.8)",
                }}
              >
                {selectedExperience.description}
              </p>
            )}
            {!isMobile && (
              <div
                style={{
                  marginTop: "auto",
                  padding: "1rem 0",
                  borderTop: isDark
                    ? "1px solid rgba(255, 255, 255, 0.15)"
                    : "1px solid rgba(31, 41, 55, 0.2)",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "0.9rem",
                    color: isDark
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(31, 41, 55, 0.6)",
                    lineHeight: "1.5",
                  }}
                >
                  Click and drag to rotate the protein structure. Use your mouse
                  wheel to zoom in and out for a detailed view.
                </p>
              </div>
            )}
          </div>
        </div>
      </>,
      document.body
    );

  return (
    <>
      {/* Modal rendered via Portal outside sections */}
      {modalContent}

      {/* SECTION 1: Intro/Hola Section */}
      <section
        className={`screen-section ${
          isMobile ? "about-intro-section-mobile" : "about-intro-section"
        }`}
        id="intro"
      >
        <AboutIntro />
      </section>

      {/* SECTION 2: Skills Banner Section */}
      <section className="screen-section skills-section">
        <div className="skills-banners-container">
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={3}
            speed={140}
          />
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={2}
            speed={170}
          />
          <SkillsBannerGlass
            direction="right-to-left"
            inclination={0}
            zIndex={1}
            speed={200}
          />
        </div>
      </section>

      {/* SECTION 3: Academic Journey - Timeline Mode */}
      <section
        ref={sectionRef}
        className={`screen-section about-section`}
        id="about"
      >
        <div className="about-layout about-container">
          <div className="about-timeline" ref={timelineRef}>
            {/* Timeline structure with sequential positioning */}

            {/* Title/Subtitle block in first card position (top left) - Animated with viewport entry */}
            <motion.div
              className="timeline-intro-block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={
                isMobile
                  ? {
                      position: "relative",
                      left: "auto",
                      top: "auto",
                      width: "auto",
                      margin: "0 1.5rem 3rem",
                      padding: "0",
                      textAlign: "left",
                      zIndex: 2,
                    }
                  : {
                      position: "absolute",
                      left: "var(--timeline-side-offset)",
                      top: "50px",
                      width: "var(--timeline-card-width)",
                      zIndex: 2,
                    }
              }
            >
              <h2 className="timeline-intro-title">Academic Journey</h2>
              <p className="timeline-intro-subtitle">
                Building the Toolkit: Decoding Biology, Translating for Humans
              </p>
              <p className="timeline-intro-description">
                What started as a simple CV grew into this interactive experience. A list of dates can't fully capture the process of building a toolkit, so I've mapped my journey to these protein structures, building custom tools to make them explorable. Looking back, it's clear how every period contributed something valuable. These molecules represent key turning points—from decoding foundational principles to translating complex science for human impact.
              </p>
            </motion.div>

            {/* Entry 1: 2016 + Universidad Europea (Left, Grid 2) */}
            <motion.div
              className="timeline-dot"
              initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={
                isMobile
                  ? {
                      duration: 0.6,
                      delay: 0,
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }
                  : { duration: 0.3, delay: 0, ease: "easeOut" }
              }
              style={{
                position: "absolute",
                top: "50px",
                left: "calc(50% - 30px)", // Center 60px dot on timeline spine - at very top of timeline
                zIndex: 10, // Higher than cards so always visible
              }}
            >
              2016
            </motion.div>

            {/* Card 1: Universidad Europea Madrid 2016 */}
            <motion.div
              className={`about-card right-card`}
              data-year="2016"
              initial={
                isMobile
                  ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
                  : { opacity: 0, x: -40 }
              }
              whileInView={
                isMobile
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                isMobile
                  ? {
                      duration: 0.8,
                      delay: 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
                  : { duration: 0.4, delay: 0, ease: "easeOut" }
              }
              onClick={() => handleCardClick(experiences[0])}
              style={
                isMobile
                  ? {
                      position: "static",
                      width: "90%",
                      maxWidth: "600px",
                      margin: "0 auto 2.5rem auto",
                      left: "unset",
                      right: "unset",
                      top: "unset",
                    }
                  : {
                      position: "absolute",
                      top: "50px",
                      right: "var(--timeline-side-offset)", // RIGHT CARD: UQ 2016 - aligned with 2016 year label at very top
                      width: "var(--timeline-card-width)", // Constrain within left half of content area
                      zIndex: 5,
                    }
              }
            >
              <div className="about-card-content">
                <div
                  className="protein-viewer-container"
                  style={{ cursor: "pointer" }}
                >
                  {!selectedExperience &&
                    React.cloneElement(experiences[0].component, {
                      expanded: false,
                      key: `card-0-disabled`,
                      onInspect: () => handleCardClick(experiences[0]),
                    })}
                  {selectedExperience && (
                    <div
                      style={{
                        background: "rgba(100,100,100,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      Click to view in modal
                    </div>
                  )}
                </div>
                <div className="about-card-text">
                  <span className="card-phase">{experiences[0].years}</span>
                  <h3>{experiences[0].title}</h3>
                  <p>{experiences[0].description}</p>
                  <span className="click-hint">Click to explore</span>
                </div>
              </div>
            </motion.div>

            {/* LASER 1: 2016 → 2019 - Desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 534 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, delay: 0, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "66px", // Start just below 2016 dot (50px + 16px)
                  left: "calc(50% - 1px)", // Center on spine
                  width: "2px",
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))"
                    : "linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)",
                  boxShadow: isDark
                    ? "0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)"
                    : "0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)",
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: "top",
                }}
              />
            )}

            {/* Entry 2: 2019 + UQ */}
            <motion.div
              className="timeline-dot"
              initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={
                isMobile
                  ? {
                      duration: 0.6,
                      delay: 0,
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }
                  : { duration: 0.3, ease: "easeOut" }
              }
              style={{
                position: "absolute",
                top: "600px",
                left: "calc(50% - 30px)", // Center 60px dot on timeline spine
                zIndex: 10, // Higher than cards so always visible
              }}
            >
              2019
            </motion.div>

            {/* Card 2: University of Queensland 2019 */}
            <motion.div
              className={`about-card left-card`}
              data-year="2019"
              initial={
                isMobile
                  ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
                  : { opacity: 0, x: -40 }
              }
              whileInView={
                isMobile
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                isMobile
                  ? {
                      duration: 0.8,
                      delay: 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
                  : { duration: 0.4, delay: 0, ease: "easeOut" }
              }
              onClick={() => handleCardClick(experiences[1])}
              style={
                isMobile
                  ? {
                      position: "static",
                      width: "90%",
                      maxWidth: "600px",
                      margin: "0 auto 2.5rem auto",
                      left: "unset",
                      right: "unset",
                      top: "unset",
                    }
                  : {
                      position: "absolute",
                      top: "600px", // LEFT CARD: UQ positioned with proper spacing from UEM
                      left: "var(--timeline-side-offset)", // LEFT CARD: Align with intro block
                      width: "var(--timeline-card-width)", // Match left cards exactly
                      zIndex: 5,
                    }
              }
            >
              <div className="about-card-content">
                <div
                  className="protein-viewer-container"
                  style={{ cursor: "pointer" }}
                >
                  {!selectedExperience &&
                    React.cloneElement(experiences[1].component, {
                      expanded: false,
                      key: `card-1-disabled`,
                      onInspect: () => handleCardClick(experiences[1]),
                    })}
                  {selectedExperience && (
                    <div
                      style={{
                        background: "rgba(100,100,100,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      Click to view in modal
                    </div>
                  )}
                </div>
                <div className="about-card-text">
                  <span className="card-phase">{experiences[1].years}</span>
                  <h3>{experiences[1].title}</h3>
                  <p>{experiences[1].description}</p>
                  <span className="click-hint">Click to explore</span>
                </div>
              </div>
            </motion.div>

            {/* LASER 2: 2019 → 2022 - Desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 534 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "616px", // Start just below 2019 dot (600px + 16px)
                  left: "calc(50% - 1px)", // Center on spine
                  width: "2px",
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))"
                    : "linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)",
                  boxShadow: isDark
                    ? "0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)"
                    : "0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)",
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: "top",
                }}
              />
            )}

            {/* Entry 3: 2022 + IGM */}
            <motion.div
              className="timeline-dot"
              initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={
                isMobile
                  ? {
                      duration: 0.6,
                      delay: 0,
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }
                  : { duration: 0.3, ease: "easeOut" }
              }
              style={{
                position: "absolute",
                top: "1150px",
                left: "calc(50% - 30px)", // Center 60px dot on timeline spine - aligned with IGM card
                zIndex: 10, // Higher than cards so always visible
              }}
            >
              2022
            </motion.div>

            {/* Card 3: IGM Team 2022 */}
            <motion.div
              className={`about-card right-card`}
              data-year="2022"
              initial={
                isMobile
                  ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
                  : { opacity: 0, x: 40 }
              }
              whileInView={
                isMobile
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                isMobile
                  ? {
                      duration: 0.8,
                      delay: 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
                  : { duration: 0.4, delay: 0, ease: "easeOut" }
              }
              onClick={() => handleCardClick(experiences[3])}
              style={
                isMobile
                  ? {
                      position: "static",
                      width: "90%",
                      maxWidth: "600px",
                      margin: "0 auto 2.5rem auto",
                      left: "unset",
                      right: "unset",
                      top: "unset",
                    }
                  : {
                      position: "absolute",
                      top: "1150px", // RIGHT CARD: IGM positioned with proper spacing
                      right: "var(--timeline-side-offset)", // RIGHT CARD: Align with right boundary
                      width: "var(--timeline-card-width)",
                      zIndex: 5,
                    }
              }
            >
              <div className="about-card-content">
                <div
                  className="protein-viewer-container"
                  style={{ cursor: "pointer" }}
                >
                  {!selectedExperience &&
                    React.cloneElement(experiences[3].component, {
                      expanded: false,
                      key: `card-3-disabled`,
                      onInspect: () => handleCardClick(experiences[3]),
                    })}
                  {selectedExperience && (
                    <div
                      style={{
                        background: "rgba(100,100,100,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      Click to view in modal
                    </div>
                  )}
                </div>
                <div className="about-card-text">
                  <span className="card-phase">{experiences[3].years}</span>
                  <h3>{experiences[3].title}</h3>
                  <p>{experiences[3].description}</p>
                  <span className="click-hint">Click to explore</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: UTS 2022 */}
            <motion.div
              className={`about-card left-card`}
              data-year="2022"
              initial={
                isMobile
                  ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
                  : { opacity: 0, x: -40 }
              }
              whileInView={
                isMobile
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                isMobile
                  ? {
                      duration: 0.8,
                      delay: 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
                  : { duration: 0.4, delay: 0, ease: "easeOut" }
              }
              onClick={() => handleCardClick(experiences[2])}
              style={
                isMobile
                  ? {
                      position: "static",
                      width: "90%",
                      maxWidth: "600px",
                      margin: "0 auto 2.5rem auto",
                      left: "unset",
                      right: "unset",
                      top: "unset",
                    }
                  : {
                      position: "absolute",
                      top: "1400px", // LEFT CARD: UTS positioned after IGM with proper spacing
                      left: "var(--timeline-side-offset)", // LEFT CARD: Align with left boundary
                      width: "var(--timeline-card-width)",
                      zIndex: 5,
                    }
              }
            >
              <div className="about-card-content">
                <div
                  className="protein-viewer-container"
                  style={{ cursor: "pointer" }}
                >
                  {!selectedExperience &&
                    React.cloneElement(experiences[2].component, {
                      expanded: false,
                      key: `card-2-disabled`,
                      onInspect: () => handleCardClick(experiences[2]),
                    })}
                  {selectedExperience && (
                    <div
                      style={{
                        background: "rgba(100,100,100,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      Click to view in modal
                    </div>
                  )}
                </div>
                <div className="about-card-text">
                  <span className="card-phase">{experiences[2].years}</span>
                  <h3>{experiences[2].title}</h3>
                  <p>{experiences[2].description}</p>
                  <span className="click-hint">Click to explore</span>
                </div>
              </div>
            </motion.div>

            {/* LASER 3: 2022 → 2025 - Desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 784 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "1166px", // Start just below 2022 dot (1150px + 16px)
                  left: "calc(50% - 1px)", // Center on spine
                  width: "2px",
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))"
                    : "linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)",
                  boxShadow: isDark
                    ? "0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)"
                    : "0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)",
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: "top",
                }}
              />
            )}

            {/* Entry 5: 2025 + Lanzarote & Beyond */}
            <motion.div
              className="timeline-dot"
              initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={
                isMobile
                  ? {
                      duration: 0.6,
                      delay: 0,
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }
                  : { duration: 0.3, ease: "easeOut" }
              }
              style={{
                position: "absolute",
                top: "1950px",
                left: "calc(50% - 30px)", // Center 60px dot on timeline spine - aligned with Lanzarote card
                zIndex: 10, // Higher than cards so always visible
              }}
            >
              2025
            </motion.div>

            {/* Card 5: Lanzarote 2025 */}
            <motion.div
              className={`about-card right-card`}
              data-year="2025"
              initial={
                isMobile
                  ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
                  : { opacity: 0, x: 40 }
              }
              whileInView={
                isMobile
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={
                isMobile
                  ? {
                      duration: 0.8,
                      delay: 0,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
                  : { duration: 0.4, delay: 0, ease: "easeOut" }
              }
              onClick={() => handleCardClick(experiences[4])}
              style={
                isMobile
                  ? {
                      position: "static",
                      width: "90%",
                      maxWidth: "600px",
                      margin: "0 auto 2.5rem auto",
                      left: "unset",
                      right: "unset",
                      top: "unset",
                    }
                  : {
                      position: "absolute",
                      top: "1950px", // RIGHT CARD: Lanzarote positioned after UTS with proper spacing
                      right: "var(--timeline-side-offset)", // RIGHT CARD: Mirror left cards positioning
                      width: "var(--timeline-card-width)",
                      zIndex: 5,
                    }
              }
            >
              <div className="about-card-content">
                <div
                  className="protein-viewer-container"
                  style={{ cursor: "pointer" }}
                >
                  {!selectedExperience &&
                    React.cloneElement(experiences[4].component, {
                      expanded: false,
                      key: `card-4-disabled`,
                      onInspect: () => handleCardClick(experiences[4]),
                    })}
                  {selectedExperience && (
                    <div
                      style={{
                        background: "rgba(100,100,100,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "14px",
                      }}
                    >
                      Click to view in modal
                    </div>
                  )}
                </div>
                <div className="about-card-text">
                  <span className="card-phase">{experiences[4].years}</span>
                  <h3>{experiences[4].title}</h3>
                  <p>{experiences[4].description}</p>
                  <span className="click-hint">Click to explore</span>
                </div>
              </div>
            </motion.div>

            {/* Sparkles removed - timeline ends at last card */}

            {/* Grid containers for structure - timeline-center removed */}
            <div className="left-side"></div>
            <div className="right-side"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
