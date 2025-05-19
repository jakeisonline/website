import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const defaultSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  layout: z.string().optional().default("@/layouts/post-layout.astro"),
  publishedAt: z.string().optional(),
  isPrivate: z.boolean().optional().default(false),
})

const componentsSchema = z.object({
  ...defaultSchema.shape,
  component: z.string().optional(),
  shortDescription: z.string().optional(),
  isNew: z.boolean().optional().default(false),
})

export const standardCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/blog/general",
  }),
  schema: defaultSchema,
})

export const javascriptCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/blog/javascript",
  }),
  schema: defaultSchema,
})

export const componentDocsCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/components",
  }),
  schema: componentsSchema,
})

export const collections = {
  general: standardCollection,
  javascript: javascriptCollection,
  components: componentDocsCollection,
}
