import { z, defineCollection } from "astro:content"

export const componentDocsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    layout: z.string(),
  }),
})

export const collections = {
  components: componentDocsCollection,
}
