import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  base: "/components",
  output: "static",
  trailingSlash: "never",
  prefetch: true,
  build: {
    format: "file",
  },
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "plastic",
      },
    }),
    react(),
    icon(),
    sitemap({
      customPages: ["https://jakeisonline.com"],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    excludeFiles: ["./components.json"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
