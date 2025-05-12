import { createContext, useContext, useRef, useState } from "react"

export const useSwitcher = () => {
  const context = useContext(SwitcherContext)

  if (!context) {
    throw new Error("useSwitcher must be used within a SwitcherContextProvider")
  }

  return context
}

type SwitcherContextType = {
  selectedValue: string | null
  selectItem: (value: string) => void
  setValues: (value: string[]) => void
  selectNextItem: (direction: "next" | "previous") => void
}

export const SwitcherContext = createContext<SwitcherContextType>({
  selectedValue: null,
  selectItem: () => {},
  setValues: () => {},
  selectNextItem: () => {},
})

type SwitcherContextProviderProps = {
  defaultValue: string
  children: React.ReactNode
}

export const SwitcherContextProvider = ({
  defaultValue,
  children,
}: SwitcherContextProviderProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)
  const values = useRef<string[]>([])

  const setValues = (value: string[]) => {
    values.current = value
  }

  const selectItem = (value: string) => {
    setSelectedValue(value)
  }

  const selectNextItem = (direction: "next" | "previous") => {
    const currentIndex = values.current.indexOf(selectedValue)
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % values.current.length
        : (currentIndex - 1 + values.current.length) % values.current.length
    setSelectedValue(values.current[nextIndex])
  }

  return (
    <SwitcherContext.Provider
      value={{
        selectedValue,
        selectItem,
        setValues,
        selectNextItem,
      }}
    >
      {children}
    </SwitcherContext.Provider>
  )
}
