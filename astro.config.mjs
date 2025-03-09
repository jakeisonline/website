// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  base: "/blog/",
  output: "static",
  trailingSlash: "never",
  integrations: [
    mdx({
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
