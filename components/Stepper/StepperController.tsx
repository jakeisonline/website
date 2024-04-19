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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    handleStep(direction)
    e.preventDefault()
  }

  const shouldDisable = () => {
    if ((minValue || minValue === 0) && stepValue <= minValue) {
      return true
    } else if (maxValue && stepValue >= maxValue) {
      return true
    } else {
      return false
    }
  }

  return (
    <button
      onMouseDown={handleClick}
      className={
        shouldDisable()
          ? "px-1 py-1 rounded-md opacity-20"
          : "px-1 py-1 rounded-md group hover:bg-blue-100 hover:cursor-pointer"
      }
    >
      {children}
    </button>
  )
}

export default StepperValue
