import { Range, RangeBar, RangeFill, RangeGrabber } from "@/registry/ui/range"

export default function StepperDemo() {
  return (
    <Range
      minRange={0}
      maxRange={100}
      initialLowValue={20}
      initialHighValue={80}
    >
      <RangeBar>
        <RangeGrabber type={"low"} aria-label="Low Value" />
        <RangeFill className="h-1 grow bg-blue-600" />
        <RangeGrabber type={"high"} aria-label="High Value" />
      </RangeBar>
    </Range>
  )
}
