import { TaggerFieldContext } from "@/contexts/tagger-field-context-provider"
import { useContext } from "react"

export default function useTaggerFieldContext() {
  const context = useContext(TaggerFieldContext)

  if (!context) {
    throw new Error(
      "useTaggerFieldContext must be used within a TaggerFieldContextProvider",
    )
  }

  return context
}
