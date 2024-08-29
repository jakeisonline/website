import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/components/examples/react"
import ExampleSource from "@/components/example-source"

interface ExampleComponentProps {
  name: string
  inclSource?: boolean
}

export default function ExampleComponent({
  name,
  inclSource = true,
}: ExampleComponentProps) {
  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  if (!inclSource)
    return <ExampleComponentWrapper>{Example}</ExampleComponentWrapper>

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="example">
        <ExampleComponentWrapper>{Example}</ExampleComponentWrapper>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <ExampleSource name={name} />
      </TabsContent>
    </Tabs>
  )
}

function ExampleComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 pt-6 min-h-44 flex w-auto justify-center items-center">
        <React.Suspense
          fallback={
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
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
