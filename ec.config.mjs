import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import { defineEcConfig } from "astro-expressive-code"

export default defineEcConfig({
  themes: ["plastic"],
  plugins: [pluginLineNumbers()],
  shiki: {
    bundledLangs: ["javascript", "typescript", "jsx", "tsx"],
  },
  defaultProps: {
    showLineNumbers: false,
  },
})
