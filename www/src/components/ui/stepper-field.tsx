import * as React from "react"
import { cn } from "@/lib/utils"
import { createContext, forwardRef, useContext, useRef, useState } from "react"

interface StepperFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  start?: number
  min?: number
  max?: number
  step?: number
  shift?: number
  className?: string
  children?: React.ReactNode
}

export const StepperField = forwardRef<HTMLDivElement, StepperFieldProps>(
  ({ start, min, max, step, shift, children, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Handles focus when users click the field's chrome but not necessarily the input
    const handleFocus = (e: React.PointerEvent<HTMLInputElement>) => {
      if (e.screenX !== 0 && e.screenY !== 0) {
        inputRef.current && inputRef.current.focus()
        // Don't prevent default if the user is clicking on the input, as that may mess with
        // things like highlighting text within the input
        if (!(e.target as HTMLInputElement).matches("input")) e.preventDefault()
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
          onPointerDown={handleFocus}
          className={cn(
            "has-[:focus]:inner-border-primary has-[:focus]:inner-border-2 hover:cursor-pointer hover:inner-border-2 px-1 py-1 inner-border rounded-md select-none text-xs flex flex-row items-center relative group justify-center",
            className,
          )}
          {...props}
          ref={ref}
        >
          {children}
        </div>
      </StepperFieldContextProvider>
    )
  },
)
StepperField.displayName = "StepperField"

interface StepperFieldLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
  htmlFor: string
  className?: string
  children?: React.ReactNode
}

export const StepperFieldLabel = forwardRef<
  HTMLLabelElement,
  StepperFieldLabelProps
>(({ htmlFor, className, children, ...props }, ref) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("cursor-pointer px-2 text-sm border-r mr-1", className)}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
})
StepperFieldLabel.displayName = "StepperFieldLabel"

interface StepperFieldInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  id: string
  className?: string
}

export const StepperFieldInput = forwardRef<
  HTMLInputElement,
  StepperFieldInputProps
>(({ className, ...props }, ref) => {
  const { min, max, value, handleChange, handleKeyDown, handleBlur, inputRef } =
    useStepperFieldContext()

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
})
StepperFieldInput.displayName = "StepperFieldInput"

interface StepperFieldButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  direction: string
  className?: string
  children: any
}

export const StepperFieldButton = forwardRef<
  HTMLButtonElement,
  StepperFieldButtonProps
>(({ direction, className, children, ...props }, ref) => {
  const { min, max, value, handleStep } = useStepperFieldContext()
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
    "group rounded-md w-6 h-6 flex items-center justify-center mx-0.5",
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
})
StepperFieldButton.displayName = "StepperFieldButton"

interface StepperFieldBadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  hideWhen?: number
  className?: string
}

export const StepperFieldBadge = forwardRef<
  HTMLDivElement,
  StepperFieldBadgeProps
>(({ hideWhen = 0, className, ...props }, ref) => {
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
})
StepperFieldBadge.displayName = "StepperFieldBadge"
interface StepperFieldContextType {
  value: number | ""
  handleStep: (direction: string, shiftStep?: boolean) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  start?: number
  inputRef?: any
}

const StepperFieldContext = createContext<StepperFieldContextType>({
  value: 0,
  handleStep: () => {},
})

const useStepperFieldContext = () => {
  const context = useContext(StepperFieldContext)

  if (!context) {
    throw new Error(
      "useStepperFieldContext must be used within a StepperFieldContextProvider",
    )
  }

  return context
}

interface StepperFieldContextProviderProps {
  min?: number
  max?: number
  start?: number
  step?: number
  shift?: number
  inputRef: any
  children: React.ReactElement
}

const StepperFieldContextProvider = ({
  min,
  max,
  start = 0,
  step = 1,
  shift,
  inputRef,
  children,
}: StepperFieldContextProviderProps) => {
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
