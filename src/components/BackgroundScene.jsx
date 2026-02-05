import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import useScrollGradient from "../hooks/useScrollGradient";
import TopographicCytoplasmPlane from "./TopographicCytoplasmPlane";
import FloatingParticles from "./FloatingParticles";
import { useTheme } from "../contexts/ThemeContext";

export default function BackgroundScene() {
  const location = useLocation();
  const { isDark } = useTheme();
  const fogRef = useRef();
  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Determine if we're on a report page or portfolio page
  const isReportPage = location.pathname.includes('/projects/');

  // Detect mobile and handle Safari viewport changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Update CSS custom property with actual viewport height
    // This handles Safari's dynamic address bar better than static CSS units
    const updateViewportHeight = () => {
      // Use visualViewport for Safari address bar changes, fallback to innerHeight
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${vh}px`);
    };

    const handleResize = () => {
      checkMobile();
      updateViewportHeight();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    // visualViewport is the key for Safari address bar changes
    window.visualViewport?.addEventListener('resize', updateViewportHeight);
    window.visualViewport?.addEventListener('scroll', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.visualViewport?.removeEventListener('resize', updateViewportHeight);
      window.visualViewport?.removeEventListener('scroll', updateViewportHeight);
    };
  }, []);

  const sections = useMemo(
    () => ["hero", "about", "work", "blog", "contact"],
    []
  );
  const colors = useMemo(
    () => [
      [0.03, 0.03, 0.03], // hero - Pure charcoal
      [0.03, 0.03, 0.03], // about - Pure charcoal
      [0.03, 0.03, 0.03], // work - Pure charcoal
      [0.03, 0.03, 0.03], // blog - Pure charcoal
      [0.03, 0.03, 0.03], // contact - Pure charcoal
    ],
    []
  );
  const scrollColor = useScrollGradient(sections, colors);

  // Set shader mode based on page type and theme
  useEffect(() => {
    const setShaderMode = () => {
      if (fogRef.current) {
        let shaderMode;

        // Both reports and portfolio use theme-based shader mode
        shaderMode = isDark ? 2 : 1; // 2 = dark topographic, 1 = light topographic

        fogRef.current.setShaderMode(shaderMode);
        fogRef.current.setContourIntensity(0.4); // Subtle contour lines
      } else {
        // Retry after a short delay if ref not available
        setTimeout(setShaderMode, 100);
      }
    };

    setShaderMode();
  }, [isReportPage, isDark]);

  // Handle color changes for dark pages (only affects dark cytoplasm mode)
  useEffect(() => {
    if (isDark) {
      const uniforms = fogRef.current?.getUniforms?.();
      if (uniforms?.uBaseColor) {
        gsap.to(uniforms.uBaseColor.value, {
          r: scrollColor[0],
          g: scrollColor[1],
          b: scrollColor[2],
          duration: 0.2,
          ease: "none",
        });
      } else {
        fogRef.current?.setBaseColor?.(scrollColor);
      }
    }
  }, [scrollColor, isReportPage, isDark]);

  return (
    <div
      ref={containerRef}
      className="shader-background-container"
    >
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 10 : 15],
          fov: isMobile ? 60 : 50
        }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Device pixel ratio for sharp rendering
        frameloop="always"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <Suspense fallback={null}>
          <TopographicCytoplasmPlane ref={fogRef} />
          {isDark && !isMobile && <FloatingParticles count={3000} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
