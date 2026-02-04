import { motion } from "framer-motion";
import { useId, useMemo } from "react";

const HEAD_RADIUS = 14;

function buildTailPath(offsetX, orientation = 1, sway = 0) {
  const startY = 10;
  const control1 = {
    x: offsetX + sway * 8,
    y: startY + 26,
  };
  const control2 = {
    x: offsetX + orientation * 18 + sway * 12,
    y: startY + 58,
  };
  const end = {
    x: offsetX + orientation * 22 + sway * 18,
    y: startY + 78,
  };

  return `M ${offsetX} ${startY} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`;
}

export default function Phospholipid({
  x = 0,
  y = 0,
  scale = 1,
  orientation = 1, // 1 = heads pointing upward/outward, -1 = inward
  headHue = 205,
}) {
  const headGradientId = useId();
  const tailGradientId = useMemo(() => `${headGradientId}-tail`, [headGradientId]);

  const baseTailPaths = useMemo(() => {
    return [
      buildTailPath(-6, orientation, 0),
      buildTailPath(6, orientation, 0),
    ];
  }, [orientation]);

  return (
    <>
      <defs>
        <radialGradient id={headGradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`hsla(${headHue}, 90%, 92%, 0.9)`} />
          <stop offset="60%" stopColor={`hsla(${headHue}, 85%, 68%, 0.8)`} />
          <stop offset="100%" stopColor={`hsla(${headHue}, 70%, 52%, 0.95)`} />
        </radialGradient>
        <linearGradient id={tailGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={`hsla(${headHue}, 70%, 80%, 0.75)`} />
          <stop offset="50%" stopColor={`hsla(${headHue - 10}, 65%, 60%, 0.65)`} />
          <stop offset="100%" stopColor={`hsla(${headHue - 20}, 60%, 40%, 0.75)`} />
        </linearGradient>
      </defs>

      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        transform={`translate(${x} ${y}) scale(${scale})`}
        style={{ transformOrigin: "center center" }}
      >
        {/* Phosphate head */}
        <motion.circle
          cx={0}
          cy={0}
          r={HEAD_RADIUS}
          fill={`url(#${headGradientId})`}
          stroke={`hsla(${headHue}, 60%, 35%, 0.6)`}
          strokeWidth="1.2"
          animate={{
            scale: [1, 1.04, 1],
            y: [0, orientation * -2.5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* Tails */}
        {baseTailPaths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            fill="none"
            stroke={`url(#${tailGradientId})`}
            strokeWidth="5"
            strokeLinecap="round"
            animate={{
              d: [
                path,
                buildTailPath(index ? 6 : -6, orientation, 0.15),
                buildTailPath(index ? 6 : -6, orientation, -0.12),
                path,
              ],
            }}
            transition={{
              duration: 6 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            opacity={0.9}
          />
        ))}

        {/* Inner hydrophobic accent */}
        <motion.path
          d={`M -10 ${10} C -6 ${38} -4 ${70} -2 ${96}`}
          stroke={`hsla(${headHue - 25}, 40%, 35%, 0.35)`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4.8, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.g>
    </>
  );
}
