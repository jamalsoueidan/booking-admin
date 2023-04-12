import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

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
  plugins: [react()],
});
