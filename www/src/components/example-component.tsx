import React from "react"
import { Index } from "@/components/examples/react"
import { cn } from "@/lib/utils"

interface ExampleComponentProps {
  name: string
  className?: string
}

export default function ExampleComponent({
  name,
  className,
}: ExampleComponentProps) {
  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  return (
    <React.Suspense
      fallback={
        <div
          className={cn(
            "flex w-full items-center justify-center text-sm text-muted-foreground",
            className,
          )}
        >
          Loading...
        </div>
      }
    >
      {Example}
    </React.Suspense>
  )
}
