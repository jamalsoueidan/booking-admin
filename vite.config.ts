import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

const target = process.env.API_URL ?? "http://localhost:7071/api";

console.log("API_URL", target);

export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/api": {
        target: target,
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), eslint()],
});
