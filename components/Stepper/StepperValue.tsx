import { RefObject } from "react"

interface StepperValueProps {
  stepValue: number
  minNum?: number
  maxNum?: number
  inputRef: RefObject<HTMLInputElement> // input ref for parent component handling
  handleStep: (direction: string) => void
  fieldName?: string
}

const StepperValue = ({
  stepValue,
  minNum,
  maxNum,
  inputRef,
  handleStep,
  fieldName,
}: StepperValueProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case "ArrowDown":
        handleStep("down")
        return
      case "ArrowUp":
        handleStep("up")
        return
    }
  }

  return (
    <input
      type="number"
      min={minNum}
      max={maxNum}
      name={fieldName}
      ref={inputRef}
      value={stepValue}
      onKeyDown={handleKeyDown}
      style={{ width: String(stepValue).length + "ch" }}
      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-4 text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent cursor-pointer"
      readOnly
    />
  )
}

export default StepperValue
