"use client"

import {
  SwitcherContextProvider,
  useSwitcher,
} from "@/registry/hooks/use-switcher"
import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

type SwitcherProps = {
  defaultValue: string
  children: React.ReactNode
  className?: string
  role?: string
}

export const Switcher = ({
  defaultValue,
  children,
  className,
  role,
  ...props
}: SwitcherProps) => {
  const stuffedProps = { ...props, defaultValue, className, role }

  return (
    <SwitcherContextProvider defaultValue={defaultValue}>
      <SwitcherMapper {...stuffedProps}>{children}</SwitcherMapper>
    </SwitcherContextProvider>
  )
}
Switcher.displayName = "Switcher"

interface SwitcherMapperProps {
  children: React.ReactNode
  className?: string
  role?: string
}

const SwitcherMapper = ({
  children,
  className,
  role,
  ...props
}: SwitcherMapperProps) => {
  const { setValues } = useSwitcher()
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
        "bg-accent flex gap-1 rounded-md p-1 shadow-inner",
        className,
      )}
      role={role || "radiogroup"}
      {...props}
    >
      {children}
    </div>
  )
}

interface SwitcherItemProps extends React.ComponentPropsWithoutRef<"button"> {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  role?: string
  ariaChecked?: boolean
}

export const SwitcherItem = ({
  value,
  children,
  className,
  disabled,
  role,
  ...props
}: SwitcherItemProps) => {
  const { selectItem, selectedValue, selectNextItem } = useSwitcher()
  const selfRef = useRef<HTMLButtonElement>(null)
  const isSelected = selectedValue === value
  const hasMounted = useRef(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    selectItem(value)
    e.currentTarget.dataset.state = "active"
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") selectNextItem("next")
    if (e.key === "ArrowLeft") selectNextItem("previous")
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
        "bg-accent text-muted-foreground focus:outline-primary data-[state=active]:bg-background data-[state=active]:text-foreground cursor-pointer rounded-sm px-4 py-1 transition-colors duration-300 disabled:cursor-not-allowed data-[state=active]:shadow",
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
SwitcherItem.displayName = "SwitcherItem"
