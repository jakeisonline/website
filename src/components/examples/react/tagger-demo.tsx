import * as React from "react"

import { Tagger, TaggerInput, TaggerTags } from "@/registry/ui/tagger"

export default function TaggerDemo() {
  return (
    <div className="w-4/5">
      <Tagger initialTags={["Hotel", "India"]}>
        <TaggerTags />
      </Tagger>
    </div>
  )
}
