import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const defaultSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  layout: z.string().optional().default("@/layouts/post-layout.astro"),
  publishedAt: z.date().optional(),
  isPrivate: z.boolean().optional().default(false),
})

export const standardCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/general",
  }),
  schema: defaultSchema,
})

export const collections = {
  general: standardCollection,
}
