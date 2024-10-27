import { useRef, useState, useEffect, createContext, useContext } from "react"

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
      <div className="rounded-lg bg-white py-4">{children}</div>
    </RangeFieldContextProvider>
  )
}

interface RangeBarProps {
  children: React.ReactNode
}

const RangeBarWidthContext = createContext(0)

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
        className="flex h-1 flex-none touch-none flex-row items-center rounded-full bg-blue-100"
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

export const RangeFill = ({ ...props }) => {
  const barWidth = useRangeBarContext()
  if (!barWidth) return
  return <div {...props}></div>
}

interface RangeGrabberProps {
  type: string
}

export const RangeGrabber = ({ type }: RangeGrabberProps) => {
  const {
    currentValues,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getGrabberPosition,
  } = useRangeFieldContext()

  const barWidth = useRangeBarContext()

  if (!barWidth) return

  const initialValue = type === "low" ? currentValues.low : currentValues.high
  const grabberPosition = getGrabberPosition(initialValue)

  const doMouseDown = (e: any) => {
    handleMouseDown(e, type)

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
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
        <div className="absolute inline-block -translate-y-7 rounded-md bg-black group-hover:bg-slate-900 group-active:shadow-lg">
          <span className="px-1.5 py-1 text-sm text-white">{initialValue}</span>
        </div>
        <div className="h-3.5 w-3.5 rounded-full border-4 border-blue-600 bg-white group-hover:border-blue-500 group-active:shadow-md group-active:shadow-blue-600/20"></div>
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
      <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 inner-border inner-border-slate-500 flex rounded-md px-2.5 py-2">
        <input
          type="number"
          className="w-full bg-white text-sm [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::selection]:bg-blue-100"
          {...(type === "low"
            ? { value: currentValues.low }
            : { value: currentValues.high })}
          readOnly
        />
        <span className="border-l border-slate-400 pl-2 text-slate-600">$</span>
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
  handleMouseMove: (e: Event) => void
  handleMouseUp: () => void
  setBarWidth: (width: number) => void
  getGrabberPosition: (value: number) => number
  currentValues: { min: number; max: number; low: number; high: number }
  setCurrentValues: (values: {
    min: number
    max: number
    low: number
    high: number
  }) => void
}

const RangeFieldContext = createContext<RangeFieldContextType>({
  handleMouseDown: () => {},
  handleMouseMove: () => {},
  handleMouseUp: () => {},
  setBarWidth: () => {},
  getGrabberPosition: () => 0,
  currentValues: { min: 0, max: 100, low: 0, high: 100 },
  setCurrentValues: () => {},
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

  const grabberPositions = useRef({
    low: 0,
    high: 0,
  })

  const mouseOffset = useRef({
    low: 0,
    high: 0,
  })

  const [barWidth, setBarWidth] = useState(0)

  const draggingEvent = useRef({
    isDragging: false,
    draggingType: "",
  })

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    grabberType: string,
  ) => {
    updateDraggingEvent({
      isDragging: true,
      draggingType: grabberType,
    })

    updateMouseOffset(grabberType, getXOffset(e))
  }

  const handleMouseMove = (e: Event) => {
    if (!draggingEvent.current.isDragging) return
    const grabberType = draggingEvent.current.draggingType

    handleGrabberMove(grabberType, e)
  }

  const handleMouseUp = () => {
    updateDraggingEvent({
      isDragging: false,
      draggingType: "",
    })

    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const handleGrabberMove = (type: string, e: Event) => {
    const newPosition =
      mouseOffset.current[type as keyof typeof mouseOffset.current] !== 0
        ? getXOffset(e) -
          mouseOffset.current[type as keyof typeof mouseOffset.current]
        : getNewGrabberPosition(currentValues.low)
    const newValue = Math.round(newPosition / (barWidth / currentValues.max))

    if (!canMoveGrabber(type, newValue)) return

    const updatedPosition = { [type]: newPosition }
    grabberPositions.current = {
      ...grabberPositions.current,
      ...updatedPosition,
    }

    const updatedValue = { [type]: newValue }
    setCurrentValues((currentValues) => ({
      ...currentValues,
      ...updatedValue,
    }))
  }

  const updateDraggingEvent = (newEvent: {
    isDragging: boolean
    draggingType: string
  }) => {
    draggingEvent.current = newEvent
  }

  const updateMouseOffset = (grabberType: string, clientX: number) => {
    const value = grabberType === "low" ? currentValues.low : currentValues.high

    const newValue =
      grabberPositions.current[
        grabberType as keyof typeof grabberPositions.current
      ] === 0 &&
      mouseOffset.current[
        grabberType as keyof typeof grabberPositions.current
      ] === 0
        ? clientX - getNewGrabberPosition(value)
        : clientX -
          grabberPositions.current[
            grabberType as keyof typeof grabberPositions.current
          ]

    const updatedMouseOffset = {
      [grabberType]: newValue,
    }

    mouseOffset.current = {
      ...mouseOffset.current,
      ...updatedMouseOffset,
    }
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

  const getNewGrabberPosition = (value: number) => {
    return (barWidth / currentValues.max) * value
  }

  const getXOffset = (e: any) => {
    return e.type == "touchmove" || e.type == "touchstart"
      ? e.touches[0].clientX
      : e.clientX
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
        setCurrentValues,
      }}
    >
      {children}
    </RangeFieldContext.Provider>
  )
}
