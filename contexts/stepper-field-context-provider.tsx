"use client"

import { RefObject, createContext, useContext, useState } from "react"

type StepperFieldContextType = {
  stepValue: number | ""
  handleStep: (direction: string, shiftStep?: boolean) => void
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
  stepShiftSize?: number
  inputRef: RefObject<HTMLInputElement>
  children: React.ReactElement
}

export default function StepperFieldContextProvider({
  minNum,
  maxNum,
  startNum = 0,
  stepSize = 1,
  stepShiftSize,
  inputRef,
  children,
}: StepperFieldContextProviderProps) {
  const [stepValue, setStepValue] = useState<number | "">(startNum)

  console.log("minNum", minNum)

  const handleStep = (direction: string, shiftStep?: boolean) => {
    let newValue: number
    if (direction === "up") {
      newValue =
        shiftStep && stepShiftSize
          ? +stepValue + stepShiftSize
          : +stepValue + stepSize
      setValueWithinRange(newValue)
    } else if (direction === "down") {
      newValue =
        shiftStep && stepShiftSize
          ? +stepValue - stepShiftSize
          : +stepValue - stepSize
      setValueWithinRange(newValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setStepValue("")
    const newValue = +e.target.value
    !isNaN(newValue) && setValueWithinRange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const shiftKeyHeld = e.shiftKey
    // User is using arrow keys to step, and may or may not be holding shift key
    if (e.code == "ArrowDown" || e.code == "ArrowUp") {
      const stepDirection = e.code === "ArrowUp" ? "up" : "down"
      handleStep(stepDirection, shiftKeyHeld)
      e.preventDefault()
      // User is pressing home or end within the stepper field
    } else if (e.code == "Home") {
      setValueToMin()
      e.preventDefault()
    } else if (e.code == "End") {
      setValueToMax()
      e.preventDefault()
    }
    // User is pressing enter within the stepper field
    else if (e.code == "Enter") {
      setValueWithinRange(stepValue)
      e.preventDefault()
    }
    return
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValueWithinRange(+e.target.value)
  }

  const setValueToStart = () => {
    setStepValue(startNum)
  }

  const setValueToMax = () => {
    if (maxNum) setStepValue(maxNum)
  }

  const setValueToMin = () => {
    if (minNum) setStepValue(minNum)
  }

  const setValueWithinRange = (value: number | "") => {
    if (!value) return setValueToStart()
    if (isBelowMin(value)) return setValueToMin()
    if (isAboveMax(value)) return setValueToMax()

    return setStepValue(value)
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
