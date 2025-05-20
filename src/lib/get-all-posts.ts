import {
  getCollection,
  type CollectionEntry,
  type DataEntryMap,
} from "astro:content"

export async function getAllPosts() {
  // TODO: well this won't scale...
  const generalPosts = await getCollection("general")
  const reactPosts = await getCollection("javascript")

  const allPosts = [...generalPosts, ...reactPosts]

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt || 0).getTime()
    const dateB = new Date(b.data.publishedAt || 0).getTime()
    return dateB - dateA
  })
}

export async function getAllPostsByCategory(category: keyof DataEntryMap) {
  const categoryPosts = await getCollection(category)

  return categoryPosts.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt || 0).getTime()
    const dateB = new Date(b.data.publishedAt || 0).getTime()
    return dateB - dateA
  })
}

function sortPostsByDate(posts: CollectionEntry<"general" | "javascript">[]) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.data.publishedAt || 0).getTime()
    const dateB = new Date(b.data.publishedAt || 0).getTime()
    return dateB - dateA
  })
}
