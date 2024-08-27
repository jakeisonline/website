import React, { useEffect, useState } from "react"
import { Index } from "@/components/examples/react"
import { codeToHtml } from "shiki"

interface ExampleSourceProps {
  name: string
}

export default function ExampleSource({ name }: ExampleSourceProps) {
  const [html, setHtml] = useState("")

  const Source = React.useMemo(() => {
    const source = Index[name]?.source

    if (!source) return <p>Source not found: {name}</p>

    return source
  }, [name])

  useEffect(() => {
    if (!Source) return
    const source = Index[name]?.source
    const getHighlightedCode = async () => {
      const html = await highlightCode(source)
      setHtml(html)
    }

    getHighlightedCode()
  }, [name, html, Source])

  if (!html) return

  return (
    <React.Suspense
      fallback={
        <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </React.Suspense>
  )
}

async function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: "typescript",
    theme: "poimandres",
  })

  return html
}
