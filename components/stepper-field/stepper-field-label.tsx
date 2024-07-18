import { cn } from "@/lib/utils"
import clsx from "clsx"

type StepperFieldLabelProps = {
  className?: string
  children?: React.ReactNode
}

export default function StepperFieldLabel({
  className,
  children,
  ...props
}: StepperFieldLabelProps) {
  const labelClass = clsx("cursor-pointer px-2 text-sm border-r mr-1")

  return (
    <label className={cn(labelClass, className)} {...props}>
      {children}
    </label>
  )
}
