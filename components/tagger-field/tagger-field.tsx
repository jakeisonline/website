"use client"

import { useRef } from "react"
import TaggerInput from "./tagger-input"
import TaggerFieldContextProvider from "@/contexts/tagger-field-context-provider"
import TaggerTags from "./tagger-tags"

const TaggerField = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Only match a click on the parent element, but not e.g. tags
    if (e.target === e.currentTarget) {
      inputRef.current && inputRef.current.focus()
    }
  }

  return (
    <TaggerFieldContextProvider inputRef={inputRef}>
      <div
        onClick={handleClick}
        className="flex flex-wrap max-w-2xl gap-2 px-2 py-2 text-black bg-white border-2 border-white rounded-lg shadow-sm peer hover:shadow hover:shadow-indigo-300/40 hover:cursor-pointer hover:border-indigo-50 min-w-56 hover:focus-within:shadow-none focus-within:border-indigo-300 hover:focus-within:border-indigo-300"
      >
        <TaggerTags />
        <TaggerInput placeholder="+ Add Tag" />
      </div>
    </TaggerFieldContextProvider>
  )
}

export default TaggerField
