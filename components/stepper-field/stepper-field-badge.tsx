import useStepperFieldContext from "@/hooks/use-stepper-field-context"

type StepperFieldBadgeProps = {
  hideBadge?: boolean
  hideBadgeNum?: number
  collapsible?: boolean
}

export default function StepperFieldBadge({
  hideBadge,
  hideBadgeNum,
  collapsible,
}: StepperFieldBadgeProps) {
  const { value } = useStepperFieldContext()
  if (!collapsible || hideBadge || value == hideBadgeNum) return

  return (
    <div className="group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-primary text-background rounded-full text-2xs font-medium">
      {value}
    </div>
  )
}
