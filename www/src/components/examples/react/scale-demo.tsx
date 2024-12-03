import * as React from "react"

import { Scale, ScaleStep } from "@/registry/ui/scale"

export default function ScaleDemo() {
  return (
    <Scale className="mt-3">
      <ScaleStep id="unhappy" name="satisfaction" label="😠" />
      <ScaleStep id="meh" name="satisfaction" label="😐" defaultChecked />
      <ScaleStep id="happy" name="satisfaction" label="😁" />
    </Scale>
  )
}
