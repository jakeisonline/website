import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CellsProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLDivElement, CellsProps>(
  ({ className, children, ...props }, ref) => {
    return <div>{children}</div>
  },
)
Cells.displayName = "Cells"
