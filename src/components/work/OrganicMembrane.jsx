import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Generate organic blob path with noise
function generateBlobPath(width, height, time = 0) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = width * 0.35;
  const radiusY = height * 0.4;
  
  // Control points for organic shape
  const points = [];
  const numPoints = 12;
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    // Add noise for organic feel
    const noise1 = Math.sin(time * 0.8 + angle * 3) * 0.15;
    const radius = 1 + noise1;
    
    const x = centerX + Math.cos(angle) * radiusX * radius;
    const y = centerY + Math.sin(angle) * radiusY * radius;
    points.push({ x, y });
  }
  
  // Create smooth curved path
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const control1x = current.x + (next.x - current.x) * 0.3;
    const control1y = current.y + (next.y - current.y) * 0.3;
    const control2x = next.x - (next.x - current.x) * 0.3;
    const control2y = next.y - (next.y - current.y) * 0.3;
    
    path += ` C ${control1x} ${control1y}, ${control2x} ${control2y}, ${next.x} ${next.y}`;
  }
  
  path += ' Z';
  return path;
}

// Membrane protein component (tiny pill shapes)
function MembraneProtein({ x, y, rotation, size = 1 }) {
  return (
    <motion.ellipse
      cx={x}
      cy={y}
      rx={4 * size}
      ry={12 * size}
      fill="var(--cell-membrane-glow)"
      stroke="var(--cell-membrane-color)"
      strokeWidth="1"
      initial={{ rotate: rotation }}
      animate={{ 
        rotate: [rotation, rotation + 360],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{
        rotate: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" },
        opacity: { duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "mirror" }
      }}
    />
  );
}

export default function OrganicMembrane({ width = 800, height = 600, children }) {
  const [time, setTime] = useState(0);
  const [blobPath, setBlobPath] = useState('');
  const phosphateRadius = 26;
  const outerHeadX = width * 0.08;
  const outerHeadY = height / 2 - height * 0.02;
  
  // Generate membrane proteins positions
  const proteins = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const radiusX = width * 0.35;
    const radiusY = height * 0.4;
    const x = width / 2 + Math.cos(angle) * radiusX;
    const y = height / 2 + Math.sin(angle) * radiusY;
    
    proteins.push({
      x,
      y,
      rotation: Math.random() * 360,
      size: 0.8 + Math.random() * 0.4
    });
  }
  
  // Wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.02);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update blob path
  useEffect(() => {
    setBlobPath(generateBlobPath(width, height, time));
  }, [width, height, time]);
  
  return (
    <div className="organic-membrane-container">
      <svg
        width={width}
        height={height}
        className="organic-membrane-svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      >
        {/* Outer glow */}
        <defs>
          <filter id="membrane-glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Radial gradient for membrane thickness */}
          <radialGradient id="membrane-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cell-interior-center)" />
            <stop offset="70%" stopColor="var(--cell-interior-bg)" />
            <stop offset="90%" stopColor="var(--cell-membrane-glow)" />
            <stop offset="100%" stopColor="var(--cell-membrane-color)" />
          </radialGradient>

          <radialGradient id="phosphate-head-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsla(200, 95%, 94%, 0.95)" />
            <stop offset="55%" stopColor="hsla(200, 80%, 72%, 0.85)" />
            <stop offset="100%" stopColor="hsla(200, 65%, 52%, 0.95)" />
          </radialGradient>
        </defs>
        
        {/* Main membrane blob */}
        <motion.path
          d={blobPath}
          fill="url(#membrane-gradient)"
          stroke="var(--cell-membrane-color)"
          strokeWidth="2"
          filter="url(#membrane-glow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Outer faint glow rim */}
        <motion.path
          d={blobPath}
          fill="none"
          stroke="var(--cell-membrane-glow)"
          strokeWidth="6"
          filter="url(#membrane-glow)"
        />
        
        {/* Membrane proteins */}
        {proteins.map((protein, i) => (
          <MembraneProtein key={i} {...protein} />
        ))}

        {/* Outer phosphate head prototype */}
        <motion.circle
          cx={outerHeadX}
          cy={outerHeadY}
          r={phosphateRadius}
          fill="url(#phosphate-head-gradient)"
          stroke="hsla(200, 60%, 28%, 0.55)"
          strokeWidth="1.6"
          animate={{
            y: [outerHeadY, outerHeadY - 8, outerHeadY],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </svg>
      
      {/* Content inside membrane */}
      <div 
        className="membrane-content"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
}
