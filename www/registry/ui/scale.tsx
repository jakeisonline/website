"use client"

import { forwardRef } from "react"
import { ScaleContextProvider } from "@/registry/hooks/use-scale"
import { cn } from "@/lib/utils"

interface ScaleProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactElement
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  ({ children, ...props }, ref) => (
    <ScaleContextProvider>{children}</ScaleContextProvider>
  ),
)
Scale.displayName = "Scale"

interface ScaleStepProps extends React.ComponentPropsWithoutRef<"div"> {
  id: string
  label: string
  name: string
  isSelected?: Boolean
}

export const ScaleStep = forwardRef<HTMLDivElement, ScaleStepProps>(
  ({ id, label, name, isSelected = false, ...props }, ref) => (
    <div className="relative flex flex-col items-center">
      <input
        type="radio"
        id={id}
        name={name}
        className={cn(
          "peer h-4 w-4 appearance-none rounded-full border-4 border-background bg-blue-100 checked:border-blue-600 checked:bg-background hover:cursor-pointer",
          isSelected && "bg-blue-600",
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
  ),
)
ScaleStep.displayName = "ScaleStep"
