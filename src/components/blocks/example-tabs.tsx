import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExampleTabsProps {
  children: React.ReactNode
  codeContent?: React.ReactNode
}

export function ExampleTabs({ children, codeContent }: ExampleTabsProps) {
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
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        {codeContent}
      </TabsContent>
    </Tabs>
  )
}
