import { createContext, useContext, useRef, useState } from "react"

interface CellsContextType {
  mapRowIndex: (index: number, value: any) => void
  mapCellIndex: (rowIndex: number, index: number, value: any) => void
  handleMouseDown?: (e: React.MouseEvent<HTMLFormElement>) => void
  isSelectedCell: (rowIndex: number, cellIndex: number) => boolean
  toggleSelectedCell: (rowIndex: number, cellIndex: number) => void
  clearSelectedCells: () => void
  cellsMap: React.MutableRefObject<Map<string, Map<string, string>>>
  focusNextCell: ({
    direction,
    currentRowIndex,
    currentCellIndex,
    isShiftHeld,
    isCtrlHeld,
  }: {
    direction: string
    currentRowIndex: number
    currentCellIndex: number
    isShiftHeld?: boolean
    isCtrlHeld?: boolean
  }) => void
  startShiftTraverse: ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => void
}

const CellsContext = createContext<CellsContextType>({
  mapRowIndex: () => {},
  mapCellIndex: () => {},
  isSelectedCell: () => false,
  toggleSelectedCell: () => {},
  clearSelectedCells: () => {},
  cellsMap: { current: new Map() },
  focusNextCell: () => undefined,
  startShiftTraverse: () => {},
})

export const useCellsContext = () => {
  const context = useContext(CellsContext)

  if (!context) {
    throw new Error(
      "useCellsContext must be used within a CellsContextProvider",
    )
  }

  return context
}

interface CellsContextProviderProps {
  children: React.ReactElement
}

