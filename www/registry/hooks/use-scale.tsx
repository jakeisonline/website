import { createContext, useContext } from "react"

interface ScaleContextType {}

const ScaleContext = createContext<ScaleContextType>({})

export const useScaleContext = () => {
  const context = useContext(ScaleContext)

  if (!context) {
    throw new Error(
      "useScaleContext must be used within a ScaleContextProvider",
    )
  }
}

interface ScaleContextProviderProps {
  children: React.ReactElement
}

export const ScaleContextProvider = ({
  children,
}: ScaleContextProviderProps) => {
  const contextValue = {}

  return (
    <ScaleContext.Provider value={contextValue}>
      {children}
    </ScaleContext.Provider>
  )
}
