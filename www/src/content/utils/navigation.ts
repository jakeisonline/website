import { getCollection, type DataEntryMap } from "astro:content"
import type { CollectionKeys, PageNavConfig } from "./navigation.types"

const pageCollectionsConfig: Record<CollectionKeys, PageNavConfig> = {
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

export async function getNavItems(collectionName: CollectionKeys) {
  const config = pageCollectionsConfig[collectionName]
  const pages = await getCollection(collectionName as keyof DataEntryMap)

  const sortedPages = config.order
    ? pages.sort((a, b) => {
        const orderA = config.order?.[a.id] ?? Infinity
        const orderB = config.order?.[b.id] ?? Infinity
        return orderA - orderB
      })
    : pages.sort((a, b) => a.id.localeCompare(b.id))

  return sortedPages.map((page) => {
    if (page.data.isPrivate) return null

    return {
      type: "item" as const,
      href: `${config.path}/${page.id}`,
      text: page.data.title,
      ...(config.newBadge ? { badge: config.newBadge(page) } : {}),
    }
  })
}

export async function buildNavigation() {
  return [
    { type: "heading", text: "About" },
    ...(await getNavItems("general")),
    { type: "heading", text: "Components" },
    ...(await getNavItems("components")),
    { type: "heading", text: "Tools" },
    ...(await getNavItems("tools")),
  ]
}
