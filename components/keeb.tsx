import { cn } from "@/lib/utils"

export default function Keeb({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "min-h-[30px] inline-flex justify-center items-center py-1 px-1.5 bg-page border border-gray-300 font-mono text-xs rounded-sm border-b-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
