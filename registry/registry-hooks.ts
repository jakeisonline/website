import type { Registry } from "@/registry/schema"

export const hooks: Registry = [
  {
    name: "use-cells",
    type: "registry:hook",
    description: "A hook for the Cells component",
    files: [{ path: "hooks/use-cells.tsx", type: "registry:hook" }],
  },
  {
    name: "use-cell",
    type: "registry:hook",
    description: "A hook for the Cell component",
    files: [{ path: "hooks/use-cell.tsx", type: "registry:hook" }],
  },
]
