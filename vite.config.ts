import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { heroPosterLqip } from "./src/lib/heroPosterLqip";
import { HERO_GRADIENTS } from "./src/lib/heroGradients";

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

      // Copy 404.html - use index.html as base (GitHub Pages SPA routing)
      const html404Dest = path.resolve(__dirname, "dist/404.html");
      const indexHtmlDest = path.resolve(__dirname, "dist/index.html");
      
      if (fs.existsSync(indexHtmlDest)) {
        // Simply copy index.html to 404.html for GitHub Pages SPA routing
        // GitHub Pages will serve 404.html for any 404 errors, and React Router will handle routing
        const indexHtmlContent = fs.readFileSync(indexHtmlDest, "utf-8");
        fs.writeFileSync(html404Dest, indexHtmlContent);
        console.log("✓ Created 404.html from index.html for GitHub Pages SPA routing");

        // Create static route entrypoints so GitHub Pages returns 200 for SPA routes
        // (Search Console won't index routes that return 404 even if the SPA renders via 404.html fallback)
        const spaRoutes = ["greeting", "legal-basis", "portfolio", "recruit"];
        spaRoutes.forEach((route) => {
          const routeDir = path.resolve(distDir, route);
          const routeIndex = path.resolve(routeDir, "index.html");
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.writeFileSync(routeIndex, indexHtmlContent);
        });
        console.log(`✓ Created ${4} SPA route entrypoints in dist (for GitHub Pages SEO)`);
      } else if (fs.existsSync(path.resolve(__dirname, "public/404.html"))) {
        // Fallback: copy from public if index.html doesn't exist yet
        fs.copyFileSync(path.resolve(__dirname, "public/404.html"), html404Dest);
        console.log("✓ Copied 404.html from public to dist");
      }
      
    } catch (error) {
      console.error("❌ Error copying netlify files:", error);
      // Don't fail the build, but log the error
    }
  },
});

// Inject hero poster boot script (first paint before React) + preload
const injectHeroPosterBoot = (base: string) => ({
  name: "inject-hero-poster-boot",
  transformIndexHtml(html: string) {
    const bootScript = `
    <script>
      (function (base) {
        var path = location.pathname.replace(/\\/$/, '') || '/';
        if (base !== '/') {
          var prefix = base.replace(/\\/$/, '');
          if (path.indexOf(prefix) === 0) path = path.slice(prefix.length) || '/';
        }
        var isGreeting = path === '/greeting';
        var isHome = path === '/';
        if (!isHome && !isGreeting) return;
        var name = isGreeting ? 'Main2' : 'Main1';
        var posterWebp = base + 'video/' + name + '_poster.webp';
        var posterJpg = base + 'video/' + name + '_poster.jpg';
        var link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = posterWebp;
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
        var lqip = ${JSON.stringify(heroPosterLqip)};
        var img = document.createElement('img');
        img.id = 'hero-boot-poster';
        img.alt = '';
        img.decoding = 'sync';
        img.fetchPriority = 'high';
        img.src = lqip[name];
        Object.assign(img.style, {
          position: 'fixed',
          inset: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '0',
          pointerEvents: 'none',
        });
        document.body.insertBefore(img, document.body.firstChild);
        var gradients = ${JSON.stringify(HERO_GRADIENTS)};
        var overlay = document.createElement('div');
        overlay.id = 'hero-boot-gradient';
        Object.assign(overlay.style, {
          position: 'fixed',
          inset: '0',
          zIndex: '1',
          pointerEvents: 'none',
          background: gradients[name],
        });
        document.body.insertBefore(overlay, img.nextSibling);
        var full = new Image();
        full.onload = function () { img.src = posterWebp; };
        full.onerror = function () { img.src = posterJpg; };
        full.src = posterWebp;
      })(${JSON.stringify(base)});
    </script>`;
    return html.replace("<body>", `<body>${bootScript}`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === "production" ? (process.env.VITE_BASE || "/") : "/";
  return {
  // For custom domains, the site is served from the origin root, so base should be "/".
  // If you ever deploy under a subpath (e.g. GitHub project pages), set VITE_BASE="/your-repo-name/" when building.
  base,
  server: {
    host: "::",
    port: parseInt(process.env.PORT || '8081'),
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
    injectHeroPosterBoot(base),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
