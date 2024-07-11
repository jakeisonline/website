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

// import { useState } from "react"

// interface useRangeFieldProps {
//   min: number
//   max: number
//   low?: number
//   high?: number
// }

// const useRangeField = ({ low, high, min, max }: useRangeFieldProps) => {
//   const [currentValues, setCurrentValues] = useState({
//     min: min,
//     max: max,
//     low: low ? low : min,
//     high: high ? high : max,
//   })
//   const [grabberPositions, setGrabberPositions] = useState({
//     low: 0,
//     high: 0,
//   })
//   const [mouseOffset, setMouseOffset] = useState({
//     low: 0,
//     high: 0,
//   })
//   const [barWidth, setBarWidth] = useState(0)
//   const [draggingEvent, setDraggingEvent] = useState({
//     isDragging: false,
//     draggingType: "",
//   })

//   const handleMouseDown = (
//     e: React.MouseEvent<HTMLDivElement>,
//     grabberType: string,
//   ) => {
//     setDraggingEvent({
//       isDragging: true,
//       draggingType: grabberType,
//     })

//     updateMouseOffset(grabberType, getXOffset(e))
//   }

//   const updateMouseOffset = (grabberType: string, clientX: number) => {
//     const value = grabberType === "low" ? currentValues.low : currentValues.high

//     const newValue =
//       grabberPositions[grabberType as keyof typeof grabberPositions] === 0 &&
//       mouseOffset[grabberType as keyof typeof grabberPositions] === 0
//         ? clientX - getGrabberPosition(value)
//         : clientX -
//           grabberPositions[grabberType as keyof typeof grabberPositions]

//     const newMouseOffset = {
//       [grabberType]: newValue,
//     }
//     setMouseOffset((mouseOffset) => ({
//       ...mouseOffset,
//       ...newMouseOffset,
//     }))
//   }

//   const getXOffset = (e: any) => {
//     return e.type == "touchmove" || e.type == "touchstart"
//       ? e.touches[0].clientX
//       : e.clientX
//   }

//   const handleMouseMove = (
//     e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
//   ) => {
//     if (!draggingEvent.isDragging) return
//     const grabberType = draggingEvent.draggingType

//     handleGrabberMove(grabberType, e)
//   }

//   const handleGrabberMove = (
//     type: string,
//     e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
//   ) => {
//     const newPosition =
//       mouseOffset[type as keyof typeof mouseOffset] !== 0
//         ? getXOffset(e) - mouseOffset[type as keyof typeof mouseOffset]
//         : getGrabberPosition(currentValues.high)
//     const newValue = Math.round(newPosition / (barWidth / currentValues.max))

//     if (!canMoveGrabber(type, newValue)) return

//     const updatedPosition = { [type]: newPosition }
//     setGrabberPositions((grabberPositions) => ({
//       ...grabberPositions,
//       ...updatedPosition,
//     }))
//     const updatedValue = { [type]: newValue }
//     setCurrentValues((currentValues) => ({
//       ...currentValues,
//       ...updatedValue,
//     }))
//   }

//   const canMoveGrabber = (type: string, newValue: number) => {
//     if (type === "low") {
//       return (
//         newValue >= currentValues.min && newValue <= currentValues.high - 15
//       )
//     } else {
//       return newValue <= currentValues.max && newValue >= currentValues.low + 15
//     }
//   }

//   const getGrabberPosition = (value: number) => {
//     return (barWidth / currentValues.max) * value
//   }

//   const handleMouseUp = () => {
//     setDraggingEvent({
//       isDragging: false,
//       draggingType: "",
//     })
//   }

//   return {
//     handleMouseDown,
//     handleMouseMove,
//     handleMouseUp,
//     setBarWidth,
//     getGrabberPosition,
//     currentValues,
//   }
// }

// export default useRangeField
