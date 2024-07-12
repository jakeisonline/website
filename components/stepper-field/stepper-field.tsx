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

interface StepperFieldProps {
  startNum: number
  minNum?: number
  maxNum?: number
  stepSize?: number
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
  fieldId,
  fieldName,
  fieldLabel,
  fieldLabelReader,
  collapsible,
  hideBadge,
  hideBadgeNum,
}: StepperFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.screenX !== 0 && e.screenY !== 0)
      inputRef.current && inputRef.current.focus()
    e.preventDefault()
  }

  return (
    <StepperFieldContextProvider
      minNum={minNum}
      maxNum={maxNum}
      startNum={startNum}
      stepSize={stepSize}
      inputRef={inputRef}
    >
      <div
        onMouseDown={handleClick}
        className={
          "has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2  hover:cursor-pointer hover:inner-border-gray-500 px-1 py-1 inner-border rounded-md select-none text-xs flex flex-row items-center relative group"
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
            <StepperMinusIcon className="fill-gray-800 group-hover:fill-blue-900" />
          </StepperController>
          <StepperValue
            fieldId={fieldId}
            fieldName={fieldName}
            fieldLabelReader={fieldLabelReader}
          />
          <StepperController direction="up">
            <StepperPlusIcon className="fill-gray-800 group-hover:fill-blue-900" />
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
