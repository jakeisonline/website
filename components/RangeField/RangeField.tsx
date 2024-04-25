"use client"

import useRangeField from "@/hooks/useRangeField"
import RangeGrabber from "./RangeGrabber"
import RangeBar from "./RangeBar"

interface RangeFieldProps {
  minRange: number
  maxRange: number
  initialLowValue: number
  initialHighValue: number
}

const RangeField = ({
  minRange,
  maxRange,
  initialLowValue,
  initialHighValue,
}: RangeFieldProps) => {
  const {
    lowValue,
    setLowValue,
    highValue,
    setHighValue,
    grabberPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useRangeField({
    lowStartValue: initialLowValue,
    highStartValue: initialHighValue,
  })

  return (
    <div
      className="bg-white py-9 px-10 rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="mb-16">
        <p className="text-2xl">Price Range</p>
        <p className="text-sm text-slate-500"></p>
      </div>
      <RangeBar minRange={minRange} maxRange={maxRange}>
        <RangeGrabber
          initialValue={lowValue}
          grabberPosition={grabberPosition}
          handleMouseDown={handleMouseDown}
        />
        <div className="h-1 bg-blue-600 grow"></div>
        <div
          style={{ marginRight: 10 }}
          className="group relative cursor-pointer select-none"
        >
          <div className="group-active:shadow-lg absolute bg-black inline-block rounded-md -translate-y-7 -translate-x-4">
            <span className="text-sm py-1 px-1.5 text-white">90</span>
          </div>
          <div className="group-active:shadow-md group-active:shadow-blue-600/20 w-3.5 h-3.5 rounded-full border-4 bg-white border-blue-600"></div>
        </div>
      </RangeBar>
      <div className="flex flex-row mt-3">
        <div className="">
          <label className="text-sm">Min Price</label>
          <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 flex inner-border inner-border-slate-500 rounded-md py-2 px-2.5">
            <input
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 bg-white focus:outline-none text-sm"
              value={lowValue}
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
