// src/components/Footer.jsx
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Thank you message */}
        <p className="footer-thanks">
          Thanks for stopping by and exploring my work
        </p>

        {/* Personal statement */}
        <p className="footer-statement">
          I built this website on my own, combining my passion for genetics and code
        </p>

        {/* Tech stack */}
        <p className="footer-tech">
          Built with <strong>React</strong>, <strong>Three.js</strong>, <strong>Framer Motion</strong>, and <strong>Blender</strong>
        </p>

        {/* Features */}
        <p className="footer-features">
          Features: Interactive DNA explorer with educational insights • Custom DNA helix • Interactive protein viewer (Mol*) • Cellular physics engine
        </p>

        {/* Copyright */}
        <p className="footer-copyright">
        © 2026 Jesus D. Lopez
        </p>

      </div>
    </footer>
  );
}
