import * as React from "react"

import {
  StepperField,
  StepperFieldButton,
  StepperFieldInput,
  StepperFieldLabel,
  StepperFieldBadge,
} from "@/registry/ui/stepper"

export default function StepperCollapse() {
  return (
    <div className="flex gap-3">
      <StepperField min={0} start={0} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="small"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          S
        </StepperFieldLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="small" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
      <StepperField min={0} start={3} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="medium"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          M
        </StepperFieldLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="medium" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
      <StepperField min={0} start={0} shift={10} className="min-w-8">
        <StepperFieldLabel
          htmlFor="large"
          className="mr-0 border-r-0 group-has-[:focus]:border-r"
        >
          L
        </StepperFieldLabel>
        <div className="flex w-0 flex-row items-center gap-1 overflow-hidden opacity-0 has-[:focus]:w-full has-[:focus]:overflow-auto has-[:focus]:opacity-100">
          <StepperFieldButton direction="down">-</StepperFieldButton>
          <StepperFieldInput id="large" />
          <StepperFieldButton direction="up">+</StepperFieldButton>
        </div>
        <StepperFieldBadge />
      </StepperField>
    </div>
  )
}
