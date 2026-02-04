// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../Styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link
          to={location.pathname.startsWith("/blog") ? "/#blog" : "/"}
          className="navbar-logo"
        >
          <span className="logo-text">JLO</span>
        </Link>
      </div>
      <div className="navbar-right">
        <>
          <Link to="/about">About</Link>
          <Link to="/work">Work</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <ThemeToggle />
        </>
      </div>
    </nav>
  );
}
