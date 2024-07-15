import { cn } from "@/lib/utils"

export default function Code({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <code
      className={cn("font-mono p-0.5 text-sm bg-[#D2F8F0] text-[#0B6E58]")}
      {...props}
    >
      {children}
    </code>
  )
}
