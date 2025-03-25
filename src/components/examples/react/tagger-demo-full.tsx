import * as React from "react"

import { Tagger, TaggerInput, TaggerTags } from "@/registry/ui/tagger"

export default function TaggerDemo() {
  return (
    <div className="w-2/3">
      <label htmlFor="current-tags">Current tags</label>
      <Tagger initialTags={["Hotel", "India"]}>
        <TaggerTags />
        <TaggerInput id="current-tags" />
      </Tagger>
    </div>
  )
}
