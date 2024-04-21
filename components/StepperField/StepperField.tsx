"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperValue from "./StepperValue"
import StepperController from "./StepperController"
import useStepperField from "@/hooks/useStepperField"
import { useRef } from "react"
import StepperLabel from "./StepperLabel"
import StepperCollapsableContainer from "./StepperCollapsableContainer"
import StepperBadge from "./StepperBadge"

interface StepperFieldProps {
  startNum: number
  minNum?: number
  maxNum?: number
  fieldId?: string
  fieldName?: string
  fieldLabel?: string
  fieldLabelReader?: string
  collapses?: boolean
  hideBadge?: boolean
  hideBadgeNum?: number
}

const StepperField = ({
  startNum,
  minNum,
  maxNum,
  fieldId,
  fieldName,
  fieldLabel,
  fieldLabelReader,
  collapses,
  hideBadge,
  hideBadgeNum,
}: StepperFieldProps) => {
  const { stepValue, handleStep } = useStepperField(startNum, minNum, maxNum)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.screenX !== 0 && e.screenY !== 0)
      inputRef.current && inputRef.current.focus()
    e.preventDefault()
  }

  return (
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
        collapses={collapses}
      />
      <StepperCollapsableContainer collapses={collapses}>
        <StepperController
          direction="down"
          handleStep={handleStep}
          stepValue={stepValue}
          minValue={minNum}
        >
          <StepperMinusIcon className="fill-gray-800 group-hover:fill-blue-900" />
        </StepperController>
        <StepperValue
          stepValue={stepValue}
          minNum={minNum}
          maxNum={maxNum}
          handleStep={handleStep}
          inputRef={inputRef}
          fieldId={fieldId}
          fieldName={fieldName}
          fieldLabelReader={fieldLabelReader}
        />
        <StepperController
          direction="up"
          handleStep={handleStep}
          stepValue={stepValue}
          maxValue={maxNum}
        >
          <StepperPlusIcon className="fill-gray-800 group-hover:fill-blue-900" />
        </StepperController>
      </StepperCollapsableContainer>
      <StepperBadge
        hideBadge={hideBadge}
        hideBadgeNum={hideBadgeNum}
        stepValue={stepValue}
        collapses={collapses}
      />
    </div>
  )
}

export default StepperField
