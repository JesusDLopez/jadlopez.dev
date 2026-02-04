import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FloatingParticles from "./FloatingParticles";

export default function ShaderBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "black",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        resize={{ scroll: true, offsetSize: true }} // ✅ Enables scroll-based layout updates
        frameloop="demand" // ✅ Prevents layout hijacking
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <Suspense fallback={null}>
          <FloatingParticles count={1000} />
        </Suspense>
      </Canvas>
    </div>
  );
}
