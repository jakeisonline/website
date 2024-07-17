"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperFieldValue from "./stepper-field-value"
import StepperFieldController from "./stepper-field-controller"
import { useRef } from "react"
import StepperFieldLabel from "./stepper-field-label"
import StepperFieldCollapsible from "./stepper-field-collapsible"
import StepperFieldBadge from "./stepper-field-badge"
import StepperFieldContextProvider from "@/contexts/stepper-field-context-provider"

type StepperFieldProps = {
  startNum: number
  minNum?: number
  maxNum?: number
  stepSize?: number
  stepShiftSize?: number
  fieldId?: string
  fieldName?: string
  fieldLabel?: string
  fieldLabelReader?: string
  collapsible?: boolean
  hideBadge?: boolean
  hideBadgeNum?: number
}

const StepperField = ({
  startNum,
  minNum,
  maxNum,
  stepSize,
  stepShiftSize,
  fieldId,
  fieldName,
  fieldLabel,
  fieldLabelReader,
  collapsible,
  hideBadge,
  hideBadgeNum,
}: StepperFieldProps) => {
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
      minNum={minNum}
      maxNum={maxNum}
      startNum={startNum}
      stepSize={stepSize}
      stepShiftSize={stepShiftSize}
      inputRef={inputRef}
    >
      <div
        onMouseUp={handleFocus}
        className={
          "has-[:focus]:inner-border-primary has-[:focus]:inner-border-2 hover:cursor-pointer hover:inner-border-2 px-1 py-1 inner-border rounded-md select-none text-xs flex flex-row items-center relative group"
        }
      >
        <StepperFieldLabel
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldLabelReader={fieldLabelReader}
          collapsible={collapsible}
        />
        <StepperFieldCollapsible collapsible={collapsible}>
          <StepperFieldController direction="down">
            <StepperMinusIcon className="fill-foreground" />
          </StepperFieldController>
          <StepperFieldValue
            fieldId={fieldId}
            fieldName={fieldName}
            fieldLabelReader={fieldLabelReader}
          />
          <StepperFieldController direction="up">
            <StepperPlusIcon className="fill-foreground" />
          </StepperFieldController>
        </StepperFieldCollapsible>
        <StepperFieldBadge
          hideBadge={hideBadge}
          hideBadgeNum={hideBadgeNum}
          collapsible={collapsible}
        />
      </div>
    </StepperFieldContextProvider>
  )
}

export default StepperField
