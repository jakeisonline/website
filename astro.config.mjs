import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import robotsTxt from "astro-robots-txt"
import vercel from "@astrojs/vercel/serverless"
import react from "@astrojs/react"
import opengraphImages, { presets } from "astro-opengraph-images"
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
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Urbanist",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/urbanist/files/urbanist-latin-400-normal.woff",
            ),
          },
        ],
      },
      render: presets.blackAndWhite,
    }),
    playformCompress(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
})
