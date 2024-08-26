import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExampleComponentProps {
  componentName: string
  children: React.ReactNode
}

export default function ExampleComponent({
  componentName,
  children,
}: ExampleComponentProps) {
  return (
    <>
      <Tabs defaultValue="example">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">Example of {componentName}</TabsContent>
        <TabsContent value="code" className="mt-0">
          {children}
        </TabsContent>
      </Tabs>
    </>
  )
}
