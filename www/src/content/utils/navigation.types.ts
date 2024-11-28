import type { collections } from "@/content/config"

export type CollectionKeys = keyof typeof collections

export type PageNavConfig = {
  path: string
  newBadge?: (page: any) => { label: string; variant: string } | null
  order?: Record<string, number>
}

export const pageCollectionsConfig: Record<CollectionKeys, PageNavConfig> = {
  general: {
    path: "/playground",
    order: {
      "introduction": 1,
      "installing-components": 2,
    },
  },
  components: {
    path: "/playground/components",
    newBadge: (page: any) =>
      page.data.isNew ? { label: "New", variant: "secondary" } : null,
  },
  tools: { path: "/playground/tools" },
} as const
