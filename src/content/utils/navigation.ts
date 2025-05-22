import { getCollection, type DataEntryMap } from "astro:content"
import type { CollectionKeys, PageNavConfig } from "./navigation.types"

const pageCollectionsConfig: Record<CollectionKeys, PageNavConfig> = {
  general: {
    path: "/general",
    order: {},
  },
  components: {
    path: "/components",
    order: {
      "introduction": 1,
      "installing-components": 2,
    },
    newBadge: (page: any) =>
      page.data.isNew ? { label: "New", variant: "secondary" } : null,
  },
  // TODO: This isn't really needed as this should only be (sub) nav for /components
  articles: {
    path: "/articles",
    order: {},
  },
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

    const href = `${config.path}/${page.id}`

    return {
      type: "item" as const,
      href,
      text: page.data.title,
      ...(config.newBadge ? { badge: config.newBadge(page) } : {}),
    }
  })
}

export async function buildNavigation() {
  const componentItems = await getNavItems("components")

  const filterItems = (items: typeof componentItems, include: boolean) => {
    return items.filter((item) =>
      include
        ? item?.href === "/components/introduction" ||
          item?.href === "/components/installing-components"
        : item?.href !== "/components/introduction" &&
          item?.href !== "/components/installing-components",
    )
  }

  return [
    { type: "heading", text: "General" },
    ...filterItems(componentItems, true),
    { type: "heading", text: "Components" },
    ...filterItems(componentItems, false),
  ]
}
