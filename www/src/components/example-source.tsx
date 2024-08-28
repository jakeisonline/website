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

  if (!html) return <Loading />

  return (
    <Loading />
    // <div
    //   style={{ marginTop: "-0.8rem" }}
    //   dangerouslySetInnerHTML={{ __html: html }}
    // />
  )
}

function Loading() {
  return (
    <div className="flex flex-col gap-1 w-full rounded-lg border bg-[#1b1e28] shadow-sm min-h-44 mt-2 p-3">
      <Skeleton className="w-52 h-4" />
      <Skeleton className="mt-5 w-20 h-4" />
      <Skeleton className="ml-5 w-28 h-4" />
      <Skeleton className="ml-5 w-28 h-4" />
      <Skeleton className="w-28 h-4" />
      <Skeleton className="mt-5 w-52 h-4" />
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
