import { type TickerItem } from "@/registry/ui/ticker"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

interface TickerContextType {
  setOriginalItems: (tickerId: string, items: TickerItem[]) => void
  doNext: (tickerId: string, autoLoop?: boolean) => TickerItem | null
  doPrevious: (tickerId: string) => TickerItem | null
  getCurrentItem: (tickerId: string) => TickerItem | null
  getQueueLength: (tickerId: string) => number
  getQueuePosition: (tickerId: string) => number
}

export const TickerContext = createContext<TickerContextType | undefined>(
  undefined,
)

export const useTicker = () => {
  const context = useContext(TickerContext)

  if (!context) {
    throw new Error("useTicker must be used within a TickerProvider")
  }

  return context
}

interface TickerContextProviderProps {
  children: ReactNode
}

export function TickerContextProvider({
  children,
}: TickerContextProviderProps) {
  const [originalItems, setOriginalItemsState] = useState<
    Record<string, TickerItem[]>
  >({})
  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>(
    {},
  )

  const setOriginalItems = useCallback(
    (tickerId: string, items: TickerItem[]) => {
      setOriginalItemsState((prev) => ({
        ...prev,
        [tickerId]: items,
      }))
      // Initialize current index to 0
      setCurrentIndices((prev) => ({
        ...prev,
        [tickerId]: 0,
      }))
    },
    [],
  )

  const getCurrentItem = useCallback(
    (tickerId: string): TickerItem | null => {
      const items = originalItems[tickerId] || []
      const currentIndex = currentIndices[tickerId] || 0
      return items[currentIndex] || null
    },
    [originalItems, currentIndices],
  )

  const getQueueLength = useCallback(
    (tickerId: string): number => {
      return originalItems[tickerId]?.length || 0
    },
    [originalItems],
  )

  const getQueuePosition = useCallback(
    (tickerId: string): number => {
      return currentIndices[tickerId] || 0
    },
    [currentIndices],
  )

  const navigateToItem = useCallback(
    (
      tickerId: string,
      direction: "next" | "previous",
      enableLoop = true,
    ): TickerItem | null => {
      const items = originalItems[tickerId] || []
      if (items.length === 0) return null

      const currentIndex = currentIndices[tickerId] || 0
      let newIndex: number

      if (direction === "next") {
        if (enableLoop) {
          newIndex = (currentIndex + 1) % items.length
        } else {
          newIndex = Math.min(currentIndex + 1, items.length - 1)
        }
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      }

      setCurrentIndices((prev) => ({
        ...prev,
        [tickerId]: newIndex,
      }))

      return items[newIndex] || null
    },
    [originalItems, currentIndices],
  )

  const doNext = useCallback(
    (tickerId: string, autoLoop = true): TickerItem | null => {
      return navigateToItem(tickerId, "next", autoLoop)
    },
    [navigateToItem],
  )

  const doPrevious = useCallback(
    (tickerId: string): TickerItem | null => {
      return navigateToItem(tickerId, "previous", true)
    },
    [navigateToItem],
  )

  return (
    <TickerContext.Provider
      value={{
        setOriginalItems,
        doNext,
        doPrevious,
        getCurrentItem,
        getQueueLength,
        getQueuePosition,
      }}
    >
      {children}
    </TickerContext.Provider>
  )
}
