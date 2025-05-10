import { getCollection } from "astro:content"

export async function getAllPosts() {
  // TODO: well this won't scale...
  const allPosts = await getCollection("general")

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt || 0).getTime()
    const dateB = new Date(b.data.publishedAt || 0).getTime()
    return dateB - dateA
  })
}
