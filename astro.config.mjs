// @ts-check
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import playformCompress from "@playform/compress"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { remarkReadingTime } from "./src/lib/remark-reading-time"

import expressiveCode from "astro-expressive-code"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  output: "static",
  trailingSlash: "never",
  prefetch: true,
  integrations: [
    expressiveCode({
      themes: ["plastic"],
      plugins: [pluginLineNumbers()],
      shiki: {
        bundledLangs: ["javascript", "typescript", "jsx", "tsx"],
      },
      defaultProps: {
        showLineNumbers: false,
      },
    }),
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
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
