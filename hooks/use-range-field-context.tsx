import { RangeFieldContext } from "@/contexts/range-field-context-provider"
import { useContext } from "react"

export default function useRangeFieldContext() {
  const context = useContext(RangeFieldContext)

  if (!context) {
    throw new Error(
      "useRangeFieldContext must be used within a RangeFieldContextProvider",
    )
  }

  return context
}
