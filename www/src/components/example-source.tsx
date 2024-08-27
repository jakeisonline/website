import React, { useEffect, useState } from "react"
import { Index } from "@/components/examples/react"
import { codeToHtml } from "shiki"

interface ExampleSourceProps {
  name: string
}

export default function ExampleSource({ name }: ExampleSourceProps) {
  const [html, setHtml] = useState("")

  const rawSource = React.useMemo(() => {
    const source = Index[name]?.source

    if (!source) return <p>Source not found: {name}</p>

    return source
  }, [name])

  useEffect(() => {
    if (!rawSource) return
    const source = Index[name]?.source
    const getHighlightedCode = async () => {
      const html = await highlightCode(source)
      setHtml(html)
    }

    getHighlightedCode()
  }, [name, html, rawSource])

  if (!html)
    return (
      <div className="flex w-full rounded-lg border bg-card text-card-foreground shadow-sm min-h-44 mt-2 items-center justify-center">
        Loading...
      </div>
    )

  return (
    <div
      style={{ marginTop: "-0.8rem" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

async function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: "jsx",
    theme: "poimandres",
  })

  return html
}
