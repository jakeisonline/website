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
  const [barWidth, setBarWidth] = useState(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)

    if (grabberPosition === 0 && mouseOffset === 0) {
      setMouseOffset(e.clientX - getGrabberPosition(lowValue))
    } else {
      setMouseOffset(e.clientX - grabberPosition)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const newPosition =
      mouseOffset !== 0 ? e.clientX - mouseOffset : getGrabberPosition(lowValue)
    const newValue = Math.round(newPosition / (barWidth / 100))
    if (newPosition < 0 || newValue >= highValue - 5) return
    setGrabberPosition(newPosition)
    setLowValue(newValue)
  }

  const getGrabberPosition = (value: number) => {
    return (barWidth / 100) * value
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
    setBarWidth,
    getGrabberPosition,
  }
}

export default useRangeField
