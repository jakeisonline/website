import * as React from "react"

import { Cell, CellRow, Cells } from "@/registry/ui/cells"

export default function StepperDemo() {
  return (
    <Cells>
      <CellRow>
        <Cell name="cell_1" label="Cell 1" initialValue="1" />
        <Cell name="cell_2" label="Cell 2" initialValue="2" />
        <Cell name="cell_3" label="Cell 3" initialValue="3" />
      </CellRow>
      <CellRow>
        <Cell name="cell_4" label="Cell 4" initialValue="4" />
        <Cell name="cell_5" label="Cell 5" initialValue="5" />
        <Cell name="cell_6" label="Cell 6" initialValue="6" />
      </CellRow>
      <CellRow>
        <Cell name="cell_7" label="Cell 7" initialValue="7" />
        <Cell name="cell_8" label="Cell 8" initialValue="8" />
        <Cell name="cell_9" label="Cell 9" initialValue="9" />
      </CellRow>
    </Cells>
  )
}
