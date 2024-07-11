"use client"

import RangeGrabber from "./range-grabber"
import RangeBar from "./range-bar"
import RangeFill from "./range-fill"
import RangeFieldContextProvider from "@/contexts/range-field-context-provider"
import RangeContainer from "./range-container"
import RangeNumber from "./range-number"

type RangeFieldProps = {
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
  return (
    <RangeFieldContextProvider
      min={minRange}
      max={maxRange}
      low={initialLowValue}
      high={initialHighValue}
    >
      <RangeContainer>
        <div className="mb-12">
          <p className="text-2xl">Price Range</p>
        </div>
        <RangeBar>
          <RangeGrabber type={"low"} />
          <RangeFill className="h-1 bg-blue-600 grow" />
          <RangeGrabber type={"high"} />
        </RangeBar>
        <div className="sm:flex mt-3">
          <RangeNumber label="Min Price" type="low" />
          <div className="w-3 mx-2"></div>
          <RangeNumber label="Max Price" type="high" />
        </div>
      </RangeContainer>
    </RangeFieldContextProvider>
  )
}

export default RangeField
