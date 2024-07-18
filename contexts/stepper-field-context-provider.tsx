"use client"

import { RefObject, createContext, useContext, useState } from "react"

export type StepperFieldContextType = {
  value: number | ""
  handleStep: (direction: string, shiftStep?: boolean) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  start?: number
  inputRef?: RefObject<HTMLInputElement>
}

export const StepperFieldContext = createContext<StepperFieldContextType>({
  value: 0,
  handleStep: () => {},
})

type StepperFieldContextProviderProps = {
  min?: number
  max?: number
  start?: number
  step?: number
  shift?: number
  inputRef: RefObject<HTMLInputElement>
  children: React.ReactElement
}

export default function StepperFieldContextProvider({
  min,
  max,
  start = 0,
  step = 1,
  shift,
  inputRef,
  children,
}: StepperFieldContextProviderProps) {
  const [value, setValue] = useState<number | "">(start)

  const handleStep = (direction: string, shiftStep?: boolean) => {
    let newValue: number
    if (direction === "up") {
      newValue = shiftStep && shift ? +value + shift : +value + step
      setValueWithinRange(newValue)
    } else if (direction === "down") {
      newValue = shiftStep && shift ? +value - shift : +value - step
      setValueWithinRange(newValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setValue("")
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
    }
    // User is using page up or page down to step
    else if (e.code == "PageUp") {
      handleStep("up", true)
      e.preventDefault()
    } else if (e.code == "PageDown") {
      handleStep("down", true)
      e.preventDefault()
    }
    // User is pressing home or end within the stepper field
    else if (e.code == "Home") {
      setValueToMin()
      e.preventDefault()
    } else if (e.code == "End") {
      setValueToMax()
      e.preventDefault()
    }
    // User is pressing enter within the stepper field
    else if (e.code == "Enter") {
      setValueWithinRange(value)
      e.preventDefault()
    }
    return
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValueWithinRange(+e.target.value)
  }

  const setValueToStart = () => {
    setValue(start)
  }

  const setValueToMax = () => {
    if (typeof max === "number") setValue(max)
  }

  const setValueToMin = () => {
    if (typeof min === "number") setValue(min)
  }

  const setValueWithinRange = (value: number | "") => {
    if (!value) return setValueToStart()
    if (isBelowMin(value)) return setValueToMin()
    if (isAboveMax(value)) return setValueToMax()

    return setValue(value)
  }

  const isBelowMin = (value: number) => {
    return (min || min === 0) && value < min
  }

  const isAboveMax = (value: number) => {
    return max && value > max
  }

  return (
    <StepperFieldContext.Provider
      value={{
        value,
        handleStep,
        handleChange,
        handleKeyDown,
        handleBlur,
        min,
        max,
        start,
        inputRef,
      }}
    >
      {children}
    </StepperFieldContext.Provider>
  )
}
