"use client"

import {
  SegmentedControlContextProvider,
  useSegmentedControl,
} from "@/registry/hooks/use-segmented-control"
import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

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
  const stuffedProps = { ...props, defaultValue, className, role }

  return (
    <SegmentedControlContextProvider defaultValue={defaultValue}>
      <SegmentedControlMapper {...stuffedProps}>
        {children}
      </SegmentedControlMapper>
    </SegmentedControlContextProvider>
  )
}
SegmentedControl.displayName = "SegmentedControl"

interface SegmentedControlMapperProps {
  children: React.ReactNode
  className?: string
  role?: string
}

const SegmentedControlMapper = ({
  children,
  className,
  role,
  ...props
}: SegmentedControlMapperProps) => {
  const { setValues } = useSegmentedControl()
  const controlValues: string[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.value) {
      controlValues.push(child.props.value)
    }

    setValues(controlValues)
  })

  return (
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
  )
}

interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<"button"> {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  role?: string
  ariaChecked?: boolean
}

export const SegmentedControlItem = ({
  value,
  children,
  className,
  disabled,
  role,
  ...props
}: SegmentedControlItemProps) => {
  const { selectControlItem, selectedValue, selectNextControlItem } =
    useSegmentedControl()
  const selfRef = useRef<HTMLButtonElement>(null)
  const isSelected = selectedValue === value
  const hasMounted = useRef(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    selectControlItem(value)
    e.currentTarget.dataset.state = "active"
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") selectNextControlItem("next")
    if (e.key === "ArrowLeft") selectNextControlItem("previous")
  }

  useEffect(() => {
    if (isSelected && hasMounted.current) {
      selfRef.current?.focus()
    }

    hasMounted.current = true
  }, [isSelected])

  return (
    <button
      aria-disabled={disabled}
      aria-checked={isSelected}
      aria-selected={isSelected}
      className={cn(
        "rounded-sm bg-accent px-4 py-1 text-muted-foreground transition-colors duration-300 focus:outline-primary disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      role={role || "radio"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      value={value}
      ref={selfRef}
      {...props}
    >
      {children}
    </button>
  )
}
SegmentedControlItem.displayName = "SegmentedControlItem"
