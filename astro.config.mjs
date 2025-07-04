// @ts-check
import db from "@astrojs/db"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import playformCompress from "@playform/compress"
import tailwindcss from "@tailwindcss/vite"
import expressiveCode from "astro-expressive-code"

import { defineConfig } from "astro/config"
import { remarkReadingTime } from "./src/lib/remark-reading-time"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  output: "static",
  trailingSlash: "never",
  prefetch: true,
  integrations: [
    db(),
    expressiveCode(),
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    react(),
    sitemap(),
    playformCompress({
      CSS: false,
      HTML: true,
      Image: true,
      JavaScript: true,
      JSON: true,
      SVG: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    edgeMiddleware: true,
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
})
