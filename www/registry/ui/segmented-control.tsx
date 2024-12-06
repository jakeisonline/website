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
  disabled?: boolean
  className?: string
}

export const SegmentedControlItem = ({
  value,
  children,
  className,
  disabled,
  ...props
}: SegmentedControlItemProps) => {
  const { selectControlItem, selectedValue } = useSegmentedControl()

  const isSelected = selectedValue === value

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    selectControlItem(value)
    e.currentTarget.dataset.state = "active"
  }

  return (
    <button
      aria-disabled={disabled}
      aria-selected={isSelected}
      className={cn(
        "rounded-sm bg-accent px-4 py-1 text-muted-foreground transition-colors duration-300 focus:outline-primary disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      onClick={handleClick}
      value={value}
      {...props}
    >
      {children}
    </button>
  )
}
