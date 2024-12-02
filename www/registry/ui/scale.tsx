"use client"

import { forwardRef } from "react"
import { ScaleContextProvider } from "@/registry/hooks/use-scale"

interface ScaleProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactElement
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  ({ children, ...props }, ref) => (
    <ScaleContextProvider>{children}</ScaleContextProvider>
  ),
)
Scale.displayName = "Scale"
