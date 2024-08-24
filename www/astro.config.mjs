import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/static"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "static",
  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    excludeFiles: ["./components.json"],
  }),
})
