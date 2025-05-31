import { isProduction } from "@/lib/server-utils"
import { getCollection } from "astro:content"

export async function getAllArticles() {
  const articles = await getCollection("articles", ({ data }) => {
    const isPublished = data.publishedAt !== undefined
    return isProduction() ? isPublished : true
  })

  return articles
}
