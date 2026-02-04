import { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CytoplasmFogPlane = forwardRef(function CytoplasmFogPlane(_, ref) {
  const materialRef = useRef();

  useImperativeHandle(ref, () => ({
    setBaseColor: (rgb) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uBaseColor.value.set(...rgb);
      }
    },
    setNoiseStrength: (value) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uNoiseStrength.value = value;
      }
    },
    getUniforms: () => materialRef.current?.uniforms,
  }));

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
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
    uniform vec3 uBaseColor;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 x = fract(p * C.w) * 2.0 - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      vec2 g0 = vec2(a0.x, h.x);
      vec2 g1 = vec2(a0.y, h.y);
      vec2 g2 = vec2(a0.z, h.z);
      vec3 norm = inversesqrt(vec3(dot(g0,g0), dot(g1,g1), dot(g2,g2)));
      g0 *= norm.x;
      g1 *= norm.y;
      g2 *= norm.z;
      float m0 = max(0.5 - dot(x0,x0), 0.0);
      float m1 = max(0.5 - dot(x12.xy,x12.xy), 0.0);
      float m2 = max(0.5 - dot(x12.zw,x12.zw), 0.0);
      float n0 = m0 * m0 * dot(g0, x0);
      float n1 = m1 * m1 * dot(g1, x12.xy);
      float n2 = m2 * m2 * dot(g2, x12.zw);
      return 70.0 * (n0 + n1 + n2);
    }

    void main() {
      vec2 uv = vUv;
      float n1 = snoise(uv * 3.0 + vec2(-uTime * 0.5, 0.0));
      float n2 = snoise(uv * 4.0 + vec2(uTime * 0.4, uTime * 0.3));
      float noise = mix(n1, n2, 0.5);
      vec3 base = uBaseColor;
      vec3 fog = base + vec3(noise * 0.05);
      gl_FragColor = vec4(fog, 0.35);
    }
  `;

  const uniforms = useMemo(
      () => ({
        uTime: { value: 0 },
        // Slightly brighter base color for higher contrast
        uBaseColor: { value: new THREE.Color(0.07, 0.17, 0.14) },
      }),
      []
    );

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
});

export default CytoplasmFogPlane;
