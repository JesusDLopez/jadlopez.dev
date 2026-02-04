import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Set base path to root for Vercel deployment
  // Use "/" for Vercel (deploys at root domain)
  // Use "/react-card/" for GitHub Pages
  base: "/",
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    force: true,
  },
});

