import RangeField from "@/components/RangeField"

export default function Home() {
  return (
    <main className="m-auto mt-10">
      <RangeField
        minRange={0}
        maxRange={100}
        initialLowValue={20}
        initialHighValue={80}
      />
    </main>
  )
}
