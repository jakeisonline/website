"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTicker } from "@/registry/hooks/use-ticker"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  canLoop?: boolean
  className?: string
}

export function Ticker({
  id,
  initialItems = [],
  canLoop = true,
  className = "",
}: TickerProps) {
  const {
    setOriginalItems,
    doNext,
    doPrevious,
    getCurrentItem,
    getStackLength,
    getStackPosition,
  } = useTicker()
  const [currentItem, setCurrentItem] = useState<TickerItem | null>(
    initialItems[0] || null,
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationState, setAnimationState] = useState<
    "visible" | "exiting" | "entering"
  >("visible")
  const didInit = useRef(false)

  // Set original items once
  useEffect(() => {
    if (!didInit.current && initialItems.length > 0) {
      setOriginalItems(id, initialItems)
      didInit.current = true
    }
  }, [id, setOriginalItems, initialItems])

  // Get current item from hook
  useEffect(() => {
    const item = getCurrentItem(id)
    if (item && item.id !== currentItem?.id) {
      setCurrentItem(item)
    }
  }, [id, getCurrentItem, currentItem?.id])

  const toDirection = (direction: "next" | "previous") => {
    if (isAnimating) return

    // Check bounds for non-looping scenarios
    if (
      direction === "next" &&
      getStackPosition(id) === getStackLength(id) - 1 &&
      !canLoop
    ) {
      return
    }
    if (direction === "previous" && getStackPosition(id) === 0 && !canLoop) {
      return
    }

    setIsAnimating(true)
    setAnimationState("exiting")

    setTimeout(() => {
      const item = direction === "next" ? doNext(id, canLoop) : doPrevious(id)
      if (item) {
        setCurrentItem(item)
        setAnimationState("entering")

        setTimeout(() => {
          setAnimationState("visible")
          setIsAnimating(false)
        }, 300)
      } else {
        setIsAnimating(false)
      }
    }, 300)
  }

  const handleNext = () => {
    toDirection("next")
  }

  const handlePrevious = () => {
    toDirection("previous")
  }

  if (!currentItem) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative overflow-hidden border border-border rounded-full p-1 h-8 w-full flex items-center",
          className,
        )}
      >
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

          <span className="text-sm font-medium flex-1 first:ml-1.5 last:mr-1.5">
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

      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
