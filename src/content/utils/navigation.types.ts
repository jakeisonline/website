import type { collections } from "@/content.config"

export type CollectionKeys = keyof typeof collections

export type PageNavConfig = {
  path: string
  newBadge?: (page: any) => { label: string; variant: string } | null
  order?: Record<string, number>
}
