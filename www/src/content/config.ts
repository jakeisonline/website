import { z, defineCollection } from "astro:content"

export const componentDocsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    component: z.string(),
    layout: z.string(),
  }),
})

export const generalDocsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    layout: z.string(),
  }),
})

export const collections = {
  general: generalDocsCollection,
  components: componentDocsCollection,
}
