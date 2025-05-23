import { db, LikesTable, LikesUserTable } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(LikesTable).values({
    id: "you-should-overcommunicate-pending-state",
    likes: 21,
  })

  await db.insert(LikesUserTable).values({
    // ::1 is the default IP address for localhost
    userId: "::1",
    likeId: "you-should-overcommunicate-pending-state",
    likes: 1,
  })

  await db.insert(LikesUserTable).values({
    // Normally we'd expect this to be a real IP address
    userId: "some-other-ip",
    likeId: "you-should-overcommunicate-pending-state",
    likes: 20,
  })
}
