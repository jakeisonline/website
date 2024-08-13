import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  site: "https://jakeisonline.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
})
