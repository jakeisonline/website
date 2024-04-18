interface StepperValueProps {
  stepValue: number
}

const StepperValue = ({ stepValue }: StepperValueProps) => {
  return <div className="text-xs text-gray-800 select-none">{stepValue}</div>
}

export default StepperValue
