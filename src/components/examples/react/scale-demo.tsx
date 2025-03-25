import * as React from "react"

import { Scale, ScaleStep } from "@/registry/ui/scale"

export default function ScaleDemo() {
  return (
    <Scale className="mt-3">
      <ScaleStep id="0" name="percent" label="0%" />
      <ScaleStep id="50" name="percent" label="50%" defaultChecked />
      <ScaleStep id="100" name="percent" label="100%" />
    </Scale>
  )
}
