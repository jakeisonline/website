"use client"

import StepperFieldContextProvider from "@/contexts/stepper-field-context-provider"
import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface StepperFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  start: number
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

  // Handles focus when users click the field's chrome but not neccessarily the input
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

interface StepperControllerProps extends React.ComponentPropsWithoutRef<"div"> {
  direction: string
  className?: string
  children: any
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

export function StepperFieldController({
  direction,
  className,
  children,
  ...props
}: StepperControllerProps) {
  const { min, max, value, handleStep } = useStepperFieldContext()
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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
    "rounded-md w-6 h-6 flex items-center justify-center",
    isDisabled() &&
      "opacity-40 focus:outline focus:outline-2 focus:outline-muted",
    !isDisabled() &&
      "group hover:bg-accent hover:cursor-pointer focus:outline focus:outline-2 focus:outline-primary",
    className,
  )

  return (
    <div onMouseDown={handleClick} className={divClass} {...props}>
      {children}
    </div>
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
