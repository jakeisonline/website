import { StepperFieldContext } from "@/contexts/stepper-field-context-provider"
import { useContext } from "react"

export default function useStepperFieldContext() {
  const context = useContext(StepperFieldContext)

  if (!context) {
    throw new Error(
      "useStepperFieldContext must be used within a StepperFieldContextProvider",
    )
  }

  return context
}
