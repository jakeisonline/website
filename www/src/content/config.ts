import { z, defineCollection } from "astro:content"

const defaultSchema = z.object({
  title: z.string(),
  description: z.string(),
  layout: z.string().optional().default("@/layouts/DocsLayout.astro"),
  isPrivate: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
})

const componentsSchema = z.object({
  ...defaultSchema.shape,
  component: z.string(),
})

export const componentDocsCollection = defineCollection({
  type: "content",
  schema: componentsSchema,
})

export const toolDocsCollection = defineCollection({
  type: "content",
  schema: defaultSchema,
})

export const generalDocsCollection = defineCollection({
  type: "content",
  schema: defaultSchema,
})

export const collections = {
  general: generalDocsCollection,
  components: componentDocsCollection,
  tools: toolDocsCollection,
}
