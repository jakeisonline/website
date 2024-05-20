"use client"

import { useRef, useCallback, useState } from "react"
import Map, { MapRef, Marker } from "react-map-gl"
import InfoPanel from "./components/infoPanel"
import WelcomePanel from "./components/welcomePanel"
import Pin from "./components/pin"
import WebpageWrapper from "./components/webpageWrapper"
import useMapContext from "./hooks/useMapContext"
import { MAPBOX_TOKEN, INITIAL_LOCATION, INITIAL_VIEWSTATE } from "./lib/const"

export default function Page() {
  const {
    currentCountry,
    handleSetCountry,
    displayCountryPage,
    handleMapMove,
  } = useMapContext()
  const mapRef = useRef<MapRef>(null)

  return (
    <div className="relative size-full h-screen overflow-hidden">
      {displayCountryPage && <WebpageWrapper />}
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEWSTATE}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {!currentCountry && (
          <Marker
            longitude={INITIAL_LOCATION.longitude}
            latitude={INITIAL_LOCATION.latitude}
            anchor="bottom"
          >
            <Pin />
          </Marker>
        )}
      </Map>
      {!currentCountry && <WelcomePanel mapRef={mapRef} />}
      {!displayCountryPage && currentCountry && <InfoPanel />}
    </div>
  )
}
