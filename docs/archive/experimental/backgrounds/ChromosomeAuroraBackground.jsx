import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

function ChromosomeAuroraMaterial() {
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

    // Smooth sin-based band
    float band(vec2 uv, float offset, float freq, float amp, float speed) {
      float wave = sin((uv.x + offset) * freq + uTime * speed) * amp;
      return smoothstep(wave - 0.01, wave + 0.01, uv.y);
    }

    // HSL to RGB (for hue cycling)
    vec3 hsl2rgb(float h, float s, float l) {
      float c = (1.0 - abs(2.0 * l - 1.0)) * s;
      float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
      vec3 rgb = (h < 1.0/6.0) ? vec3(c, x, 0.0) :
                 (h < 2.0/6.0) ? vec3(x, c, 0.0) :
                 (h < 3.0/6.0) ? vec3(0.0, c, x) :
                 (h < 4.0/6.0) ? vec3(0.0, x, c) :
                 (h < 5.0/6.0) ? vec3(x, 0.0, c) :
                                 vec3(c, 0.0, x);
      return rgb + (l - 0.5) * 2.0 * (1.0 - c);
    }

    void main() {
      vec2 uv = vUv;

      float b1 = band(uv, 0.0, 10.0, 0.2, 0.2);
      float b2 = band(uv, 1.0, 12.0, 0.15, -0.25);
      float b3 = band(uv, -1.0, 8.0, 0.1, 0.15);

      float alpha = b1 * 0.5 + b2 * 0.3 + b3 * 0.2;

      float hue = mod(uTime * 0.02, 1.0);
      vec3 color = hsl2rgb(hue, 0.6, 0.5);

      gl_FragColor = vec4(color * alpha, alpha * 0.5); // translucent
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
        <ChromosomeAuroraMaterial />
      </Plane>
    </Canvas>
  );
}
