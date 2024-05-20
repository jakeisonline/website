"use client"

import { useRef, useCallback, useState } from "react"
import Map, { MapRef, Marker } from "react-map-gl"
import InfoPanel from "./infoPanel"
import WelcomePanel from "./welcomePanel"
import Pin from "./pin"
import WebpageWrapper from "./webpageWrapper"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const initialLocation = {
  latitude: 53.3418237,
  longitude: -6.2870543,
  zoom: 15,
}

const initialViewState = {
  longitude: initialLocation?.longitude,
  latitude: initialLocation?.latitude,
  zoom: initialLocation?.zoom,
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
  const [currentCountry, setCurrentCountry] = useState<String>("")
  const [displayCountryPage, setDisplayCountryPage] = useState<Boolean>(false)

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

  const onResetCountry = useCallback(() => {
    setCurrentCountry("")
  }, [])

  return (
    <div className="relative size-full h-screen overflow-hidden">
      {displayCountryPage && (
        <WebpageWrapper
          currentCountry={currentCountry}
          setDisplayCountryPage={setDisplayCountryPage}
        />
      )}
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {!currentCountry && (
          <Marker
            longitude={initialLocation?.longitude}
            latitude={initialLocation?.latitude}
            anchor="bottom"
          >
            <Pin />
          </Marker>
        )}
      </Map>
      {!currentCountry && <WelcomePanel onSelectCountry={onSelectCountry} />}
      {!displayCountryPage && currentCountry && (
        <InfoPanel
          currentCountry={currentCountry}
          onResetCountry={onResetCountry}
          setDisplayCountryPage={setDisplayCountryPage}
        />
      )}
    </div>
  )
}
