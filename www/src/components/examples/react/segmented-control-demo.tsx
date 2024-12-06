import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl defaultValue="24h">
      <SegmentedControlItem value="12h">12-hour</SegmentedControlItem>
      <SegmentedControlItem value="24h">24-hour</SegmentedControlItem>
    </SegmentedControl>
  )
}
