import * as React from "react"

import {
  Stepper,
  StepperButton,
  StepperInput,
  StepperLabel,
} from "@/registry/ui/stepper"

export default function StepperShift() {
  return (
    <Stepper min={0} shift={10} max={100}>
      <StepperLabel htmlFor="shift">Quantity</StepperLabel>
      <StepperButton direction="down">-</StepperButton>
      <StepperInput id="shift" />
      <StepperButton direction="up">+</StepperButton>
    </Stepper>
  )
}
