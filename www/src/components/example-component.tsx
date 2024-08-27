import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { codeToHtml } from "shiki"

interface ExampleComponentProps {
  componentName: string
  exampleCode: string
  children: React.ReactNode
}

export default function ExampleComponent({
  exampleCode,
}: ExampleComponentProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    const getHighlightedCode = async () => {
      const html = await highlightCode(exampleCode)
      setHtml(html)
    }

    getHighlightedCode()
  }, [exampleCode, html])

  if (!html) return

  return (
    <Tabs defaultValue="example">
      <TabsList>
        <TabsTrigger value="example">Example</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="example">{exampleCode}</TabsContent>
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
