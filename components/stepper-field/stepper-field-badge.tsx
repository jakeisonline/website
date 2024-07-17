"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"

export default function StepperFieldBadge({
  hideWhen = 0,
}: {
  hideWhen?: number
}) {
  const { value } = useStepperFieldContext()
  if (value == hideWhen) return

  return (
    <div className="group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-primary text-background rounded-full text-2xs font-medium">
      {value}
    </div>
  )
}
