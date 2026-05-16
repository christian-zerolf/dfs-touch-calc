import { defineConfig } from "vite";

const production = process.env.NODE_ENV === "production";

export default defineConfig({
  root: "src",
  base: production ? "/dfs-touch-calc/" : "/development",
  publicDir: "../public",
  plugins: [],
  server: { port: 5173 },
  build: {
    outDir: "../dist",
  },
});
