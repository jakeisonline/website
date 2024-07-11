"use client"

import { RefObject, createContext, useContext, useState } from "react"

type StepperFieldContextType = {
  stepValue: number
  handleStep: (direction: string) => void
  minNum?: number
  maxNum?: number
  inputRef?: RefObject<HTMLInputElement>
  startNum?: number
}

export const StepperFieldContext = createContext<StepperFieldContextType>({
  stepValue: 0,
  handleStep: () => {},
})

type StepperFieldContextProviderProps = {
  minNum?: number
  maxNum?: number
  startNum?: number
  inputRef: RefObject<HTMLInputElement>
  children: React.ReactElement
}

export default function StepperFieldContextProvider({
  minNum = 0,
  maxNum = 100,
  startNum = 0,
  inputRef,
  children,
}: StepperFieldContextProviderProps) {
  const [stepValue, setStepValue] = useState<number>(startNum)

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

  return (
    <StepperFieldContext.Provider
      value={{
        stepValue,
        handleStep,
        minNum,
        maxNum,
        startNum,
        inputRef,
      }}
    >
      {children}
    </StepperFieldContext.Provider>
  )
}
