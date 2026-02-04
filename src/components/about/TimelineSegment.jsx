import React from "react";
import { motion, useTransform } from "framer-motion";

export default function TimelineSegment({ seg, scrollY, visible }) {
  // Guard against undefined seg or missing control point
  if (!seg || !seg.control || !seg.start || !seg.end) {
    return null;
  }

  const progress = useTransform(scrollY, [seg.startY, seg.endY], [0, 1], {
    clamp: true,
  });

  const strokeDashoffset = useTransform(progress, [0, 1], [seg.length, 0]);

  // Create curved path using quadratic bezier
  const pathData = `M ${seg.start.x} ${seg.start.y} Q ${seg.control.x} ${seg.control.y} ${seg.end.x} ${seg.end.y}`;

  return (
    <motion.path
      d={pathData}
      className="about-timeline-line"
      strokeDasharray={`${seg.length} ${seg.length}`}
      style={{
        strokeDashoffset: visible ? strokeDashoffset : seg.length,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
