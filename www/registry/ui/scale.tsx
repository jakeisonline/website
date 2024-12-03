"use client"

import React, { forwardRef, useEffect } from "react"
import {
  ScaleContextProvider,
  useScaleContext,
} from "@/registry/hooks/use-scale"
import { cn } from "@/lib/utils"

interface ScaleProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactElement
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  ({ children, ...props }, ref) => (
    <ScaleContextProvider>
      <div className="w-full">
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

interface ScaleFielsetProps extends React.ComponentPropsWithoutRef<"fieldset"> {
  children: React.ReactElement
}

export const ScaleFieldset = forwardRef<HTMLFieldSetElement, ScaleFielsetProps>(
  ({ children, ...props }, ref) => {
    const { setTotalSteps, updateSelectedIndex } = useScaleContext()
    const childCount = React.Children.count(children)

    const childrenWithIndex = React.Children.map(children, (child, index) => {
      useEffect(() => {
        if (child.props.defaultChecked) {
          updateSelectedIndex(index)
        }
      }, [])
      return React.cloneElement(child, {
        index,
      })
    })

    setTotalSteps(childCount)

    return (
      <fieldset ref={ref} {...props}>
        {childrenWithIndex}
      </fieldset>
    )
  },
)
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
  isSelected?: Boolean
}

export const ScaleStep = forwardRef<HTMLDivElement, ScaleStepProps>(
  ({ index, id, label, name, isSelected = false, ...props }, ref) => {
    if (index === undefined) throw new Error("Index is required")

    const { updateSelectedIndex, selectedIndex } = useScaleContext()
    const shouldBeSelected = selectedIndex > index

    const handleChange = () => {
      updateSelectedIndex(index)
    }

    return (
      <div className="relative flex flex-col items-center">
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
