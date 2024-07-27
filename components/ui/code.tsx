import { cn } from "@/lib/utils"
import React from "react"

export default function Code({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode
}) {
  return (
    <code
      className={cn(
        "font-mono p-0.5 text-xs bg-code text-code-foreground rounded break-all md:break-normal",
      )}
      {...props}
    >
      {children}
    </code>
  )
}
