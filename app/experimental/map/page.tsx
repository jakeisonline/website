"use client"

import { useRef, useCallback, useContext, useState } from "react"
import Map, { MapRef } from "react-map-gl"

import InfoPanel from "./infoPanel"
import CountryPills from "./countryPills"
import { COUNTRIES } from "./countries"
import { env } from "process"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const initialViewState = {
  longitude: COUNTRIES[0].longitude,
  latitude: COUNTRIES[0].latitude,
  zoom: 5,
  bearing: 0,
  pitch: 0,
  // Disable all interactions
  scrollZoom: false,
  boxZoom: false,
  dragRotate: false,
  dragPan: false,
  keyboard: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  touchPitch: false,
}

type onSelectCountryProps = {
  longitude: number
  latitude: number
  zoom?: number
  country: string
}

export default function Page() {
  const mapRef = useRef<MapRef>(null)
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES[0].country)

  const onSelectCountry = useCallback(
    ({ longitude, latitude, zoom = 5, country }: onSelectCountryProps) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: zoom,
      })
      setCurrentCountry(country)
    },
    [],
  )

  return (
    <div className="relative size-full h-screen overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
      <InfoPanel
        currentCountry={currentCountry}
        onSelectCountry={onSelectCountry}
      />
    </div>
  )
}
