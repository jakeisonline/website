import useRangeFieldContext from "@/hooks/use-range-field-context"
import React from "react"

export default function RangeContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const { handleMouseMove, handleMouseUp } = useRangeFieldContext()

  return (
    <div
      className="bg-white py-4 rounded-lg"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      {children}
    </div>
  )
}
