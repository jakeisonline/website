"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import { cn } from "@/lib/utils"
import clsx from "clsx"

type StepperControllerProps = {
  direction: string
  className?: string
  children: any
}

export default function StepperFieldController({
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
