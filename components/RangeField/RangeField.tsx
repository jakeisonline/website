"use client"

import useRangeField from "@/hooks/useRangeField"
import RangeGrabber from "./RangeGrabber"
import RangeBar from "./RangeBar"
import RangeFill from "./RangeFill"

interface RangeFieldProps {
  minRange: number
  maxRange: number
  initialLowValue?: number
  initialHighValue?: number
}

const RangeField = ({
  minRange,
  maxRange,
  initialLowValue,
  initialHighValue,
}: RangeFieldProps) => {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setBarWidth,
    getGrabberPosition,
    currentValues,
  } = useRangeField({
    min: minRange,
    max: maxRange,
    low: initialLowValue,
    high: initialHighValue,
  })

  return (
    <div
      className="bg-white py-9 px-10 rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="mb-16">
        <p className="text-2xl">Price Range</p>
      </div>
      <RangeBar setBarWidth={setBarWidth}>
        <RangeGrabber
          type={"low"}
          initialValue={currentValues.low}
          handleMouseDown={handleMouseDown}
          getGrabberPosition={getGrabberPosition}
        />
        <RangeFill className="h-1 bg-blue-600 grow" />
        <RangeGrabber
          type={"high"}
          initialValue={currentValues.high}
          handleMouseDown={handleMouseDown}
          getGrabberPosition={getGrabberPosition}
        />
      </RangeBar>
      <div className="flex flex-row mt-3">
        <div className="">
          <label className="text-sm">Min Price</label>
          <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 flex inner-border inner-border-slate-500 rounded-md py-2 px-2.5">
            <input
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 bg-white focus:outline-none text-sm"
              value={currentValues.low}
              readOnly
            />
            <span className="text-slate-600 pl-2 border-l border-slate-400">
              $
            </span>
          </div>
        </div>
        <div className="w-3 mx-2"></div>
        <div className="">
          <label className="text-sm">Max Price</label>
          <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 flex inner-border inner-border-slate-500 rounded-md py-2 px-2.5">
            <input
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 bg-white focus:outline-none text-sm"
              value={currentValues.high}
              readOnly
            />
            <span className="text-slate-600 pl-2 border-l border-slate-400">
              $
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RangeField
