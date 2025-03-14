// @ts-check
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { remarkAlert } from "remark-github-blockquote-alert"
import { remarkReadingTime } from "./src/lib/remark-reading-time"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  base: "/blog/",
  output: "static",
  trailingSlash: "never",
  integrations: [
    mdx({
      remarkPlugins: [remarkAlert, remarkReadingTime],
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "plastic",
      },
    }),
    react(),
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
