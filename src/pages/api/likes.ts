export const prerender = false

// TODO: We need to protect against adding just garbage targetIds somehow

import { SITE_CONFIG } from "@/lib/config"
import { and, db, eq, LikesTable, LikesUserTable, sql } from "astro:db"
import crypto from "crypto"

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

  if (!import.meta.env.IP_HASH_KEY) {
    console.error("IP_HASH_KEY environment variable is not set")
    return new Response("Server configuration error", { status: 500 })
  }

  // Create a consistent hash of the IP address
  const ipHash = crypto
    .createHmac("sha256", import.meta.env.IP_HASH_KEY)
    .update(clientAddress)
    .digest("hex")

  const fetchedLikes = await db
    .select({
      likes: LikesTable.likes,
      userLikes: LikesUserTable.likes,
    })
    .from(LikesTable)
    .where(eq(LikesTable.id, targetId))
    .leftJoin(
      LikesUserTable,
      and(
        eq(LikesUserTable.userId, ipHash),
        eq(LikesTable.id, LikesUserTable.likeId),
      ),
    )

  if (fetchedLikes.length === 0) {
    return new Response(JSON.stringify({ totalLikes: 0, userLikes: 0 }), {
      status: 200,
    })
  }

  const totalLikes = fetchedLikes[0].likes ?? 0
  const userLikes = fetchedLikes[0].userLikes ?? 0
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

  if (!import.meta.env.IP_HASH_KEY) {
    console.error("IP_HASH_KEY environment variable is not set")
    return new Response("Server configuration error", { status: 500 })
  }

  const ipHash = crypto
    .createHmac("sha256", import.meta.env.IP_HASH_KEY)
    .update(clientAddress)
    .digest("hex")

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
      })
      .returning(),
  )

  queries.push(
    db
      .insert(LikesUserTable)
      .values({
        id: crypto.randomUUID(),
        userId: ipHash,
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

  const result = await db.batch(queries as any)

  const totalLikes = result[0][0]?.likes
  const userLikes = result[1][0]?.likes

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
