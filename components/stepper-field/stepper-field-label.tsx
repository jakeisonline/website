import clsx from "clsx"

type StepperFieldLabelProps = {
  fieldId?: string
  fieldLabel?: string
  fieldLabelReader?: string
  collapsible?: boolean | false
}

const StepperFieldLabel = ({
  fieldId,
  fieldLabel,
  fieldLabelReader,
  collapsible,
}: StepperFieldLabelProps) => {
  const ariaLabel = fieldLabelReader ? fieldLabelReader : fieldLabel

  const labelClass = clsx(
    "cursor-pointer pl-1.5 text-sm",
    // TODO: collapsed should have a border when expanded
    collapsible && "pr-1.5",
    !collapsible && "pr-2 mr-1 border-r",
    !fieldLabel && "sr-only",
  )

  return (
    <label htmlFor={fieldId} aria-label={ariaLabel} className={labelClass}>
      {fieldLabel}
    </label>
  )
}

export default StepperFieldLabel
