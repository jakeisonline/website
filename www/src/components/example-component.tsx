import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { codeToHtml } from "shiki"
import { Index } from "@/components/examples/react"

interface ExampleComponentProps {
  name: string
}

export default function ExampleComponent({ name }: ExampleComponentProps) {
  const [html, setHtml] = useState("")

  const Example = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) return <p>Component not found: {name}</p>

    return <Component />
  }, [name])

  useEffect(() => {
    if (!Example) return
    const source = Index[name]?.source
    const getHighlightedCode = async () => {
      const html = await highlightCode(source)
      setHtml(html)
    }

    getHighlightedCode()
  }, [name, html, Example])

  if (!html) return

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="example">
        <React.Suspense
          fallback={
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          }
        >
          {Example}
        </React.Suspense>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </TabsContent>
    </Tabs>
  )
}

async function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: "typescript",
    theme: "poimandres",
  })

  return html
}
