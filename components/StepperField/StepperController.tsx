import classNames from "classnames"
import clsx from "clsx"

interface StepperControllerProps {
  direction: string
  handleStep: (direction: string) => void
  stepValue: number
  minValue?: number | null
  maxValue?: number | null
  children: any
}

const StepperValue = ({
  direction,
  handleStep,
  stepValue,
  minValue,
  maxValue,
  children,
}: StepperControllerProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    handleStep(direction)
    e.preventDefault()
  }

  const isDisabled = () => {
    if ((minValue || minValue === 0) && stepValue <= minValue) {
      return true
    } else if (maxValue && stepValue >= maxValue) {
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
