"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperValue from "./stepper-value"
import StepperController from "./stepper-controller"
import { useRef } from "react"
import StepperLabel from "./stepper-label"
import StepperCollapsible from "./stepper-collapsible"
import StepperBadge from "./stepper-badge"
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
          "has-[:focus]:inner-border-primary has-[:focus]:inner-border-2  hover:cursor-pointer hover:inner-border-border px-1 py-1 inner-border rounded-md select-none text-xs flex flex-row items-center relative group"
        }
      >
        <StepperLabel
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldLabelReader={fieldLabelReader}
          collapsible={collapsible}
        />
        <StepperCollapsible collapsible={collapsible}>
          <StepperController direction="down">
            <StepperMinusIcon className="fill-foreground" />
          </StepperController>
          <StepperValue
            fieldId={fieldId}
            fieldName={fieldName}
            fieldLabelReader={fieldLabelReader}
          />
          <StepperController direction="up">
            <StepperPlusIcon className="fill-foreground" />
          </StepperController>
        </StepperCollapsible>
        <StepperBadge
          hideBadge={hideBadge}
          hideBadgeNum={hideBadgeNum}
          collapsible={collapsible}
        />
      </div>
    </StepperFieldContextProvider>
  )
}

export default StepperField
