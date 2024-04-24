import { useRef, useState, useLayoutEffect } from "react"

interface RangeBarProps {
  minRange: number
  maxRange: number
  children: any
}

const RangeBar = ({ minRange, maxRange, children }: RangeBarProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  // console.log(
  //   "Width:",
  //   Math.floor(width) / Math.floor(Math.floor(maxRange - minRange)),
  // )

  return (
    <div
      ref={ref}
      className="flex flex-row flex-none items-center bg-blue-100 h-1 rounded-full"
    >
      {children}
    </div>
  )
}

export default RangeBar
