import { Index } from "@/content/articles/examples"
import { cn } from "@/lib/utils"
import React from "react"

interface ExampleComponentProps {
  name: string
  caption?: string
  className?: string
}

export default function ExampleComponent({
  name,
  caption,
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
      <div className="my-6" id={`example-${name}`}>
        <div
          className={cn(
            "ring-offset-background focus-visible:ring-ring md:mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg border bg-card text-card-foreground shadow-sm px-2 @sm:px-4 py-2 overflow-x-scroll",
            className,
          )}
        >
          <div className="not-prose flex min-h-32 w-auto px-0 py-2 md:px-4 md:py-6 @container items-center justify-center">
            {Example}
          </div>
        </div>
        {caption && (
          <div className="text-xs text-muted-foreground text-center md:px-4 mt-1.5 mx-auto">
            {caption}
          </div>
        )}
      </div>
    </React.Suspense>
  )
}
