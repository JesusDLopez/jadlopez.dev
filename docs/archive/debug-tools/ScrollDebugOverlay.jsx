import { useEffect, useState } from "react";

export default function ScrollDebugOverlay() {
  const [visible, setVisible] = useState(true);
  const [, forceUpdate] = useState(0);

  // Toggle visibility with Shift+D
  useEffect(() => {
    const toggle = (e) => {
      if (e.shiftKey && e.key === "D") {
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);

  // Re-render on scroll and resize so positions stay accurate
  useEffect(() => {
    const update = () => forceUpdate((v) => v + 1);
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  const sections = Array.from(document.querySelectorAll(".screen-section"));
  const targets = Array.from(
    document.querySelectorAll("[data-scroll-id], [data-scroll-target]")
  );
  const debugMarkers = Array.from(
    document.querySelectorAll("[data-scroll-debug]")
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {sections.map((el, idx) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const label = el.id || el.dataset.section || `section-${idx}`;
        return (
          <div key={`section-${idx}`}>
            <div
              style={{
                position: "absolute",
                top,
                left: 0,
                width: "100%",
                height: "1px",
                background: "red",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: top + 2,
                left: 0,
                fontSize: "10px",
                fontFamily: "monospace",
                color: "red",
                background: "rgba(255,255,255,0.7)",
                padding: "1px 3px",
              }}
            >
              {label}
            </div>
          </div>
        );
      })}

      {targets.map((el, idx) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const label =
          el.getAttribute("data-scroll-id") ||
          el.getAttribute("data-scroll-target") ||
          el.id ||
          `target-${idx}`;
        return (
          <div key={`target-${idx}`}>
            <div
              style={{
                position: "absolute",
                top,
                left,
                width: rect.width,
                height: rect.height,
                border: "1px dashed red",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: top - 12,
                left,
                fontSize: "10px",
                fontFamily: "monospace",
                color: "red",
                background: "rgba(255,255,255,0.7)",
                padding: "1px 3px",
              }}
            >
              {label}
            </div>
          </div>
        );
      })}

      {debugMarkers.map((el, idx) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const label =
          el.getAttribute("data-scroll-debug") || el.id || `debug-${idx}`;
        return (
          <div key={`debug-${idx}`}>
            <div
              style={{
                position: "absolute",
                top,
                left: 0,
                width: "100%",
                height: "1px",
                background: "blue",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: top + 2,
                left: 0,
                fontSize: "10px",
                fontFamily: "monospace",
                color: "blue",
                background: "rgba(255,255,255,0.7)",
                padding: "1px 3px",
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
