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
        <RangeBar>
          <RangeGrabber type={"low"} />
          <RangeFill className="h-1 bg-blue-600 grow" />
          <RangeGrabber type={"high"} />
        </RangeBar>
        <div className="flex mt-3 space-x-5">
          <RangeNumber label="Min Price" type="low" />
          <RangeNumber label="Max Price" type="high" />
        </div>
      </RangeContainer>
    </RangeFieldContextProvider>
  )
}

export default RangeField
