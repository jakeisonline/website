import React, { useRef } from "react"
import TaggerInputField from "./TaggerInputField"
import TaggerTag from "./TaggerTag"
import useTaggerInputField from "../hooks/useTaggerInputField"

const TaggerField = () => {
  const { tags, handleAddTag, handleRemoveTag, handleRemoveLastTag } =
    useTaggerInputField()
  const taggerInputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Only match a click on the parent element, but not e.g. tags
    if (e.target === e.currentTarget) {
      taggerInputRef.current && taggerInputRef.current.focus()
    }
  }

  return (
    <div
      onClick={handleClick}
      className="peer hover:shadow hover:shadow-indigo-300/40 hover:cursor-pointer hover:border-indigo-50 min-w-56 rounded-lg bg-white text-black shadow-sm max-w-2xl px-2 py-2 flex flex-wrap gap-2 border-2 border-white hover:focus-within:shadow-none focus-within:border-indigo-300 hover:focus-within:border-indigo-300"
    >
      {tags.map((label: string, index: number) => (
        <TaggerTag label={label} key={index} removeTag={handleRemoveTag} />
      ))}
      <TaggerInputField
        placeholder="+ Add Tag"
        addTag={handleAddTag}
        removeLastTag={handleRemoveLastTag}
        taggerInputRef={taggerInputRef}
      />
    </div>
  )
}

export default TaggerField
