import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/components/examples/react"
import ExampleSource from "@/components/example-source"
import { cn } from "@/lib/utils"

interface ExampleComponentProps {
  name: string
  inclSource?: boolean
  isInteractive?: boolean
}

export default function ExampleComponent({
  name,
  inclSource = true,
  isInteractive = true,
}: ExampleComponentProps) {
  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  if (!inclSource)
    return <ExampleComponentWrapper isInteractive={isInteractive}>{Example}</ExampleComponentWrapper>

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="example">
        <ExampleComponentWrapper isInteractive={isInteractive}>{Example}</ExampleComponentWrapper>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <ExampleSource name={name} />
      </TabsContent>
    </Tabs>
  )
}

function ExampleComponentWrapper({ isInteractive, children }: { isInteractive?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("bg-card text-card-foreground rounded-lg border shadow-sm", !isInteractive && "pointer-events-none")}>
      <div className="flex min-h-44 w-auto items-center justify-center p-6 pt-6">
        <React.Suspense
          fallback={
            <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
              Loading...
            </div>
          }
        >
          {children}
        </React.Suspense>
      </div>
    </div>
  )
}
