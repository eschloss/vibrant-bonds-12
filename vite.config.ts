import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/legal/privacy": {
        target: "https://api.kikiapp.eu",
        changeOrigin: true,
        secure: true,
        // Dynamically route to the correct upstream doc based on ?lang=...
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            try {
              const url = new URL(req.url || "", "http://localhost");
              const lang = (url.searchParams.get("lang") || "en").toLowerCase();
              const upstreamPath =
                lang === "es" ? "/auth/legal/es/privacy.html" : "/auth/legal/en/privacy.html";

              // Preserve querystring (though upstream doesn't need it), but ensure the path is correct.
              proxyReq.path = upstreamPath;
            } catch {
              proxyReq.path = "/auth/legal/en/privacy.html";
            }
          });
        },
      },
      "/api/legal/cookie-policy": {
        target: "https://api.kikiapp.eu",
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            try {
              const url = new URL(req.url || "", "http://localhost");
              const lang = (url.searchParams.get("lang") || "en").toLowerCase();
              proxyReq.path =
                lang === "es"
                  ? "/auth/legal/es/cookie-policy.html"
                  : "/auth/legal/en/cookie-policy.html";
            } catch {
              proxyReq.path = "/auth/legal/en/cookie-policy.html";
            }
          });
        },
      },
      "/api/legal/terms": {
        target: "https://api.kikiapp.eu",
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            try {
              const url = new URL(req.url || "", "http://localhost");
              const lang = (url.searchParams.get("lang") || "en").toLowerCase();
              proxyReq.path = lang === "es" ? "/auth/legal/es/terms.html" : "/auth/legal/en/terms.html";
            } catch {
              proxyReq.path = "/auth/legal/en/terms.html";
            }
          });
        },
      },
    },
  },
  plugins: [
    react(),
    {
      name: "inject-kiki-prefetch-config",
      transformIndexHtml(html: string) {
        const env = loadEnv(mode, process.cwd(), "");
        const eventsApiBase =
          env.VITE_IS_STRIPE_TEST_MODE === "false"
            ? "https://api.kikiapp.eu"
            : "https://staging-api.kikiapp.eu";
        const cfg = JSON.stringify({
          eventsApiBase,
          authApiBase: "https://api.kikiapp.eu",
        });
        return html.replace(
          "<!-- KIKI_PREFETCH_CONFIG -->",
          `<script>window.__KIKI_PREFETCH_CONFIG__=${cfg};</script>`
        );
      },
    },
    imagetools(),
    mode === 'development' && componentTagger(),
    mode === 'analyze' && visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: false })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2018",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          // lucide-react excluded: tree-shakes per route so each page only loads icons it uses
          vendor: ["framer-motion", "@tanstack/react-query"]
        }
      }
    }
  }
  };
});
