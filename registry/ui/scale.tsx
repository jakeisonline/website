"use client"

import { cn } from "@/lib/utils"
import {
  ScaleContextProvider,
  useScaleContext,
} from "@/registry/hooks/use-scale"
import React, { forwardRef, useEffect } from "react"

interface ScaleProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  className?: string
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  ({ children, className, ...props }, ref) => (
    <ScaleContextProvider>
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="flex min-h-8 w-full justify-center py-4">
          <div className="relative flex h-1 w-11/12 flex-none touch-none flex-row items-center rounded-full bg-blue-100">
            <ScaleFill />
            <ScaleFieldset className="absolute flex w-full justify-between">
              {children}
            </ScaleFieldset>
          </div>
        </div>
      </div>
    </ScaleContextProvider>
  ),
)
Scale.displayName = "Scale"

interface ScaleFieldsetProps
  extends React.ComponentPropsWithoutRef<"fieldset"> {
  children: React.ReactNode
}

export const ScaleFieldset = forwardRef<
  HTMLFieldSetElement,
  ScaleFieldsetProps
>(({ children, ...props }, ref) => {
  const { setTotalSteps, updateSelectedIndex } = useScaleContext()
  const childCount = React.Children.count(children)

  const childrenWithIndex = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null

    if (
      typeof child.type === "function" &&
      (child.type as React.ComponentType).displayName !== "ScaleStep"
    ) {
      throw new Error("Invalid child type, only ScaleStep is allowed")
    }

    return React.cloneElement(child as React.ReactElement<ScaleStepProps>, {
      index,
    })
  })

  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      if (
        React.isValidElement(child) &&
        (child as React.ReactElement<ScaleStepProps>).props.defaultChecked
      ) {
        updateSelectedIndex(index)
      }
    })
  }, [])

  setTotalSteps(childCount)

  return (
    <fieldset ref={ref} {...props}>
      {childrenWithIndex}
    </fieldset>
  )
})
ScaleFieldset.displayName = "ScaleFieldset"

export const ScaleFill = () => {
  const { selectedIndex, getTotalSteps } = useScaleContext()
  const totalSteps = getTotalSteps()

  if (!selectedIndex || !totalSteps) return

  const fillWidth = (selectedIndex / (totalSteps - 1)) * 100

  return <div style={{ width: `${fillWidth}%` }} className="h-1 bg-blue-600" />
}
ScaleFill.displayName = "ScaleFill"

interface ScaleStepProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string
  label: string
  name: string
  index?: number
}

export const ScaleStep = forwardRef<HTMLDivElement, ScaleStepProps>(
  ({ index, id, label, name, ...props }, ref) => {
    if (index === undefined) throw new Error("Index is required")

    const { updateSelectedIndex, selectedIndex } = useScaleContext()
    const shouldBeSelected = selectedIndex > index

    const handleChange = () => {
      updateSelectedIndex(index)
    }

    return (
      <div ref={ref} className="relative flex flex-col items-center">
        <input
          onChange={handleChange}
          data-index={index}
          type="radio"
          id={id}
          name={name}
          className={cn(
            "peer h-4 w-4 appearance-none rounded-full border-4 border-background bg-blue-100 checked:border-blue-600 checked:bg-background hover:cursor-pointer",
            shouldBeSelected && "bg-blue-600",
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute bottom-5 text-center leading-tight hover:cursor-pointer peer-checked:font-bold"
        >
          {label}
        </label>
      </div>
    )
  },
)
ScaleStep.displayName = "ScaleStep"
