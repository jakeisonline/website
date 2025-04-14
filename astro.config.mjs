// @ts-check
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { remarkReadingTime } from "./src/lib/remark-reading-time"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  base: "/blog/",
  output: "static",
  trailingSlash: "never",
  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime],
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "plastic",
      },
    }),
    react(),
    sitemap(),
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
