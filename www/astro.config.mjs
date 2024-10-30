import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/static"
import react from "@astrojs/react"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "poimandres",
      },
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  base: "/playground",
  output: "static",
  adapter: vercel({
    includeFiles: ["./public/playground/fonts/urbanist-latin-400-normal.woff"],
    excludeFiles: ["./components.json"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
