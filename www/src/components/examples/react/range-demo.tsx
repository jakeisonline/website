import * as React from "react"

import {
  RangeBar,
  RangeField,
  RangeFill,
  RangeGrabber,
  RangeNumber,
} from "@/components/ui/range-field"

export default function StepperDemo() {
  return (
    <RangeField
      minRange={0}
      maxRange={100}
      initialLowValue={20}
      initialHighValue={80}
    >
      <RangeBar>
        <RangeGrabber type={"low"} />
        <RangeFill className="h-1 bg-blue-600 grow" />
        <RangeGrabber type={"high"} />
      </RangeBar>
      <div className="flex mt-3 space-x-5">
        <RangeNumber label="Min Price" type="low" />
        <RangeNumber label="Max Price" type="high" />
      </div>
    </RangeField>
  )
}