export const CellsContextProvider = ({
  children,
}: CellsContextProviderProps) => {
  const shiftSelectCell = useRef<
    { rowIndex: number; cellIndex: number } | undefined
  >(undefined)
  const [selectedCellsMap, setSelectedCellsMap] = useState<
    Map<string, string[]>
  >(new Map())
  const cellsMap = useRef<Map<string, Map<string, any>>>(new Map())

  const mapRowIndex = (index: number, value: any) => {
    cellsMap.current.set(`row-${index.toString()}`, new Map(value))
  }

  const mapCellIndex = (rowIndex: number, index: number, inputRef: any) => {
    cellsMap.current
      .get(`row-${rowIndex}`)
      ?.set(`cell-${index.toString()}`, inputRef)
  }

  const focusNextCell = ({
    direction,
    currentRowIndex,
    currentCellIndex,
    isShiftHeld,
    isCtrlHeld,
  }: {
    direction: string
    currentRowIndex: number
    currentCellIndex: number
    isShiftHeld?: boolean
    isCtrlHeld?: boolean
  }) => {
    const directionCalc = (direction: string, a: number, b: number) => {
      return ["left", "up"].includes(direction) ? a - b : a + b
    }

    const currentShiftCell = shiftSelectCell.current
    const currentCellsMap = cellsMap.current

    const getCellInRow = (row: Map<string, any>, index: number) => {
      return row?.get(`cell-${index}`)
    }

    const getBoundaryCell = (
      row: Map<string, any>,
      boundary: "first" | "last",
    ) => {
      if (!row) return undefined
      return boundary === "first"
        ? row.entries().next().value?.[1]
        : row.get(`cell-${row.size - 1}`)
    }

    let focusCellIndex =
      isShiftHeld && currentShiftCell
        ? currentShiftCell.cellIndex
        : currentCellIndex
    let focusRowIndex =
      isShiftHeld && currentShiftCell
        ? currentShiftCell.rowIndex
        : currentRowIndex
    const currentRow = currentCellsMap.get(`row-${focusRowIndex}`)

    let nextCell: { current: HTMLInputElement } | undefined

    const setSelectionRange = (
      startRowIndex: number,
      startCellIndex: number,
      endRowIndex: number,
      endCellIndex: number,
    ) => {
      setSelectedCellRange({
        startRowIndex,
        startCellIndex,
        endRowIndex,
        endCellIndex,
      })
    }

    const focusCell = (cell: { current: HTMLInputElement } | undefined) => {
      if (cell) {
        clearSelectedCells()
        clearCellShiftFocus()
        cell.current.focus()
      }
    }

    if (["left", "right"].includes(direction)) {
      if (isCtrlHeld && currentRow) {
        nextCell = getBoundaryCell(
          currentRow,
          direction === "left" ? "first" : "last",
        )
      } else if (currentRow) {
        nextCell = getCellInRow(
          currentRow,
          directionCalc(direction, focusCellIndex, 1),
        )
      }

      if (nextCell && currentRow) {
        if (isShiftHeld) {
          const endCellIndex = isCtrlHeld
            ? direction === "left"
              ? 0
              : currentRow.size - 1
            : directionCalc(direction, focusCellIndex, 1)
          setSelectionRange(
            currentRowIndex,
            currentCellIndex,
            focusRowIndex,
            endCellIndex,
          )
        } else {
          focusCell(nextCell)
        }
      } else if (!isShiftHeld) {
        clearSelectedCells()
      }
    }

    if (["up", "down"].includes(direction)) {
      let targetRowIndex: number
      let nextRow: Map<string, any> | undefined

      if (isCtrlHeld) {
        targetRowIndex = direction === "up" ? 0 : currentCellsMap.size - 1
        nextRow = currentCellsMap.get(
          `row-${direction === "up" ? 0 : currentCellsMap.size - 1}`,
        )
      } else {
        targetRowIndex = directionCalc(direction, focusRowIndex, 1)
        nextRow = currentCellsMap.get(`row-${targetRowIndex}`)
      }

      if (nextRow) {
        nextCell = getCellInRow(
          nextRow,
          isShiftHeld && currentShiftCell
            ? currentShiftCell.cellIndex
            : currentCellIndex,
        )

        if (nextCell) {
          if (isShiftHeld) {
            setSelectionRange(
              currentRowIndex,
              currentCellIndex,
              targetRowIndex,
              currentShiftCell?.cellIndex ?? currentCellIndex,
            )
          } else {
            focusCell(nextCell)
          }
        }
      }
    }
  }

  const getMappedCellRef = (rowIndex: number, cellIndex: number) => {
    const cell = cellsMap.current
      .get(`row-${rowIndex}`)
      ?.get(`cell-${cellIndex}`)

    return cell?.current
  }

  const isSelectedCell = (rowIndex: number, cellIndex: number) => {
    const selectedCells = selectedCellsMap.get(`row-${rowIndex}`)

    if (selectedCells) {
      return selectedCells.includes(`cell-${cellIndex}`)
    }

    return false
  }

  const addSelectedCell = (rowIndex: number, cellIndex: number) => {
    const newSelectedCellsMap = selectedCellsMap
    const selectedRowIndex = newSelectedCellsMap.get(`row-${rowIndex}`)

    if (!selectedRowIndex) {
      newSelectedCellsMap.set(`row-${rowIndex}`, [`cell-${cellIndex}`])
    } else {
      const rowSelectedCells = selectedRowIndex
      if (!rowSelectedCells.includes(`cell-${cellIndex}`)) {
        newSelectedCellsMap.set(`row-${rowIndex}`, [
          ...rowSelectedCells,
          `cell-${cellIndex}`,
        ])
      }
    }

    setSelectedCellsMap(newSelectedCellsMap)

    const selectedCellRef = getMappedCellRef(rowIndex, cellIndex)
    selectedCellRef?.setAttribute("data-is-selected", "true")
  }

  const removeSelectedCell = (rowIndex: number, cellIndex: number) => {
    const newSelectedCellsMap = selectedCellsMap
    const selectedRowIndex = newSelectedCellsMap.get(`row-${rowIndex}`)

    if (selectedRowIndex) {
      const rowSelectedCells = selectedRowIndex
      const newRowSelectedCells = rowSelectedCells.filter(
        (cell) => cell !== `cell-${cellIndex}`,
      )

      if (newRowSelectedCells.length === 0) {
        newSelectedCellsMap.delete(`row-${rowIndex}`)
      } else {
        newSelectedCellsMap.set(`row-${rowIndex}`, newRowSelectedCells)
      }
    }

    setSelectedCellsMap(newSelectedCellsMap)

    const selectedCellRef = getMappedCellRef(rowIndex, cellIndex)
    selectedCellRef?.setAttribute("data-is-selected", "false")
  }

  const toggleSelectedCell = (rowIndex: number, cellIndex: number) => {
    if (isSelectedCell(rowIndex, cellIndex)) {
      removeSelectedCell(rowIndex, cellIndex)
    } else {
      addSelectedCell(rowIndex, cellIndex)
    }
  }

  const clearSelectedCells = () => {
    selectedCellsMap.forEach((rowContent, rowKey) => {
      const rowIndex = rowKey.split("-")[1]
      rowContent.forEach((cell) => {
        const cellIndex = cell.split("-")[1]
        const cellRef = getMappedCellRef(Number(rowIndex), Number(cellIndex))
        cellRef?.setAttribute("data-is-selected", "false")
      })
    })

    setSelectedCellsMap(new Map())
  }

  const setSelectedCellRange = ({
    startRowIndex,
    startCellIndex,
    endRowIndex,
    endCellIndex,
  }: {
    startRowIndex: number
    startCellIndex: number
    endRowIndex: number
    endCellIndex: number
  }) => {
    const startingCell = cellsMap.current
      .get(`row-${startRowIndex}`)
      ?.get(`cell-${startCellIndex}`)

    if (!startingCell) return

    const traverseDirection = (startIndex: number, endIndex: number) =>
      startIndex > endIndex ? "backward" : "forward"

    const processCell = (rowIndex: number, cellIndex: number) => {
      const currentRow = cellsMap.current.get(`row-${rowIndex}`)
      const currentCell = currentRow?.get(`cell-${cellIndex}`)

      if (currentCell) {
        addSelectedCell(rowIndex, cellIndex)
        shiftSelectCell.current = {
          rowIndex: endRowIndex,
          cellIndex: endCellIndex,
        }
      }
    }

    const processCellsInRow = (rowIndex: number) => {
      const direction = traverseDirection(startCellIndex, endCellIndex)
      const [start, end, step] =
        direction === "forward"
          ? [startCellIndex, endCellIndex, 1]
          : [startCellIndex, endCellIndex, -1]

      for (
        let cellIndex = start;
        direction === "forward" ? cellIndex <= end : cellIndex >= end;
        cellIndex += step
      ) {
        processCell(rowIndex, cellIndex)
      }
    }

    clearSelectedCells()
    addSelectedCell(startRowIndex, startCellIndex)

    const direction = traverseDirection(startRowIndex, endRowIndex)
    const [start, end, step] =
      direction === "forward"
        ? [startRowIndex, endRowIndex, 1]
        : [startRowIndex, endRowIndex, -1]

    for (
      let rowIndex = start;
      direction === "forward" ? rowIndex <= end : rowIndex >= end;
      rowIndex += step
    ) {
      processCellsInRow(rowIndex)
    }
  }

  const setCellShiftFocus = ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => {
    shiftSelectCell.current = { rowIndex, cellIndex }
  }

  const startShiftTraverse = ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => {
    // Don't clobber an existing shift selection
    if (!shiftSelectCell.current) {
      shiftSelectCell.current = { rowIndex, cellIndex }
    }
  }

  const clearCellShiftFocus = () => {
    shiftSelectCell.current = undefined
  }

  return (
    <CellsContext.Provider
      value={{
        mapRowIndex,
        mapCellIndex,
        isSelectedCell,
        toggleSelectedCell,
        clearSelectedCells,
        cellsMap,
        focusNextCell,
        startShiftTraverse,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
