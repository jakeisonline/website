import { isProduction } from "@/lib/server-utils"
import { slugify } from "@/lib/utils"
import { getCollection } from "astro:content"

export interface GetAllArticlesOptions {
  limit?: number
}

export async function getAllArticles(options?: GetAllArticlesOptions) {
  const articles = await getCollection("articles", ({ data }) => {
    const isPublished = data.publishedAt !== undefined
    return isProduction() ? isPublished : true
  })

  articles.sort((a, b) => {
    const aDate = new Date(a.data.publishedAt ?? "")
    const bDate = new Date(b.data.publishedAt ?? "")

    return bDate.getTime() - aDate.getTime()
  })

  if (options?.limit) {
    return articles.slice(0, options.limit)
  }

  return articles
}

export async function getAllCategories() {
  const articles = await getAllArticles()

  // List unique categories
  const uniqueCategories = [
    ...new Set(articles.map((article) => article.data.category)),
  ]

  // Map categories into an object
  const categories = uniqueCategories.map((category) => {
    // Create a slug from the category name
    const slug = slugify(category)

    return createCategoryObject(category)
  })

  return categories
}

export function createCategoryObject(category: string) {
  if (category === "blog") {
    return {
      id: "blog",
      name: "General",
      url: "/blog",
    }
  }

  const slug = slugify(category)

  return {
    id: slug,
    name: category,
    url: `/${slug}`,
  }
}
