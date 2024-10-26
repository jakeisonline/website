import * as React from "react"

import { Cell, CellRow, Cells } from "@/components/ui/cells"

export default function StepperDemo() {
  return (
    <Cells>
      <CellRow>
        <Cell name="cell_1" label="Cell 1" initialValue="1" />
        <Cell name="cell_2" label="Cell 2" initialValue="2" />
      </CellRow>
      <CellRow>
        <Cell name="cell_3" label="Cell 3" initialValue="3" />
        <Cell name="cell_4" label="Cell 4" initialValue="4" />
      </CellRow>
    </Cells>
  )
}
