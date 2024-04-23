interface RangeGrabberProps {
  initialValue: number
  grabberPosition: number
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  handleMouseUp: () => void
}

const RangeGrabber = ({
  initialValue,
  grabberPosition,
  handleMouseDown,
  handleMouseUp,
}: RangeGrabberProps) => {
  return (
    <div
      style={{ marginLeft: grabberPosition }}
      className="group relative cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
