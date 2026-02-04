import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingParticles({ count = 20000 }) {
  const pointsRef = useRef();

  // 1. Position particles in 3D
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(40);
      const y = THREE.MathUtils.randFloatSpread(500) + 100;
      const z = THREE.MathUtils.randFloatSpread(-50);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count]);

  // 2. Speeds for float animation
  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.2 + Math.random() * 0.3;
    }
    return arr;
  }, [count]);

  // ✅ 3. Generate reliable soft circle texture
  const circleTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const r = size / 2;
    const gradient = ctx.createRadialGradient(r, r, 0, r, r, r);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    return texture;
  }, []);

  // 4. Animate float
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      const yIndex = base + 1;
      arr[yIndex] += Math.sin(time * speeds[i] + i) * 0.0015;
      arr[base] += Math.cos(time * 0.1 + i) * 0.0005; // ← X drift
      // wrap around vertically
      if (arr[yIndex] > 300) arr[yIndex] = -300;
      if (arr[yIndex] < -300) arr[yIndex] = 300;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        map={circleTexture}
        transparent
        alphaTest={0.05}
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        color={new THREE.Color(1, 1, 1)}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
