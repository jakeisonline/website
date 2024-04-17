"use client"

import StepperPlusIcon from "@/svgs/StepperPlusIcon"
import StepperMinusIcon from "@/svgs/StepperMinusIcon"
import StepperValue from "./StepperValue"
import StepperController from "./StepperController"
import useStepperField from "@/utils/useStepperField"

interface StepperFieldProps {
  startNum: number
}

const StepperField = ({ startNum }: StepperFieldProps) => {
  const { stepValue, handleStep } = useStepperField(1, 1, 10)

  return (
    <div className="flex flex-row items-center gap-2 px-1 py-1 border border-gray-300 rounded-md">
      <StepperController direction="down" handleStep={handleStep}>
        <StepperMinusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
      <StepperValue stepperValue={stepValue} />
      <StepperController direction="up" handleStep={handleStep}>
        <StepperPlusIcon className="fill-gray-800 group-hover:fill-blue-900" />
      </StepperController>
    </div>
  )
}

export default StepperField
