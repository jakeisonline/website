import { RefObject } from "react"

interface StepperValueProps {
  stepValue: number
  minNum?: number
  maxNum?: number
  inputRef: RefObject<HTMLInputElement> // input ref for parent component handling
  handleStep: (direction: string) => void
  fieldId?: string
  fieldName?: string
  fieldLabelReader?: string
}

const StepperValue = ({
  stepValue,
  minNum,
  maxNum,
  inputRef,
  handleStep,
  fieldId,
  fieldName,
  fieldLabelReader,
}: StepperValueProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "ArrowDown" && e.code !== "ArrowUp") return
    const stepDirection = e.code === "ArrowUp" ? "up" : "down"
    handleStep(stepDirection)
    e.preventDefault()
  }

  return (
    <input
      type="number"
      min={minNum}
      max={maxNum}
      id={fieldId}
      name={fieldName}
      ref={inputRef}
      value={stepValue}
      onKeyDown={handleKeyDown}
      aria-label={fieldLabelReader}
      style={{ width: String(stepValue).length + "ch" }}
      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 min-w-4 text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent cursor-pointer"
      readOnly
    />
  )
}

export default StepperValue
