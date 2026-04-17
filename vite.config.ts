import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/** Absolute og:image / twitter:image need a full URL for most social crawlers. */
function portfolioOgHtml(): Plugin {
  return {
    name: "portfolio-og-html",
    transformIndexHtml(html) {
      const fromEnv = process.env.VITE_SITE_URL?.replace(/\/$/, "").trim();
      const rawHost = process.env.VERCEL_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";
      const vercel = rawHost && !rawHost.startsWith("localhost") ? `https://${rawHost}` : "";
      const origin = (fromEnv || vercel || "").replace(/\/$/, "");
      const cb = "v=4";
      const image = origin ? `${origin}/images/thumbnail.jpg?${cb}` : `/images/thumbnail.jpg?${cb}`;
      const ogUrl = origin ? `${origin}/` : "";

      let out = html.replaceAll("__OG_IMAGE_ABS__", image);
      out = out.replace(
        "<!--__OG_URL_META__-->",
        origin
          ? `<meta property="og:url" content="${ogUrl}" />\n    <link rel="canonical" href="${ogUrl}" />`
          : "",
      );
      return out;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), portfolioOgHtml(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
