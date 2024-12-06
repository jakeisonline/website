"use client"

import {
  SegmentedControlContextProvider,
  useSegmentedControl,
} from "@/registry/hooks/use-segmented-control"
import { cn } from "@/lib/utils"

type SegmentedControlProps = {
  defaultValue: string
  children: React.ReactNode
}

export const SegmentedControl = ({
  defaultValue,
  children,
}: SegmentedControlProps) => {
  return (
    <SegmentedControlContextProvider defaultValue={defaultValue}>
      <div className="flex gap-1 rounded-md bg-accent p-1">{children}</div>
    </SegmentedControlContextProvider>
  )
}

interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string
  children: React.ReactNode
  className?: string
}

export const SegmentedControlItem = ({
  value,
  className,
  children,
  ...props
}: SegmentedControlItemProps) => {
  const { selectControlItem, selectedValue } = useSegmentedControl()

  const isSelected = selectedValue === value

  const handleClick = () => {
    selectControlItem(value)
  }

  return (
    <button
      className={cn(
        "rounded-sm bg-accent px-4 py-1 text-muted-foreground transition-colors duration-300 focus:outline-primary",
        isSelected && "bg-background text-foreground shadow",
        className,
      )}
      onClick={handleClick}
      value={value}
      {...props}
    >
      {children}
    </button>
  )
}
