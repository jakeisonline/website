import { createContext, useContext, useRef, useState } from "react"

interface ScaleContextType {
  updateSelectedIndex: (index: number) => void
  setTotalSteps: (count: number) => void
  selectedIndex: number
  getTotalSteps: () => number
}

const ScaleContext = createContext<ScaleContextType>({
  updateSelectedIndex: () => {},
  setTotalSteps: () => {},
  selectedIndex: 0,
  getTotalSteps: () => 0,
})

export const useScaleContext = () => {
  const context = useContext(ScaleContext)

  if (!context) {
    throw new Error(
      "useScaleContext must be used within a ScaleContextProvider",
    )
  }

  return context
}

interface ScaleContextProviderProps {
  children: React.ReactElement
}

export const ScaleContextProvider = ({
  children,
}: ScaleContextProviderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const totalSteps = useRef(0)

  const getTotalSteps = () => {
    return totalSteps.current
  }

  const setTotalSteps = (count: number) => {
    totalSteps.current = count
  }

  const updateSelectedIndex = (index: number) => {
    setSelectedIndex(index)
  }

  const contextValue = {
    updateSelectedIndex,
    setTotalSteps,
    selectedIndex,
    getTotalSteps,
  }

  return (
    <ScaleContext.Provider value={contextValue}>
      {children}
    </ScaleContext.Provider>
  )
}
