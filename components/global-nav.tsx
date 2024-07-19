"use client"

import { cn } from "@/lib/utils"
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

  console.log(currentPath)

  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      {globalNavItems.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={cn(
            "transition-colors",
            currentPath.includes(href)
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
