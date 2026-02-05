// src/components/Hero/InfoPanels.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const nucleotideDetails = {
  Adenine: {
    name: "Adenine",
    abbr: "A",
    color: "#40ff40", // Green - matches 3D structure
    category: "BASE CHEMISTRY · ENERGY",
    meta: "Purine · pairs with thymine · 2 hydrogen bonds",
    body: [
      <>
        <span className="info-panel__term">Purine</span> with a fused two-ring scaffold that pairs exclusively with{" "}
        <span className="info-panel__term">thymine</span> through two hydrogen bonds, reinforcing the helix.
      </>,
      <>
        Powers cellular energy transfer as a core component of{" "}
        <span className="info-panel__term">ATP</span> and related nucleotide cofactors, echoing its Greek root{" "}
        <em>aden</em> (gland).
      </>,
    ],
    mobileSummary:
      "Purine partner for thymine, locking in two hydrogen bonds and energising ATP-driven chemistry.",
  },
  Thymine: {
    name: "Thymine",
    abbr: "T",
    color: "#ff4040", // Red - matches 3D structure
    category: "BASE CHEMISTRY · FIDELITY",
    meta: "Pyrimidine · pairs with adenine · 2 hydrogen bonds",
    body: [
      <>
        Single-ring <span className="info-panel__term">pyrimidine</span> that binds only{" "}
        <span className="info-panel__term">adenine</span> via two hydrogen bonds, keeping replication precise.
      </>,
      <>
        Its thymus-derived name nods to the tissue where it was isolated and to its role in genomic proofreading.
      </>,
    ],
    mobileSummary:
      "Pyrimidine base that pairs only with adenine, providing consistent two-bond fidelity during replication.",
  },
  Cytosine: {
    name: "Cytosine",
    abbr: "C",
    color: "#0080ff", // Blue - matches 3D structure
    category: "BASE CHEMISTRY · EPIGENETICS",
    meta: "Pyrimidine · pairs with guanine · 3 hydrogen bonds",
    body: [
      <>
        <span className="info-panel__term">Pyrimidine</span> partner to{" "}
        <span className="info-panel__term">guanine</span>, forming three hydrogen bonds that give the helix extra tensile
        strength.
      </>,
      <>
        Frequent site of <span className="info-panel__term">DNA methylation</span>, toggling gene activity without changing
        sequence.
      </>,
    ],
    mobileSummary:
      "Triple-bonding pyrimidine for guanine; common methylation site guiding gene regulation.",
  },
  Guanine: {
    name: "Guanine",
    abbr: "G",
    color: "#ffff00", // Yellow - matches 3D structure
    category: "BASE CHEMISTRY · SIGNALING",
    meta: "Purine · pairs with cytosine · 3 hydrogen bonds",
    body: [
      <>
        Two-ring <span className="info-panel__term">purine</span> that bonds with cytosine through three hydrogen bridges, the
        helix’s most stable base pair.
      </>,
      <>
        Fuels cellular signalling as part of <span className="info-panel__term">GTP</span> and other guanine nucleotides first
        isolated from guano.
      </>,
    ],
    mobileSummary:
      "Purine matched to cytosine with three hydrogen bridges; key to GTP-mediated signalling.",
  },
  Backbone: {
    name: "Backbone",
    abbr: "",
    color: "#888888", // Gray - matches 3D structure
    category: "STRUCTURAL SCAFFOLD",
    meta: "Sugar–phosphate chain · directional 5′→3′ links",
    body: [
      <>
        Alternating <span className="info-panel__term">deoxyribose</span> sugars and phosphate groups create a directional spine
        anchoring each nucleotide.
      </>,
      <>
        <span className="info-panel__term">Phosphodiester bonds</span> hold the rails together and orient bases for precise
        Watson–Crick pairing.
      </>,
    ],
    mobileSummary:
      "Sugar–phosphate spine with 5′→3′ phosphodiester links positioning bases for accurate pairing.",
  },
};

