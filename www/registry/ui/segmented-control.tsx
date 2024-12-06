"use client"

import {
  SegmentedControlContextProvider,
  useSegmentedControl,
} from "@/registry/hooks/use-segmented-control"
import { cn } from "@/lib/utils"

type SegmentedControlProps = {
  defaultValue: string
  children: React.ReactNode
  className?: string
  role?: string
}

export const SegmentedControl = ({
  defaultValue,
  children,
  className,
  role,
  ...props
}: SegmentedControlProps) => {
  return (
    <SegmentedControlContextProvider defaultValue={defaultValue}>
      <div
        className={cn(
          "flex gap-1 rounded-md bg-accent p-1 shadow-inner",
          className,
        )}
        role={role || "radiogroup"}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContextProvider>
  )
}

interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  role?: string
}

export const SegmentedControlItem = ({
  value,
  children,
  className,
  disabled,
  role,
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
      aria-checked={isSelected}
      className={cn(
        "rounded-sm bg-accent px-4 py-1 text-muted-foreground transition-colors duration-300 focus:outline-primary disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      role={role || "radio"}
      onClick={handleClick}
      value={value}
      {...props}
    >
      {children}
    </button>
  )
}
