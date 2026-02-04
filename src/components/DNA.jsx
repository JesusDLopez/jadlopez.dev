// src/components/DNA.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import DNA_URL from "../assets/Metallic_1BNA_3.0.glb";
import { useTheme } from "../contexts/ThemeContext";

export default function DNA({
  isSpinning,
  setShowInfo,
  setHoveredNucleotide,
  onWiggleDuration,
  ...props
}) {
  const group = useRef();
  const { scene, animations } = useGLTF(DNA_URL);
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size and rotate DNA 90° on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply 90° rotation and scale adjustment on mobile
  useEffect(() => {
    if (group.current) {
      if (isMobile) {
        // Rotate 90° clockwise (π/2 radians) around Z axis for vertical orientation
        group.current.rotation.z = Math.PI / 2;
        // Scale to 75% on mobile - closer but still fits within viewport
        group.current.scale.set(0.75, 0.75, 0.75);
        group.current.position.set(0, -0.4, 0);
      } else {
        // Reset to horizontal on desktop
        group.current.rotation.z = 0;
        // Reset to normal scale
        group.current.scale.set(1, 1, 1);
        group.current.position.set(0, -0.8, 0);
      }
    }
  }, [isMobile]);
  // Clone materials and store original emissive so hover effects remain scoped
  useEffect(() => {
    if (!scene) return;
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material = obj.material.clone();
        obj.material.userData.origEmissive = obj.material.emissive
          ? obj.material.emissive.clone()
          : new THREE.Color();
      }
    });
  }, [scene]);
  const { actions, mixer } = useAnimations(animations, group);
  const { camera, mouse, raycaster } = useThree();

  // Theme-aware highlight colors
  const highlightColors = useMemo(() => ({
    C: new THREE.Color("#0080ff"), // Blue for Cytosine
    G: new THREE.Color("#ffff00"), // Yellow for Guanine
    T: new THREE.Color("#ff4040"), // Red for Thymine
    A: new THREE.Color("#40ff40"), // Green for Adenine
    Backbone: isDark
      ? new THREE.Color("#4A9EFF") // Blue for dark mode (like "Click to Scroll" button)
      : new THREE.Color("#E74C3C") // Reddish for light mode (like "Inspect Me" button)
  }), [isDark]);
  const backboneLeft = useMemo(() => scene?.getObjectByName("Backbone_Left"), [scene]);
  const backboneRight = useMemo(() => scene?.getObjectByName("Backbone_Right"), [scene]);
  const prevHoveredRef = useRef([]);

  const [hoverActive, setHoverActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [spinAction, setSpinAction] = useState(null);

  // Theme-aware styling with neon effects
  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        // Store originals only once
        if (!obj.material.userData.originalEmissive) {
          obj.material.userData.originalEmissive = obj.material.emissive ? obj.material.emissive.clone() : new THREE.Color(0, 0, 0);
        }
        
        if (obj.name === "Backbone_Left" || obj.name === "Backbone_Right") {
          if (!isDark) {
            // Light mode: make backbone subtle for text contrast
            obj.material.opacity = 0.25;
            obj.material.transparent = true;
            obj.material.emissive.setRGB(0, 0, 0);
          } else {
            // Dark mode: restore solid backbone
            obj.material.opacity = 1.0;
            obj.material.transparent = false;
            obj.material.emissive.setRGB(0, 0, 0);
          }
        }
        
        // Add neon glow to nucleotides in dark mode only
        else if (/^[ATCG]\d+/.test(obj.name)) {
          if (!isDark) {
            // Light mode: no emissive glow
            obj.material.emissive.copy(obj.material.userData.originalEmissive);
          } else {
            // Dark mode: add intense emissive glow based on CURRENT color
            const currentColor = obj.material.color;
            obj.material.emissive.setRGB(
              currentColor.r * 0.4,
              currentColor.g * 0.4,
              currentColor.b * 0.4
            );
          }
        } else {
          // All other elements: restore original emissive
          obj.material.emissive.copy(obj.material.userData.originalEmissive);
        }
      }
    });
  }, [isDark, scene]);

  // Animate entry: wiggle + spin slowdown
  useEffect(() => {
    if (!actions || !mixer || !group.current) return;

    const finishedHandler = () => {
      document.body.classList.add("reveal-ui");
      setHoverActive(true);
      setStartTime(performance.now());
    };

    const wiggle = actions["DNA_WiggleAction"];
    const spin = actions["DNA_ControllerAction"];

    if (wiggle) {
      wiggle.reset();
      wiggle.setLoop(THREE.LoopOnce, 1);
      wiggle.clampWhenFinished = true;
      wiggle.enabled = true;
      wiggle.timeScale = 4;
      wiggle.play();

      const wiggleDuration = wiggle.getClip().duration / wiggle.timeScale;

      // Start the slow landing a bit earlier for a softer end
      const landingDelayOffset = 1; // seconds before wiggle end
      const spinDelay = (wiggleDuration - landingDelayOffset) * 1000;
      const spinSlowDuration = 1.8; // seconds
      const wiggleSlowDuration = 4; // seconds

      const totalWiggleTime =
        wiggleDuration - landingDelayOffset + wiggleSlowDuration;
      if (typeof onWiggleDuration === "function") {
        onWiggleDuration(totalWiggleTime);
      }

      setTimeout(() => {
        // Only slow down the wiggle animation, keep spin at normal speed
        gsap.to(wiggle, {
          timeScale: 0.05,
          duration: wiggleSlowDuration,
          ease: "power2.out",
        });
      }, spinDelay);

      mixer.addEventListener("finished", finishedHandler);

      return () => mixer.removeEventListener("finished", finishedHandler);
    }
  }, [actions, mixer, onWiggleDuration]);

  // Handle spin start
  useEffect(() => {
    if (!actions || !group.current) return;
    const spin = actions["DNA_ControllerAction"];
    if (spin) {
      spin.reset();
      spin.setLoop(THREE.LoopRepeat);
      spin.timeScale = 0.4; // Slow down the spin speed slightly more
      spin.enabled = true;
      spin.play();
      setSpinAction(spin);
    }
  }, [actions]);

  // Pause or resume spin with smooth transition
  useEffect(() => {
    if (spinAction) {
      if (isSpinning) {
        // Resume spinning
        spinAction.paused = false;
        gsap.to(spinAction, {
          timeScale: 0.4,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        // Slow down to stop
        gsap.to(spinAction, {
          timeScale: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            spinAction.paused = true;
          }
        });
      }
    }
  }, [isSpinning, spinAction]);

  // Handle float & raycast hover
  useFrame(() => {
    if (!group.current) return;

    // Floating DNA while spinning
    const baseline = isMobile ? -0.4 : -0.8;

    if (hoverActive && startTime !== null && isSpinning) {
      const t = (performance.now() - startTime) / 1000;
      const amplitude = isMobile ? 0.45 : 0.6;
      group.current.position.y = baseline + Math.sin(t * 2) * amplitude;
    } else if (!isSpinning) {
      group.current.position.y = baseline;
    }

    // Hover detection during inspection
    if (hoverActive && !isSpinning) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(group.current, true);

      // Reset previously highlighted meshes
      prevHoveredRef.current.forEach((obj) => {
        if (obj.material && obj.material.userData.origEmissive) {
          obj.material.emissive.copy(obj.material.userData.origEmissive);
        }
      });
      prevHoveredRef.current = [];

      // General DNA hover (entire structure)
      const hovered = intersects.length > 0;
      setShowInfo(hovered);

      // Determine hovered nucleotide/backbone
      const firstHit = intersects[0]?.object;
      let highlightTargets = [];

      if (firstHit) {
        if (firstHit.name === "Backbone_Left" || firstHit.name === "Backbone_Right") {
          if (backboneLeft) highlightTargets.push(backboneLeft);
          if (backboneRight) highlightTargets.push(backboneRight);
        } else if (/^[ACGT]\d+/.test(firstHit.name)) {
          highlightTargets.push(firstHit);
        }
      }

      highlightTargets.forEach((obj) => {
        if (obj.material) {
          let color = highlightColors.Backbone; // Default to backbone color
          
          if (firstHit) {
            if (firstHit.name === "Backbone_Left" || firstHit.name === "Backbone_Right") {
              color = highlightColors.Backbone;
            } else if (/^[ACGT]\d+/.test(firstHit.name)) {
              const nucleotideType = firstHit.name[0];
              color = highlightColors[nucleotideType] || highlightColors.Backbone;
            }
          }
          
          obj.material.emissive.set(color);
        }
      });
      prevHoveredRef.current = highlightTargets;

      // Component-specific label (from mesh name)
      let label = null;
      if (firstHit) {
        if (firstHit.name === "Backbone_Left" || firstHit.name === "Backbone_Right") {
          label = "Backbone";
        } else if (/^[ACGT]\d+/.test(firstHit.name)) {
          const code = firstHit.name[0];
          const map = { A: "Adenine", T: "Thymine", C: "Cytosine", G: "Guanine" };
          label = map[code] || null;
        }
      }
      setHoveredNucleotide(label);
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}
