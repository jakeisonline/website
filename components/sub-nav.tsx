"use client"

import { usePathname } from "next/navigation"
import { H4 } from "./ui/headings"
import Link from "./ui/link"
import { cn } from "@/lib/utils"

type SubNavProps = {
  title: string
  navItems: Array<{
    name: string
    href: string
  }>
}

export default function SubNav({ title, navItems }: SubNavProps) {
  const currentPath = usePathname()
  return (
    <aside className="top-20 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 sticky block">
      <H4 className="mt-0 pl-1.5">{title}</H4>
      <div className="grid gap-1 text-sm">
        {navItems.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={cn(
              "pl-1.5 py-1 rounded-sm",
              currentPath === href
                ? "text-foreground bg-accent"
                : "text-foreground/60",
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </aside>
  )
}
