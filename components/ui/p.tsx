import { cn } from "@/lib/utils"

type PProps = React.HTMLAttributes<HTMLParagraphElement> & {
  className?: string
  children: React.ReactNode
}

export default function P({ className, children }: PProps) {
  return <p className={cn("text-base", className)}>{children}</p>
}
