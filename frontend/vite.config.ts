import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist/frontend",
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://backend:3000",
  //       changeOrigin: true,
  //     },
  //   },
  //   host: true,
  //   port: 5173,
  // },
});
