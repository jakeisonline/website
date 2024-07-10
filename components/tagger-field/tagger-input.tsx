import useTaggerFieldContext from "@/hooks/use-tagger-field-context"
import { useState, RefObject } from "react"

interface TaggerInputProps {
  placeholder: string // String displayed as the input's placeholder
}

const TaggerInput = ({ placeholder }: TaggerInputProps) => {
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
      className="py-1 bg-inherit placeholder:font-bold focus:border-0 focus:outline-none m-w-1 hover:cursor-pointer focus:hover:cursor-text placeholder:pl-0.5"
    />
  )
}

export default TaggerInput
