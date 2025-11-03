import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Plugin to copy .nojekyll and _headers file to dist after build
const copyNetlifyFiles = () => ({
  name: "copy-netlify-files",
  closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    
    try {
      // Ensure dist directory exists
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      
      // Copy .nojekyll
      const nojekyllSrc = path.resolve(__dirname, "public/.nojekyll");
      const nojekyllDest = path.resolve(__dirname, "dist/.nojekyll");
      if (fs.existsSync(nojekyllSrc)) {
        fs.copyFileSync(nojekyllSrc, nojekyllDest);
        console.log("✓ Copied .nojekyll to dist");
      } else {
        fs.writeFileSync(nojekyllDest, "");
        console.log("✓ Created .nojekyll in dist");
      }
      
      // Copy _headers
      const headersSrc = path.resolve(__dirname, "public/_headers");
      const headersDest = path.resolve(__dirname, "dist/_headers");
      if (fs.existsSync(headersSrc)) {
        fs.copyFileSync(headersSrc, headersDest);
        console.log("✓ Copied _headers to dist");
      }
      
    } catch (error) {
      console.error("❌ Error copying netlify files:", error);
      // Don't fail the build, but log the error
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
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyNetlifyFiles(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
