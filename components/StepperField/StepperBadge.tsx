interface StepperBadgeProps {
  hideBadge?: boolean
  hideBadgeNum?: number
  stepValue: number
  collapsible?: boolean
}

const StepperBadge = ({
  hideBadge,
  hideBadgeNum,
  stepValue,
  collapsible,
}: StepperBadgeProps) => {
  if (!collapsible || hideBadge || stepValue == hideBadgeNum) return

  return (
    <div className="group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-blue-700 text-blue-100 rounded-full text-2xs font-medium">
      {stepValue}
    </div>
  )
}

export default StepperBadge
