import { forwardRef, useContext } from "react"
import { useRangeBarContext } from "./range-bar"

interface RangeGrabberProps {
  type: string
  initialValue: number
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>, type: string) => void
  getGrabberPosition: any
}

const RangeGrabber = ({
  type,
  initialValue,
  handleMouseDown,
  getGrabberPosition,
}: RangeGrabberProps) => {
  const barWidth = useRangeBarContext()
  if (!barWidth) return

  const grabberPosition = getGrabberPosition(initialValue)

  const doMouseDown = (e: any) => {
    handleMouseDown(e, type)
  }

  const style =
    type === "low"
      ? { marginLeft: grabberPosition }
      : { marginRight: barWidth - grabberPosition }

  return (
    <div
      style={style}
      className="group relative cursor-pointer select-none"
      onMouseDown={doMouseDown}
      onTouchStart={doMouseDown}
    >
      <div className="flex flex-col items-center">
        <div className="group-active:shadow-lg group-hover:bg-slate-900 absolute bg-black inline-block rounded-md -translate-y-7">
          <span className="text-sm py-1 px-1.5 text-white">{initialValue}</span>
        </div>
        <div className="group-active:shadow-md group-hover:border-blue-500 group-active:shadow-blue-600/20 w-3.5 h-3.5 rounded-full border-4 bg-white border-blue-600"></div>
      </div>
    </div>
  )
}

export default RangeGrabber
