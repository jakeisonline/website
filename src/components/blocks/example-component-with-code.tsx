import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/components/examples/react"
import ExampleSource from "@/components/blocks/example-source"
import ExampleComponent from "@/components/blocks/example-component"

interface ExampleComponentWithCodeProps {
  name: string
}

export default function ExampleComponentWithCode({
  name,
}: ExampleComponentWithCodeProps) {
  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="example"
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <div className="not-prose flex min-h-44 w-auto items-center justify-center p-6 pt-6">
          <ExampleComponent name={name} />
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <ExampleSource name={name} />
      </TabsContent>
    </Tabs>
  )
}
