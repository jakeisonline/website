"use client"

import { createContext, useCallback, useRef, useState } from "react"
import { MapRef } from "react-map-gl"

type MapContextProviderProps = {
  data?: any
  children: React.ReactNode
}

type MapContextArgs = {
  currentCountry: string
  handleSetCountry: (country: string) => void
  displayCountryPage: boolean
  handleShowCountryPage: (displayCountryPage: boolean) => void
  handleResetCountry: () => void
}

type onSelectCountryProps = {
  longitude: number
  latitude: number
  zoom?: number
  country: string
}

export const MapContext = createContext<MapContextArgs | null>(null)

export default function MapContextProvider({
  data,
  children,
}: MapContextProviderProps) {
  const [currentCountry, setCurrentCountry] = useState<string>("")
  const [displayCountryPage, setDisplayCountryPage] = useState<boolean>(false)

  const handleShowCountryPage = useCallback((displayCountryPage: boolean) => {
    setDisplayCountryPage(displayCountryPage)
  }, [])

  const handleSetCountry = useCallback((country: string) => {
    setCurrentCountry(country)
  }, [])

  const handleResetCountry = useCallback(() => {
    handleShowCountryPage(false)
    setCurrentCountry("")
  }, [handleShowCountryPage])
  return (
    <MapContext.Provider
      value={{
        currentCountry,
        handleSetCountry,
        displayCountryPage,
        handleShowCountryPage,
        handleResetCountry,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
