import * as React from "react"

import {
  Stepper,
  StepperButton,
  StepperInput,
  StepperLabel,
  StepperBadge,
} from "@/registry/ui/stepper"

export default function StepperCollapse() {
  return (
    <div className="flex gap-3">
      <Stepper min={0} start={0} shift={10} className="min-w-8">
        <StepperLabel
          htmlFor="small"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          S
        </StepperLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperButton direction="down">-</StepperButton>
          <StepperInput id="small" />
          <StepperButton direction="up">+</StepperButton>
        </div>
        <StepperBadge />
      </Stepper>
      <Stepper min={0} start={3} shift={10} className="min-w-8">
        <StepperLabel
          htmlFor="medium"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          M
        </StepperLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperButton direction="down">-</StepperButton>
          <StepperInput id="medium" />
          <StepperButton direction="up">+</StepperButton>
        </div>
        <StepperBadge />
      </Stepper>
      <Stepper min={0} start={0} shift={10} className="min-w-8">
        <StepperLabel
          htmlFor="large"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          L
        </StepperLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperButton direction="down">-</StepperButton>
          <StepperInput id="large" />
          <StepperButton direction="up">+</StepperButton>
        </div>
        <StepperBadge />
      </Stepper>
    </div>
  )
}
