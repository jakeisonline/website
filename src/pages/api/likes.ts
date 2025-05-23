export const prerender = false

import { SITE_CONFIG } from "@/lib/config"
import { and, db, eq, LikesTable, LikesUserTable, sql } from "astro:db"

export const GET = async ({
  request,
  clientAddress,
}: {
  request: Request
  clientAddress: string
}) => {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get("articleId")

  if (!articleId) {
    return new Response("Article ID is required", { status: 400 })
  }

  const fetchedLikes = await db
    .select()
    .from(LikesTable)
    .where(eq(LikesTable.id, articleId))
    .innerJoin(
      LikesUserTable,
      and(
        eq(LikesUserTable.userId, clientAddress),
        eq(LikesTable.id, LikesUserTable.likeId),
      ),
    )

  console.log(fetchedLikes)

  let totalLikes = 0
  let userLikes = 0

  if (fetchedLikes.length > 0) {
    fetchedLikes.forEach((like) => {
      if (like.LikesUserTable.userId === clientAddress) {
        userLikes += like.LikesUserTable.likes
      }
      totalLikes += like.LikesTable.likes
    })
  }

  return new Response(JSON.stringify({ totalLikes, userLikes }), {
    status: 200,
  })
}

export const POST = async ({
  request,
  clientAddress,
}: {
  request: Request
  clientAddress: string
}) => {
  const { searchParams } = new URL(request.url)
  const targetId = searchParams.get("targetId")

  if (!targetId) {
    return new Response("Article ID is required", { status: 400 })
  }

  const queries = []

  queries.push(
    db
      .insert(LikesTable)
      .values({
        id: targetId,
        likes: 1,
      })
      .onConflictDoUpdate({
        target: [LikesTable.id],
        set: {
          likes: sql`${LikesTable.likes} + 1`,
        },
      }),
  )

  queries.push(
    db
      .insert(LikesUserTable)
      .values({
        userId: clientAddress,
        likeId: targetId,
        likes: 1,
      })
      .onConflictDoUpdate({
        target: [LikesUserTable.userId, LikesUserTable.likeId],
        set: {
          likes: sql`${LikesUserTable.likes} + 1`,
        },
        where: sql`${LikesTable.likes} < ${SITE_CONFIG.options.maxLikes}`,
      }),
  )

  await db.batch(queries as any)

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
