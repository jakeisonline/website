import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type RefObject,
} from "react"

export const useTaggerFieldContext = () => {
  const context = useContext(TaggerFieldContext)

  if (!context) {
    throw new Error(
      "useTaggerFieldContext must be used within a TaggerFieldContextProvider",
    )
  }

  return context
}

type TaggerFieldContextType = {
  tags: string[]
  handleAddTag: (newTag: string) => void
  handleRemoveTag: (tagLabel: string) => void
  handleRemoveLastTag: () => void
  inputRef: RefObject<HTMLInputElement> | null
}

export const TaggerFieldContext = createContext<TaggerFieldContextType>({
  tags: [],
  handleAddTag: () => {},
  handleRemoveTag: () => {},
  handleRemoveLastTag: () => {},
  inputRef: null,
})

type TaggerFieldContextProviderProps = {
  inputRef: RefObject<HTMLInputElement>
  children: ReactElement
}

export const TaggerFieldContextProvider = ({
  inputRef,
  children,
}: TaggerFieldContextProviderProps) => {
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

  return (
    <TaggerFieldContext.Provider
      value={{
        tags,
        handleAddTag,
        handleRemoveTag,
        handleRemoveLastTag,
        inputRef,
      }}
    >
      {children}
    </TaggerFieldContext.Provider>
  )
}
