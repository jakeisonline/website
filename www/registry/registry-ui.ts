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
  {
    name: "cells",
    type: "registry:ui",
    description: "A cells component",
    files: ["ui/cells.tsx", "hooks/use-cells.tsx", "hooks/use-cell.tsx"],
    dependencies: ["tailwindcss-inner-border"],
    tailwind: {
      config: {
        plugins: [`require("tailwindcss-inner-border")`],
      },
    },
  },
  {
    name: "scale",
    type: "registry:ui",
    description: "A scale component",
    files: ["ui/scale.tsx", "hooks/use-scale.tsx"],
  },
  {
    name: "tagger",
    type: "registry:ui",
    description: "A tagger component",
    files: ["ui/tagger.tsx", "hooks/use-tagger.tsx"],
    dependencies: ["tailwindcss-inner-border", "lucide-react"],
    tailwind: {
      config: {
        plugins: [`require("tailwindcss-inner-border")`],
      },
    },
  },
]
