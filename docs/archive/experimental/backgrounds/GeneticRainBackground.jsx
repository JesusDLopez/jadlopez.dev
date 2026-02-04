import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

function GeneticRainMaterial() {
  const materialRef = useRef();

  // Pass elapsed time to the shader every frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `}
      fragmentShader={`
        precision highp float;

        varying vec2 vUv;
        uniform float uTime;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          uv.y += uTime * 0.08;

          // simulate columns
          float col = floor(uv.x * 50.0);
          float row = floor(uv.y * 50.0);

          float randomness = random(vec2(col, row));
          float glow = smoothstep(0.0, 0.03, fract(uv.y * 50.0));

        vec3 mint = vec3(0.3, 0.6, 0.4); // less intense green
        vec3 colColor = mint * randomness * glow * 0.5; // half the brightness

        float fade = exp(-fract(uv.y * 50.0) * 3.0); // longer trail fade
        colColor *= fade;

          gl_FragColor = vec4(colColor, 1.0);
        }
      `}
      uniforms={{
        uTime: { value: 0 },
      }}
      depthWrite={false}
      transparent={true}
    />
  );
}

export default function ShaderBackground() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "black",
      }}
      gl={{ alpha: true }}
      orthographic
      camera={{ position: [0, 0, 10], zoom: 1 }}
      frameloop="always"
    >
      <Plane args={[2, 2]} position={[0, 0, 0]}>
        <GeneticRainMaterial />
      </Plane>
    </Canvas>
  );
}
