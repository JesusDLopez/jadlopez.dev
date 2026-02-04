// src/components/OrbitingIcons.jsx
import { useEffect, useRef } from "react";
import emailIcon from "../assets/icons/email.svg";
import githubIcon from "../assets/icons/github.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import "../Styles/Contact.css";

export default function OrbitingIcons() {
  const iconsRef = useRef([]);

  useEffect(() => {
    // Add subtle sine wave motion to icons
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.01;

      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          const offset = (index * Math.PI * 2) / 3; // 120 degrees apart
          const sineWave = Math.sin(time + offset) * 3; // 3px vertical oscillation
          icon.style.transform = `translateY(${sineWave}px)`;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="orbiting-icons">
      <a
        className="icon"
        href="mailto:jesus.lopez@example.com"
        ref={(el) => (iconsRef.current[0] = el)}
        aria-label="Email"
      >
        <img src={emailIcon} alt="Email" />
      </a>
      <a
        className="icon"
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        ref={(el) => (iconsRef.current[1] = el)}
        aria-label="GitHub"
      >
        <img src={githubIcon} alt="GitHub" />
      </a>
      <a
        className="icon"
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        ref={(el) => (iconsRef.current[2] = el)}
        aria-label="LinkedIn"
      >
        <img src={twitterIcon} alt="LinkedIn" />
      </a>
    </div>
  );
}
