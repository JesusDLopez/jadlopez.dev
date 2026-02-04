import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Generate rounded square path for mobile (static - no animation)
function generateRoundedSquarePath() {
  const centerX = 50;
  const centerY = 50;

  // Generous border radius for rounded square
  const borderRadius = 15; // Large radius for smooth corners

  // Square with most of screen width (85%)
  const squareWidth = 85;
  const squareHeight = 85;

  // Calculate bounds
  const left = centerX - squareWidth / 2;
  const right = centerX + squareWidth / 2;
  const top = centerY - squareHeight / 2;
  const bottom = centerY + squareHeight / 2;

  // Create static rounded rectangle path (no wobble)
  const path = `
    M ${left + borderRadius} ${top}
    L ${right - borderRadius} ${top}
    Q ${right} ${top} ${right} ${top + borderRadius}
    L ${right} ${bottom - borderRadius}
    Q ${right} ${bottom} ${right - borderRadius} ${bottom}
    L ${left + borderRadius} ${bottom}
    Q ${left} ${bottom} ${left} ${bottom - borderRadius}
    L ${left} ${top + borderRadius}
    Q ${left} ${top} ${left + borderRadius} ${top}
    Z
  `;

  return { path, points: [] }; // No points needed for rounded square
}

// Dynamic organic blob path generation with breathing and traveling wave
function generateOrganicBlobPath(breathScale = 1.0, wavePhase = 0, breathProgress = 0) {
  const centerX = 50;
  const centerY = 50;

  // Perfect circle radius with breathing effect
  // Base radius at 37.5 (midpoint between inner 32 and outer 43)
  const baseRadius = 37.5;
  const radius = baseRadius * breathScale;

  const points = [];
  const numPoints = 10; // Fewer points for smooth curves

  // Wave amplitude modulation: stronger during inhale, subtler during exhale
  const baseWaveAmplitude = 0.4; // ~1% of radius, subtle ripple
  const waveAmplitude = baseWaveAmplitude * (0.5 + breathProgress * 0.5);

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;

    // Traveling wave: sinusoidal displacement around circumference
    // Wave travels counterclockwise (angle - wavePhase)
    const waveOffset = Math.sin(angle - wavePhase) * waveAmplitude;

    // Calculate position for PERFECT CIRCLE with breathing + wave
    const finalRadius = radius + waveOffset;
    const finalX = centerX + Math.cos(angle) * finalRadius;
    const finalY = centerY + Math.sin(angle) * finalRadius;

    points.push({ x: finalX, y: finalY });
  }

  // Create smooth curved path with gentler Bezier curves
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const prev = points[(i - 1 + points.length) % points.length];
    const after = points[(i + 2) % points.length];

    // Gentler curve tension for more fluid movement
    const tension = 0.18; // Reduced from 0.25 for smoother flow
    const control1x = current.x + (next.x - prev.x) * tension;
    const control1y = current.y + (next.y - prev.y) * tension;
    const control2x = next.x - (after.x - current.x) * tension;
    const control2y = next.y - (after.y - current.y) * tension;

    path += ` C ${control1x} ${control1y}, ${control2x} ${control2y}, ${next.x} ${next.y}`;
  }

  path += ' Z';
  return { path, points };
}

