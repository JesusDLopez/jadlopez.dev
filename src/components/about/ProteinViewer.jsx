import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "../../contexts/ThemeContext";

// Info about protein structure elements
const structureInfo = {
  Struct_Helix: {
    name: "Alpha Helix",
    description: "Spiral structure stabilized by hydrogen bonds. Provides structural support and flexibility.",
  },
  Struct_Sheet: {
    name: "Beta Sheet",
    description: "Flat, pleated structure formed by extended strands. Provides rigidity and strength.",
  },
  Balls_Lysine: {
    name: "Lysine Residue",
    description: "Positively charged amino acid. Often found on protein surfaces, involved in binding interactions.",
  },
  Sticks_Lysine: {
    name: "Lysine Residue",
    description: "Positively charged amino acid. Often found on protein surfaces, involved in binding interactions.",
  },
  Balls_Chromophore_SYG: {
    name: "Chromophore (SYG)",
    description: "The light-emitting center of GFP, formed by cyclization of Serine-65, Tyrosine-66, and Glycine-67.",
  },
  Sticks_Chromophore_SYG: {
    name: "Chromophore (SYG)",
    description: "The light-emitting center of GFP, formed by cyclization of Serine-65, Tyrosine-66, and Glycine-67.",
  },
  Mol_Surface: {
    name: "Molecular Surface",
    description: "The overall shape and solvent-accessible surface of the protein.",
  },
  Protein: {
    name: "Full Protein Outline",
    description: "A transparent outline of the entire protein, providing context for the main structural elements.",
  },
  Struct_DNA: {
    name: "DNA Double Helix",
    description: "The genetic blueprint. The protein binds here to regulate gene expression.",
  },
  Mutation_R553: {
    name: "Mutation Site (R553)",
    description: "Critical Arginine residue. A mutation here (R553H) disrupts DNA binding, causing speech disorders.",
  },
  Interaction_Interface: {
    name: "DNA-Binding Interface",
    description: "Key residues (N550, R553, H554) that 'read' the DNA sequence in the major groove.",
  },
  Interaction_N550: {
    name: "Asparagine 550 (N550)",
    description: "A 'reader' residue that scans the DNA major groove, recognizing specific base sequences.",
  },
  Interaction_H554: {
    name: "Histidine 554 (H554)",
    description: "Works with N550 to 'read' the TRAC DNA sequence, essential for DNA recognition.",
  },
};

