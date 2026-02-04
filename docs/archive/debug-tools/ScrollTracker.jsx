import { useEffect, useState } from "react";

export default function ScrollTracker() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "8px",
        top: `${scrollPercent}%`,
        transform: "translateY(-50%)",
        zIndex: 10000,
        background: "rgba(255, 0, 0, 0.85)",
        color: "white",
        padding: "2px 6px",
        fontSize: "12px",
        fontFamily: "monospace",
        borderRadius: "4px",
        pointerEvents: "none",
      }}
    >
      {Math.round(scrollPercent)}%
    </div>
  );
}
