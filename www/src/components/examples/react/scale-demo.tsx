import * as React from "react"

import { Scale, ScaleFieldset, ScaleFill, ScaleStep } from "@/registry/ui/scale"

export default function ScaleDemo() {
  return (
    <Scale>
      <ScaleStep id="unhappy" name="satisfaction" label="Unhappy" />
      <ScaleStep id="meh" name="satisfaction" label="Meh" defaultChecked />
      <ScaleStep id="happy" name="satisfaction" label="Happy" />
    </Scale>
  )
}
