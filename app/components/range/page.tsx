import RangeField from "@/components/RangeField"

export default function Home() {
  return (
    <main className="m-auto">
      <RangeField
        minRange={0}
        maxRange={1000}
        initialLowValue={20}
        initialHighValue={90}
      />
    </main>
  )
}
