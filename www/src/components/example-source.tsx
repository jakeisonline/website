import React, { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
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

    const fixedSource = fixImports(source)

    return fixedSource
  }, [name])

  useEffect(() => {
    if (!rawSource) return

    const getHighlightedCode = async () => {
      const html = await highlightCode(rawSource.toString())
      setHtml(html)
    }

    getHighlightedCode()
  }, [name, html, rawSource])

  if (!html) return <Loading />

  return (
    <div
      style={{ marginTop: "-0.8rem" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function Loading() {
  return (
    <div className="mt-2 flex min-h-44 w-full flex-col gap-1 rounded-lg border bg-[#1b1e28] p-3 shadow-sm">
      <Skeleton className="h-4 w-52" />
      <Skeleton className="mt-5 h-4 w-20" />
      <Skeleton className="ml-5 h-4 w-28" />
      <Skeleton className="ml-5 h-4 w-28" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-5 h-4 w-52" />
    </div>
  )
}

async function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: "jsx",
    theme: "poimandres",
  })

  return html
}

function fixImports(code: string) {
  return code.replace("@/registry", "@/components")
}
