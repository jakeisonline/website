import { createContext, useContext, useRef, useState } from "react"

export type CellTraverseDirection = "left" | "right" | "up" | "down"

// Define a cell state interface
interface CellState {
  value: string
  isSelected: boolean
  isActive: boolean
  ref: React.RefObject<HTMLInputElement>
}

// Define the new map types
type CellsMap = Map<number, Map<number, CellState>>

interface CellsContextType {
  addCellIndex: (
    rowIndex: number,
    cellIndex: number,
    inputRef: React.RefObject<HTMLInputElement>,
    initialValue: string,
  ) => void
  handleMouseDown?: (e: React.MouseEvent<HTMLFormElement>) => void
  isSelectedCell: (rowIndex: number, cellIndex: number) => boolean
  toggleSelectedCell: (rowIndex: number, cellIndex: number) => void
  clearSelectedCells: () => void
  startShiftTraverse: ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => void
  isActiveCell: (rowIndex: number, cellIndex: number) => boolean
  setActiveCell: (rowIndex: number, cellIndex: number) => void
  setNextActiveCell: ({
    direction,
    currentRowIndex,
    currentCellIndex,
    isShiftHeld,
    isCtrlHeld,
  }: {
    direction: CellTraverseDirection
    currentRowIndex: number
    currentCellIndex: number
    isShiftHeld?: boolean
    isCtrlHeld?: boolean
  }) => void
  setInputFocus: (rowIndex: number, cellIndex: number) => void
  handleMouseSelectStart: (rowIndex: number, cellIndex: number) => void
  handleMouseSelectMove: (rowIndex: number, cellIndex: number) => void
  handleShiftClickCell: (rowIndex: number, cellIndex: number) => void
  setCellValue: (rowIndex: number, cellIndex: number, value: string) => void
  getCellState: (rowIndex: number, cellIndex: number) => CellState | undefined
  getRowMap: (rowIndex: number) => Map<number, CellState> | undefined
  getCellsMap: () => CellsMap
}

