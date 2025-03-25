import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const defaultSchema = z.object({
  title: z.string(),
  description: z.string(),
  layout: z.string().optional().default("@/layouts/DocsLayout.astro"),
  isPrivate: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
})

const componentsSchema = z.object({
  ...defaultSchema.shape,
  component: z.string().optional(),
  shortDescription: z.string().optional(),
})

const toolsSchema = z.object({
  ...defaultSchema.shape,
  icons: z.array(z.string()),
  href: z.string(),
})

export const componentDocsCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/components",
  }),
  schema: componentsSchema,
})

export const toolDocsCollection = defineCollection({
  loader: glob({
    pattern: "**\/*.mdx",
    base: "./src/content/tools",
  }),
  schema: toolsSchema,
})

export const collections = {
  components: componentDocsCollection,
  tools: toolDocsCollection,
}
