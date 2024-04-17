interface StepperValueProps {
  stepperValue: number
}

const StepperValue = ({ stepperValue }: StepperValueProps) => {
  const handleClick = () => {}

  return <div className="text-xs text-gray-800 select-none">{stepperValue}</div>
}

export default StepperValue
