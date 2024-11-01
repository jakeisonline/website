import * as React from "react"

import {
  StepperField,
  StepperFieldButton,
  StepperFieldInput,
  StepperFieldLabel,
} from "@/registry/ui/stepper"

export default function StepperShift() {
  return (
    <StepperField min={0} shift={10} max={100}>
      <StepperFieldLabel htmlFor="shift">Quantity</StepperFieldLabel>
      <StepperFieldButton direction="down">-</StepperFieldButton>
      <StepperFieldInput id="shift" />
      <StepperFieldButton direction="up">+</StepperFieldButton>
    </StepperField>
  )
}
