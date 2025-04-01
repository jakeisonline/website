import { defineConfig } from "astro/config"
import robotsTxt from "astro-robots-txt"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"
import playformCompress from "@playform/compress"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",

  integrations: [robotsTxt(), react(), playformCompress()],

  output: "static",

  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
})
