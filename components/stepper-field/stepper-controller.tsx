import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import clsx from "clsx"

type StepperControllerProps = {
  direction: string
  children: any
}

const StepperValue = ({ direction, children }: StepperControllerProps) => {
  const { minNum, maxNum, stepValue, handleStep } = useStepperFieldContext()
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const shiftKeyHeld = e.shiftKey
    handleStep(direction, shiftKeyHeld)
    e.preventDefault()
  }

  const isDisabled = () => {
    if (
      direction === "down" &&
      (minNum || minNum === 0) &&
      +stepValue <= minNum
    ) {
      return true
    } else if (direction === "up" && maxNum && +stepValue >= maxNum) {
      return true
    } else {
      return false
    }
  }

  const divClass = clsx(
    "px-1 py-1 rounded-md",
    isDisabled() &&
      "opacity-20 focus:outline focus:outline-2 focus:outline-gray-600",
    !isDisabled() &&
      "group hover:bg-blue-100 hover:cursor-pointer focus:outline focus:outline-2 focus:outline-blue-200",
  )

  return (
    <div onMouseDown={handleClick} className={divClass}>
      {children}
    </div>
  )
}

export default StepperValue
