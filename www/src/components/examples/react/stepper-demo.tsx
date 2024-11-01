import * as React from "react"

import {
  Stepper,
  StepperButton,
  StepperInput,
  StepperLabel,
} from "@/registry/ui/stepper"

export default function StepperDemo() {
  return (
    <Stepper start={0}>
      <StepperLabel htmlFor="stepper">Quantity</StepperLabel>
      <StepperButton direction="down">-</StepperButton>
      <StepperInput id="stepper" />
      <StepperButton direction="up">+</StepperButton>
    </Stepper>
  )
}
