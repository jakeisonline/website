"use client"

import { useRef, useState } from "react"
import { X } from "lucide-react"
import {
  useTaggerFieldContext,
  TaggerFieldContextProvider,
} from "@/registry/hooks/use-tagger"
import { cn } from "@/lib/utils"

interface TaggerProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode
  className?: string
  initialTags?: string[]
}

export const Tagger = ({ children, className, initialTags }: TaggerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Only match a click on the parent element, but not e.g. tags
    if (e.target === e.currentTarget) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  return (
    <TaggerFieldContextProvider inputRef={inputRef} initialTags={initialTags}>
      <div
        onClick={handleClick}
        className={cn(
          "peer bg-background text-foreground focus-within:outline-primary focus-within:border-primary hover:outline-primary hover:border-primary flex w-full flex-wrap gap-1 rounded-md border p-1 outline outline-transparent hover:cursor-pointer",
          className,
        )}
      >
        {children}
      </div>
    </TaggerFieldContextProvider>
  )
}
Tagger.displayName = "Tagger"

interface TaggerInputProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string
}

export const TaggerInput = ({ className, ...props }: TaggerInputProps) => {
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
      className={cn(
        "bg-inherit pl-0.5 placeholder:text-sm focus:border-0 focus:outline-none focus:hover:cursor-text",
        className,
      )}
      {...props}
    />
  )
}
TaggerInput.displayName = "TaggerInput"

interface TaggerTagProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string // String displayed as the tag's label
  className?: string
}

export const TaggerTag = ({ label, className }: TaggerTagProps) => {
  const { removeTag, inputRef } = useTaggerFieldContext()

  const handleClick = () => {
    removeTag(label)
    inputRef?.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      removeTag(label)
    }

    if (e.key === "Escape") {
      inputRef?.current?.focus()
    }
  }

  return (
    <li
      className={cn(
        "bg-accent focus:border-primary flex items-center rounded-sm border-2 border-transparent pr-1.5 pl-2.5 focus:ring-0 focus:outline-0",
        className,
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Remove ${label} from this list`}
    >
      <span className="mr-0.5">{label}</span>
      <button
        className="ml-0.5 flex cursor-pointer rounded-full px-1 opacity-50 hover:opacity-100"
        onClick={handleClick}
        tabIndex={-1}
      >
        <X className="relative h-4 w-4" />
      </button>
    </li>
  )
}
TaggerTag.displayName = "TaggerTag"

interface TaggerTagsProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
}

export const TaggerTags = ({ className }: TaggerTagsProps) => {
  const { tags } = useTaggerFieldContext()

  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((label: string, index: number) => (
        <TaggerTag label={label} key={index} className={className} />
      ))}
    </ul>
  )
}
TaggerTags.displayName = "TaggerTags"
