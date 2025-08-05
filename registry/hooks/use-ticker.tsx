import { type TickerItem } from "@/registry/ui/ticker"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

interface TickerContextType {
  addToTicker: (tickerId: string, item: TickerItem) => void
  addMultipleToTicker: (tickerId: string, items: TickerItem[]) => void
  getTickerQueue: (tickerId: string) => TickerItem[]
  consumeFromTicker: (tickerId: string) => TickerItem | null
  getQueueLength: (bannerId: string) => number
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
  const [tickerQueues, setTickerQueues] = useState<
    Record<string, TickerItem[]>
  >({})

  const addToTicker = useCallback((tickerId: string, item: TickerItem) => {
    setTickerQueues((prev) => ({
      ...prev,
      [tickerId]: [...(prev[tickerId] || []), item],
    }))
  }, [])

  const addMultipleToTicker = useCallback(
    (tickerId: string, items: TickerItem[]) => {
      setTickerQueues((prev) => ({
        ...prev,
        [tickerId]: [...(prev[tickerId] || []), ...items],
      }))
    },
    [],
  )

  const getTickerQueue = useCallback(
    (tickerId: string) => tickerQueues[tickerId] || [],
    [tickerQueues],
  )

  const getQueueLength = useCallback(
    (tickerId: string) => (tickerQueues[tickerId] || []).length,
    [tickerQueues],
  )

  const consumeFromTicker = useCallback(
    (tickerId: string): TickerItem | null => {
      const queue = tickerQueues[tickerId]
      if (!queue || queue.length === 0) return null
      const item = queue[0]
      setTickerQueues((prev) => ({
        ...prev,
        [tickerId]: queue.slice(1),
      }))
      return item
    },
    [tickerQueues],
  )

  return (
    <TickerContext.Provider
      value={{
        addToTicker,
        addMultipleToTicker,
        getTickerQueue,
        consumeFromTicker,
        getQueueLength,
      }}
    >
      {children}
    </TickerContext.Provider>
  )
}
