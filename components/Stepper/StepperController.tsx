interface StepperControllerProps {
  direction: string
  handleStep: (direction: string) => void
  children: any
}

const StepperValue = ({
  direction,
  handleStep,
  children,
}: StepperControllerProps) => {
  const handleClick = () => {
    handleStep(direction)
  }

  return (
    <div
      onClick={handleClick}
      className="px-1 py-1 rounded-md group hover:bg-blue-100 hover:cursor-pointer"
    >
      {children}
    </div>
  )
}

export default StepperValue
