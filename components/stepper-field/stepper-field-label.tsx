import { cn } from "@/lib/utils"
import clsx from "clsx"

type StepperFieldLabelProps = {
  collapsible?: boolean | false
  className?: string
  children?: React.ReactNode
}

export default function StepperFieldLabel({
  collapsible = false,
  className,
  children,
  ...props
}: StepperFieldLabelProps) {
  const labelClass = clsx(
    "cursor-pointer pl-1.5 text-sm",
    // TODO: collapsed should have a border when expanded
    collapsible && "pr-1.5",
    !collapsible && "pr-2 mr-1 border-r",
  )

  return (
    <label {...props} className={cn(labelClass, className)}>
      {children}
    </label>
  )
}
