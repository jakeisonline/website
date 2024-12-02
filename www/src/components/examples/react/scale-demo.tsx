import * as React from "react"

import { Scale, ScaleStep } from "@/registry/ui/scale"
import { cn } from "@/lib/utils"

export default function ScaleDemo() {
  return (
    <Scale>
      <div className="w-full">
        {/* <div className="flex w-full justify-center">
          <div className="flex w-11/12 justify-between">
            <span>Very Unhappy</span>
            <span>Unhappy</span>
            <span>Happy</span>
            <span>Very Happy</span>
          </div>
        </div> */}
        <div className="flex min-h-8 w-full justify-center py-4">
          <div className="relative flex h-1 w-11/12 flex-none touch-none flex-row items-center rounded-full bg-blue-100">
            <fieldset className="absolute flex w-full justify-between">
              <ScaleStep
                id="very_unhappy"
                name="satisfaction"
                label="Very Unhappy"
                defaultChecked
              />
              <ScaleStep id="unhappy" name="satisfaction" label="Unhappy" />
              <ScaleStep id="happy" name="satisfaction" label="Happy" />
              <ScaleStep
                id="very_happy"
                name="satisfaction"
                label="Very Happy"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </Scale>
  )
}
