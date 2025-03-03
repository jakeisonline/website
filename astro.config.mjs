// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  base: "/blog/",
  output: "static",
  trailingSlash: "never",
  integrations: [mdx()],
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
