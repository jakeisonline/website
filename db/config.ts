import { column, defineDb, defineTable } from "astro:db"

// Tables

const LikesTable = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
    }),
    likes: column.number(),
    createdAt: column.date({
      default: new Date(),
    }),
  },
})

const LikesUserTable = defineTable({
  columns: {
    userId: column.text(),
    likeId: column.text(),
    likes: column.number(),
    createdAt: column.date({
      default: new Date(),
    }),
  },
  indexes: [{ on: ["userId", "likeId"], unique: true }],
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    LikesTable,
    LikesUserTable,
  },
})