function ProteinModel({
  path,
  position = [0, -0.2, 0],
  scale = [0.9, 0.9, 0.9],
  rotation = [0, 0, 0],
  expanded = false,
  isDark = true,
  showLysines = false,
  showSurface = true,
  showHelices = true,
  showSheets = true,
  showChromophore = true,
  showInteractions = false,
  // FOXP2-specific props
  showDNA = true,
  showMutation = true,
  showBindingInterface = true,
  onHover,
}) {
  const groupRef = useRef();
  const modelRef = useRef();
  const { scene } = useGLTF(path);
  const [lysineLabels, setLysineLabels] = useState([]);
  const { camera, mouse, raycaster } = useThree();
  const prevHoveredRef = useRef(null);
  const initialRotationRef = useRef(rotation); // Store initial rotation

  // Color schemes with emissive glow - vibrant and alive!
  const colorSchemes = {
    dark: {
      Struct_Helix: {
        color: '#00ff88',     // Bright neon green/teal
        emissive: '#00ff88',  // Matching emissive for glow
        emissiveIntensity: 0.2
      },
      Struct_Sheet: {
        color: '#60d5ff',     // Bright neon light blue
        emissive: '#60d5ff',  // Matching emissive for glow
        emissiveIntensity: 0.2
      },
      Struct_Coil: {
        color: '#00e5cc',     // Bright teal
        emissive: '#14b8a6',  // Teal glow
        emissiveIntensity: 0.3
      },
      Mol_Surface: { // Transparent surface for context
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.1, // Subtle white glow
        opacity: 0.25, // Slightly more visible
        transparent: true,
      },
      Protein: {
        color: '#60d5ff',     // Light blue - subtle connector overlay
        emissive: '#60d5ff',
        emissiveIntensity: 0.05,
        opacity: 0.15,        // Very transparent - just hints at connections
        transparent: true,
      },
      Balls_Lysine: {
        color: '#4CAF50',     // Green - standard chemical coloring
        emissive: '#000000',
        emissiveIntensity: 0
      },
      Sticks_Lysine: {
        color: '#ffffff',     // White - standard bonds
        emissive: '#000000',
        emissiveIntensity: 0
      },
      Balls_Chromophore_SYG: { // Chromophore for GFP - bright green
        color: '#00ff00',
        emissive: '#00ff00',
        emissiveIntensity: 0.8
      },
      Sticks_Chromophore_SYG: { // Chromophore for GFP - bright green
        color: '#00ff00',
        emissive: '#00ff00',
        emissiveIntensity: 0.8
      },
      Struct_DNA: {
        color: '#06b6d4',     // Cyan/Teal (contrasts with purple protein)
        emissive: '#22d3ee',
        emissiveIntensity: 0.4
      },
      Mutation_R553: {
        color: '#ff0055',     // Bright Red/Pink (Danger/Critical)
        emissive: '#ff0055',
        emissiveIntensity: 0.8
      },
      Interaction_Interface: {
        color: '#fbbf24',     // Amber/Gold (Highlight)
        emissive: '#fbbf24',
        emissiveIntensity: 0.6
      },
      Interaction_N550: {
        color: '#22d3ee',     // Cyan (Reader residue)
        emissive: '#22d3ee',
        emissiveIntensity: 0.6
      },
      Interaction_H554: {
        color: '#34d399',     // Emerald Green (Reader residue)
        emissive: '#34d399',
        emissiveIntensity: 0.6
      },
    },
    light: {
      Struct_Helix: {
        color: '#ff9ec2',     // Pink for helices
        emissive: '#ff9ec2',  // Matching emissive
        emissiveIntensity: 0.15
      },
      Struct_Sheet: {
        color: '#ffd966',     // Yellow for sheets
        emissive: '#ffd966',  // Matching emissive
        emissiveIntensity: 0.15
      },
      Struct_Coil: {
        color: '#ffb899',     // Light peach/orange
        emissive: '#ff8e53',  // Warm glow
        emissiveIntensity: 0.2
      },
      Mol_Surface: { // Transparent surface for context
        color: '#78B4DC',
        emissive: '#64C8DC',
        emissiveIntensity: 0.05, // Subtle glow
        opacity: 0.2, // Default transparency
        transparent: true,
      },
      Protein: {
        color: '#ffd966',     // Yellow - subtle connector overlay
        emissive: '#ffd966',
        emissiveIntensity: 0.05,
        opacity: 0.15,        // Very transparent - just hints at connections
        transparent: true,
      },
      Balls_Lysine: {
        color: '#4CAF50',     // Green - standard chemical coloring (same as dark)
        emissive: '#000000',
        emissiveIntensity: 0
      },
      Sticks_Lysine: {
        color: '#ffffff',     // White - standard bonds (same as dark)
        emissive: '#000000',
        emissiveIntensity: 0
      },
      Balls_Chromophore_SYG: { // Chromophore for GFP - softer emerald green
        color: '#10b981',
        emissive: '#10b981',
        emissiveIntensity: 0.5
      },
      Sticks_Chromophore_SYG: { // Chromophore for GFP - softer emerald green
        color: '#10b981',
        emissive: '#10b981',
        emissiveIntensity: 0.5
      },
      Struct_DNA: {
        color: '#0891b2',     // Cyan for light mode
        emissive: '#06b6d4',
        emissiveIntensity: 0.25
      },
      Mutation_R553: {
        color: '#f43f5e',     // Rose (Danger)
        emissive: '#fb7185',
        emissiveIntensity: 0.5
      },
      Interaction_Interface: {
        color: '#f59e0b',     // Amber
        emissive: '#fbbf24',
        emissiveIntensity: 0.4
      },
      Interaction_N550: {
        color: '#06b6d4',     // Cyan
        emissive: '#22d3ee',
        emissiveIntensity: 0.4
      },
      Interaction_H554: {
        color: '#10b981',     // Emerald
        emissive: '#34d399',
        emissiveIntensity: 0.4
      },
    }
  };

  // Apply colors and visibility based on object names
  useEffect(() => {
    if (scene) {
      const colors = isDark ? colorSchemes.dark : colorSchemes.light;
      const lysinePositions = [];

      // Known mesh names that should be visible
      const knownMeshNames = [
        'Struct_Helix', 'Struct_Sheet', 'Struct_Coil',
        'Mol_Surface', 'Protein',
        'Balls_Lysine', 'Sticks_Lysine',
        'Balls_Chromophore_SYG', 'Sticks_Chromophore_SYG',
        'Struct_DNA', 'Mutation_R553', 'Interaction_Interface',
        'Interaction_N550', 'Interaction_H554'
      ];

      scene.traverse((object) => {
        // Hide unknown meshes and helper artifacts
        if (object.isMesh && object.name && !knownMeshNames.includes(object.name)) {
          object.visible = false;
        }

        // Also hide meshes with empty or no name (potential artifacts/helpers)
        if (object.isMesh && (!object.name || object.name === '')) {
          object.visible = false;
        }

        // Hide Points objects (often used as markers/helpers in Blender exports)
        if (object.isPoints) {
          object.visible = false;
        }

        // Hide Line objects (potential helper lines)
        if (object.isLine) {
          object.visible = false;
        }

        if (object.isMesh && object.material) {
          // Clone material to avoid affecting other instances
          object.material = object.material.clone();

          // Clear vertex colors that might be baked in from Blender
          if (object.geometry && object.geometry.attributes.color) {
            object.geometry.deleteAttribute('color');
          }

          // Disable vertex colors on material to ensure our colors are used
          object.material.vertexColors = false;

          // Store original emissive for hover effects
          if (!object.material.userData.originalEmissive) {
            object.material.userData.originalEmissive = object.material.emissive ? object.material.emissive.clone() : new THREE.Color(0, 0, 0);
            object.material.userData.originalEmissiveIntensity = object.material.emissiveIntensity || 0;
          }

          // Control lysine visibility based on showLysines toggle
          // NEVER show in card mode (expanded=false)
          if (object.name === 'Sticks_Lysine' || object.name === 'Balls_Lysine') {
            object.visible = expanded && showLysines;
          }

          // Control surface visibility based on showSurface toggle
          // Show in card mode AND expanded mode (respects toggle only when expanded)
          if (object.name === 'Mol_Surface') {
            object.visible = expanded ? showSurface : true; // Always visible in card mode
          }

          // Control helix visibility based on showHelices toggle
          // Show in card mode AND expanded mode (respects toggle only when expanded)
          if (object.name === 'Struct_Helix') {
            object.visible = expanded ? showHelices : true; // Always visible in card mode
          }

          // Control sheet visibility based on showSheets toggle
          // Show in card mode AND expanded mode (respects toggle only when expanded)
          if (object.name === 'Struct_Sheet') {
            object.visible = expanded ? showSheets : true; // Always visible in card mode
          }

          // Control Protein overlay (Shows coils/loops connecting secondary structures)
          // Only visible when BOTH helices AND sheets are visible (since it connects them)
          if (object.name === 'Protein') {
            object.visible = expanded ? (showHelices && showSheets) : true;
          }

          // GFP Specifics: Chromophore - NEVER show in card mode
          if (object.name === 'Balls_Chromophore_SYG' || object.name === 'Sticks_Chromophore_SYG') {
            object.visible = expanded && showChromophore;
          }

          // FOXP2 Specifics: DNA visibility (controlled by toggle)
          if (object.name === 'Struct_DNA') {
            object.visible = expanded ? showDNA : true; // Always visible in card mode
          }

          // FOXP2 Specifics: Mutation site - NEVER show in card mode, controlled by toggle
          if (object.name === 'Mutation_R553') {
            object.visible = expanded && showMutation;
          }

          // FOXP2 Specifics: Interaction Interface (binding residues) - NEVER show in card mode
          if (object.name === 'Interaction_Interface') {
            object.visible = expanded && showBindingInterface;
          }

          // Collect lysine ball positions for labels (only show when expanded)
          if (expanded && object.name === 'Balls_Lysine') {
            // Get the world position of this object
            const worldPos = new THREE.Vector3();
            object.getWorldPosition(worldPos);

            // Try to extract residue number from object name or userData
            let residueNumber = '';
            if (object.userData && object.userData.residueNumber) {
              residueNumber = object.userData.residueNumber;
            } else if (object.name.match(/\d+/)) {
              // Extract number from name if present (e.g., "Balls_Lysine_123")
              const match = object.name.match(/\d+/);
              residueNumber = match ? match[0] : '';
            }

            lysinePositions.push({
              position: [worldPos.x, worldPos.y, worldPos.z],
              label: residueNumber ? `LYS ${residueNumber}` : 'LYS'
            });
          }

          // Apply colors and emissive glow based on naming convention
          if (colors[object.name]) {
            const colorConfig = colors[object.name];

            // Set base color
            object.material.color = new THREE.Color(colorConfig.color);

            // Set emissive glow
            object.material.emissive = new THREE.Color(colorConfig.emissive);
            object.material.emissiveIntensity = colorConfig.emissiveIntensity;

            // Update stored original emissive to current settings for hover reset
            object.material.userData.originalEmissive = new THREE.Color(colorConfig.emissive);
            object.material.userData.originalEmissiveIntensity = colorConfig.emissiveIntensity;

            // Special handling for surface
            if (object.name === 'Mol_Surface') {
              if (!expanded) {
                // Card view: transparent surface for nice preview
                object.material.transparent = true;
                object.material.opacity = 0.2;
                object.material.depthWrite = false;
                object.material.depthTest = true;
                object.material.side = THREE.DoubleSide;
                object.material.renderOrder = -1;
              } else {
                // Expanded view: solid surface (no transparency issues)
                object.material.transparent = false;
                object.material.opacity = 1.0;
                object.material.depthWrite = true;
                object.material.side = THREE.DoubleSide;
              }
            }

            // Special handling for Protein overlay - always semi-transparent
            if (object.name === 'Protein') {
              object.material.transparent = true;
              object.material.opacity = colorConfig.opacity || 0.3;
              object.material.depthWrite = false;
              object.material.side = THREE.DoubleSide;
              object.renderOrder = -2; // Render before surface
            }

            // Special handling for Mutation_R553 - always visible (even through surface)
            if (object.name === 'Mutation_R553') {
              object.material.depthTest = false;         // Ignore depth - always visible
              object.renderOrder = 100;                  // Render last
            }

            // Special handling for Interaction_Interface - always visible (even through surface)
            if (object.name === 'Interaction_Interface') {
              object.material.depthTest = false;         // Ignore depth - always visible
              object.renderOrder = 99;                   // Render after surface but before mutation
            }

            // Lysine residues - always visible through surface
            if (object.name === 'Balls_Lysine' || object.name === 'Sticks_Lysine') {
              object.material.depthTest = false;
              object.renderOrder = 95;
            }

            // Chromophore group - always visible through surface
            if (object.name === 'Balls_Chromophore_SYG' || object.name === 'Sticks_Chromophore_SYG') {
              object.material.depthTest = false;
              object.renderOrder = 95;
            }

          }
        }
      });

      // Update lysine labels state
      setLysineLabels(lysinePositions);
    }
  }, [scene, expanded, isDark, showLysines, showSurface, showHelices, showSheets, showChromophore, showInteractions, showDNA, showMutation, showBindingInterface]);

  useFrame(() => {
    if (groupRef.current && !expanded) {
      // Only auto-rotate on Y-axis (spinning) - model itself is already oriented correctly
      groupRef.current.rotation.y += 0.003;
    }

    // Hover detection when expanded
    if (expanded && groupRef.current && onHover) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(groupRef.current, true);

      // Reset previous hover (handles both single objects and arrays)
      if (prevHoveredRef.current) {
        const objectsToReset = Array.isArray(prevHoveredRef.current)
          ? prevHoveredRef.current
          : [prevHoveredRef.current];

        objectsToReset.forEach((obj) => {
          if (obj && obj.material) {
            if (obj.material.userData.originalEmissive) {
              obj.material.emissive.copy(obj.material.userData.originalEmissive);
            }
            if (obj.material.userData.originalEmissiveIntensity !== undefined) {
              obj.material.emissiveIntensity = obj.material.userData.originalEmissiveIntensity;
            }
          }
        });
      }

      // Find first hit that has structure info (explicitly skip Mol_Surface and Protein overlay)
      let targetHit = null;
      for (const intersect of intersects) {
        const obj = intersect.object;
        if (obj.isMesh && obj.material && obj.name && structureInfo[obj.name] && obj.name !== 'Mol_Surface' && obj.name !== 'Protein') {
          targetHit = obj;
          break;
        }
      }

      let hoveredInfo = null;
      let hoveredStructureName = null;

      if (targetHit) {
        hoveredInfo = {
          name: structureInfo[targetHit.name].name,
          description: structureInfo[targetHit.name].description,
        };
        hoveredStructureName = targetHit.name; // e.g., "Struct_Helix", "Balls_Lysine"

        // Define grouped structures that should glow together
        const lysineGroup = ['Balls_Lysine', 'Sticks_Lysine'];
        const chromophoreGroup = ['Balls_Chromophore_SYG', 'Sticks_Chromophore_SYG'];

        // Helper function to apply glow to an object
        const applyGlow = (obj) => {
          if (obj && obj.material) {
            const baseColor = new THREE.Color();
            baseColor.copy(obj.material.color);
            obj.material.emissive.copy(baseColor);
            obj.material.emissiveIntensity = 0.8;
          }
        };

        // Check if hovered object is part of a group
        const isLysineHovered = lysineGroup.includes(targetHit.name);
        const isChromophoreHovered = chromophoreGroup.includes(targetHit.name);

        // Find and glow all related objects in the group
        const objectsToGlow = [];
        if (isLysineHovered || isChromophoreHovered) {
          const groupNames = isLysineHovered ? lysineGroup : chromophoreGroup;
          groupRef.current.traverse((obj) => {
            if (obj.isMesh && groupNames.includes(obj.name) && obj.visible) {
              applyGlow(obj);
              objectsToGlow.push(obj);
            }
          });
        } else {
          // Single object glow (default behavior)
          applyGlow(targetHit);
          objectsToGlow.push(targetHit);
        }

        // Store all glowing objects for reset
        prevHoveredRef.current = objectsToGlow;
      } else {
        prevHoveredRef.current = null;
      }

      onHover(hoveredInfo, hoveredStructureName);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive
        ref={modelRef}
        object={scene}
        rotation={rotation}
      />
      {/* Render lysine labels */}
      {lysineLabels.map((lysine, index) => (
        <Html
          key={`lysine-${index}`}
          position={lysine.position}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              background: isDark ? 'rgba(6, 182, 212, 0.9)' : 'rgba(233, 30, 99, 0.9)',
              color: isDark ? '#0b0b0b' : '#ffffff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              border: isDark ? '1px solid #06b6d4' : '1px solid #e91e63',
              boxShadow: isDark
                ? '0 0 8px rgba(6, 182, 212, 0.6)'
                : '0 0 8px rgba(233, 30, 99, 0.6)',
            }}
          >
            {lysine.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

export default function ProteinViewer({
  path,
  position,
  scale,
  rotation,
  cameraZ = 70, // ← default camera distance
  tooltip,
  debugBorder = false, // optionally show a border for debugging
  expanded = false, // new prop to handle expanded state
  onInspect, // callback when user clicks to inspect
  onHoverChange, // callback when hovering over structures
  showLysines: externalShowLysines, // controlled from parent
  showSurface: externalShowSurface, // controlled from parent
  showHelices: externalShowHelices, // controlled from parent
  showSheets: externalShowSheets, // controlled from parent
  showChromophore: externalShowChromophore,
  showInteractions: externalShowInteractions,
  // FOXP2-specific props
  showDNA: externalShowDNA,
  showMutation: externalShowMutation,
  showBindingInterface: externalShowBindingInterface,
  onToggleLysines, // callback for toggling
  onToggleSurface, // callback for toggling
  onToggleHelices, // callback for toggling
  onToggleSheets, // callback for toggling
  onToggleChromophore,
  onToggleInteractions,
  onToggleDNA,
  onToggleMutation,
  onToggleBindingInterface,
}) {
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [internalShowLysines, setInternalShowLysines] = useState(false); // Internal state fallback
  const [internalShowSurface, setInternalShowSurface] = useState(true); // Internal state fallback
  const [internalShowHelices, setInternalShowHelices] = useState(true); // Internal state fallback
  const [internalShowSheets, setInternalShowSheets] = useState(true); // Internal state fallback
  const [internalShowChromophore, setInternalShowChromophore] = useState(true);
  const [internalShowInteractions, setInternalShowInteractions] = useState(false);
  // FOXP2-specific internal state
  const [internalShowDNA, setInternalShowDNA] = useState(true);
  const [internalShowMutation, setInternalShowMutation] = useState(true);
  const [internalShowBindingInterface, setInternalShowBindingInterface] = useState(true);
  const [hoveredElement, setHoveredElement] = useState(null); // For hover info panel
  const adjustedCameraZ = expanded ? cameraZ * 0.7 : cameraZ; // Moderate zoom when expanded (was 0.5 - too close)

  // Use external state if provided, otherwise use internal state
  const showLysines = externalShowLysines !== undefined ? externalShowLysines : internalShowLysines;
  const showSurface = externalShowSurface !== undefined ? externalShowSurface : internalShowSurface;
  const showHelices = externalShowHelices !== undefined ? externalShowHelices : internalShowHelices;
  const showSheets = externalShowSheets !== undefined ? externalShowSheets : internalShowSheets;
  const showChromophore = externalShowChromophore !== undefined ? externalShowChromophore : internalShowChromophore;
  const showInteractions = externalShowInteractions !== undefined ? externalShowInteractions : internalShowInteractions;
  // FOXP2-specific derived state
  const showDNA = externalShowDNA !== undefined ? externalShowDNA : internalShowDNA;
  const showMutation = externalShowMutation !== undefined ? externalShowMutation : internalShowMutation;
  const showBindingInterface = externalShowBindingInterface !== undefined ? externalShowBindingInterface : internalShowBindingInterface;

  // Handle hover from ProteinModel - update both local state and parent
  const handleHover = (hoveredInfo, hoveredStructureName) => {
    setHoveredElement(hoveredInfo);
    if (onHoverChange) {
      onHoverChange(hoveredStructureName); // Send structure name to parent (e.g., "Struct_Helix")
    }
  };

  // Debug logs removed to avoid console noise in production

  // Force a unique key for each protein model to prevent Three.js issues
  // Include cameraZ in key to force remount when camera distance changes
  const modelKey = `${path}-${expanded ? "expanded" : "normal"}-${adjustedCameraZ}`;

  return (
    <div
      className="protein-viewer"
      style={{
        margin: 0,
        border: debugBorder ? "1px dashed red" : "none",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: !expanded && onInspect ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={!expanded && onInspect ? onInspect : undefined}
    >
      <div
        className="protein-viewer-container"
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Canvas
          key={modelKey}
          gl={{ alpha: true, antialias: true, logarithmicDepthBuffer: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.sortObjects = true;  // Enable automatic depth sorting
          }}
          camera={{ position: [0, -2, -adjustedCameraZ] }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            display: "block",
          }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={expanded ? 1.2 : 0.8} />
          <directionalLight
            position={[2, 2, 3]}
            intensity={expanded ? 1.5 : 1}
          />
          {expanded && (
            <directionalLight position={[-2, -2, -3]} intensity={0.5} />
          )}
          <Suspense fallback={null}>
            <ProteinModel
              key={`model-${modelKey}`}
              path={path}
              position={position}
              scale={scale}
              rotation={rotation}
              expanded={expanded}
              isDark={isDark}
              showLysines={showLysines}
              showSurface={showSurface}
              showHelices={showHelices}
              showSheets={showSheets}
              showChromophore={showChromophore}
              showInteractions={showInteractions}
              showDNA={showDNA}
              showMutation={showMutation}
              showBindingInterface={showBindingInterface}
              onHover={handleHover}
            />
          </Suspense>
          {expanded && <OrbitControls />}
        </Canvas>
      </div>

      {/* Orbit Controls Instructions - bottom right corner */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: isDark ? '2px solid rgba(96, 213, 255, 0.5)' : '2px solid rgba(233, 30, 99, 0.5)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            fontSize: '0.9rem',
            color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(31, 41, 55, 0.95)',
            lineHeight: '1.6',
            zIndex: 100,
            pointerEvents: 'none',
            fontFamily: 'Inter, sans-serif',
            boxShadow: isDark
              ? '0 4px 20px rgba(0, 0, 0, 0.5)'
              : '0 4px 20px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1rem' }}>
            🎮 Controls
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Rotate:</strong> Click + drag<br />
            <strong>Zoom:</strong> Scroll<br />
            <strong>Pan:</strong> Right-click + drag
          </div>
        </div>
      )}

    </div>
  );
}
