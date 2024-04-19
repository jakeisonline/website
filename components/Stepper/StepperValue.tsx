import { RefObject } from "react"

interface StepperValueProps {
  stepValue: number
  inputRef: RefObject<HTMLInputElement> // input ref for parent component handling
}

const StepperValue = ({ stepValue, inputRef }: StepperValueProps) => {
  return (
    <input
      type="text"
      ref={inputRef}
      value={stepValue}
      style={{ width: String(stepValue).length + "ch" }}
      className="min-w-4 text-xs text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent cursor-pointer"
      readOnly
    />
  )
}

export default StepperValue
