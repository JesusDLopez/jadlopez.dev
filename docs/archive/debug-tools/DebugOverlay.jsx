import { useEffect, useState } from "react";
import ScrollTracker from "./ScrollTracker";
import ScrollDebugOverlay from "./ScrollDebugOverlay";

export default function DebugOverlay() {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ⌨️ Toggle overlay with Shift+D
  useEffect(() => {
    const toggle = (e) => {
      if (e.shiftKey && e.key === "D") setVisible((v) => !v);
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);

  // Hide all debug overlays on mobile
  if (!visible || isMobile) return null;

  return (
    <>
      <ScrollTracker />
      <ScrollDebugOverlay />
      {/* Cursor coordinate system removed */}
    </>
  );
}
