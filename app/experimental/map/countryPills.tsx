import { COUNTRIES } from "./countries"

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
      className="flex-shrink-0 bg-[#e60000] text-white text-sm font-semibold rounded-full px-3 py-1 m-1"
    >
      {country.country}
    </button>
  )
}
