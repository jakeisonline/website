import { StepperFieldContext } from "@/contexts/stepper-field-context-provider"
import { useContext } from "react"

export default function useStepperFieldContext() {
  const context = useContext(StepperFieldContext)

  if (!context) {
    throw new Error(
      "useStepperFieldContext must be used within a StepperFieldContextProvider",
    )
  }

  return context
}

// import { useState } from "react"

// const useStepperInputField = (
//   startNum: number,
//   minNum?: number | null,
//   maxNum?: number | null,
// ) => {
//   const [stepValue, setStepValue] = useState<number>(startNum)

//   const handleStep = (direction: string) => {
//     let newValue: number
//     if (direction === "up") {
//       if (maxNum && stepValue >= maxNum) return
//       newValue = stepValue + 1
//       setStepValue(newValue)
//     } else if (direction === "down") {
//       if ((minNum || minNum === 0) && stepValue <= minNum) return
//       newValue = stepValue - 1
//       setStepValue(newValue)
//     }
//   }

//   return { stepValue, handleStep }
// }

// export default useStepperInputField
