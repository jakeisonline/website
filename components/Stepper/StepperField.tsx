"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperValue from "./StepperValue"
import StepperController from "./StepperController"
import useStepperField from "@/utils/useStepperField"

interface StepperFieldProps {
  startNum: number
  minNum?: number
  maxNum?: number
}

const StepperField = ({ startNum, minNum, maxNum }: StepperFieldProps) => {
  const { stepValue, handleStep } = useStepperField(startNum, minNum, maxNum)

  return (
    <div className="flex flex-row items-center gap-2 px-1 py-1 border border-gray-300 rounded-md select-none">
      <StepperController
        direction="down"
        handleStep={handleStep}
        stepValue={stepValue}
        minValue={minNum}
      >
        <StepperMinusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
      <StepperValue stepValue={stepValue} />
      <StepperController
        direction="up"
        handleStep={handleStep}
        stepValue={stepValue}
        maxValue={maxNum}
      >
        <StepperPlusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
    </div>
  )
}

export default StepperField
