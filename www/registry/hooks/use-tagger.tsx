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
  addTag: (newTag: string) => void
  removeTag: (tagLabel: string) => void
  removeLastTag: () => void
  inputRef: RefObject<HTMLInputElement> | null
}

export const TaggerFieldContext = createContext<TaggerFieldContextType>({
  tags: [],
  addTag: () => {},
  removeTag: () => {},
  removeLastTag: () => {},
  inputRef: null,
})

type TaggerFieldContextProviderProps = {
  inputRef: RefObject<HTMLInputElement>
  children: ReactElement
  initialTags?: string[]
}

export const TaggerFieldContextProvider = ({
  inputRef,
  children,
  initialTags,
}: TaggerFieldContextProviderProps) => {
  const [tags, setTags] = useState<string[]>(initialTags || [])

  const addTag = (newTag: string) => {
    // Check a tag has been passed, and it isn't already in the set
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }
  }

  const removeTag = (tagLabel: string) => {
    if (tagLabel && tags.includes(tagLabel)) {
      const cleansedTags = tags.filter((v) => v !== tagLabel)
      setTags(cleansedTags)
    }
  }

  const removeLastTag = () => {
    if (tags.length > 0) {
      const slicedTags = tags.slice(0, tags.length - 1)
      setTags(slicedTags)
    }
  }

  return (
    <TaggerFieldContext.Provider
      value={{
        tags,
        addTag,
        removeTag,
        removeLastTag,
        inputRef,
      }}
    >
      {children}
    </TaggerFieldContext.Provider>
  )
}
