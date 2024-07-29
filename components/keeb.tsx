import { cn } from "@/lib/utils"

export default function Keeb({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "min-h-[30px] inline-flex justify-center items-center py-1 px-1.5 bg-page border border-gray-150 font-mono text-xs rounded-sm border-b-4 transition-border duration-100 ease-in-out hover:cursor-pointer active:border-b hover:border-primary/30",
        className,
      )}
    >
      {children}
    </span>
  )
}
