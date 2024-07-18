import { cn } from "@/lib/utils"

export default function Code({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <code
      className={cn(
        "font-mono p-0.5 text-xs bg-code text-code-foreground rounded",
      )}
      {...props}
    >
      {children}
    </code>
  )
}
