import { useState } from "react"

interface useRangeFieldProps {
  lowStartValue: number
  highStartValue: number
}

const useRangeField = ({
  lowStartValue,
  highStartValue,
}: useRangeFieldProps) => {
  const [lowValue, setLowValue] = useState(lowStartValue | 0)
  const [highValue, setHighValue] = useState(highStartValue | 1)
  const [isDragging, setIsDragging] = useState(false)
  const [grabberPosition, setGrabberPosition] = useState(0)
  const [mouseOffset, setMouseOffset] = useState(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setMouseOffset(e.clientX - grabberPosition)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const newPosition = e.clientX - mouseOffset
    const newValue = Math.round(newPosition / 5.62)
    console.log(highValue)
    if (newPosition < 0 || newValue >= highValue - 5) return
    setGrabberPosition(newPosition)
    setLowValue(newValue)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return {
    lowValue,
    setLowValue,
    highValue,
    setHighValue,
    grabberPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}

export default useRangeField
