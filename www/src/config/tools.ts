export const TOOLS = [
  {
    name: "next-auth-template",
    description:
      "A template for Next.js with NextAuth, Drizzle ORM, and Tailwind CSS.",
    icons: ["logos/nextjs", "logos/authjs"],
    href: "https://next-auth-template-demo.vercel.app/",
  },
]

export type Tool = (typeof TOOLS)[number]
