import {
  useRef,
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react"

interface RangeBarProps {
  setBarWidth: any
  children: ReactNode
}

export const RangeBarWidthContext = createContext(0)

const RangeBar = ({ setBarWidth, children }: RangeBarProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current && ref.current.offsetWidth > 0) {
      setBarWidth(ref.current.offsetWidth)
      setWidth(ref.current.offsetWidth)
    }
  }, [setBarWidth])

  return (
    <RangeBarWidthContext.Provider value={width}>
      <div
        ref={ref}
        className="touch-none flex flex-row flex-none items-center bg-blue-100 h-1 rounded-full"
      >
        {children}
      </div>
    </RangeBarWidthContext.Provider>
  )
}

export default RangeBar

export const useRangeBarContext = () => {
  const context = useContext(RangeBarWidthContext)
  return context
}
