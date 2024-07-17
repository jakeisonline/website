"use client"

import useStepperFieldContext from "@/hooks/use-stepper-field-context"
import clsx from "clsx"

type StepperControllerProps = {
  direction: string
  children: any
}

export default function StepperFieldController({
  direction,
  children,
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

  const divClass = clsx(
    "px-1 py-1 rounded-md",
    isDisabled() &&
      "opacity-40 focus:outline focus:outline-2 focus:outline-muted",
    !isDisabled() &&
      "group hover:bg-accent hover:cursor-pointer focus:outline focus:outline-2 focus:outline-primary",
  )

  return (
    <div onMouseDown={handleClick} className={divClass}>
      {children}
    </div>
  )
}
