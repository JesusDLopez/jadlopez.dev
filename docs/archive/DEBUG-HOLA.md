# Hola Debug Overlay Guide

Use this when the Hola intro disappears on mobile.

1. Open the site with `?holaDebug=1` appended to the URL
   - Example locally: `http://localhost:5173/?holaDebug=1`
   - On phone: `http://<your-lan-ip>:5173/?holaDebug=1`

2. Scroll to the Hola section
   - The block gets a yellow dashed outline if it is rendered.
   - The overlay appears bottom-right showing live metrics.

3. Read the overlay values:
   - `visibility`: `onscreen`, `above viewport`, or `below viewport`.
   - `rect.top` / `rect.bottom`: relative pixel offsets.
   - `at 15% y`: the element currently covering that viewport region.

4. Tap **refresh** on the overlay to update manually.

5. Screenshot or note the values and share them so we can diagnose further.

Remove `holaDebug=1` to hide the overlay when done.
