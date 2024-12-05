import * as React from "react"

import { Tagger, TaggerInput, TaggerTags } from "@/registry/ui/tagger"

export default function TaggerDemo() {
  return (
    <Tagger initialTags={["Hotel", "India"]}>
      <TaggerTags />
      <TaggerInput />
    </Tagger>
  )
}
