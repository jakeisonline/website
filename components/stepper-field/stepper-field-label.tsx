"use client"

import { cn } from "@/lib/utils"

interface StepperFieldLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
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
