import { useState } from "react"

const useTaggerInputField = () => {
  const [tags, setTags] = useState<string[]>([])

  const handleAddTag = (newTag: string) => {
    // Check a tag has been passed, and it isn't already in the set
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }
  }

  const handleRemoveTag = (tagLabel: string) => {
    if (tagLabel && tags.includes(tagLabel)) {
      const cleansedTags = tags.filter((v) => v !== tagLabel)
      setTags(cleansedTags)
    }
  }

  const handleRemoveLastTag = () => {
    if (tags.length > 0) {
      const slicedTags = tags.slice(0, tags.length - 1)
      setTags(slicedTags)
    }
  }

  return { tags, handleAddTag, handleRemoveTag, handleRemoveLastTag }
}

export default useTaggerInputField
