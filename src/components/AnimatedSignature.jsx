// src/components/AnimatedSignature.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/Contact.css";

export default function AnimatedSignature({ text = "Jesús López" }) {
  const textRef = useRef(null);
  const svgRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    const svgEl = svgRef.current;
    if (!el || !svgEl) return;

    // Setup stroke animation
    const length = el.getTotalLength ? el.getTotalLength() : el.getComputedTextLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;

    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const tl = gsap.timeline();
            tl.to(el, {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.out",
            }).to(
              el,
              {
                fill: "var(--text-primary, #e0e0e0)",
                duration: 0.8,
              },
              "-=0.5"
            );
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(svgEl);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <svg
      ref={svgRef}
      className="animated-signature"
      viewBox="0 0 400 80"
      aria-hidden="true"
    >
      <text
        ref={textRef}
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="48"
      >
        {text}
      </text>
    </svg>
  );
}
