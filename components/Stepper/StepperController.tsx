interface StepperControllerProps {
  direction: string
  handleStep: (direction: string) => void
  stepValue: number
  minValue?: number | null
  maxValue?: number | null
  setFocus: (arg0: boolean) => void
  children: any
}

const StepperValue = ({
  direction,
  handleStep,
  stepValue,
  minValue,
  maxValue,
  setFocus,
  children,
}: StepperControllerProps) => {
  const handleClick = () => {
    setFocus(true)
    handleStep(direction)
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
    <div
      onMouseDown={handleClick}
      className={
        shouldDisable()
          ? "px-1 py-1 rounded-md opacity-20"
          : "px-1 py-1 rounded-md group hover:bg-blue-100 hover:cursor-pointer"
      }
    >
      {children}
    </div>
  )
}

export default StepperValue
