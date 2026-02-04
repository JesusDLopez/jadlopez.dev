// src/Layout.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShaderBackground from "./components/BackgroundScene";

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const onHome = location.pathname === "/";
    if (!onHome) {
      document.body.classList.add("reveal-ui");
      document.body.classList.add("show-nav");
    } else {
      document.body.classList.remove("reveal-ui");
      document.body.classList.remove("show-nav");
    }
  }, [location.pathname]);

  return (
    <>
      <ShaderBackground />
      <Navbar />
      {children}
    </>
  );
}
