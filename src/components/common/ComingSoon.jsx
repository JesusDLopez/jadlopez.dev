// src/components/common/ComingSoon.jsx
// Reusable placeholder for unfinished content
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

function ComingSoon({
  variant = "default", // "default" | "protein" | "project" | "blog"
  title = "Coming Soon",
  subtitle = null
}) {
  const { isDark } = useTheme();

  // Size presets for different contexts
  const sizeStyles = {
    protein: {
      minHeight: "200px",
      aspectRatio: "1/1",
    },
    project: {
      minHeight: "180px",
    },
    blog: {
      minHeight: "150px",
    },
    default: {
      minHeight: "150px",
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        width: "100%",
        height: "100%",
        ...sizeStyles[variant],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        background: "transparent",
        border: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle animated gradient overlay */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,0,0,0.02), transparent)",
          backgroundSize: "200% 100%",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          fontSize: variant === "protein" ? "2.5rem" : "2rem",
          marginBottom: "0.75rem",
          opacity: 0.6,
        }}
      >
        {variant === "protein" ? "🧬" : variant === "blog" ? "📝" : "🚧"}
      </motion.div>

      {/* Title */}
      <span
        style={{
          fontSize: variant === "protein" ? "1.1rem" : "1rem",
          fontWeight: "600",
          color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>

      {/* Optional subtitle */}
      {subtitle && (
        <span
          style={{
            fontSize: "0.85rem",
            color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            marginTop: "0.5rem",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          {subtitle}
        </span>
      )}
    </motion.div>
  );
}

export default ComingSoon;
