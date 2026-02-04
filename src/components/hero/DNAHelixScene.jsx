// src/components/Hero/DNAHelixScene.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import DNA from "../DNA";

function CustomOrbitControls({ isSpinning }) {
  return !isSpinning ? <OrbitControls /> : null;
}

export default function DNAHelixScene({
  isSpinning,
  setShowInfo,
  setHoveredNucleotide,
  onWiggleDuration,
}) {
  // Responsive camera and scale based on viewport
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cameraPosition = isMobile ? [0, 0, -75] : [0, -2, -60]; // Mobile: closer for bigger DNA (was -95)
  const dnaScale = isMobile ? 1.75 : 2.65;

  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      camera={{ position: cameraPosition, fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={<Html>Loading...</Html>}>
        <DNA
          scale={dnaScale}
          isSpinning={isSpinning}
          setShowInfo={setShowInfo}
          setHoveredNucleotide={setHoveredNucleotide}
          onWiggleDuration={onWiggleDuration}
        />
      </Suspense>

      <CustomOrbitControls isSpinning={isSpinning} />

      <ambientLight intensity={0.2} />
      {/* Directional light positioned above the scene */}
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={2.5}
        color={0x88ccff}
        castShadow
      />
      <pointLight position={[0, 0, 10]} intensity={2} distance={30} decay={2} />
    </Canvas>
  );
}
