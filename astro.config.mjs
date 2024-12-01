import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import robotsTxt from "astro-robots-txt"
import vercel from "@astrojs/vercel/static"
import react from "@astrojs/react"
import playformCompress from "@playform/compress"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    robotsTxt(),
    react(),
    playformCompress(),
  ],
  output: "static",
  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
