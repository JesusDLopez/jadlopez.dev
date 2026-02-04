// src/components/about/AcademicJourney.jsx
// Standalone Academic Journey Timeline Component
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, useScroll } from "framer-motion";
import ProteinViewer from "./ProteinViewer";
import { useTheme } from "../../contexts/ThemeContext";
import histoneH1 from "../../assets/HistoneH1_V2.glb";
import GFP_v2 from "../../assets/GFP_v2.glb";
import foxp2 from "../../assets/foxp2_v3.glb";
import ComingSoon from "../common/ComingSoon";
import "../../Styles/AcademicJourney.css";

const experiences = [
  {
    id: 1,
    title: "Universidad Europea de Madrid",
    years: "2016–2019",
    description: "Forging a first-principles toolkit for biology.",
    expandedContent: {
      scientific: {
        proteinName: "Histone H1",
        description: "Histone H1 is a linker histone that acts as the genome's librarian, deciding which chapters of DNA are read. This control is physical: the protein is studded with positively-charged lysine residues which act as molecular 'hooks' to grip the negatively-charged DNA backbone, organizing chromatin into higher-order structures. This interaction is key to turning raw information into a regulated system."
      },
      personal: {
        whatIDid: "This is where I built the frame for everything that followed. I learned to see biology not as disconnected facts, but as an interconnected system of rules. The breadth of study—from the physical laws of thermodynamics to the cellular logic of immunology and pharmacology—was deeply satisfying to my curiosity, giving me a frame to connect disparate fields.",
        whyItMattered: "The discipline forged in math and physics was worth the grind. It gave me a framework for thinking from first principles, revealing the elegant rules under the chaos. In a way, each subject became like a lysine residue on the histone—a unique 'positive charge' of knowledge, allowing me to access and understand the complex 'DNA' of how life works."
      }
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
        description: "GFP is a revolutionary tool in molecular biology, acting as a 'reporter' to make cellular processes visible. Its iconic 11-stranded beta-barrel structure, often called a 'beta-can', protects a central alpha-helix. Nestled within this helix, the chromophore (formed by residues Ser65, Tyr66, and Gly67) emits a bright green light when excited, allowing scientists to track proteins and watch life happen in real-time."
      },
      personal: {
        whatIDid: "At the University of Queensland, my work shifted towards advanced genomics, biostatistics, and programming. This was where I first learned to write code to analyze and visualize complex biological data, moving from pure theory into practical application.",
        whyItMattered: "GFP perfectly symbolizes this period. It represents the moment abstract biological concepts—like gene expression—became tangible and 'visible' through technology. Learning to code was like gaining the ability to make my own 'fluorescent tags' for data, turning raw numbers into insightful stories."
      }
    },
    component: (
      <ProteinViewer
        path={GFP_v2}
        position={[0, -1.5, 0]}
        scale={[1.0, 1.0, 1.0]}
        rotation={[0.1, 0, Math.PI / 2]}
        cameraZ={55}
        tooltip="GFP (PDB: 1GFL)"
      />
    ),
  },
  {
    id: 3,
    title: "University of Tech_nology Syd_ney",
    years: "2022–2024",
    description:
      "Explored the human side of genomics.",
    expandedContent: {
      scientific: {
        proteinName: "FOXP2 — The Language Protein",
        description: "FOXP2 is a transcription factor essential for speech and language development. Its forkhead DNA-binding domain uses a 'winged-helix' motif to grip the DNA major groove. The key residues N550 and H554 'read' the DNA sequence, while R553 acts as the 'stabilizer' — locking the protein in place. A single mutation here (R553H) disrupts this grip, causing inherited speech-language disorders. This protein embodies the core of genetic counseling: how a single molecular change can profoundly impact human communication."
      },
      personal: {
        whatIDid: "I completed a Master's in Genetic Counseling at U_TS, a program that combined scientific rigor with human connection. I learned how to explain complex genetic concepts in accessible ways, adapt communication to different families, and support patients through difficult decisions about testing, treatment, and family planning.\n\nThe curriculum covered counseling frameworks like narrative therapy, family systems theory, and logotherapy — tools for helping people find meaning in challenging diagnoses. Clinical placements in oncology, cancer genetics, prenatal, and general clinics gave me hands-on experience. I learned genetics is never only about DNA — it's about people, their identities, their values, and the decisions they need to make.",
        whyItMattered: "This training taught me to bridge scientific data and human experience. I gained confidence not only in handling genetic information, but in guiding people through complex decisions with clarity and empathy. It shaped how I think about the purpose of genetic knowledge: not as an endpoint, but as something that must be translated into meaningful action for patients and families."
      }
    },
    component: (
      <ProteinViewer
        path={foxp2}
        position={[0, -1.5, 0]}
        scale={[50, 50, 50]}
        cameraZ={50}
        tooltip="FOXP2 (PDB: 2A07)"
      />
    ),
  },
  {
    id: 4,
    title: "I_GM Team",
    years: "2022–2025",
    description:
      "Applied bioinformatics in melanoma genetics research.",
    comingSoon: true,
    expandedContent: {
      whatIDid: "During my last semester at U_Q, a guest lecture by Aid_een McIn_erney introduced me to genetic counseling. After class, we met for coffee — a conversation that changed the trajectory of my career. She became my mentor, encouraged me to pursue the Master's program, and invited me to join her team at Integr_ating Gen_omics into Medi_cine (I_GM).\n\nAt I_GM, I stepped into my first professional role working with real patient data in melanoma genetics research. I collaborated with genetic counselors and dermatologists, applying statistics and bioinformatics to analyze genomic data. I built tools and workflows that made complex datasets usable for clinicians. I presented findings at conferences, supported workshops teaching dermatologists about melanoma genetic testing, and completed further training in statistical genomics.",
      whyItMattered: "This was the turning point where I stopped only studying science and began practicing it. I discovered where I could contribute most: building tools and methods that bring genomics into clinical practice. This clarified my career direction and showed me the work I want to do — bridging the gap between research data and patient care.",
      proteinChoice: "Cas9 is a programmable enzyme that cuts DNA at specific sequences, enabling precise genome editing."
    },
    component: (
      <ComingSoon
        variant="protein"
        title="Coming Soon"
        subtitle="Cas9 visualization"
      />
    ),
  },
  {
    id: 5,
    title: "Lanzarote & Beyond",
    years: "2025–Present",
    description:
      "Building skills and portfolio in bioinformatics.",
    comingSoon: true,
    expandedContent: {
      whatIDid: "After five years in Australia, I returned home to the Canary Islands. It was both a homecoming and a turning point. I initially set out to build a startup — an application to communicate complex genetic variants to patients in accessible ways. But within a few months, I realized the project wasn't ready to succeed. I needed more experience in programming and bioinformatics before I could make it real.\n\nSo I shifted focus. Instead of pushing a startup prematurely, I began building this portfolio — documenting my work in melanoma genetics, hearing loss research, and interactive data visualization. I'm deepening my technical skills in R, JavaScript, and bioinformatics workflows while actively seeking roles where I can apply these skills professionally.",
      whyItMattered: "This period is about consolidation and preparation. Rather than seeing the startup pivot as a setback, I'm investing in the technical foundation I need to contribute meaningfully. By documenting what I've built and continuing to develop my skills, I'm preparing for opportunities where I can both grow and be useful — whether in bioinformatics roles, freelance scientific visualization, or eventually revisiting the patient communication tools I believe are needed.",
      proteinChoice: "RNA Polymerase II is a large multimeric complex that transcribes DNA into RNA, coordinating multiple subunits to synthesize genetic messages."
    },
    component: (
      <ComingSoon
        variant="protein"
        title="Coming Soon"
        subtitle="RNA Pol II visualization"
      />
    ),
  },
];

