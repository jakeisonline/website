"use client"

import Link from "@/components/ui/link"
import { usePathname } from "next/navigation"

export function GlobalNav() {
  const currentPath = usePathname()

  const globalNavItems = [
    {
      name: "Components",
      href: "/components",
    },
  ]

  return (
    <nav className="hidden lg:flex items-center gap-4 text-sm lg:gap-6">
      {globalNavItems.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={
            currentPath.includes(href)
              ? "text-foreground"
              : "text-foreground/60"
          }
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
