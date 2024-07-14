import { cn } from "@/lib/utils"

type H1Props = {
  className?: string
  children: React.ReactNode
}

export default function H1({ className, children }: H1Props) {
  return (
    <h1
      className={cn("scroll-m-20 text-3xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  )
}
