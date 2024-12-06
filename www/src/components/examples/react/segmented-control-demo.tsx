import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/ui/segmented-control"

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl defaultValue="one">
      <SegmentedControlItem value="one">One</SegmentedControlItem>
      <SegmentedControlItem value="two">Two</SegmentedControlItem>
      <SegmentedControlItem value="three">Three</SegmentedControlItem>
    </SegmentedControl>
  )
}
