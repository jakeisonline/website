"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import { cn } from "@/lib/utils"

type StepperFieldBadgeProps = React.ComponentPropsWithoutRef<"div"> & {
  hideWhen?: number
  className?: string
}

export default function StepperFieldBadge({
  hideWhen = 0,
  className,
  ...props
}: StepperFieldBadgeProps) {
  const { value } = useStepperFieldContext()
  if (value == hideWhen) return

  return (
    <div
      className={cn(
        "group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-primary text-background rounded-full text-2xs font-medium",
        className,
      )}
      {...props}
    >
      {value}
    </div>
  )
}
