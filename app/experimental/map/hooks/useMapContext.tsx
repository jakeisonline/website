import { useContext } from "react"
import { MapContext } from "../contexts/mapContextProvider"

export default function useMapContext() {
  const context = useContext(MapContext)

  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider")
  }

  return context
}
