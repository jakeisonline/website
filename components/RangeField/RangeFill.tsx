import { useRangeBarContext } from "./RangeBar"

const RangeFill = ({ ...props }) => {
  const barWidth = useRangeBarContext()
  if (!barWidth) return
  return <div {...props}></div>
}

export default RangeFill
