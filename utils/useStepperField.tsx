import { useState } from "react"

const useStepperInputField = (
  startNum: number,
  minNum?: number | null,
  maxNum?: number | null,
) => {
  const [stepValue, setStepValue] = useState<number>(startNum)
  const [hasFocus, setFocus] = useState<boolean>(false)

  const handleStep = (direction: string) => {
    let newValue: number
    if (direction === "up") {
      if (maxNum && stepValue >= maxNum) return
      newValue = stepValue + 1
      setStepValue(newValue)
    } else if (direction === "down") {
      if ((minNum || minNum === 0) && stepValue <= minNum) return
      newValue = stepValue - 1
      setStepValue(newValue)
    }
  }

  return { stepValue, handleStep, hasFocus, setFocus }
}

export default useStepperInputField
