"use client"

import { createContext, useCallback, useRef, useState } from "react"
import { MapRef } from "react-map-gl"
import { MapMoveProps } from "../lib/types"

type MapContextProviderProps = {
  data?: any
  children: React.ReactNode
}

type MapContextArgs = {
  isInitialState: boolean
  handleSetInitialState: (initialState: boolean) => void
  currentCountry: string
  handleSetCountry: (country: string) => void
  displayCountryPage: boolean
  handleShowCountryPage: (displayCountryPage: boolean) => void
  handleResetCountry: () => void
  handleMapMove: ({ mapRef, longitude, latitude, zoom }: any) => void
}

type handleMapMoveProps = {
  mapRef: any
  longitude: number
  latitude: number
  zoom?: number
}

type onSelectCountryProps = MapMoveProps & {
  country: string
}

export const MapContext = createContext<MapContextArgs | null>(null)

export default function MapContextProvider({
  data,
  children,
}: MapContextProviderProps) {
  const [currentCountry, setCurrentCountry] = useState<string>("")
  const [displayCountryPage, setDisplayCountryPage] = useState<boolean>(false)
  const [isInitialState, setIsInitialState] = useState<boolean>(true)

  const handleShowCountryPage = useCallback((displayCountryPage: boolean) => {
    setDisplayCountryPage(displayCountryPage)
  }, [])

  const handleResetCountry = useCallback(() => {
    handleShowCountryPage(false)
    setCurrentCountry("")
  }, [handleShowCountryPage])

  const handleSetInitialState = useCallback((initialState: boolean) => {
    setIsInitialState(initialState)
  }, [])

  const handleSetCountry = useCallback(
    (country: string) => {
      if (isInitialState) handleSetInitialState(false)

      setCurrentCountry(country)
    },
    [isInitialState, handleSetInitialState],
  )

  const handleMapMove = useCallback(
    ({ mapRef, longitude, latitude, zoom = 5 }: handleMapMoveProps) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: zoom,
      })
    },
    [],
  )

  return (
    <MapContext.Provider
      value={{
        isInitialState,
        handleSetInitialState,
        currentCountry,
        handleSetCountry,
        displayCountryPage,
        handleShowCountryPage,
        handleResetCountry,
        handleMapMove,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
