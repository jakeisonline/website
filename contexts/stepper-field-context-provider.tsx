"use client"

import { RefObject, createContext, useContext, useState } from "react"

type StepperFieldContextType = {
  stepValue: number | ""
  handleStep: (direction: string) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  minNum?: number
  maxNum?: number
  startNum?: number
  inputRef?: RefObject<HTMLInputElement>
}

export const StepperFieldContext = createContext<StepperFieldContextType>({
  stepValue: 0,
  handleStep: () => {},
})

type StepperFieldContextProviderProps = {
  minNum?: number
  maxNum?: number
  startNum?: number
  stepSize?: number
  inputRef: RefObject<HTMLInputElement>
  children: React.ReactElement
}

export default function StepperFieldContextProvider({
  minNum = 0,
  maxNum = 100,
  startNum = 0,
  stepSize = 1,
  inputRef,
  children,
}: StepperFieldContextProviderProps) {
  const [stepValue, setStepValue] = useState<number | "">(startNum)

  const handleStep = (direction: string) => {
    let newValue: number
    if (direction === "up") {
      newValue = +stepValue + stepSize
      !isAboveMax(newValue) && setStepValue(newValue)
    } else if (direction === "down") {
      newValue = +stepValue - stepSize
      !isBelowMin(newValue) && setStepValue(newValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setStepValue("")
    const newValue = +e.target.value
    !isNaN(newValue) && setStepValue(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "ArrowDown" || e.code == "ArrowUp") {
      const stepDirection = e.code === "ArrowUp" ? "up" : "down"
      handleStep(stepDirection)
      e.preventDefault()
    } else if (e.code == "Enter") {
      e.preventDefault()
      setValueWithinRange(stepValue.toString())
    }
    return
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValueWithinRange(e.target.value)
  }

  const setValueToStart = () => {
    setStepValue(startNum)
  }

  const setValueToMax = () => {
    setStepValue(maxNum)
  }

  const setValueToMin = () => {
    setStepValue(minNum)
  }

  const setValueWithinRange = (value: string) => {
    if (!value) return setValueToStart()
    if (isBelowMin(+value)) return setValueToMin()
    if (isAboveMax(+value)) return setValueToMax()
  }

  const isBelowMin = (value: number) => {
    return (minNum || minNum === 0) && value < minNum
  }

  const isAboveMax = (value: number) => {
    return maxNum && value > maxNum
  }

  return (
    <StepperFieldContext.Provider
      value={{
        stepValue,
        handleStep,
        handleChange,
        handleKeyDown,
        handleBlur,
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
