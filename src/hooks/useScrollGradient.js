import { useEffect, useState } from "react";

export default function useScrollGradient(sections, colors) {
  const [color, setColor] = useState(colors[0] || [0, 0, 0]);

  useEffect(() => {
    const elements = sections
      .map((sec) =>
        typeof sec === "string" ? document.getElementById(sec) : sec
      )
      .filter(Boolean);

    if (!elements.length) return;

    function update() {
      const scrollY = window.scrollY;
      const offsets = elements.map((el) => el.offsetTop);
      const total = document.body.scrollHeight - window.innerHeight;

      let index = 0;
      while (index < offsets.length - 1 && scrollY >= offsets[index + 1]) {
        index += 1;
      }

      const start = offsets[index];
      const end =
        index < offsets.length - 1
          ? offsets[index + 1]
          : total;
      const t = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

      const c1 = colors[index] || colors[0];
      const c2 = colors[Math.min(index + 1, colors.length - 1)] || colors[0];

      setColor([
        c1[0] + (c2[0] - c1[0]) * t,
        c1[1] + (c2[1] - c1[1]) * t,
        c1[2] + (c2[2] - c1[2]) * t,
      ]);
    }

    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections, colors]);

  return color;
}