// Helper component to render scientific text with color-coded structure terms
function ScientificText({ text, hoveredStructure, isDark, isMobile }) {
  // Define color mapping for each structure type
  const structureColors = {
    dark: {
      'Struct_Helix': '#00ff88',        // Neon green
      'Struct_Sheet': '#60d5ff',        // Light blue
      'Struct_Coil': '#00e5cc',         // Teal
      'Balls_Lysine': '#4CAF50',        // Green
      'Sticks_Lysine': '#4CAF50',       // Green
      'Mol_Surface': '#ffffff',         // White
    },
    light: {
      'Struct_Helix': '#ff9ec2',        // Pink
      'Struct_Sheet': '#ffd966',        // Yellow
      'Struct_Coil': '#ffb899',         // Peach
      'Balls_Lysine': '#4CAF50',        // Green
      'Sticks_Lysine': '#4CAF50',       // Green
      'Mol_Surface': '#78B4DC',         // Sky blue
    }
  };

  // Map terms in text to structure names
  const termToStructure = {
    'alpha-helix': 'Struct_Helix',
    'alpha helix': 'Struct_Helix',
    'helices': 'Struct_Helix',
    'helix': 'Struct_Helix',
    'beta-sheet': 'Struct_Sheet',
    'beta sheet': 'Struct_Sheet',
    'sheets': 'Struct_Sheet',
    'sheet': 'Struct_Sheet',
    'coil': 'Struct_Coil',
    'coils': 'Struct_Coil',
    'loop': 'Struct_Coil',
    'loops': 'Struct_Coil',
    'lysine': 'Balls_Lysine',
    'lysines': 'Balls_Lysine',
    'lysine residues': 'Balls_Lysine',
    'surface': 'Mol_Surface',
    'molecular surface': 'Mol_Surface',
    // GFP-specific terms
    'chromophore': 'Balls_Chromophore_SYG',
    'serine-65': 'Balls_Chromophore_SYG',
    'tyrosine-66': 'Balls_Chromophore_SYG',
    'glycine-67': 'Balls_Chromophore_SYG',
    'serine 65': 'Balls_Chromophore_SYG',
    'tyrosine 66': 'Balls_Chromophore_SYG',
    'glycine 67': 'Balls_Chromophore_SYG',
    'protein outline': 'Protein', // For the transparent protein overlay
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

function AcademicJourney() {
  const { isDark } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStructure, setHoveredStructure] = useState(null);

  // Generic controls
  const [showSurface, setShowSurface] = useState(true); // On by default - solid in expanded, aminoacids show through

  // Histone-specific controls
  const [showLysines, setShowLysines] = useState(true);

  // GFP-specific controls
  const [showBarrel, setShowBarrel] = useState(true);
  const [showChromophore, setShowChromophore] = useState(true);

  // FOXP2-specific controls
  const [showDNA, setShowDNA] = useState(true);
  const [showMutation, setShowMutation] = useState(true);
  const [showBindingInterface, setShowBindingInterface] = useState(true);

  // General structural controls (used by both)
  const [showHelices, setShowHelices] = useState(true);
  const [showSheets, setShowSheets] = useState(true);

  const timelineRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
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

  const handleCardClick = (experience) => {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('prevent-scroll');
    document.body.classList.add('modal-active');
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedExperience !== null) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedExperience]);

  useEffect(() => {
    if (!selectedExperience) {
      const scrollY = document.body.style.top;
      document.body.classList.remove('prevent-scroll');
      document.body.classList.remove('modal-active');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.classList.remove('prevent-scroll');
      document.body.classList.remove('modal-active');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [selectedExperience]);

  const modalContent = selectedExperience && ReactDOM.createPortal(
    (
      <>
          <div
            className="modal-overlay"
            onClick={closeModal}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9998,
              overflow: 'hidden'
            }}
          />
          <div
            className="modal-content"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: isMobile ? '2vh' : '80px',
              left: isMobile ? '2vw' : '2vw',
              right: isMobile ? '2vw' : '2vw',
              bottom: isMobile ? '2vh' : '2vh',
              borderRadius: '1.5rem',
              zIndex: 9999,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(250, 248, 246, 0.5)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: isDark
                ? '0 20px 60px rgba(0, 0, 0, 0.9), 0 8px 24px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isDark ? '#ffffff' : '#1f2937',
                fontSize: '1.5rem',
                zIndex: 10000,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.5)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>

            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
              flex: isMobile ? '0 0 50%' : '2',
              height: isMobile ? '50%' : '100%',
              background: 'transparent',
              borderRadius: isMobile ? '12px 12px 0 0' : '12px 0 0 12px',
              overflow: 'hidden',
              filter: 'none',
              backdropFilter: 'none'
            }}>
              {selectedExperience && (
                <ProteinViewer
                  path={selectedExperience.component.props.path}
                  position={selectedExperience.component.props.position}
                  scale={selectedExperience.component.props.scale}
                  rotation={selectedExperience.component.props.rotation}
                  cameraZ={selectedExperience.component.props.cameraZ}
                  tooltip={selectedExperience.component.props.tooltip}
                  expanded={true}
                  onHoverChange={setHoveredStructure}
                  // Pass down all state variables
                  showLysines={showLysines}
                  showSurface={showSurface}
                  showHelices={selectedExperience.id === 2 ? showBarrel : showHelices}
                  showSheets={selectedExperience.id === 2 ? showBarrel : showSheets}
                  showChromophore={showChromophore}
                  // FOXP2-specific props
                  showDNA={showDNA}
                  showMutation={showMutation}
                  showBindingInterface={showBindingInterface}
                  // Pass down all toggle functions
                  onToggleLysines={() => setShowLysines(!showLysines)}
                  onToggleSurface={() => setShowSurface(!showSurface)}
                  onToggleHelices={() => selectedExperience.id === 2 ? setShowBarrel(!showBarrel) : setShowHelices(!showHelices)}
                  onToggleSheets={() => selectedExperience.id === 2 ? setShowBarrel(!showBarrel) : setShowSheets(!showSheets)}
                  onToggleChromophore={() => setShowChromophore(!showChromophore)}
                  onToggleDNA={() => setShowDNA(!showDNA)}
                  onToggleMutation={() => setShowMutation(!showMutation)}
                  onToggleBindingInterface={() => setShowBindingInterface(!showBindingInterface)}
                  key={`modal-direct-${selectedExperience.id}`}
                />
              )}
            </div>

            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
              flex: isMobile ? '0 0 50%' : '1',
              height: isMobile ? '50%' : '100%',
              minHeight: 0,  // Critical for flex scroll to work
              padding: isMobile ? '1.5rem' : '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              color: isDark ? '#ffffff' : '#1f2937',
              overflow: 'auto',
              overscrollBehavior: 'contain',
              textShadow: 'none',
              filter: 'none',
              fontSmooth: 'always',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility'
            }}>
              {selectedExperience.expandedContent ? (
                <div style={{ paddingBottom: '2rem' }}>
                  {/* Scientific Section */}
                  {selectedExperience.expandedContent.scientific && (
                    <div style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: isMobile ? '1.2rem' : '2rem',
                      marginBottom: '2rem',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                    }}>
                      <h4 style={{
                        margin: '0 0 1.5rem 0',
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '700',
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(31, 41, 55, 1)',
                        letterSpacing: '-0.02em',
                      }}>
                        {selectedExperience.expandedContent.scientific.proteinName}
                      </h4>
                      <ScientificText
                        text={selectedExperience.expandedContent.scientific.description}
                        hoveredStructure={hoveredStructure}
                        isDark={isDark}
                        isMobile={isMobile}
                      />
                    </div>
                  )}

                  {/* Control Center - Toggle Buttons & Hover Info */}
                  <div style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: isMobile ? '1rem' : '1.5rem',
                    marginBottom: '2rem',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                  }}>
                    <h4 style={{
                      margin: '0 0 1rem 0',
                      fontSize: isMobile ? '1.1rem' : '1.2rem',
                      fontWeight: '600',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)',
                    }}>
                      Control Center
                    </h4>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : (selectedExperience.id === 2 ? 'auto 1fr' : 'auto 1fr'),
                      gap: '1rem',
                      alignItems: 'start',
                    }}>
                      {/* Left side: Toggle Buttons - CONDITIONAL RENDERING */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.8rem',
                      }}>
                        {/* GFP CONTROLS (id: 2) */}
                        {selectedExperience.id === 2 && (
                          <>
                            {/* Surface Toggle */}
                            <button
                              onClick={() => setShowSurface(!showSurface)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showSurface
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showSurface ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showSurface ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showSurface ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showSurface
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Surface
                                </span>
                              </div>
                            </button>

                            {/* Helices Toggle */}
                            <button
                              onClick={() => setShowBarrel(!showBarrel)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showBarrel
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showBarrel ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showBarrel ? '16px' : '36px',
                                  fontSize: '0.9rem',
                                  fontWeight: showBarrel ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showBarrel
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Helices
                                </span>
                              </div>
                            </button>

                            {/* Sheets Toggle */}
                            <button
                              onClick={() => setShowBarrel(!showBarrel)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showBarrel
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showBarrel ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showBarrel ? '20px' : '38px',
                                  fontSize: '0.9rem',
                                  fontWeight: showBarrel ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showBarrel
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Sheets
                                </span>
                              </div>
                            </button>

                            {/* Chromophore Toggle */}
                            <button
                              onClick={() => setShowChromophore(!showChromophore)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showChromophore
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showChromophore ? 62 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showChromophore ? '6px' : '32px',
                                  fontSize: '0.75rem',
                                  fontWeight: showChromophore ? '500' : '400',
                                  letterSpacing: '0.01em',
                                  color: showChromophore
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Chromophore
                                </span>
                              </div>
                            </button>
                          </>
                        )}

                        {/* FOXP2 CONTROLS (id: 3) */}
                        {selectedExperience.id === 3 && (
                          <>
                            {/* Surface Toggle */}
                            <button
                              onClick={() => setShowSurface(!showSurface)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showSurface
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showSurface ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showSurface ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showSurface ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showSurface
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Surface
                                </span>
                              </div>
                            </button>

                            {/* Protein Toggle */}
                            <button
                              onClick={() => setShowHelices(!showHelices)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showHelices
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showHelices ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showHelices ? '14px' : '36px',
                                  fontSize: '0.9rem',
                                  fontWeight: showHelices ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showHelices
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Protein
                                </span>
                              </div>
                            </button>

                            {/* DNA Toggle */}
                            <button
                              onClick={() => setShowDNA(!showDNA)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showDNA
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showDNA ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showDNA ? '22px' : '40px',
                                  fontSize: '0.9rem',
                                  fontWeight: showDNA ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showDNA
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  DNA
                                </span>
                              </div>
                            </button>

                            {/* Mutation Toggle */}
                            <button
                              onClick={() => setShowMutation(!showMutation)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showMutation
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showMutation ? 72 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showMutation ? '10px' : '32px',
                                  fontSize: '0.85rem',
                                  fontWeight: showMutation ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showMutation
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Mutation
                                </span>
                              </div>
                            </button>

                            {/* Interface Toggle */}
                            <button
                              onClick={() => setShowBindingInterface(!showBindingInterface)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showBindingInterface
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showBindingInterface ? 72 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showBindingInterface ? '10px' : '32px',
                                  fontSize: '0.85rem',
                                  fontWeight: showBindingInterface ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showBindingInterface
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Interface
                                </span>
                              </div>
                            </button>
                          </>
                        )}

                        {/* HISTONE H1 and OTHER CONTROLS (id !== 2 and id !== 3) */}
                        {selectedExperience.id !== 2 && selectedExperience.id !== 3 && (
                          <>
                            {/* Surface Toggle */}
                            <button
                              onClick={() => setShowSurface(!showSurface)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showSurface
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showSurface ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showSurface ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showSurface ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showSurface
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Surface
                                </span>
                              </div>
                            </button>

                            {/* Lysines Toggle */}
                            <button
                              onClick={() => setShowLysines(!showLysines)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showLysines
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showLysines ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showLysines ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showLysines ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showLysines
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Lysines
                                </span>
                              </div>
                            </button>

                            {/* Helices Toggle */}
                            <button
                              onClick={() => setShowHelices(!showHelices)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showHelices
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showHelices ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showHelices ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showHelices ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showHelices
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Helices
                                </span>
                              </div>
                            </button>

                            {/* Sheets Toggle */}
                            <button
                              onClick={() => setShowSheets(!showSheets)}
                              style={{
                                padding: 0,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '110px',
                                height: '36px',
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: showSheets
                                  ? (isDark
                                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #06b6d4 75%, #14b8a6 100%)'
                                      : 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 25%, #ff6b9d 75%, #e91e63 100%)')
                                  : 'rgba(120, 120, 128, 0.16)',
                                borderRadius: '18px',
                                transition: 'background 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 6px',
                              }}>
                                <motion.div
                                  animate={{ x: showSheets ? 76 : 4 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 28
                                  }}
                                  style={{
                                    position: 'absolute',
                                    width: '24px',
                                    height: '24px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    zIndex: 2,
                                  }}
                                />
                                <span style={{
                                  position: 'absolute',
                                  left: showSheets ? '12px' : '34px',
                                  fontSize: '0.9rem',
                                  fontWeight: showSheets ? '500' : '400',
                                  letterSpacing: '0.02em',
                                  color: showSheets
                                    ? (isDark ? '#0b0b0b' : '#ffffff')
                                    : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                  zIndex: 1,
                                }}>
                                  Sheets
                                </span>
                              </div>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Right side: Hover Info Display */}
                      {hoveredStructure ? (() => {
                      // Define colors for each structure
                      const structureColors = {
                        dark: {
                          'Struct_Helix': '#00ff88',
                          'Struct_Sheet': '#60d5ff',
                          'Struct_Coil': '#00e5cc',
                          'Balls_Lysine': '#4CAF50',
                          'Sticks_Lysine': '#4CAF50',
                          'Mol_Surface': '#ffffff',
                          'Balls_Chromophore_SYG': '#00ff00',
                          'Sticks_Chromophore_SYG': '#00ff00',
                          // FOXP2-specific
                          'Struct_DNA': '#06b6d4',
                          'Mutation_R553': '#ff0055',
                          'Interaction_Interface': '#fbbf24',
                          'Interaction_N550': '#22d3ee',
                          'Interaction_H554': '#34d399',
                          'Protein': '#00ff88',
                        },
                        light: {
                          'Struct_Helix': '#ff9ec2',
                          'Struct_Sheet': '#ffd966',
                          'Struct_Coil': '#ffb899',
                          'Balls_Lysine': '#4CAF50',
                          'Sticks_Lysine': '#4CAF50',
                          'Mol_Surface': '#78B4DC',
                          'Balls_Chromophore_SYG': '#10b981',
                          'Sticks_Chromophore_SYG': '#10b981',
                          // FOXP2-specific
                          'Struct_DNA': '#0891b2',
                          'Mutation_R553': '#f43f5e',
                          'Interaction_Interface': '#f59e0b',
                          'Interaction_N550': '#06b6d4',
                          'Interaction_H554': '#10b981',
                          'Protein': '#ff9ec2',
                        }
                      };

                      const structureNames = {
                        'Struct_Helix': 'Alpha Helix',
                        'Struct_Sheet': 'Beta Sheet',
                        'Struct_Coil': 'Coil/Loop',
                        'Balls_Lysine': 'Lysine Residue',
                        'Sticks_Lysine': 'Lysine Residue',
                        'Mol_Surface': 'Molecular Surface',
                        'Balls_Chromophore_SYG': 'Chromophore (SYG)',
                        'Sticks_Chromophore_SYG': 'Chromophore (SYG)',
                        // FOXP2-specific
                        'Struct_DNA': 'DNA Double Helix',
                        'Mutation_R553': 'Mutation Site (R553)',
                        'Interaction_Interface': 'DNA-Binding Interface',
                        'Interaction_N550': 'Asparagine 550 (N550)',
                        'Interaction_H554': 'Histidine 554 (H554)',
                        'Protein': 'Protein Structure',
                      };

                      const structureDescriptions = {
                        'Struct_Helix': 'Spiral structure stabilized by hydrogen bonds. Provides structural support and flexibility.',
                        'Struct_Sheet': 'Flat, pleated structure formed by extended strands. Provides rigidity and strength.',
                        'Struct_Coil': 'Flexible loop regions connecting secondary structures.',
                        'Balls_Lysine': 'Positively charged amino acid. Often found on protein surfaces, involved in binding interactions.',
                        'Sticks_Lysine': 'Positively charged amino acid. Often found on protein surfaces, involved in binding interactions.',
                        'Mol_Surface': 'Overall molecular surface showing the protein\'s shape and accessibility.',
                        'Balls_Chromophore_SYG': 'The light-emitting center of GFP, formed by cyclization of Serine-65, Tyrosine-66, and Glycine-67.',
                        'Sticks_Chromophore_SYG': 'The light-emitting center of GFP, formed by cyclization of Serine-65, Tyrosine-66, and Glycine-67.',
                        // FOXP2-specific
                        'Struct_DNA': 'The genetic blueprint. The protein binds here to regulate gene expression.',
                        'Mutation_R553': 'Critical Arginine residue. A mutation here (R553H) disrupts DNA binding, causing speech disorders.',
                        'Interaction_Interface': 'Key residues (N550, R553, H554) that "read" the DNA sequence in the major groove.',
                        'Interaction_N550': 'A "reader" residue that scans the DNA major groove, recognizing specific base sequences.',
                        'Interaction_H554': 'Works with N550 to "read" the TRAC DNA sequence, essential for DNA recognition.',
                        'Protein': 'The overall protein structure showing secondary structure elements.',
                      };

                      const color = isDark ? structureColors.dark[hoveredStructure] : structureColors.light[hoveredStructure];
                      const name = structureNames[hoveredStructure];
                      const description = structureDescriptions[hoveredStructure];

                        return (
                          <div style={{
                            padding: '1rem 1.25rem',
                            background: color ? `${color}20` : 'rgba(255, 255, 255, 0.1)',
                            border: color ? `2px solid ${color}` : '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '8px',
                            animation: 'fadeIn 0.2s ease-out',
                          }}>
                            <div style={{
                              fontSize: isMobile ? '1rem' : '1.1rem',
                              fontWeight: '700',
                              color: color || (isDark ? '#ffffff' : '#000000'),
                              marginBottom: '0.5rem',
                            }}>
                              {name}
                            </div>
                            <div style={{
                              fontSize: isMobile ? '0.85rem' : '0.9rem',
                              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)',
                              lineHeight: '1.5',
                            }}>
                              {description}
                            </div>
                          </div>
                        );
                      })() : (
                        <div style={{
                          padding: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                          border: isDark ? '1px dashed rgba(255, 255, 255, 0.2)' : '1px dashed rgba(0, 0, 0, 0.15)',
                          borderRadius: '8px',
                          minHeight: '80px',
                          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(31, 41, 55, 0.5)',
                          fontSize: isMobile ? '0.85rem' : '0.9rem',
                          textAlign: 'center',
                        }}>
                          Hover over the protein structure to see detailed information
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Section - Minimalistic */}
                  {selectedExperience.expandedContent.personal && (
                    <div style={{
                      marginBottom: '1rem',
                    }}>
                      <h4 style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: isMobile ? '1.4rem' : '1.6rem',
                        fontWeight: '600',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)',
                        letterSpacing: '-0.01em',
                      }}>
                        My Journey
                      </h4>
                      <span style={{
                        display: 'block',
                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                        opacity: '0.7',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(31, 41, 55, 0.6)',
                      }}>
                        {selectedExperience.title} • {selectedExperience.years}
                      </span>
                      <p style={{
                        margin: '0 0 1rem 0',
                        lineHeight: '1.6',
                        fontSize: isMobile ? '1rem' : '1.05rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(31, 41, 55, 0.7)',
                      }}>
                        {selectedExperience.expandedContent.personal.whatIDid}
                      </p>
                      <p style={{
                        margin: '0',
                        lineHeight: '1.6',
                        fontSize: isMobile ? '1rem' : '1.05rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(31, 41, 55, 0.7)',
                      }}>
                        {selectedExperience.expandedContent.personal.whyItMattered}
                      </p>
                    </div>
                  )}

                  {/* Fallback for old data structure */}
                  {!selectedExperience.expandedContent.scientific && !selectedExperience.expandedContent.personal && (
                    <div>
                      <h4 style={{
                        margin: '0 0 0.75rem 0',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        fontWeight: '600',
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(31, 41, 55, 0.9)'
                      }}>
                        What I Did
                      </h4>
                      <p style={{
                        margin: '0 0 1rem 0',
                        lineHeight: '1.5',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                      }}>
                        {selectedExperience.expandedContent.whatIDid}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{
                  margin: '0 0 1rem 0',
                  lineHeight: '1.5',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                }}>
                  {selectedExperience.description}
                </p>
              )}
            </div>
          </div>
        </>
    ),
    document.body
  );

  return (
    <>
      {modalContent}

      <section ref={sectionRef} className="academic-journey-wrapper">
        <div className="about-layout about-container">
              <div className="about-timeline" ref={timelineRef}>

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
            <p className="timeline-intro-subtitle">Building the Toolkit: Decoding Biology, Translating for Humans</p>
            <p className="timeline-intro-description">
              What started as a simple CV evolved into this interactive experience. A list of dates couldn't capture the true process of building a toolkit. So, I mapped my journey to these protein structures, developing custom tools to make them explorable. Every period contributed valuable insights, shaping my path from foundational principles to their human impact.
            </p>
          </motion.div>

          {/* Timeline dots and cards - same structure as original About.jsx */}
          {/* Entry 1: 2016 + Universidad Europea */}
          <motion.div
            className="timeline-dot"
            initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={isMobile
              ? { duration: 0.6, delay: 0, type: "spring", stiffness: 150, damping: 12 }
              : { duration: 0.3, delay: 0, ease: "easeOut" }
            }
            style={{
              position: 'absolute',
              top: '50px',
              left: 'calc(50% - 30px)',
              zIndex: 10
            }}
          >
            2016
          </motion.div>

          {/* Card 1 */}
          <motion.div
            className={`about-card right-card`}
            data-year="2016"
            initial={isMobile
              ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
              : { opacity: 0, x: -40 }
            }
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile
              ? {
                  duration: 0.8,
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              : { duration: 0.4, delay: 0, ease: "easeOut" }
            }
            onClick={() => handleCardClick(experiences[0])}
            style={isMobile ? {
              position: 'static',
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              left: 'unset',
              right: 'unset',
              top: 'unset'
            } : {
              position: 'absolute',
              top: '50px',
              right: "var(--timeline-side-offset)",
              width: "var(--timeline-card-width)",
              zIndex: 5,
            }}
          >
            <div className="about-card-content">
              <div className="protein-viewer-container" style={{ cursor: 'pointer' }}>
                {!selectedExperience && React.cloneElement(experiences[0].component, {
                  expanded: false,
                  key: `card-0-disabled`,
                  onInspect: () => handleCardClick(experiences[0]),
                })}
                {selectedExperience && <div style={{background: 'rgba(100,100,100,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>Click to view in modal</div>}
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
                  position: 'absolute',
                  top: '66px',
                  left: 'calc(50% - 1px)',
                  width: '2px',
                  background: isDark
                    ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))'
                    : 'linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)',
                  boxShadow: isDark
                    ? '0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)'
                    : '0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)',
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: 'top'
                }}
              />
          )}

          {/* Entry 2: 2019 + UQ */}
          <motion.div
            className="timeline-dot"
            initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={isMobile
              ? { duration: 0.6, delay: 0, type: "spring", stiffness: 150, damping: 12 }
              : { duration: 0.3, ease: "easeOut" }
            }
            style={{
              position: 'absolute',
              top: '600px',
              left: 'calc(50% - 30px)',
              zIndex: 10
            }}
          >
            2019
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className={`about-card left-card`}
            data-year="2019"
            initial={isMobile
              ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
              : { opacity: 0, x: -40 }
            }
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile
              ? {
                  duration: 0.8,
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              : { duration: 0.4, delay: 0, ease: "easeOut" }
            }
            onClick={() => handleCardClick(experiences[1])}
            style={isMobile ? {
              position: 'static',
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              left: 'unset',
              right: 'unset',
              top: 'unset'
            } : {
              position: 'absolute',
              top: '600px',
              left: 'var(--timeline-side-offset)',
              width: 'var(--timeline-card-width)',
              zIndex: 5
            }}
          >
            <div className="about-card-content">
              <div className="protein-viewer-container" style={{ cursor: 'pointer' }}>
                {!selectedExperience && React.cloneElement(experiences[1].component, {
                  expanded: false,
                  key: `card-1-disabled`,
                  onInspect: () => handleCardClick(experiences[1]),
                })}
                {selectedExperience && <div style={{background: 'rgba(100,100,100,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>Click to view in modal</div>}
              </div>
              <div className="about-card-text">
                <span className="card-phase">{experiences[1].years}</span>
                <h3>{experiences[1].title}</h3>
                <p>{experiences[1].description}</p>
                <span className="click-hint">Click to explore</span>
              </div>
            </div>
          </motion.div>

          {/* LASER 2 */}
          {!isMobile && (
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 534 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '616px',
                  left: 'calc(50% - 1px)',
                  width: '2px',
                  background: isDark
                    ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))'
                    : 'linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)',
                  boxShadow: isDark
                    ? '0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)'
                    : '0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)',
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: 'top'
                }}
              />
          )}

          {/* Entry 3: 2022 + IGM */}
          <motion.div
            className="timeline-dot"
            initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={isMobile
              ? { duration: 0.6, delay: 0, type: "spring", stiffness: 150, damping: 12 }
              : { duration: 0.3, ease: "easeOut" }
            }
            style={{
              position: 'absolute',
              top: '1150px',
              left: 'calc(50% - 30px)',
              zIndex: 10
            }}
          >
            2022
          </motion.div>

          {/* Card 3: IGM */}
          <motion.div
            className={`about-card right-card`}
            data-year="2022"
            initial={isMobile
              ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
              : { opacity: 0, x: 40 }
            }
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile
              ? {
                  duration: 0.8,
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              : { duration: 0.4, delay: 0, ease: "easeOut" }
            }
            onClick={() => handleCardClick(experiences[3])}
            style={isMobile ? {
              position: 'static',
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              left: 'unset',
              right: 'unset',
              top: 'unset'
            } : {
              position: 'absolute',
              top: '1150px',
              right: 'var(--timeline-side-offset)',
              width: 'var(--timeline-card-width)',
              zIndex: 5
            }}
          >
            <div className="about-card-content">
              <div className={experiences[3].comingSoon ? "placeholder-container" : "protein-viewer-container"} style={{ cursor: 'pointer' }}>
                {!selectedExperience && experiences[3].component}
                {selectedExperience && <div style={{background: 'rgba(100,100,100,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>Click to view in modal</div>}
              </div>
              <div className="about-card-text">
                <span className="card-phase">{experiences[3].years}</span>
                <h3>{experiences[3].title}</h3>
                <p>{experiences[3].description}</p>
                <span className="click-hint">Click to explore</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: UTS */}
          <motion.div
            className={`about-card left-card`}
            data-year="2022"
            initial={isMobile
              ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
              : { opacity: 0, x: -40 }
            }
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile
              ? {
                  duration: 0.8,
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              : { duration: 0.4, delay: 0, ease: "easeOut" }
            }
            onClick={() => handleCardClick(experiences[2])}
            style={isMobile ? {
              position: 'static',
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              left: 'unset',
              right: 'unset',
              top: 'unset'
            } : {
              position: 'absolute',
              top: '1400px',
              left: 'var(--timeline-side-offset)',
              width: 'var(--timeline-card-width)',
              zIndex: 5
            }}
          >
            <div className="about-card-content">
              <div className="protein-viewer-container" style={{ cursor: 'pointer' }}>
                {!selectedExperience && React.cloneElement(experiences[2].component, {
                  expanded: false,
                  key: `card-2-disabled`,
                  onInspect: () => handleCardClick(experiences[2]),
                })}
                {selectedExperience && <div style={{background: 'rgba(100,100,100,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>Click to view in modal</div>}
              </div>
              <div className="about-card-text">
                <span className="card-phase">{experiences[2].years}</span>
                <h3>{experiences[2].title}</h3>
                <p>{experiences[2].description}</p>
                <span className="click-hint">Click to explore</span>
              </div>
            </div>
          </motion.div>

          {/* LASER 3 */}
          {!isMobile && (
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 784 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '1166px',
                  left: 'calc(50% - 1px)',
                  width: '2px',
                  background: isDark
                    ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(200, 200, 200, 0.25))'
                    : 'linear-gradient(to bottom, #ffffff, #fef3cd, #fed7aa, #fb923c)',
                  boxShadow: isDark
                    ? '0 0 4px rgba(255, 255, 255, 0.2), 0 0 8px rgba(255, 255, 255, 0.1)'
                    : '0 0 12px rgba(255, 248, 220, 0.9), 0 0 24px rgba(251, 146, 60, 0.7), 0 0 36px rgba(249, 115, 22, 0.5), 0 0 48px rgba(234, 88, 12, 0.3)',
                  opacity: isDark ? 0.35 : 1,
                  zIndex: 8,
                  transformOrigin: 'top'
                }}
              />
          )}

          {/* Entry 5: 2025 + Lanzarote */}
          <motion.div
            className="timeline-dot"
            initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={isMobile
              ? { duration: 0.6, delay: 0, type: "spring", stiffness: 150, damping: 12 }
              : { duration: 0.3, ease: "easeOut" }
            }
            style={{
              position: 'absolute',
              top: '1950px',
              left: 'calc(50% - 30px)',
              zIndex: 10
            }}
          >
            2025
          </motion.div>

          {/* Card 5 */}
          <motion.div
            className={`about-card right-card`}
            data-year="2025"
            initial={isMobile
              ? { opacity: 0, y: -300, scale: 0.7, rotateX: -25 }
              : { opacity: 0, x: 40 }
            }
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile
              ? {
                  duration: 0.8,
                  delay: 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              : { duration: 0.4, delay: 0, ease: "easeOut" }
            }
            onClick={() => handleCardClick(experiences[4])}
            style={isMobile ? {
              position: 'static',
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              left: 'unset',
              right: 'unset',
              top: 'unset'
            } : {
              position: 'absolute',
              top: '1950px',
              right: 'var(--timeline-side-offset)',
              width: 'var(--timeline-card-width)',
              zIndex: 5
            }}
          >
            <div className="about-card-content">
              <div className={experiences[4].comingSoon ? "placeholder-container" : "protein-viewer-container"} style={{ cursor: 'pointer' }}>
                {!selectedExperience && experiences[4].component}
                {selectedExperience && <div style={{background: 'rgba(100,100,100,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px'}}>Click to view in modal</div>}
              </div>
              <div className="about-card-text">
                <span className="card-phase">{experiences[4].years}</span>
                <h3>{experiences[4].title}</h3>
                <p>{experiences[4].description}</p>
                <span className="click-hint">Click to explore</span>
              </div>
            </div>
          </motion.div>

          <div className="left-side"></div>
          <div className="right-side"></div>
        </div>
        </div>
      </section>
    </>
  );
}

export default AcademicJourney;
