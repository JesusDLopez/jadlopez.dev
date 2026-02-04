// src/components/work/Nucleus.jsx
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { motion } from "framer-motion";

function TextBand({ text, radius = 2.1, speed = 0.3, tilt = 0 }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <Text
        fontSize={0.3}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        curveRadius={radius}
      >
        {text}
      </Text>
    </group>
  );
}

function NucleusScene() {
  const bands = [
    "React • Node • R • Python",
    "Data Viz • Stats • CSS",
    "Git • Three.js • GSAP",
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} />
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.6}
        />
      </mesh>
      <TextBand text={bands[0]} speed={0.6} tilt={0} />
      <TextBand text={bands[1]} speed={-0.4} tilt={0.6} />
      <TextBand text={bands[2]} speed={0.5} tilt={-0.6} />
    </Canvas>
  );
}

export default function Nucleus({ onOpen, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <motion.div
      className={`nucleus${open ? " open" : ""}`}
      ref={ref}
      initial={false}
      animate={{ scale: open ? 1 : 0.4 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      whileHover={
        open
          ? false
          : {
              scale: [1, 1.05, 1],
              boxShadow: "0 0 12px rgba(255,255,255,0.5)",
              transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
            }
      }
      onClick={() => {
        if (!open) {
          setOpen(true);
          if (onOpen) onOpen();
        }
      }}
    >
      {open && (
        <button
          className="nucleus-close"
          onClick={() => {
            setOpen(false);
            if (onClose) onClose();
          }}
        >
          ×
        </button>
      )}
      {open ? <NucleusScene /> : <span className="nucleus-label">Skills</span>}
    </motion.div>
  );
}
