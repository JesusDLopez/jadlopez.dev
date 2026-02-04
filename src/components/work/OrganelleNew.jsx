import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrganelleNew({
  id,
  title,
  description,
  icon,
  link,
  technologies,
  role,
  organelleType, // Scientific organelle type (education, research, automation, clinical)
  fontStyle = "technical", // Font style: "technical" or "creative"
  size = 170, // Reduced from 180 for less crowding
  active = false,
  dimmed = false,
  onOpen,
  onClose,
  position = { x: 0, y: 0 }, // Position from physics manager
  hovered = false,
  onHoverStart,
  onHoverEnd,
  isMobile = false,
  comingSoon = false
}) {
  const controls = useAnimation();

  // Handle active/dimmed animations
  useEffect(() => {
    if (active) {
      if (isMobile) {
        // Mobile: Option 3 - Expand in place (stay circular, stay in position)
        const activeSize = size * 2.5; // 2.5x larger (175px from 70px)
        controls.start({
          width: activeSize,
          height: activeSize,
          marginLeft: -activeSize / 2,
          marginTop: -activeSize / 2,
          borderRadius: "50%", // Stay circular on mobile
          opacity: 1,
          scale: 1,
          x: position.x, // Stay in current position
          y: position.y, // Stay in current position
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.4
          },
        });
      } else {
        // Desktop: Move to center and expand to rounded rectangle
        const activeSize = size * 2.5; // 2.5x larger (450px instead of 180px)
        controls.start({
          width: activeSize,
          height: activeSize,
          marginLeft: -activeSize / 2,
          marginTop: -activeSize / 2,
          borderRadius: "20px", // Less rounded for better content display
          opacity: 1,
          scale: 1,
          x: 0, // Move to center
          y: 0, // Move to center
          transition: {
            type: "spring",
            stiffness: 150, // Faster opening
            damping: 22,    // Slightly higher damping
            duration: 0.5   // Max 500ms for opening
          },
        });
      }
    } else {
      controls.start({
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        scale: dimmed ? 0.5 : 1,
        opacity: dimmed ? 0.3 : 1,
        x: position.x,
        y: position.y,
        transition: {
          type: "spring",
          stiffness: 180, // Much faster spring
          damping: 25,    // Higher damping for quicker settling
          duration: 0.4   // Max 400ms transition
        },
      });
    }
  }, [active, dimmed, size, controls, position.x, position.y, isMobile]);

  const handleTap = () => {
    if (active) return;
    if (onOpen) onOpen();
  };

  // Build href that respects Vite base in dev/prod
  const computedHref = (() => {
    if (!link) return undefined;
    // External links pass through
    if (/^https?:\/\//i.test(link)) return link;
    const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
    // Normalize leading slash
    const path = link.replace(/^\//, "");
    return `${base}/${path}`;
  })();

  return (
    <motion.div
      className={`organelle font-${fontStyle}${dimmed ? " dimmed" : ""}${
        active ? " active" : ""}${hovered && !active ? " hovered" : ""}${comingSoon ? " coming-soon" : ""}
      `}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        pointerEvents: dimmed ? "none" : "auto",
        zIndex: active ? 10 : 1,
        // Apply scientifically-mapped organelle color, muted for coming soon
        background: comingSoon
          ? 'linear-gradient(135deg, rgba(100, 100, 120, 0.6) 0%, rgba(80, 80, 100, 0.7) 100%)'
          : (organelleType ? `var(--organelle-${organelleType})` : 'var(--organelle-bg)'),
        borderColor: comingSoon
          ? 'rgba(150, 150, 170, 0.5)'
          : (organelleType ? `var(--organelle-${organelleType})` : 'var(--organelle-border)'),
        opacity: dimmed ? 0.3 : (comingSoon ? 0.7 : (organelleType ? 0.8 : 1)),
        // Ensure text readability - white text for better contrast with colored backgrounds
        color: '#ffffff',
        // Prevent layout reflow during animation
        overflow: 'hidden',
        // Browser optimization hint for smoother animations
        willChange: active ? 'width, height, transform' : 'auto',
        // Dashed border for coming soon items
        borderStyle: comingSoon ? 'dashed' : 'solid',
      }}
      initial={{
        width: active ? size * 2.5 : size,
        height: active ? size * 2.5 : size,
        marginLeft: active ? -(size * 2.5) / 2 : -size / 2,
        marginTop: active ? -(size * 2.5) / 2 : -size / 2,
        borderRadius: active ? (isMobile ? "50%" : "20px") : "50%",
        x: active ? (isMobile ? position.x : 0) : position.x,
        y: active ? (isMobile ? position.y : 0) : position.y,
      }}
      animate={controls}
      whileHover={active ? false : { scale: 1.05 }}
      onHoverStart={() => {
        if (active) return;
        if (onHoverStart) onHoverStart();
      }}
      onHoverEnd={() => {
        if (active) return;
        if (onHoverEnd) onHoverEnd();
      }}
      onTap={handleTap}
    >
      {active && (
        <button className="organelle-close" onClick={onClose}>
          ×
        </button>
      )}
      <p className="organelle-title">{title}</p>
      {icon && (
        typeof icon === 'string' && icon.length <= 2
          ? <span className="organelle-icon-emoji">{icon}</span>
          : <img src={icon} alt={title} className="organelle-icon" />
      )}
      {/* Small indicator for collapsed Coming Soon organelles */}
      {!active && comingSoon && !isMobile && (
        <span className="coming-soon-indicator">Soon</span>
      )}
      {/* Description removed - user wants minimal view with just title, icon, and button */}
      {active && !comingSoon && (
        <a href={computedHref} className="view-project">
          View Project →
        </a>
      )}
      {active && comingSoon && (
        <span className="coming-soon-badge">
          Coming Soon
        </span>
      )}
    </motion.div>
  );
}
