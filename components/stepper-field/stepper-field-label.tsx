"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import { cn } from "@/lib/utils"

type StepperFieldLabelProps = {
  htmlFor: string
  className?: string
  children?: React.ReactNode
}

export default function StepperFieldLabel({
  htmlFor,
  className,
  children,
  ...props
}: StepperFieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("cursor-pointer px-2 text-sm border-r mr-1", className)}
      {...props}
    >
      {children}
    </label>
  )
}
