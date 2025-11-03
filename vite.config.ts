import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Plugin to copy .nojekyll file to dist after build
const copyNoJekyll = () => ({
  name: "copy-nojekyll",
  closeBundle() {
    const src = path.resolve(__dirname, "public/.nojekyll");
    const dest = path.resolve(__dirname, "dist/.nojekyll");
    try {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log("✓ Copied .nojekyll to dist");
      } else {
        // Create empty .nojekyll file if it doesn't exist
        fs.writeFileSync(dest, "");
        console.log("✓ Created .nojekyll in dist");
      }
    } catch (error) {
      console.error("Error copying .nojekyll:", error);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/company-homepage/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyNoJekyll(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
