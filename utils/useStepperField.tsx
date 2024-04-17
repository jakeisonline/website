import { useState } from "react"

const useStepperInputField = (startNum: number) => {
  const [stepValue, setStepValue] = useState<number>(startNum)

  const handleStep = (direction: string) => {
    let newValue: number
    if (direction === "up") {
      newValue = stepValue + 1
      setStepValue(newValue)
    } else if (direction === "down") {
      newValue = stepValue - 1
      setStepValue(newValue)
    }
  }

  return { stepValue, handleStep }
}

export default useStepperInputField
