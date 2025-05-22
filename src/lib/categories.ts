import { getCollection } from "astro:content"
import slugify from "slugify"

export const CATEGORIES = [
  {
    id: "general",
    name: "General",
    url: "/blog",
  },
]

export async function getCategories() {
  const articles = await getCollection("articles")

  // List unique categories
  const uniqueCategories = [
    ...new Set(articles.map((article) => article.data.category)),
  ]

  // Map categories into an object
  const categories = uniqueCategories.map((category) => {
    // Create a slug from the category name
    const slug = slugifyCategory(category)

    // We want "blog" to be named "General"
    if (slug === "blog") {
      return {
        id: "blog",
        name: "General",
        url: "/blog",
      }
    }

    return {
      id: slug,
      name: category,
      url: `/${slug}`,
    }
  })

  return categories
}

export function slugifyCategory(category: string) {
  return slugify(category, {
    lower: true,
    strict: true,
  })
}