const CellsContext = createContext<CellsContextType>({
  addCellIndex: () => {},
  isSelectedCell: () => false,
  toggleSelectedCell: () => {},
  clearSelectedCells: () => {},
  startShiftTraverse: () => {},
  isActiveCell: () => false,
  setActiveCell: () => {},
  setNextActiveCell: () => undefined,
  setInputFocus: () => {},
  handleMouseSelectStart: () => {},
  handleMouseSelectMove: () => {},
  handleShiftClickCell: () => {},
  setCellValue: () => {},
  getCellState: () => undefined,
  getRowMap: () => undefined,
  getCellsMap: () => new Map(),
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
  //const cellsMap = useRef<Map<string, Map<string, any>>>(new Map())
  const cellsMap = useRef<CellsMap>(new Map())
  const mouseSelectStartCell = useRef<
    { rowIndex: number; cellIndex: number } | undefined
  >(undefined)

  const addCellIndex = (
    rowIndex: number,
    cellIndex: number,
    inputRef: React.RefObject<HTMLInputElement>,
    initialValue: string,
  ) => {
    if (!cellsMap.current.has(rowIndex)) {
      cellsMap.current.set(rowIndex, new Map())
    }

    cellsMap.current.get(rowIndex)?.set(cellIndex, {
      value: initialValue, // Use the passed initialValue
      isSelected: false,
      isActive: false,
      ref: inputRef,
    })
  }

  const getCellState = (
    rowIndex: number,
    cellIndex: number,
  ): CellState | undefined => {
    return cellsMap.current.get(rowIndex)?.get(cellIndex)
  }

  const getRowMap = (rowIndex: number) => {
    return cellsMap.current.get(rowIndex)
  }

  const getCellsMap = () => {
    return cellsMap.current
  }

  const setCellValue = (rowIndex: number, cellIndex: number, value: string) => {
    const cell = getCellState(rowIndex, cellIndex)
    if (cell) {
      cell.value = value
    }
  }

  const setActiveCell = (rowIndex: number, cellIndex: number) => {
    // Clear previous active cell
    cellsMap.current.forEach((row) => {
      row.forEach((cell) => {
        cell.isActive = false
      })
    })

    // Set new active cell
    const cell = getCellState(rowIndex, cellIndex)
    if (cell) {
      clearShiftTraverseMarker()
      cell.isActive = true
      cell.ref?.current?.focus()
    }
  }

  const getRowBoundaryCellIndex = (
    rowIndex: number,
    boundary: "first" | "last",
  ) => {
    const row = getRowMap(rowIndex)
    if (!row) return undefined

    if (boundary === "first") {
      return Number(row.entries().next().value?.[0])
    } else {
      const entries = Array.from(row.entries())
      return Number(entries[entries.length - 1][0])
    }
  }

  const getBoundaryRowIndex = (
    boundary: "first" | "last",
  ): number | undefined => {
    return boundary === "first" ? 0 : getCellsMap().size - 1
  }

  const getCellRef = (rowIndex: number, cellIndex: number) => {
    return getRowMap(rowIndex)?.get(cellIndex)?.ref
  }

  const getShiftTraverseMarker = ():
    | { rowIndex: number; cellIndex: number }
    | undefined => {
    return shiftTraverseMarker.current
  }

  const setNextActiveCell = ({
    direction,
    currentRowIndex,
    currentCellIndex,
    isShiftHeld,
    isCtrlHeld,
  }: {
    direction: CellTraverseDirection
    currentRowIndex: number
    currentCellIndex: number
    isShiftHeld?: boolean
    isCtrlHeld?: boolean
  }) => {
    const currentShiftTraverseMarker = getShiftTraverseMarker()
    const currentTraverseMarker = {
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
          ? currentTraverseMarker.cellIndex - 1
          : currentTraverseMarker.cellIndex + 1

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
        getCellRef(currentTraverseMarker.rowIndex, endCellIndex) &&
          setSelectedCellRange({
            startRowIndex: currentRowIndex,
            startCellIndex: currentCellIndex,
            endRowIndex: currentTraverseMarker.rowIndex,
            endCellIndex,
          })
      } else {
        getCellRef(currentTraverseMarker.rowIndex, nextCellIndex) &&
          setActiveCell(currentTraverseMarker.rowIndex, nextCellIndex)
      }
    }

    const handleVerticalMovement = () => {
      const nextRowIndex = isCtrlHeld
        ? getBoundaryRowIndex(direction === "up" ? "first" : "last")
        : ["up"].includes(direction)
          ? currentTraverseMarker.rowIndex - 1
          : currentTraverseMarker.rowIndex + 1

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
        setActiveCell(nextRowIndex, nextCellIndex)
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

  const clearActiveCell = () => {
    activeCell.current = undefined
  }

  const setInputFocus = (rowIndex: number, cellIndex: number) => {
    const cellRef = getCellRef(rowIndex, cellIndex)
    if (!cellRef) return

    const input = cellRef.current?.querySelector("input")

    if (input) {
      const inputCharLength = input.value.length
      input.setSelectionRange(inputCharLength, inputCharLength)
      input.focus()
    }
  }

  const handleShiftClickCell = (rowIndex: number, cellIndex: number) => {
    const startCell = activeCell.current
    if (!startCell) return

    setSelectedCellRange({
      startRowIndex: startCell.rowIndex,
      startCellIndex: startCell.cellIndex,
      endRowIndex: rowIndex,
      endCellIndex: cellIndex,
    })
  }

  const handleMouseSelectStart = (rowIndex: number, cellIndex: number) => {
    mouseSelectStartCell.current = { rowIndex, cellIndex }

    window.addEventListener("mouseup", handleMouseSelectEnd)
  }

  const handleMouseSelectMove = (rowIndex: number, cellIndex: number) => {
    const startCell = mouseSelectStartCell.current
    if (!startCell) return

    setSelectedCellRange({
      startRowIndex: startCell.rowIndex,
      startCellIndex: startCell.cellIndex,
      endRowIndex: rowIndex,
      endCellIndex: cellIndex,
    })
  }

  const handleMouseSelectEnd = () => {
    mouseSelectStartCell.current = undefined
    window.removeEventListener("mouseup", handleMouseSelectEnd)
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
    selectedCellRef?.current?.setAttribute("data-is-selected", "true")
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
    selectedCellRef?.current?.setAttribute("data-is-selected", "false")
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
        cellRef?.current?.setAttribute("data-is-selected", "false")
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
        addCellIndex,
        isSelectedCell,
        toggleSelectedCell,
        clearSelectedCells,
        startShiftTraverse,
        isActiveCell,
        setActiveCell,
        setNextActiveCell,
        setInputFocus,
        handleMouseSelectStart,
        handleMouseSelectMove,
        handleShiftClickCell,
        setCellValue,
        getCellState,
        getRowMap,
        getCellsMap,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
