# Mobile Safari shader background not filling top/bottom

Goal: Investigate and fix iPhone Safari showing white/black bands at the top and bottom instead of full shader background.

Acceptance criteria:
1. On iPhone Safari (light and dark mode), the shader background fills the entire viewport, including top/bottom safe areas.
2. Any related rendering or performance issues are identified with a clear mitigation plan.

Notes:
- Reported symptom: top/bottom bands appear white or black depending on system theme.
- Possible causes to examine: safe-area insets, `100vh` behavior, canvas sizing, WebGL render size, and overlay particles cost.
