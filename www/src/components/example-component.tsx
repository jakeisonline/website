import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/components/examples/react"
import ExampleSource from "@/components/example-source"

interface ExampleComponentProps {
  name: string
}

export default function ExampleComponent({ name }: ExampleComponentProps) {
  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="example">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pt-6 min-h-44 flex w-auto justify-center items-center">
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  Loading...
                </div>
              }
            >
              {Example}
            </React.Suspense>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <ExampleSource name={name} />
      </TabsContent>
    </Tabs>
  )
}
