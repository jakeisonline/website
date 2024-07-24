"use client"

import { cn } from "@/lib/utils"
import { createContext, RefObject, useContext, useRef, useState } from "react"

interface StepperFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  start?: number
  min?: number
  max?: number
  step?: number
  shift?: number
  className?: string
  children?: React.ReactNode
}

export function StepperField({
  start,
  min,
  max,
  step,
  shift,
  children,
  className,
  ...props
}: StepperFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Handles focus when users click the field's chrome but not necessarily the input
  const handleFocus = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.screenX !== 0 && e.screenY !== 0) {
      inputRef.current && inputRef.current.focus()
      e.preventDefault()
    }
  }

  return (
    <StepperFieldContextProvider
      min={min}
      max={max}
      start={start}
      step={step}
      shift={shift}
      inputRef={inputRef}
    >
      <div
        onMouseUp={handleFocus}
        className={cn(
          "has-[:focus]:inner-border-primary has-[:focus]:inner-border-2 hover:cursor-pointer hover:inner-border-2 px-1 py-1 inner-border rounded-md select-none text-xs flex flex-row items-center relative group justify-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperFieldContextProvider>
  )
}

interface StepperFieldLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
  htmlFor: string
  className?: string
  children?: React.ReactNode
}

export function StepperFieldLabel({
  htmlFor,
  className,
  children,
  ...props
}: StepperFieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("cursor-pointer px-2 text-sm border-r mr-1", className)}
      {...props}
    >
      {children}
    </label>
  )
}

interface StepperFieldInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  id: string
  className?: string
}

export function StepperFieldInput({
  className,
  ...props
}: StepperFieldInputProps) {
  const { min, max, value, handleChange, handleKeyDown, handleBlur, inputRef } =
    useStepperFieldContext()

  return (
    <input
      type="number"
      value={value}
      ref={inputRef}
      min={min}
      max={max}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{ width: String(value).length + "ch" }}
      className={cn(
        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-4 text-center  focus:border-0 focus:outline-none cursor-pointer text-sm",
        className,
      )}
      role="spinbutton"
      aria-valuenow={value ? value : undefined}
      aria-valuemin={min ? min : undefined}
      aria-valuemax={max ? max : undefined}
      {...props}
    />
  )
}

interface StepperFieldButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  direction: string
  className?: string
  children: any
}

export function StepperFieldButton({
  direction,
  className,
  children,
  ...props
}: StepperFieldButtonProps) {
  const { min, max, value, handleStep } = useStepperFieldContext()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const shiftKeyHeld = e.shiftKey
    handleStep(direction, shiftKeyHeld)
    e.preventDefault()
  }

  const isDisabled = () => {
    if (direction === "down" && (min || min === 0) && +value <= min) {
      return true
    } else if (direction === "up" && max && +value >= max) {
      return true
    } else {
      return false
    }
  }

  const divClass = cn(
    "rounded-md w-6 h-6 flex items-center justify-center mx-0.5",
    isDisabled() &&
      "opacity-40 focus:outline focus:outline-2 focus:outline-muted",
    !isDisabled() &&
      "group hover:bg-accent hover:cursor-pointer focus:outline focus:outline-2 focus:outline-primary",
    className,
  )

  return (
    <button
      onMouseDown={handleClick}
      className={divClass}
      /*
      "text field is usually the only focusable component because the increase and decrease functions are keyboard accessible via arrow keys"
      https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/
      */
      tabIndex={-1}
      {...props}
    >
      {children}
    </button>
  )
}

interface StepperFieldBadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  hideWhen?: number
  className?: string
}

export function StepperFieldBadge({
  hideWhen = 0,
  className,
  ...props
}: StepperFieldBadgeProps) {
  const { value } = useStepperFieldContext()
  if (value == hideWhen) return

  return (
    <div
      className={cn(
        "group-has-[:focus]:hidden py-0 px-1.5 absolute -top-2 -right-2.5 bg-primary text-background rounded-full text-2xs font-medium",
        className,
      )}
      {...props}
    >
      {value}
    </div>
  )
}

function useStepperFieldContext() {
  const context = useContext(StepperFieldContext)

  if (!context) {
    throw new Error(
      "useStepperFieldContext must be used within a StepperFieldContextProvider",
    )
  }

  return context
}

interface StepperFieldContextType {
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

const StepperFieldContext = createContext<StepperFieldContextType>({
  value: 0,
  handleStep: () => {},
})

interface StepperFieldContextProviderProps {
  min?: number
  max?: number
  start?: number
  step?: number
  shift?: number
  inputRef: RefObject<HTMLInputElement>
  children: React.ReactElement
}

function StepperFieldContextProvider({
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
