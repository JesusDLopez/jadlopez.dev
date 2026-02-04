import { useRef, useMemo, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TopographicCytoplasmPlane = forwardRef(function TopographicCytoplasmPlane(_, ref) {
  const materialRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for shader rotation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update uniform when mobile state changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0;
    }
  }, [isMobile]);

  useImperativeHandle(ref, () => ({
    setBaseColor: (rgb) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uBaseColor.value.set(...rgb);
      }
    },
    setShaderMode: (mode) => {
      // 0 = dark cytoplasm, 1 = light topographic, 2 = dark topographic
      if (materialRef.current) {
        materialRef.current.uniforms.uShaderMode.value = mode;
      }
    },
    setContourIntensity: (value) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uContourIntensity.value = value;
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
    uniform float uShaderMode;
    uniform float uContourIntensity;
    uniform float uIsMobile;

    // Simplex noise implementation (same as original)
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

      // Rotate UV coordinates 90 degrees on mobile
      if (uIsMobile > 0.5) {
        // Center the UVs around origin
        vec2 centeredUv = uv - 0.5;
        // Rotate 90 degrees counterclockwise: (x,y) -> (-y, x)
        vec2 rotatedUv = vec2(-centeredUv.y, centeredUv.x);
        // Move back to 0-1 range
        uv = rotatedUv + 0.5;
      }

      // Determine animation speed based on mode
      float timeScale = (uShaderMode > 0.5) ? 0.1 : 1.0; // Slow for light modes
      float slowTime = uTime * timeScale;

      // Scale noise frequency based on device
      // Mobile uses lower frequencies for minimalistic look
      float noiseScale1 = (uIsMobile > 0.5) ? 1.5 : 3.0;
      float noiseScale2 = (uIsMobile > 0.5) ? 2.0 : 4.0;

      // Create organic noise
      float n1 = snoise(uv * noiseScale1 + vec2(-slowTime * 0.5, 0.0));
      float n2 = snoise(uv * noiseScale2 + vec2(slowTime * 0.4, slowTime * 0.3));
      float noise = mix(n1, n2, 0.5);
      
      vec3 finalColor;
      float alpha;
      
      if (uShaderMode < 0.5) {
        // Mode 0: Dark cytoplasm (original)
        vec3 base = uBaseColor;
        vec3 fog = base + vec3(noise * 0.05);
        finalColor = fog;
        alpha = 0.35;
        
      } else if (uShaderMode < 1.5) {
        // Mode 1: Light topographic 
        // Normalize noise to 0-1 range for contour calculations
        float elevation = (noise + 1.0) * 0.5;
        
        // Create topographic contour levels
        float contourLevels = 3.5;
        float scaledElevation = elevation * contourLevels;
        float contourIndex = floor(scaledElevation);
        float withinContour = fract(scaledElevation);
        
        // Create contour lines
        float contourLine = 0.0;
        float lineWidth = 0.015 * uContourIntensity;
        
        if (withinContour < lineWidth || withinContour > (1.0 - lineWidth)) {
          contourLine = 1.0;
        }
        
        // Light background with subtle elevation tinting
        float elevationShade = contourIndex / contourLevels;
        vec3 lightBase = vec3(0.95, 0.97, 0.98);
        vec3 elevationTint = mix(lightBase, vec3(0.85, 0.90, 0.95), elevationShade * 0.3);
        vec3 contourColor = vec3(0.2, 0.3, 0.4);
        
        finalColor = mix(elevationTint, contourColor, contourLine * uContourIntensity * 0.8);
        alpha = 0.8;
        
      } else if (uShaderMode >= 1.5) {
        // Mode 2: Dark cytoplasm with light topographic contours
        // Start with the original dark cytoplasm base
        vec3 base = uBaseColor;
        vec3 cytoplasmFog = base + vec3(noise * 0.05);

        // Now add topographic contour lines over the cytoplasm
        float elevation = (noise + 1.0) * 0.5;
        float contourLevels = 4.0; // Moderate number of contour lines
        float scaledElevation = elevation * contourLevels;
        float contourIndex = floor(scaledElevation);
        float withinContour = fract(scaledElevation);

        // Create light contour lines
        float contourLine = 0.0;
        float lineWidth = 0.025 * uContourIntensity;

        if (withinContour < lineWidth || withinContour > (1.0 - lineWidth)) {
          contourLine = 1.0;
        }

        // Light colored topographic lines over dark cytoplasm
        vec3 lightContourColor = vec3(0.8, 0.9, 1.0); // Brighter light blue-white contour lines

        // Blend the light contour lines with the dark cytoplasm background
        finalColor = mix(cytoplasmFog, lightContourColor, contourLine * uContourIntensity * 0.9);
        alpha = 0.35; // Keep original cytoplasm alpha
        
      } else {
        // Fallback: default to dark cytoplasm
        vec3 base = uBaseColor;
        vec3 fog = base + vec3(noise * 0.05);
        finalColor = fog;
        alpha = 0.35;
      }
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const uniforms = useMemo(
      () => ({
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(0.03, 0.03, 0.03) }, // Pure charcoal monochrome
        uShaderMode: { value: 1.0 }, // 0=dark cytoplasm, 1=light topographic, 2=dark topographic
        uContourIntensity: { value: 0.4 }, // Subtle contour lines
        uIsMobile: { value: 0.0 }, // 0.0 = desktop, 1.0 = mobile (triggers 90° rotation)
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

export default TopographicCytoplasmPlane;