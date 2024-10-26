import { cn } from "@/lib/utils"
import { forwardRef, useState, type HTMLInputTypeAttribute } from "react"

interface CellsProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLDivElement, CellsProps>(
  ({ className, children, ...props }, ref) => {
    return <div className={cn("", className)}>{children}</div>
  },
)
Cells.displayName = "Cells"

interface CellRowProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
}

export const CellRow = forwardRef<HTMLDivElement, CellRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-row", className)} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
CellRow.displayName = "CellRow"

interface CellProps extends React.ComponentPropsWithoutRef<"div"> {
  type?: HTMLInputTypeAttribute
  name: string
  label: string
  className?: string
  initialValue?: string
}

export const Cell = forwardRef<HTMLInputElement, CellProps>(
  ({ type = "text", name, label, className, initialValue, ...props }, ref) => {
    const [value, setValue] = useState<string | undefined>(initialValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return (
      <>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={cn("px-2 py-1 w-20", className)}
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
        />
      </>
    )
  },
)
Cell.displayName = "Cell"
