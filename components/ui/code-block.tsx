import { highlightCode } from "@/lib/server-utils"
import { cn } from "@/lib/utils"

export default async function CodeBlock({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  if (!children) return null

  const highlightedCode = await highlightCode(children.toString())

  return (
    <div
      className={cn(
        "text-xs overflow-scroll rounded-sm bg-[#1b1e28] p-3",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  )
}
