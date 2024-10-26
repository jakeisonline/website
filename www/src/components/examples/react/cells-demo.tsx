import * as React from "react"

import { Cell, CellInput, CellRow, Cells } from "@/components/ui/cells"

export default function StepperDemo() {
  return (
    <Cells>
      <CellRow>
        <Cell>
          <CellInput
            type="number"
            name="cell_1"
            label="Cell 1"
            initialValue="1"
          />
        </Cell>
        <Cell>
          <CellInput
            type="number"
            name="cell_2"
            label="Cell 2"
            initialValue="2"
          />
        </Cell>
      </CellRow>
      <CellRow>
        <Cell>
          <CellInput
            type="number"
            name="cell_3"
            label="Cell 3"
            initialValue="3"
          />
        </Cell>
        <Cell>
          <CellInput
            type="number"
            name="cell_4"
            label="Cell 4"
            initialValue="4"
          />
        </Cell>
      </CellRow>
    </Cells>
  )
}
