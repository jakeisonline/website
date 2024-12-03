"use client"

import { useRef, useState } from "react"
import { CrossIcon } from "lucide-react"
import {
  useTaggerFieldContext,
  TaggerFieldContextProvider,
} from "@/registry/hooks/use-tagger"

export const Tagger = () => {
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
        className="flex flex-wrap max-w-2xl gap-2 px-2 py-2 text-black bg-white border-2 border-white rounded-lg shadow-sm peer min-w-56 focus-within:border-indigo-300 hover:cursor-pointer hover:border-indigo-50 hover:shadow hover:shadow-indigo-300/40 hover:focus-within:border-indigo-300 hover:focus-within:shadow-none"
      >
        <TaggerTags />
        <TaggerInput placeholder="+ Add Tag" />
      </div>
    </TaggerFieldContextProvider>
  )
}
Tagger.displayName = "Tagger"

interface TaggerInputProps {
  placeholder: string // String displayed as the input's placeholder
}

export const TaggerInput = ({ placeholder }: TaggerInputProps) => {
  const [tag, tagQuery] = useState("")
  const { inputRef, handleAddTag, handleRemoveLastTag } =
    useTaggerFieldContext()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow users to keep seeing what they're typing, as expected
    const curInputValue = e.target.value
    tagQuery(curInputValue)
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // We're only interested in enter and backspace
    if (e.key !== "Enter" && e.key !== "Backspace") return

    const tagQueryValue = tag

    switch (e.key) {
      case "Enter":
        if (tagQueryValue !== "" && tagQueryValue.trim().length !== 0) {
          handleAddTag(tagQueryValue)
          tagQuery("")
        }
        return
      case "Backspace":
        if (tagQueryValue === "") {
          handleRemoveLastTag()
        }
        return
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={tag}
      onKeyDown={handleKeydown}
      onChange={handleInput}
      placeholder={placeholder}
      className="m-w-1 bg-inherit py-1 placeholder:pl-0.5 placeholder:font-bold hover:cursor-pointer focus:border-0 focus:outline-none focus:hover:cursor-text"
    />
  )
}
TaggerInput.displayName = "TaggerInput"

interface TaggerTagProps {
  label: string // String displayed as the tag's label
}

export const TaggerTag = ({ label }: TaggerTagProps) => {
  const { handleRemoveTag } = useTaggerFieldContext()

  const handleClick = () => {
    handleRemoveTag(label)
  }

  return (
    <div className="flex rounded-lg bg-gray-100 py-1 pl-2.5 pr-1.5">
      <span className="mr-0.5">{label}</span>
      <div
        className="ml-0.5 flex rounded-full px-1 py-0.5 opacity-55 hover:bg-indigo-200 hover:opacity-100"
        onClick={handleClick}
      >
        <CrossIcon className="relative top-0.5 h-4 w-4" />
      </div>
    </div>
  )
}

export const TaggerTags = () => {
  const { tags } = useTaggerFieldContext()

  return (
    <>
      {tags.map((label: string, index: number) => (
        <TaggerTag label={label} key={index} />
      ))}
    </>
  )
}
TaggerTags.displayName = "TaggerTags"
