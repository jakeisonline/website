"use client"

import RangeField from "@/components/RangeField"

export default function Home() {
  return (
    <main className="m-auto">
      <RangeField initialLowValue={120} initialHighValue={1000} />
    </main>
  )
}
