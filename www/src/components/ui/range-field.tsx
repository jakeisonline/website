"use client"

import {
  useRef,
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react"

interface RangeFieldProps {
  minRange: number
  maxRange: number
  initialLowValue?: number
  initialHighValue?: number
  children?: React.ReactNode
}

export const RangeField = ({
  minRange,
  maxRange,
  initialLowValue,
  initialHighValue,
  children,
}: RangeFieldProps) => {
  return (
    <RangeFieldContextProvider
      min={minRange}
      max={maxRange}
      low={initialLowValue}
      high={initialHighValue}
    >
      <RangeContainer>{children}</RangeContainer>
    </RangeFieldContextProvider>
  )
}

interface RangeBarProps {
  children: ReactNode
}

export const RangeBarWidthContext = createContext(0)

export const RangeBar = ({ children }: RangeBarProps) => {
  const { setBarWidth } = useRangeFieldContext()
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

export const useRangeBarContext = () => {
  const context = useContext(RangeBarWidthContext)
  return context
}

export function RangeContainer({ children }: { children: React.ReactNode }) {
  const { handleMouseMove, handleMouseUp } = useRangeFieldContext()

  return (
    <div
      className="bg-white py-4 rounded-lg"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      {children}
    </div>
  )
}

export const RangeFill = ({ ...props }) => {
  const barWidth = useRangeBarContext()
  if (!barWidth) return
  return <div {...props}></div>
}

interface RangeGrabberProps {
  type: string
}

export const RangeGrabber = ({ type }: RangeGrabberProps) => {
  const { currentValues, handleMouseDown, getGrabberPosition } =
    useRangeFieldContext()
  const barWidth = useRangeBarContext()
  if (!barWidth) return

  const initialValue = type === "low" ? currentValues.low : currentValues.high
  const grabberPosition = getGrabberPosition(initialValue)

  const doMouseDown = (e: any) => {
    handleMouseDown(e, type)
  }

  const style =
    type === "low"
      ? { marginLeft: grabberPosition }
      : { marginRight: barWidth - grabberPosition }

  return (
    <div
      style={style}
      className="group relative cursor-pointer select-none"
      onMouseDown={doMouseDown}
      onTouchStart={doMouseDown}
    >
      <div className="flex flex-col items-center">
        <div className="group-active:shadow-lg group-hover:bg-slate-900 absolute bg-black inline-block rounded-md -translate-y-7">
          <span className="text-sm py-1 px-1.5 text-white">{initialValue}</span>
        </div>
        <div className="group-active:shadow-md group-hover:border-blue-500 group-active:shadow-blue-600/20 w-3.5 h-3.5 rounded-full border-4 bg-white border-blue-600"></div>
      </div>
    </div>
  )
}

interface RangeNumberProps {
  label: string
  type: string
}

export const RangeNumber = ({ label, type }: RangeNumberProps) => {
  const { currentValues } = useRangeFieldContext()

  return (
    <div className="w-full">
      <label className="text-sm">{label}</label>
      <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 flex inner-border inner-border-slate-500 rounded-md py-2 px-2.5">
        <input
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 bg-white focus:outline-none text-sm w-full"
          {...(type === "low"
            ? { value: currentValues.low }
            : { value: currentValues.high })}
          readOnly
        />
        <span className="text-slate-600 pl-2 border-l border-slate-400">$</span>
      </div>
    </div>
  )
}

const useRangeFieldContext = () => {
  const context = useContext(RangeFieldContext)

  if (!context) {
    throw new Error(
      "useRangeFieldContext must be used within a RangeFieldContextProvider",
    )
  }

  return context
}

interface RangeFieldContextType {
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    grabberType: string,
  ) => void
  handleMouseMove: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void
  handleMouseUp: () => void
  setBarWidth: (width: number) => void
  getGrabberPosition: (value: number) => number
  currentValues: { min: number; max: number; low: number; high: number }
}

const RangeFieldContext = createContext<RangeFieldContextType>({
  handleMouseDown: () => {},
  handleMouseMove: () => {},
  handleMouseUp: () => {},
  setBarWidth: () => {},
  getGrabberPosition: () => 0,
  currentValues: { min: 0, max: 100, low: 0, high: 100 },
})

interface RangeFieldContextProviderProps {
  min: number
  max: number
  low?: number
  high?: number
  children: React.ReactNode
}

const RangeFieldContextProvider = ({
  min,
  max,
  low,
  high,
  children,
}: RangeFieldContextProviderProps) => {
  const [currentValues, setCurrentValues] = useState({
    min: min,
    max: max,
    low: low ? low : min,
    high: high ? high : max,
  })
  const [grabberPositions, setGrabberPositions] = useState({
    low: 0,
    high: 0,
  })
  const [mouseOffset, setMouseOffset] = useState({
    low: 0,
    high: 0,
  })
  const [barWidth, setBarWidth] = useState(0)
  const [draggingEvent, setDraggingEvent] = useState({
    isDragging: false,
    draggingType: "",
  })

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    grabberType: string,
  ) => {
    setDraggingEvent({
      isDragging: true,
      draggingType: grabberType,
    })

    updateMouseOffset(grabberType, getXOffset(e))
  }

  const updateMouseOffset = (grabberType: string, clientX: number) => {
    const value = grabberType === "low" ? currentValues.low : currentValues.high

    const newValue =
      grabberPositions[grabberType as keyof typeof grabberPositions] === 0 &&
      mouseOffset[grabberType as keyof typeof grabberPositions] === 0
        ? clientX - getGrabberPosition(value)
        : clientX -
          grabberPositions[grabberType as keyof typeof grabberPositions]

    const newMouseOffset = {
      [grabberType]: newValue,
    }
    setMouseOffset((mouseOffset) => ({
      ...mouseOffset,
      ...newMouseOffset,
    }))
  }

  const getXOffset = (e: any) => {
    return e.type == "touchmove" || e.type == "touchstart"
      ? e.touches[0].clientX
      : e.clientX
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!draggingEvent.isDragging) return
    const grabberType = draggingEvent.draggingType

    handleGrabberMove(grabberType, e)
  }

  const handleGrabberMove = (
    type: string,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const newPosition =
      mouseOffset[type as keyof typeof mouseOffset] !== 0
        ? getXOffset(e) - mouseOffset[type as keyof typeof mouseOffset]
        : getGrabberPosition(currentValues.high)
    const newValue = Math.round(newPosition / (barWidth / currentValues.max))

    if (!canMoveGrabber(type, newValue)) return

    const updatedPosition = { [type]: newPosition }
    setGrabberPositions((grabberPositions) => ({
      ...grabberPositions,
      ...updatedPosition,
    }))
    const updatedValue = { [type]: newValue }
    setCurrentValues((currentValues) => ({
      ...currentValues,
      ...updatedValue,
    }))
  }

  const canMoveGrabber = (type: string, newValue: number) => {
    if (type === "low") {
      return (
        newValue >= currentValues.min && newValue <= currentValues.high - 15
      )
    } else {
      return newValue <= currentValues.max && newValue >= currentValues.low + 15
    }
  }

  const getGrabberPosition = (value: number) => {
    return (barWidth / currentValues.max) * value
  }

  const handleMouseUp = () => {
    setDraggingEvent({
      isDragging: false,
      draggingType: "",
    })
  }

  return (
    <RangeFieldContext.Provider
      value={{
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        setBarWidth,
        getGrabberPosition,
        currentValues,
      }}
    >
      {children}
    </RangeFieldContext.Provider>
  )
}
