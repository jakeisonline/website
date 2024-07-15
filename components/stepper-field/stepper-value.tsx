import useStepperFieldContext from "@/hooks/use-stepper-field-context"

type StepperValueProps = {
  fieldId?: string
  fieldName?: string
  fieldLabelReader?: string
}

const StepperValue = ({
  fieldId,
  fieldName,
  fieldLabelReader,
}: StepperValueProps) => {
  const {
    minNum,
    maxNum,
    stepValue,
    handleChange,
    handleKeyDown,
    handleBlur,
    inputRef,
  } = useStepperFieldContext()

  return (
    <input
      type="number"
      id={fieldId}
      name={fieldName}
      value={stepValue}
      ref={inputRef}
      min={minNum}
      max={maxNum}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-label={fieldLabelReader}
      style={{ width: String(stepValue).length + "ch" }}
      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-4 text-center  focus:border-0 focus:outline-none cursor-pointer text-sm"
    />
  )
}

export default StepperValue