export default function OrganicBlob({ children, isMobile = false, onMembraneRadiusChange }) {
  // Hide debug ellipses - no longer needed
  const showDebugEllipses = false;

  // Breathing animation state
  const [breathScale, setBreathScale] = useState(1.0);
  const [wavePhase, setWavePhase] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);

  // Breathing animation loop - sinusoidal oscillation
  useEffect(() => {
    if (isMobile) return; // No breathing on mobile

    let animationFrameId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // Calm breathing: asymmetric timing with smooth easing (faster inhale, slower exhale)
      // Full cycle: ~10 seconds (4s inhale, 6s exhale)
      // Oscillates from 37 (inner red circle) to 43 (outer blue circle)

      const breathCycleDuration = 10000; // 10 seconds total
      const inhaleRatio = 0.4; // 40% of cycle = 4 seconds
      const exhaleRatio = 0.6; // 60% of cycle = 6 seconds

      const cyclePosition = (elapsed % breathCycleDuration) / breathCycleDuration; // 0 to 1

      // Easing function for smooth transitions at peaks and valleys
      const easeInOutSine = (t) => {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      };

      let normalizedBreath;
      if (cyclePosition < inhaleRatio) {
        // Inhale phase: 0 to 1 (faster - 4 seconds) with easing
        const inhaleProgress = cyclePosition / inhaleRatio;
        normalizedBreath = easeInOutSine(inhaleProgress);
      } else {
        // Exhale phase: 1 to 0 (slower - 6 seconds) with easing
        const exhaleProgress = (cyclePosition - inhaleRatio) / exhaleRatio;
        normalizedBreath = 1 - easeInOutSine(exhaleProgress);
      }

      const minRadius = 37; // Inner red circle - minimum size
      const maxRadius = 43; // Outer blue circle - maximum expansion
      const currentRadius = minRadius + normalizedBreath * (maxRadius - minRadius);
      const breathValue = currentRadius / 37.5; // Convert back to scale factor

      // Traveling wave: one rotation every 8 seconds (faster for visibility)
      const waveCycleDuration = 8000; // 8 seconds per rotation
      const currentWavePhase = (elapsed / waveCycleDuration) * Math.PI * 2;

      setBreathScale(breathValue);
      setWavePhase(currentWavePhase);
      setBreathProgress(normalizedBreath); // 0 to 1, for wave amplitude modulation

      // Notify parent of current membrane radius for physics boundary
      if (onMembraneRadiusChange) {
        onMembraneRadiusChange(currentRadius);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  // Dynamic blob path calculation with breathing and wave
  const blobPath = useMemo(() => {
    const result = isMobile
      ? generateRoundedSquarePath()
      : generateOrganicBlobPath(breathScale, wavePhase, breathProgress);
    return result.path;
  }, [isMobile, breathScale, wavePhase, breathProgress]); // Regenerate when breathing or wave changes

  // Calculate responsive stroke widths and glow based on breathing
  // Subtle thickness changes as membrane expands/contracts
  const outerStrokeWidth = 2.5 * (0.95 + breathScale * 0.05);
  const innerStrokeWidth = 1.5 * (0.95 + breathScale * 0.05);

  // Glow brightens slightly on expansion, dims on contraction
  const glowOpacity = 0.12 + (breathScale - 1) * 0.3;

  // Calculate radial flow density effect based on breathing
  // During contraction (breathProgress → 0): Center bright, edge dim (inward flow)
  // During expansion (breathProgress → 1): Center dim, edge bright (outward flow)
  //
  // Further reduced intensity for better rim blending - max opacity at 0.48 instead of 0.55
  // breathProgress = 0 (contracted): [center: 0.48 opacity, edge: 0.0 opacity]
  // breathProgress = 0.5 (neutral): [center: 0.24 opacity, edge: 0.24 opacity]
  // breathProgress = 1 (expanded): [center: 0.0 opacity, edge: 0.48 opacity]

  const centerOpacity = 0.48 * (1 - breathProgress); // Bright when contracted, dim when expanded (reduced from 0.55)
  const edgeOpacity = 0.48 * breathProgress; // Dim when contracted, bright when expanded (reduced from 0.55)
  const midOpacity = (centerOpacity + edgeOpacity) / 2; // Smooth transition in middle

  // Add a secondary flowing layer with offset timing for particle/fluid effect
  // This creates a "ripple" that follows the main flow
  const flowOffset = Math.sin(wavePhase * 0.5) * 0.10; // Oscillates between -0.10 and +0.10 (reduced from 0.12)
  const secondaryOpacity = Math.max(0, midOpacity + flowOffset);

  return (
    <div className="organic-blob-container">
      {/* SVG Mask/Clip Path */}
      <svg
        className="organic-blob-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Clip path for organic shape */}
          <clipPath id="organic-clip">
            <motion.path
              d={blobPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </clipPath>

          {/* Gradient for cellular appearance */}
          <radialGradient id="cellular-gradient" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="var(--cell-interior-center)" />
            <stop offset="50%" stopColor="var(--cell-interior-bg)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Specular glow - top-left light source (dynamic with breathing) */}
          <radialGradient id="membrane-glow" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity={glowOpacity}/>
            <stop offset="50%" stopColor="white" stopOpacity={glowOpacity * 0.33}/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>

          {/* Primary radial flow density gradient - inverts based on breathing direction */}
          {/* Contraction: bright center → dim edge (inward flow) */}
          {/* Expansion: dim center → bright edge (outward flow) */}
          {/* Extended radius to 65% to reach closer to membrane rim during expansion */}
          <radialGradient
            id="radial-flow-glow"
            cx="50%"
            cy="50%"
            r="65%"
          >
            <stop offset="0%" stopColor="var(--cell-membrane-color)" stopOpacity={centerOpacity}/>
            <stop offset="40%" stopColor="var(--cell-membrane-color)" stopOpacity={midOpacity * 0.7}/>
            <stop offset="85%" stopColor="var(--cell-membrane-color)" stopOpacity={edgeOpacity * 1.1}/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>

          {/* Secondary flowing layer - creates particle/fluid movement effect */}
          {/* Extended radius to reach closer to membrane */}
          <radialGradient
            id="radial-flow-secondary"
            cx="50%"
            cy="50%"
            r="58%"
          >
            <stop offset="0%" stopColor="var(--cell-membrane-color)" stopOpacity={centerOpacity * 0.5}/>
            <stop offset="50%" stopColor="var(--cell-membrane-color)" stopOpacity={secondaryOpacity}/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>

          {/* Subtle glow effect */}
          <filter id="cell-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Cell interior with organic shape */}
        <motion.path
          d={blobPath}
          fill="var(--cell-interior-bg)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Outer membrane layer with dynamic stroke width */}
        <motion.path
          d={blobPath}
          fill="none"
          stroke="var(--cell-membrane-color)"
          strokeWidth={outerStrokeWidth}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transformOrigin: '50% 50%' }}
        />

        {/* Inner membrane layer (lipid bilayer effect) with dynamic stroke width */}
        <motion.path
          d={blobPath}
          fill="none"
          stroke="var(--cell-membrane-inner)"
          strokeWidth={innerStrokeWidth}
          opacity="0.7"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            transformOrigin: '50% 50%',
            transform: 'scale(0.95)'
          }}
        />

        {/* Specular glow overlay with smooth transitions */}
        <motion.path
          d={blobPath}
          fill="url(#membrane-glow)"
          opacity="1"
          style={{ mixBlendMode: 'soft-light' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Primary radial flow glow overlay - main density gradient */}
        <motion.path
          d={blobPath}
          fill="url(#radial-flow-glow)"
          opacity={0.85 + breathProgress * 0.15}
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 + breathProgress * 0.15 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />

        {/* Secondary flow layer - creates particle/fluid streaming effect */}
        <motion.path
          d={blobPath}
          fill="url(#radial-flow-secondary)"
          opacity={0.6}
          style={{ mixBlendMode: 'soft-light' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.15, ease: "linear" }}
        />

        {/* Debug Ellipses - Always visible PERFECT CIRCLES
            RED (inner): Organelle collision boundary (physics boundary)
            BLUE (outer): Membrane visual boundary (for reference)
        */}
        {showDebugEllipses && (
          <>
            {/* Inner collision boundary - PERFECT CIRCLE barely touching membrane */}
            <ellipse
              cx="50"
              cy="50"
              rx="37"
              ry="37"
              fill="none"
              stroke="rgba(255, 0, 0, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="1"
            />

            {/* Outer membrane boundary - PERFECT CIRCLE for reference */}
            <ellipse
              cx="50"
              cy="50"
              rx="43"
              ry="43"
              fill="none"
              stroke="rgba(0, 100, 255, 0.3)"
              strokeWidth="1"
              strokeDasharray="8,4"
              opacity="1"
            />
          </>
        )}
        
      </svg>
      
      {/* Content without clipping for now */}
      <div 
        className="organic-content"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      >
        {children}
      </div>
    </div>
  );
}