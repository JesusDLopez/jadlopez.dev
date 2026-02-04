import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

function ElectrophoresisMaterial() {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;

    // Generate a horizontal band with soft edges
    float band(vec2 uv, float yCenter, float thickness) {
      return smoothstep(yCenter - thickness, yCenter, uv.y) *
             (1.0 - smoothstep(yCenter, yCenter + thickness, uv.y));
    }

    void main() {
      vec2 uv = vUv;

      // Animate vertical movement
      float t = mod(uv.y + uTime * 0.05, 1.0);

      float lines = 0.0;
      for (int i = 0; i < 10; i++) {
        float y = float(i) / 10.0;
        lines += band(vec2(uv.x, t), y, 0.01);
      }

      // Faint cyan-blue tone
      vec3 color = vec3(0.4, 0.8, 1.0) * lines;
      float alpha = lines * 0.12; // subtle

      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      depthWrite={false}
    />
  );
}

export default function ShaderBackground() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "black",
      }}
      gl={{ alpha: true }}
      orthographic
      camera={{ position: [0, 0, 10], zoom: 1 }}
      frameloop="always"
    >
      <Plane args={[2, 2]} position={[0, 0, 0]}>
        <ElectrophoresisMaterial />
      </Plane>
    </Canvas>
  );
}
