"use client"

import { cn } from "@/lib/utils"
import { useTicker } from "@/registry/hooks/use-ticker"
import { ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export interface TickerItem {
  id: string
  badge?: string
  title: string
  action?: string
  href?: string
}

interface TickerProps {
  id: string
  initialItems?: TickerItem[]
  autoAdvance?: boolean
  autoAdvanceDelay?: number
  autoLoop?: boolean
  className?: string
}

export function Ticker({
  id,
  initialItems = [],
  autoAdvance = true,
  autoAdvanceDelay = 3000,
  autoLoop = true,
  className = "",
}: TickerProps) {
  const {
    getTickerQueue,
    consumeFromTicker,
    addMultipleToTicker,
    getQueueLength,
  } = useTicker()
  const [currentItem, setCurrentItem] = useState<TickerItem | null>(
    initialItems[0] || null,
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationState, setAnimationState] = useState<
    "visible" | "exiting" | "entering"
  >("visible")
  const didInit = useRef(false)

  // Add initial items to queue once
  useEffect(() => {
    if (!didInit.current && initialItems.length > 1) {
      addMultipleToTicker(id, initialItems.slice(1))
      didInit.current = true
    }
  }, [id, addMultipleToTicker, initialItems])

  // Watch queue length to trigger processing
  const queueLength = getQueueLength(id)

  // Process queue when it has items and we're not animating
  useEffect(() => {
    if (queueLength === 0 || isAnimating) return

    const queue = getTickerQueue(id)
    const nextItem = queue[0]

    if (!nextItem) return

    // Skip if it's the same item
    if (currentItem && nextItem.id === currentItem.id) {
      consumeFromTicker(id)
      return
    }

    // Start animation sequence
    setIsAnimating(true)
    setAnimationState("exiting")

    setTimeout(() => {
      const item = consumeFromTicker(id)
      if (item) {
        setCurrentItem(item)
        setAnimationState("entering")

        setTimeout(() => {
          setAnimationState("visible")
          setIsAnimating(false)
        }, 100)
      } else {
        setIsAnimating(false)
      }
    }, 100)
  }, [
    queueLength,
    isAnimating,
    currentItem,
    id,
    getTickerQueue,
    consumeFromTicker,
    autoAdvanceDelay,
  ])

  // Auto advance functionality
  useEffect(() => {
    if (!autoAdvance || queueLength === 0 || isAnimating) return

    const timer = setTimeout(() => {
      setIsAnimating(true)
      setAnimationState("exiting")

      setTimeout(() => {
        const item = consumeFromTicker(id)
        if (item) {
          setCurrentItem(item)
          setAnimationState("entering")

          setTimeout(() => {
            setAnimationState("visible")
            setIsAnimating(false)
          }, 100)
        } else {
          setIsAnimating(false)
        }
      }, 100)
    }, autoAdvanceDelay)

    return () => clearTimeout(timer)
  }, [
    autoAdvance,
    autoAdvanceDelay,
    queueLength,
    isAnimating,
    id,
    consumeFromTicker,
  ])

  if (!currentItem) {
    return null
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border rounded-full p-1 w-4/5",
        className,
      )}
    >
      <div className="items-center gap-3">
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-300 ease-in-out",
            animationState === "exiting" && "translate-y-[-10px] opacity-0",
            animationState === "entering" && "translate-y-[10px] opacity-0",
            animationState === "visible" && "translate-y-[0px] opacity-100",
          )}
          key={currentItem.id}
        >
          {currentItem.badge && (
            <span className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
              {currentItem.badge}
            </span>
          )}

          <span className="text-sm font-medium flex-1">
            {currentItem.title}
          </span>

          {currentItem.action && (
            <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-sm">{currentItem.action}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
