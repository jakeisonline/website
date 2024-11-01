import type { Registry } from "@/registry/schema"

export const ui: Registry = [
  {
    name: "stepper",
    type: "registry:ui",
    description: "A stepper component",
    files: ["ui/stepper.tsx"],
    dependencies: ["tailwindcss-inner-border"],
    tailwind: {
      config: {
        plugins: [`require("tailwindcss-inner-border")`],
      },
    },
  },
  {
    name: "range",
    type: "registry:ui",
    description: "A range component",
    files: ["ui/range.tsx"],
  },
]
