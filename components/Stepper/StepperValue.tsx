import { RefObject } from "react"

interface StepperValueProps {
  stepValue: number
  inputRef: RefObject<HTMLInputElement> // input ref for parent component handling
  setFocus: (arg0: boolean) => void
}

const StepperValue = ({ stepValue, inputRef, setFocus }: StepperValueProps) => {
  const handleBlur = () => {
    setFocus(false)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <input
      type="text"
      ref={inputRef}
      value={stepValue}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={{ width: String(stepValue).length + "ch" }}
      className="min-w-4 text-xs text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent cursor-pointer"
      readOnly
    />
  )
}

export default StepperValue
