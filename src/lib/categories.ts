import { getCollection } from "astro:content"
import slugify from "slugify"

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

    return createCategoryObject(category)
  })

  return categories
}

export function slugifyCategory(category: string) {
  return slugify(category, {
    lower: true,
    strict: true,
  })
}

export function createCategoryObject(category: string) {
  if (category === "blog") {
    return {
      id: "blog",
      name: "General",
      url: "/blog",
    }
  }

  return {
    id: slugifyCategory(category),
    name: category,
    url: `/${slugifyCategory(category)}`,
  }
}
