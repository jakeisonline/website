import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import robotsTxt from "astro-robots-txt"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"
import playformCompress from "@playform/compress"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    robotsTxt(),
    react(),
    playformCompress(),
  ],
  output: "server",
  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
