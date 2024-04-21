interface StepperLabelProps {
  fieldId?: string
  fieldLabel?: string
  fieldLabelReader?: string
  collapses?: boolean | false
}

const StepperLabel = ({
  fieldId,
  fieldLabel,
  fieldLabelReader,
  collapses,
}: StepperLabelProps) => {
  if (!fieldId) return null

  return (
    <label
      htmlFor={fieldId}
      className={
        "cursor-pointer text-gray-800 pl-1.5 " +
        (collapses ? "pr-1.5" : "pr-2 border-r")
      }
    >
      {fieldLabel}
    </label>
  )
}

export default StepperLabel
