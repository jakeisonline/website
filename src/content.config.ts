import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const defaultSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  publishedAt: z.string().optional(),
  isPrivate: z.boolean().optional().default(false),
})

const componentsSchema = z.object({
  ...defaultSchema.shape,
  component: z.string().optional(),
  shortDescription: z.string().optional(),
  isNew: z.boolean().optional().default(false),
})

const articlesSchema = z.object({
  ...defaultSchema.shape,
  category: z.string().default("blog"),
  coverImage: z.string().optional(),
})

export const componentDocsCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/components",
  }),
  schema: componentsSchema,
})

export const articlesCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/articles",
  }),
  schema: articlesSchema,
})

export const collections = {
  components: componentDocsCollection,
  articles: articlesCollection,
}
