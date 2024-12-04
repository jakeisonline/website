"use client"

import { useRef, useState } from "react"
import { X } from "lucide-react"
import {
  useTaggerFieldContext,
  TaggerFieldContextProvider,
} from "@/registry/hooks/use-tagger"
import { cn } from "@/lib/utils"

interface TaggerProps {
  children?: React.ReactNode
  className?: string
  initialTags?: string[]
}

export const Tagger = ({ children, className, initialTags }: TaggerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Only match a click on the parent element, but not e.g. tags
    if (e.target === e.currentTarget) {
      inputRef.current && inputRef.current.focus()
    }
  }

  return (
    <TaggerFieldContextProvider inputRef={inputRef} initialTags={initialTags}>
      <div
        onClick={handleClick}
        className={cn(
          "peer flex max-w-2xl flex-wrap gap-2 rounded-md bg-background p-1 text-foreground inner-border focus-within:inner-border-2 focus-within:inner-border-primary hover:cursor-pointer hover:inner-border-2",
          className,
        )}
      >
        {children}
      </div>
    </TaggerFieldContextProvider>
  )
}
Tagger.displayName = "Tagger"

interface TaggerInputProps {
  placeholder: string // String displayed as the input's placeholder
  className?: string
}

export const TaggerInput = ({ placeholder, className }: TaggerInputProps) => {
  const [tag, tagQuery] = useState("")
  const { inputRef, addTag, removeLastTag } = useTaggerFieldContext()

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
          addTag(tagQueryValue)
          tagQuery("")
        }
        return
      case "Backspace":
        if (tagQueryValue === "") {
          removeLastTag()
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
      className={cn(
        "ml-1.5 bg-inherit placeholder:pl-0.5 focus:border-0 focus:outline-none focus:hover:cursor-text",
        className,
      )}
    />
  )
}
TaggerInput.displayName = "TaggerInput"

interface TaggerTagProps {
  label: string // String displayed as the tag's label
  className?: string
}

export const TaggerTag = ({ label, className }: TaggerTagProps) => {
  const { removeTag } = useTaggerFieldContext()

  const handleClick = () => {
    removeTag(label)
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-sm bg-accent pl-2.5 pr-1.5",
        className,
      )}
    >
      <span className="mr-0.5">{label}</span>
      <div
        className="ml-0.5 flex rounded-full px-1 opacity-50 hover:opacity-100"
        onClick={handleClick}
      >
        <X className="relative h-4 w-4" />
      </div>
    </div>
  )
}
TaggerTag.displayName = "TaggerTag"

interface TaggerTagsProps {
  className?: string
}

export const TaggerTags = ({ className }: TaggerTagsProps) => {
  const { tags } = useTaggerFieldContext()

  return (
    <>
      {tags.map((label: string, index: number) => (
        <TaggerTag label={label} key={index} className={className} />
      ))}
    </>
  )
}
TaggerTags.displayName = "TaggerTags"
