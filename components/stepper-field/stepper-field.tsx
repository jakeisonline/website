"use client"

import { useRef } from "react"
import StepperFieldContextProvider from "@/contexts/stepper-field-context-provider"
import { cn } from "@/lib/utils"

interface StepperFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  start: number
  min?: number
  max?: number
  step?: number
  shift?: number
  className?: string
  children?: React.ReactNode
}

export default function StepperField({
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
