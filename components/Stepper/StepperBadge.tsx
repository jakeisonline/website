interface StepperBadgeProps {
  hideBadge?: boolean
  hideBadgeNum?: number
  stepValue: number
  collapses?: boolean
}

const StepperBadge = ({
  hideBadge,
  hideBadgeNum,
  stepValue,
  collapses,
}: StepperBadgeProps) => {
  if (!collapses || hideBadge || stepValue == hideBadgeNum) return

  return (
    <div className="py-0 px-1.5 absolute -top-2 -right-2.5 text-xs bg-blue-700 text-blue-100 rounded-full">
      {stepValue}
    </div>
  )
}

export default StepperBadge
