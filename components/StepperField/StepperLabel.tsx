import clsx from "clsx"

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
  const ariaLabel = fieldLabelReader ? fieldLabelReader : fieldLabel

  const labelClass = clsx(
    "cursor-pointer text-gray-800 pl-1.5",
    collapses && "pr-1.5",
    !collapses && "pr-2 border-r",
    !fieldLabel && "sr-only",
  )

  return (
    <label htmlFor={fieldId} aria-label={ariaLabel} className={labelClass}>
      {fieldLabel}
    </label>
  )
}

export default StepperLabel
