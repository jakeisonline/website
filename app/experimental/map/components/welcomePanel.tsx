import { useCallback } from "react"
import useMapContext from "../hooks/useMapContext"
import { INITIAL_LOCATION } from "../lib/const"
import CountryPills from "./countryPills"
import { MapMoveProps } from "../lib/types"

type WelcomePanelProps = {
  mapRef: any
}

type onSelectCountryProps = MapMoveProps & {
  country: string
}

export default function WelcomePanel({ mapRef }: WelcomePanelProps) {
  const {
    isInitialState,
    handleSetInitialState,
    handleMapMove,
    handleSetCountry,
  } = useMapContext()

  const onSelectCountry = useCallback(
    ({ longitude, latitude, zoom = 5, country }: onSelectCountryProps) => {
      handleMapMove({
        mapRef,
        longitude,
        latitude,
        zoom,
      })
      handleSetCountry(country)
    },
    [mapRef, handleMapMove, handleSetCountry],
  )

  return (
    <div className="absolute top-0 right-0 ">
      <div className="shadow-xl  mt-4 mr-4 rounded-lg z-10 w-96 bg-white text-zinc-900">
        <div className="py-4 px-4">
          <button
            onClick={() => {
              handleMapMove({
                mapRef,
                longitude: INITIAL_LOCATION.longitude,
                latitude: INITIAL_LOCATION.latitude,
                zoom: INITIAL_LOCATION.zoom,
              })
              handleSetInitialState(true)
            }}
            className="flex gap-2 items-center"
          >
            <div className="w-10 h-10 bg-[#e60000] rounded-full" />
            <div className="w-24 h-3 bg-gray-200 rounded-full" />
          </button>
          <section className="mt-3">
            {isInitialState && (
              <>
                <h1 className="font-extrabold text-2xl pb-6">
                  Welcome to Ireland
                </h1>
                <p>
                  {`We're excited for a day of future strategy, and hope you're
              enjoying the conference so far. Why not take a look back at all
              the incredible things we've done over the past few years?`}
                </p>
              </>
            )}
            <p className="mt-6">
              <strong className="font-semibold">
                Select a country to find out more:
              </strong>
            </p>
          </section>
        </div>
        <div className="pb-3">
          <CountryPills onSelectCountry={onSelectCountry} />
        </div>
      </div>
    </div>
  )
}
