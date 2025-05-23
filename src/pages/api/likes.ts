export const prerender = false

// TODO: We need to protect against adding just garbage targetIds somehow

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
  const targetId = searchParams.get("targetId")

  if (!targetId) {
    return new Response("targetId is required", { status: 400 })
  }

  const fetchedLikes = await db
    .select()
    .from(LikesTable)
    .where(eq(LikesTable.id, targetId))
    .innerJoin(
      LikesUserTable,
      and(
        eq(LikesUserTable.userId, clientAddress),
        eq(LikesTable.id, LikesUserTable.likeId),
      ),
    )

  if (fetchedLikes.length === 0) {
    return new Response(JSON.stringify({ totalLikes: 0, userLikes: 0 }), {
      status: 200,
    })
  }

  const totalLikes = fetchedLikes[0].LikesTable.likes
  const userLikes = fetchedLikes[0].LikesUserTable.likes
  const atLimit = userLikes === SITE_CONFIG.options.maxLikes

  return new Response(JSON.stringify({ totalLikes, userLikes, atLimit }), {
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
    return new Response("targetId is required", { status: 400 })
  }

  const queries = []

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
        where: sql`${LikesUserTable.likes} <= ${SITE_CONFIG.options.maxLikes}`,
      })
      .returning(),
  )

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
        where: sql`EXISTS (
          SELECT 1 FROM ${LikesUserTable}
          WHERE userId = ${clientAddress}
          AND likeId = ${targetId}
          AND likes <= ${SITE_CONFIG.options.maxLikes}
        )`,
      })
      .returning(),
  )

  const result = await db.batch(queries as any)

  const totalLikes = result[1][0]?.likes
  const userLikes = result[0][0]?.likes

  if (userLikes === undefined || totalLikes === undefined) {
    return new Response(
      JSON.stringify({ success: false, message: "Like limit reached" }),
      { status: 422 },
    )
  }

  return new Response(
    JSON.stringify({
      success: true,
      atLimit: userLikes === SITE_CONFIG.options.maxLikes,
      totalLikes,
      userLikes,
    }),
    { status: 200 },
  )
}
