import { cn } from "@/lib/utils"

type HeadingProps = {
  className?: string
  children: React.ReactNode
}

export function H1({ className, children }: HeadingProps) {
  return (
    <h1
      className={cn("scroll-m-20 text-3xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  )
}
