"use client"

import { cn } from "@/lib/utils"
import { createContext, forwardRef, useContext, useRef, useState } from "react"

interface StepperProps extends React.ComponentPropsWithoutRef<"div"> {
  start?: number
  min?: number
  max?: number
  step?: number
  shift?: number
  className?: string
  children?: React.ReactNode
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ start, min, max, step, shift, children, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Handles focus when users click the field's chrome but not necessarily the input
    const handleFocus = (e: React.PointerEvent<HTMLInputElement>) => {
      if (e.screenX !== 0 && e.screenY !== 0) {
        inputRef.current?.focus()
        // Don't prevent default if the user is clicking on the input, as that may mess with
        // things like highlighting text within the input
        if (!(e.target as HTMLInputElement).matches("input")) e.preventDefault()
      }
    }

    return (
      <StepperContextProvider
        min={min}
        max={max}
        start={start}
        step={step}
        shift={shift}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
      >
        <div
          onPointerDown={handleFocus}
          className={cn(
            "group focus-within:border-primary relative flex flex-row items-center justify-center rounded-md border px-1 py-1 text-xs select-none focus-within:border-2 hover:cursor-pointer hover:border-2",
            className,
          )}
          {...props}
          ref={ref}
        >
          {children}
        </div>
      </StepperContextProvider>
    )
  },
)
Stepper.displayName = "Stepper"

interface StepperLabelProps extends React.ComponentPropsWithoutRef<"label"> {
  htmlFor: string
  className?: string
  children?: React.ReactNode
}

export const StepperLabel = forwardRef<HTMLLabelElement, StepperLabelProps>(
  ({ htmlFor, className, children, ...props }, ref) => {
    return (
      <label
        htmlFor={htmlFor}
        className={cn("mr-1 cursor-pointer border-r px-2 text-sm", className)}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    )
  },
)
StepperLabel.displayName = "StepperLabel"

interface StepperInputProps extends React.ComponentPropsWithoutRef<"input"> {
  id: string
  className?: string
}

export const StepperInput = forwardRef<HTMLInputElement, StepperInputProps>(
  ({ className, ...props }, ref) => {
    const {
      min,
      max,
      value,
      handleChange,
      handleKeyDown,
      handleBlur,
      inputRef,
    } = useStepperContext()

    const computedRef = ref ? ref : inputRef

    return (
      <input
        type="number"
        value={value}
        ref={computedRef}
        min={min}
        max={max}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: String(value).length + "ch", ...props.style }}
        className={cn(
          "min-w-4 cursor-pointer [appearance:textfield] bg-transparent text-center text-sm focus:border-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className,
        )}
        role="spinbutton"
        aria-valuenow={value ? value : undefined}
        aria-valuemin={min ? min : undefined}
        aria-valuemax={max ? max : undefined}
        {...props}
      />
    )
  },
)
StepperInput.displayName = "StepperInput"

interface StepperButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  direction: string
  className?: string
  children: React.ReactNode
}

export const StepperButton = forwardRef<HTMLButtonElement, StepperButtonProps>(
  ({ direction, className, children, ...props }, ref) => {
    const { min, max, value, handleStep } = useStepperContext()
    const handleClick = (e: React.PointerEvent<HTMLButtonElement>): void => {
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
      "group mx-0.5 flex h-6 w-6 items-center justify-center rounded-md",
      isDisabled() && "opacity-40",
      !isDisabled() && "hover:bg-accent hover:cursor-pointer",
      className,
    )

    return (
      <button
        onPointerDown={handleClick}
        className={divClass}
        /*
      "text field is usually the only focusable component because the increase and decrease functions are keyboard accessible via arrow keys"
      https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/
      */
        tabIndex={-1}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
StepperButton.displayName = "StepperButton"

interface StepperBadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  hideWhen?: number
  className?: string
}

export const StepperBadge = forwardRef<HTMLDivElement, StepperBadgeProps>(
  ({ hideWhen = 0, className, ...props }, ref) => {
    const { value } = useStepperContext()
    if (value == hideWhen) return

    return (
      <div
        className={cn(
          "bg-primary text-2xs text-background absolute -top-2 -right-2.5 rounded-full px-1.5 py-0 font-medium group-has-[:focus]:hidden",
          className,
        )}
        ref={ref}
        {...props}
      >
        {value}
      </div>
    )
  },
)
StepperBadge.displayName = "StepperBadge"
interface StepperContextType {
  value: number | ""
  handleStep: (direction: string, shiftStep?: boolean) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  start?: number
  inputRef?: React.RefObject<HTMLInputElement>
}

const StepperContext = createContext<StepperContextType>({
  value: 0,
  handleStep: () => {},
})

const useStepperContext = () => {
  const context = useContext(StepperContext)

  if (!context) {
    throw new Error(
      "useStepperContext must be used within a StepperContextProvider",
    )
  }

  return context
}

interface StepperContextProviderProps {
  min?: number
  max?: number
  start?: number
  step?: number
  shift?: number
  inputRef: React.RefObject<HTMLInputElement>
  children: React.ReactElement
}

const StepperContextProvider = ({
  min,
  max,
  start = 0,
  step = 1,
  shift,
  inputRef,
  children,
}: StepperContextProviderProps) => {
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
    if (!isNaN(newValue)) {
      setValueWithinRange(newValue)
    }
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
    <StepperContext.Provider
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
    </StepperContext.Provider>
  )
}
