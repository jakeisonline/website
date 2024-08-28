import * as React from "react"

import {
  StepperField,
  StepperFieldButton,
  StepperFieldInput,
  StepperFieldLabel,
  StepperFieldBadge,
} from "@/components/ui/stepper-field"

export default function StepperCollapse() {
  return (
    <div className="flex gap-3">
      <StepperField min={0} start={0} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="small"
          className="group-has-[:focus]:border-r border-r-0 mr-0"
        >
          S
        </StepperFieldLabel>
        <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="small" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
      <StepperField min={0} start={3} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="medium"
          className="group-has-[:focus]:border-r border-r-0 mr-0"
        >
          M
        </StepperFieldLabel>
        <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="medium" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
      <StepperField min={0} start={0} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="large"
          className="group-has-[:focus]:border-r border-r-0 mr-0"
        >
          L
        </StepperFieldLabel>
        <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="large" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
    </div>
  )
}
