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
  isActiveCell: (rowIndex: number, cellIndex: number) => boolean
  setActiveCell: (rowIndex: number, cellIndex: number) => void
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
  isActiveCell: () => false,
  setActiveCell: () => {},
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
  const shiftTraverseMarker = useRef<
    { rowIndex: number; cellIndex: number } | undefined
  >(undefined)
  const activeCell = useRef<
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

  const getCellsMap = () => {
    return cellsMap.current
  }

  const getRowMap = (rowIndex: number) => {
    return cellsMap.current.get(`row-${rowIndex}`)
  }

  const getRowBoundaryCellIndex = (
    rowIndex: number,
    boundary: "first" | "last",
  ) => {
    const row = getRowMap(rowIndex)
    if (!row) return undefined

    if (boundary === "first") {
      return Number(row.entries().next().value?.[0].split("-")[1])
    } else {
      const entries = Array.from(row.entries())
      return Number(entries[entries.length - 1][0].split("-")[1])
    }
  }

  const getBoundaryRowIndex = (
    boundary: "first" | "last",
  ): number | undefined => {
    return boundary === "first" ? 0 : cellsMap.current.size - 1
  }

  const getCellRef = (rowIndex: number, cellIndex: number) => {
    return getRowMap(rowIndex)?.get(`cell-${cellIndex}`)?.current
  }

  const getShiftTraverseMarker = ():
    | { rowIndex: number; cellIndex: number }
    | undefined => {
    return shiftTraverseMarker.current
  }

  const setFocusCell = (rowIndex: number, cellIndex: number): void => {
    const cellRef = getCellRef(rowIndex, cellIndex)

    if (!cellRef) return

    clearSelectedCells()
    clearShiftTraverseMarker()
    cellRef?.focus()
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
    const currentShiftTraverseMarker = getShiftTraverseMarker()
    const focusPosition = {
      cellIndex:
        isShiftHeld && currentShiftTraverseMarker
          ? currentShiftTraverseMarker.cellIndex
          : currentCellIndex,
      rowIndex:
        isShiftHeld && currentShiftTraverseMarker
          ? currentShiftTraverseMarker.rowIndex
          : currentRowIndex,
    }

    const handleHorizontalMovement = () => {
      const nextCellIndex = isCtrlHeld
        ? getRowBoundaryCellIndex(
            currentRowIndex,
            direction === "left" ? "first" : "last",
          )
        : ["left", "up"].includes(direction)
          ? focusPosition.cellIndex - 1
          : focusPosition.cellIndex + 1

      if (nextCellIndex === undefined) {
        !isShiftHeld && clearSelectedCells()
        return
      }

      if (isShiftHeld) {
        const boundaryCellIndex = getRowBoundaryCellIndex(
          currentRowIndex,
          direction === "left" ? "first" : "last",
        )
        if (boundaryCellIndex === undefined) return

        const endCellIndex = isCtrlHeld ? boundaryCellIndex : nextCellIndex
        getCellRef(focusPosition.rowIndex, endCellIndex) &&
          setSelectedCellRange({
            startRowIndex: currentRowIndex,
            startCellIndex: currentCellIndex,
            endRowIndex: focusPosition.rowIndex,
            endCellIndex,
          })
      } else {
        getCellRef(focusPosition.rowIndex, nextCellIndex) &&
          setFocusCell(focusPosition.rowIndex, nextCellIndex)
      }
    }

    const handleVerticalMovement = () => {
      const nextRowIndex = isCtrlHeld
        ? getBoundaryRowIndex(direction === "up" ? "first" : "last")
        : ["up"].includes(direction)
          ? focusPosition.rowIndex - 1
          : focusPosition.rowIndex + 1

      if (nextRowIndex === undefined) return

      const nextCellIndex =
        isShiftHeld && currentShiftTraverseMarker
          ? currentShiftTraverseMarker.cellIndex
          : currentCellIndex

      if (nextCellIndex === undefined) return

      if (isShiftHeld && getCellRef(nextRowIndex, nextCellIndex)) {
        setSelectedCellRange({
          startRowIndex: currentRowIndex,
          startCellIndex: currentCellIndex,
          endRowIndex: nextRowIndex,
          endCellIndex:
            currentShiftTraverseMarker?.cellIndex ?? currentCellIndex,
        })
      } else if (getCellRef(nextRowIndex, nextCellIndex)) {
        setFocusCell(nextRowIndex, nextCellIndex)
      }
    }

    ;["left", "right"].includes(direction)
      ? handleHorizontalMovement()
      : handleVerticalMovement()
  }

  const isActiveCell = (rowIndex: number, cellIndex: number) => {
    return (
      activeCell.current?.rowIndex === rowIndex &&
      activeCell.current?.cellIndex === cellIndex
    )
  }

  const setActiveCell = (rowIndex: number, cellIndex: number) => {
    activeCell.current = { rowIndex, cellIndex }
  }

  const clearActiveCell = () => {
    activeCell.current = undefined
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

    const selectedCellRef = getCellRef(rowIndex, cellIndex)
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

    const selectedCellRef = getCellRef(rowIndex, cellIndex)
    selectedCellRef?.current.setAttribute("data-is-selected", "false")
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
        const cellRef = getCellRef(Number(rowIndex), Number(cellIndex))
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
    const traverseDirection = (startIndex: number, endIndex: number) =>
      startIndex > endIndex ? "backward" : "forward"

    const processCell = (rowIndex: number, cellIndex: number) => {
      addSelectedCell(rowIndex, cellIndex)
      setShiftTraverseMarker({
        rowIndex: endRowIndex,
        cellIndex: endCellIndex,
      })
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

  const startShiftTraverse = ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => {
    // Don't clobber an existing shift selection
    if (!shiftTraverseMarker.current) {
      setShiftTraverseMarker({ rowIndex, cellIndex })
    }
  }

  const setShiftTraverseMarker = ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => {
    shiftTraverseMarker.current = { rowIndex, cellIndex }
  }

  const clearShiftTraverseMarker = () => {
    shiftTraverseMarker.current = undefined
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
        isActiveCell,
        setActiveCell,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
