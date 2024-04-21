import classNames from "classnames"

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

  const labelClass = classNames({
    "cursor-pointer text-gray-800 pl-1.5": true,
    "pr-1.5": collapses,
    "pr-2 border-r": !collapses,
    "sr-only": fieldLabel,
  })

  return (
    <label htmlFor={fieldId} aria-label={ariaLabel} className={labelClass}>
      {fieldLabel}
    </label>
  )
}

export default StepperLabel
