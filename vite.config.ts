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
    const distDir = path.resolve(__dirname, "dist");
    
    try {
      // Ensure dist directory exists
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      
      // Copy or create .nojekyll file
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log("✓ Copied .nojekyll to dist");
      } else {
        // Create empty .nojekyll file if it doesn't exist
        fs.writeFileSync(dest, "");
        console.log("✓ Created .nojekyll in dist");
      }
      
      // Verify it was created
      if (!fs.existsSync(dest)) {
        throw new Error("Failed to create .nojekyll file");
      }
      console.log("✓ Verified .nojekyll exists in dist");
    } catch (error) {
      console.error("❌ Error copying .nojekyll:", error);
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
    copyNoJekyll(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
