interface StepperValueProps {
  stepValue: number
}

const StepperValue = ({ stepValue }: StepperValueProps) => {
  return (
    <div className="min-w-4">
      <input
        type="text"
        value={stepValue}
        style={{ width: String(stepValue).length + "ch" }}
        className="text-xs text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent"
        readOnly
      />
    </div>
  )
}

export default StepperValue
