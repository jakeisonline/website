import Image from "next/image"
import { COUNTRIES } from "../lib/countries"

type CountryPillsProps = {
  onSelectCountry: (country: any) => void
}

export default function CountryPills({ onSelectCountry }: CountryPillsProps) {
  return (
    <nav className="ml-2 mb-2 text-black flex flex-wrap">
      {COUNTRIES.map((country, index) => (
        <CountryPill
          key={`pill-${index}`}
          country={country}
          onClick={onSelectCountry}
        />
      ))}
    </nav>
  )
}

type CountryPillProps = {
  country: any
  onClick: any
}

function CountryPill({ country, onClick }: CountryPillProps) {
  return (
    <button
      onClick={() => onClick(country)}
      className="flex-shrink-0 items-center flex bg-white text-zinc-900 border border-zinc-200 text-sm font-semibold rounded-full px-3 py-1 m-1"
    >
      <Image
        src={`/flags/${country.flagImage}`}
        width={30}
        height={30}
        alt="flag"
        className="w-[30px] h-[30px] rounded-full mr-2 object-cover object-center"
        quality={100}
      />
      {country.country}
    </button>
  )
}
