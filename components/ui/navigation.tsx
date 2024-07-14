import { cn } from "@/lib/utils"
import Link from "next/link"

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">{children}</nav>
  )
}

export function NavigationItem({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <Link
      className={cn(
        "transition-colors hover:text-foreground/80 text-foreground/60",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
