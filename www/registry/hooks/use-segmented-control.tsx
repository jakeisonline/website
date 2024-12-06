import { createContext, useContext, useRef, useState } from "react"

export const useSegmentedControl = () => {
  const context = useContext(SegmentedControlContext)

  if (!context) {
    throw new Error(
      "useSegmentedControl must be used within a SegmentedControlContextProvider",
    )
  }

  return context
}

type SegmentedControlContextType = {
  selectedValue: string | null
  selectControlItem: (value: string) => void
  setValues: (value: string[]) => void
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextType>({
    selectedValue: null,
    selectControlItem: () => {},
    setValues: () => {},
  })

type SegmentedControlContextProviderProps = {
  defaultValue: string
  children: React.ReactNode
}

export const SegmentedControlContextProvider = ({
  defaultValue,
  children,
}: SegmentedControlContextProviderProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)
  const values = useRef<string[]>([])

  const setValues = (value: string[]) => {
    values.current = value
  }

  const selectControlItem = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <SegmentedControlContext.Provider
      value={{ selectedValue, selectControlItem, setValues }}
    >
      {children}
    </SegmentedControlContext.Provider>
  )
}
