import { useRangeBarContext } from "./range-bar"

const RangeFill = ({ ...props }) => {
  const barWidth = useRangeBarContext()
  if (!barWidth) return
  return <div {...props}></div>
}

export default RangeFill
