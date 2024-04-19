import { RefObject } from "react"

interface StepperValueProps {
  stepValue: number
  inputRef: RefObject<HTMLInputElement> // input ref for parent component handling
  handleStep: (direction: string) => void
}

const StepperValue = ({
  stepValue,
  handleStep,
  inputRef,
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
      type="text"
      ref={inputRef}
      value={stepValue}
      onKeyDown={handleKeyDown}
      style={{ width: String(stepValue).length + "ch" }}
      className="min-w-4 text-xs text-center text-gray-800 bg-white select-none focus:border-0 focus:outline-none caret-transparent cursor-pointer"
      readOnly
    />
  )
}

export default StepperValue
