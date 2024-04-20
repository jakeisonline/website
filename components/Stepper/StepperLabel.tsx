interface StepperLabelProps {
  fieldName?: string
  labelValue?: string
}

const StepperLabel = ({ fieldName, labelValue }: StepperLabelProps) => {
  if (!fieldName) return null

  return (
    <label
      htmlFor={fieldName}
      className="cursor-pointer text-gray-800 pl-1.5 pr-2 border-r"
    >
      {labelValue}
    </label>
  )
}

export default StepperLabel
