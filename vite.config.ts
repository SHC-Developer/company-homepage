import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Plugin to copy .nojekyll and _headers file to dist after build
// Also ensures public folder files are copied
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
      
      // Verify logo.ico exists (Vite should copy it automatically, but verify)
      const logoIcoDest = path.resolve(__dirname, "dist/logo.ico");
      const logoIcoSrc = path.resolve(__dirname, "public/logo.ico");
      if (!fs.existsSync(logoIcoDest) && fs.existsSync(logoIcoSrc)) {
        fs.copyFileSync(logoIcoSrc, logoIcoDest);
        console.log("✓ Copied logo.ico to dist");
      } else if (fs.existsSync(logoIcoDest)) {
        console.log("✓ logo.ico exists in dist");
      } else {
        console.warn("⚠ logo.ico not found in public folder");
      }
      
      // Copy portfolio folder
      const portfolioSrc = path.resolve(__dirname, "public/portfolio");
      const portfolioDest = path.resolve(__dirname, "dist/portfolio");
      if (fs.existsSync(portfolioSrc)) {
        // Ensure dist/portfolio directory exists
        if (!fs.existsSync(portfolioDest)) {
          fs.mkdirSync(portfolioDest, { recursive: true });
        }
        
        // Copy all files in portfolio folder
        const files = fs.readdirSync(portfolioSrc);
        files.forEach((file) => {
          const srcFile = path.join(portfolioSrc, file);
          const destFile = path.join(portfolioDest, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
          }
        });
        console.log(`✓ Copied ${files.length} portfolio images to dist`);
      } else {
        console.warn("⚠ portfolio folder not found in public");
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
