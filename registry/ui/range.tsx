"use client"

import { useRef, useState, useEffect, createContext, useContext } from "react"

interface RangeProps {
  minRange: number
  maxRange: number
  initialLowValue?: number
  initialHighValue?: number
  children?: React.ReactNode
}

export const Range = ({
  minRange,
  maxRange,
  initialLowValue,
  initialHighValue,
  children,
}: RangeProps) => {
  return (
    <RangeContextProvider
      min={minRange}
      max={maxRange}
      low={initialLowValue}
      high={initialHighValue}
    >
      <div className="min-h-8 w-full py-4">{children}</div>
    </RangeContextProvider>
  )
}

interface RangeBarProps {
  children: React.ReactNode
}

const RangeBarWidthContext = createContext(0)

export const RangeBar = ({ children }: RangeBarProps) => {
  const { setBarWidth } = useRangeContext()
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
  "type": string
  "aria-label": string
}

export const RangeGrabber = ({ type }: RangeGrabberProps) => {
  const {
    currentValues,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    getGrabberPosition,
  } = useRangeContext()

  const barWidth = useRangeBarContext()

  if (!barWidth) return

  const initialValue = type === "low" ? currentValues.low : currentValues.high
  const grabberPosition = getGrabberPosition(initialValue)

  const doPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerDown(e, type)

    document.addEventListener("pointerup", handlePointerUp)
    document.addEventListener("pointermove", handlePointerMove)
  }

  const style =
    type === "low"
      ? { marginLeft: grabberPosition }
      : { marginRight: barWidth - grabberPosition }

  return (
    <div
      style={style}
      className="group relative cursor-pointer select-none"
      onPointerDown={doPointerDown}
    >
      <div className="flex flex-col items-center">
        <div className="bg-foreground group-hover:bg-foreground/80 absolute inline-block -translate-y-7 rounded-md group-active:shadow-lg">
          <span className="text-background px-1.5 py-1 text-sm">
            {initialValue}
          </span>
        </div>
        <div className="h-3.5 w-3.5 rounded-full border-4 border-blue-600 bg-white group-hover:border-blue-500 group-active:shadow-md group-active:shadow-blue-600/20"></div>
      </div>
    </div>
  )
}

const useRangeContext = () => {
  const context = useContext(RangeContext)

  if (!context) {
    throw new Error(
      "useRangeContext must be used within a RangeContextProvider",
    )
  }

  return context
}

interface RangeContextType {
  handlePointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    grabberType: string,
  ) => void
  handlePointerMove: (e: Event) => void
  handlePointerUp: () => void
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

const RangeContext = createContext<RangeContextType>({
  handlePointerDown: () => {},
  handlePointerMove: () => {},
  handlePointerUp: () => {},
  setBarWidth: () => {},
  getGrabberPosition: () => 0,
  currentValues: { min: 0, max: 100, low: 0, high: 100 },
  setCurrentValues: () => {},
})

interface RangeContextProviderProps {
  min: number
  max: number
  low?: number
  high?: number
  children: React.ReactNode
}

const RangeContextProvider = ({
  min,
  max,
  low,
  high,
  children,
}: RangeContextProviderProps) => {
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

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    grabberType: string,
  ) => {
    updateDraggingEvent({
      isDragging: true,
      draggingType: grabberType,
    })

    updateMouseOffset(grabberType, e.clientX)
  }

  // TODO: correctly type, but events suck and this works
  const handlePointerMove = (e: any) => {
    if (!draggingEvent.current.isDragging) return
    const grabberType = draggingEvent.current.draggingType

    handleGrabberMove(grabberType, e)
  }

  const handlePointerUp = () => {
    updateDraggingEvent({
      isDragging: false,
      draggingType: "",
    })

    document.removeEventListener("mousemove", handlePointerMove)
    document.removeEventListener("mouseup", handlePointerUp)
  }

  const handleGrabberMove = (
    type: string,
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    const newPosition =
      mouseOffset.current[type as keyof typeof mouseOffset.current] !== 0
        ? e.clientX -
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

  return (
    <RangeContext.Provider
      value={{
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        setBarWidth,
        getGrabberPosition,
        currentValues,
        setCurrentValues,
      }}
    >
      {children}
    </RangeContext.Provider>
  )
}
