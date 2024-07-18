"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import { cn } from "@/lib/utils"

type StepperFieldInputProps = {
  className?: string
}

export default function StepperFieldInput({
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
      {...props}
    />
  )
}
