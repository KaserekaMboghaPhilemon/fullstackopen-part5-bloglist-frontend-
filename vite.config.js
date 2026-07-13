import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.js",
    globals: true,
  },
  server: {
    // Configure the Vite dev server to proxy API requests to the backend
    proxy: {
      // When frontend makes requests to /api/*, forward them to the backend on port 3003
      "/api": {
        target: "http://localhost:3003", // Backend server address and port
        changeOrigin: true, // Needed to handle CORS properly during development
      },
    },
  },
});
