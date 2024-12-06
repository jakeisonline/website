import { createContext, useContext, useState } from "react"

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
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextType>({
    selectedValue: null,
    selectControlItem: () => {},
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

  const selectControlItem = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <SegmentedControlContext.Provider
      value={{ selectedValue, selectControlItem }}
    >
      {children}
    </SegmentedControlContext.Provider>
  )
}