const dnaPanelContent = {
  title: (
    <>
      DNA Double Helix{" "}
      <a href="https://www.rcsb.org/structure/1BNA" target="_blank" rel="noopener noreferrer">
        (1BNA)
      </a>
    </>
  ),
  category: "STRUCTURE · GENETICS",
  meta: "12 base pairs · B-form DNA · PDB 1BNA",
  body: [
    <>
      <span className="info-panel__term">DNA is the code that organizes life.</span> This double helix stores hereditary
      instructions, held together by base pairing and a sugar–phosphate backbone.
    </>,
    <>
      This segment captures a 12-base-pair fragment of <span className="info-panel__term">B-form DNA</span> (CGCGAATTCGCG), a
      benchmark sequence in structural biology.
    </>,
    <>
      This structure was resolved through crystallography in 1981 at{" "}
      <span className="info-panel__term">1.9 Å</span> resolution and remains one of the most recognizable examples in molecular
      biology, showing canonical A–T and G–C pairings, a right-handed twist, and pronounced major and minor grooves.
    </>,
  ],
  mobileSummary: "12 base pairs of B-form DNA with canonical pairing and right-handed twist.",
  citation: (
    <>
      Source:{" "}
      <a href="https://www.rcsb.org/structure/1BNA" target="_blank" rel="noopener noreferrer">
        RCSB PDB
      </a>{" "}
      · ID: 1BNA
    </>
  ),
};

export default function InfoPanels({
  isSpinning,
  showInfo,
  hoveredNucleotide,
  exitingToScroll,
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for different panel layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const instructionDelay = 0.8;
  const instructionDuration = 0.4;
  const dnaTextDelay = instructionDelay * 2;

  // Mobile layout
  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {!isSpinning && !exitingToScroll && (
            <motion.div
              className="info-panel mobile-top"
              initial={{ opacity: 0, y: -40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -40, rotateX: -15 }}
              transition={{
                delay: exitingToScroll ? 0 : 0.5,
                duration: exitingToScroll ? 0.4 : 0.6,
                ease: "easeOut",
              }}
            >
              <h3 className="info-panel__title">{dnaPanelContent.title}</h3>
              <div className="info-panel__divider" />
              <div className="info-panel__body">
                <p className="mobile-description">{dnaPanelContent.mobileSummary}</p>
              </div>
              <p className="controls-hint">Drag · Pan · Pinch to zoom</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hoveredNucleotide && !isSpinning && !exitingToScroll && (
            <motion.div
              className="info-panel mobile-nucleotide"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: exitingToScroll ? 0.3 : 0.2,
                ease: "easeOut",
              }}
            >
              {(() => {
                const info = nucleotideDetails[hoveredNucleotide];
                return (
                  <>
                    <h3 className="info-panel__title">
                      <span
                        className="base-square"
                        style={{ background: info.color }}
                      />
                      {info.name}
                      {info.abbr ? ` (${info.abbr})` : ""}
                    </h3>
                    <p className="info-panel__category">{info.category}</p>
                    {info.meta && <p className="info-panel__meta">{info.meta}</p>}
                    <div className="info-panel__divider" />
                    <div className="info-panel__body">
                      <p className="mobile-description">
                        {info.mobileSummary || info.body[0]}
                      </p>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop layout (original)
  return (
    <>
      <AnimatePresence>
        {!isSpinning && !exitingToScroll && (
          <motion.div
            className="orbit-controls-instructions"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              delay: exitingToScroll ? 0 : instructionDelay,
              duration: exitingToScroll ? 0.3 : instructionDuration,
              ease: "easeOut",
            }}
          >
            <p>
              <strong>Controls:</strong>
            </p>
            <p>
              🖱️ Left-click + drag to <strong>rotate</strong>
            </p>
            <p>
              🖱️ Right-click + drag to <strong>pan</strong>
            </p>
            <p>
              🖱️ Scroll to <strong>zoom</strong>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isSpinning && !exitingToScroll && (
          <motion.div
            className="info-panel right"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              delay: exitingToScroll ? 0 : dnaTextDelay, 
              duration: exitingToScroll ? 0.3 : 0.4, 
              ease: "easeOut" 
            }}
          >
            <h3 className="info-panel__title">{dnaPanelContent.title}</h3>
            <p className="info-panel__category">{dnaPanelContent.category}</p>
            <p className="info-panel__meta">{dnaPanelContent.meta}</p>
            <div className="info-panel__divider" />
            <div className="info-panel__body">
              {dnaPanelContent.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="citation">{dnaPanelContent.citation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredNucleotide && !isSpinning && !exitingToScroll && (
          <motion.div
            className="info-panel left"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              duration: exitingToScroll ? 0.3 : 0.3, 
              ease: "easeOut" 
            }}
          >
            {(() => {
              const info = nucleotideDetails[hoveredNucleotide];
              return (
                <>
                  <h3 className="info-panel__title">
                    <span
                      className="base-square"
                      style={{ background: info.color }}
                    />
                    {info.name}
                    {info.abbr ? ` (${info.abbr})` : ""}
                  </h3>
                  <p className="info-panel__category">{info.category}</p>
                  {info.meta && <p className="info-panel__meta">{info.meta}</p>}
                  <div className="info-panel__divider" />
                  <div className="info-panel__body">
                    {info.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
