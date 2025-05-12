import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react"

export type CellTraverseDirection = "left" | "right" | "up" | "down"

interface CellState {
  value: string
  isSelected: boolean
  isActive: boolean
  ref: React.RefObject<HTMLDivElement>
}

type CellsMap = Map<number, Map<number, CellState>>

interface CellsContextType {
  // Cell Management
  getCellState: (rowIndex: number, cellIndex: number) => CellState | undefined
  getRowMap: (rowIndex: number) => Map<number, CellState> | undefined
  getCellsMap: () => CellsMap
  setCellValue: (rowIndex: number, cellIndex: number, value: string) => void
  addCellIndex: (
    rowIndex: number,
    cellIndex: number,
    ref: React.RefObject<HTMLDivElement>,
    initialValue: string,
  ) => void
  handlePaste: () => void

  // Active Cell Management
  isActiveCell: (rowIndex: number, cellIndex: number) => boolean
  setActiveCell: (rowIndex: number, cellIndex: number) => void
  setInputFocus: (rowIndex: number, cellIndex: number) => void

  // Navigation
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

  // Selection
  isSelectedCell: (rowIndex: number, cellIndex: number) => boolean
  toggleSelectedCell: (rowIndex: number, cellIndex: number) => void
  copySelectedCells: () => void
  clearSelectedCells: () => void
  clearSelectedCellsValue: () => void
  selectAllCells: () => void
  selectAllCellsInRow: (rowIndex: number) => void
  selectAllCellsInColumn: (cellIndex: number) => void

  // Mouse and Shift Selection
  handleMouseSelectStart: (rowIndex: number, cellIndex: number) => void
  handleMouseSelectMove: (rowIndex: number, cellIndex: number) => void
  handleShiftClickCell: (rowIndex: number, cellIndex: number) => void

  // Traverse Markers
  startShiftTraverse: ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => void
}

const CellsContext = createContext<CellsContextType>({
  // Cell Management
  getCellState: () => undefined,
  getRowMap: () => undefined,
  getCellsMap: () => new Map(),
  setCellValue: () => {},
  addCellIndex: () => {},
  handlePaste: () => {},

  // Active Cell Management
  isActiveCell: () => false,
  setActiveCell: () => {},
  setInputFocus: () => {},

  // Navigation
  setNextActiveCell: () => undefined,

  // Selection
  isSelectedCell: () => false,
  toggleSelectedCell: () => {},
  clearSelectedCells: () => {},
  clearSelectedCellsValue: () => {},
  copySelectedCells: () => {},
  selectAllCells: () => {},
  selectAllCellsInRow: () => {},
  selectAllCellsInColumn: () => {},

  // Mouse and Shift Selection
  handleMouseSelectStart: () => {},
  handleMouseSelectMove: () => {},
  handleShiftClickCell: () => {},

  // Traverse Markers
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
  const [cellValues, setCellValues] = useState<
    Map<number, Map<number, string>>
  >(new Map())
  const cellsMap = useRef<CellsMap>(new Map())
  const pendingInitializations = useRef<
    Array<{
      rowIndex: number
      cellIndex: number
      value: string
    }>
  >([])
  const selectionState = useRef({
    shiftTraverseMarker: undefined as
      | { rowIndex: number; cellIndex: number }
      | undefined,
    mouseSelectStartCell: undefined as
      | { rowIndex: number; cellIndex: number }
      | undefined,
  })

  // Cell Management

  const getCellState = (
    rowIndex: number,
    cellIndex: number,
  ): CellState | undefined => {
    const cell = cellsMap.current.get(rowIndex)?.get(cellIndex)
    if (cell) {
      const value = cellValues.get(rowIndex)?.get(cellIndex) ?? cell.value
      return { ...cell, value }
    }
    return undefined
  }

  const setCellState = (
    rowIndex: number,
    cellIndex: number,
    state: CellState,
  ) => {
    cellsMap.current.get(rowIndex)?.set(cellIndex, state)
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
      setCellValues((prev) => {
        const newValues = new Map(prev)
        if (!newValues.has(rowIndex)) {
          newValues.set(rowIndex, new Map())
        }
        newValues.get(rowIndex)?.set(cellIndex, value)
        return newValues
      })
    }
  }

  const clearCellsValue = (
    cells: Array<{ rowIndex: number; cellIndex: number }>,
  ) => {
    cells.forEach(({ rowIndex, cellIndex }) => {
      setCellValue(rowIndex, cellIndex, "")
    })
  }

  const addCellIndex = (
    rowIndex: number,
    cellIndex: number,
    ref: React.RefObject<HTMLDivElement>,
    initialValue: string,
  ) => {
    if (!cellsMap.current.has(rowIndex)) {
      cellsMap.current.set(rowIndex, new Map())
    }

    cellsMap.current.get(rowIndex)?.set(cellIndex, {
      value: initialValue,
      isSelected: false,
      isActive: false,
      ref,
    })

    // Queue the initialization instead of updating state directly
    pendingInitializations.current.push({
      rowIndex,
      cellIndex,
      value: initialValue,
    })
  }

  const handlePaste = async () => {
    const activeCell = getActiveCell()
    if (!activeCell) return

    const activeCellRef = getCellRef(
      activeCell?.rowIndex,
      activeCell?.cellIndex,
    )

    if (!activeCellRef || activeCellRef.current?.dataset?.isEditing === "true")
      return

    const { rowIndex, cellIndex } = activeCell

    // Let's see if we can actually get the clipboard content
    try {
      const clipboardContent = await navigator.clipboard.read()

      for (const item of clipboardContent) {
        // Assumes tab-delimited text, with line breaks as newlines
        if (item.types.includes("text/plain")) {
          const textBlob = await item.getType("text/plain")
          const text = await textBlob.text()
          const rows = text.split("\n")
          const totalRows = rows.length
          const totalCellsInRow = rows[0].split("\t").length

          rows.forEach((row, rowOffset) => {
            const cells = row.split("\t")
            cells.forEach((cellValue, cellOffset) => {
              setCellValue(
                rowIndex + rowOffset,
                cellIndex + cellOffset,
                cellValue,
              )
            })
          })

          setSelectedCellRange({
            startRowIndex: rowIndex,
            startCellIndex: cellIndex,
            endRowIndex: rowIndex + totalRows - 1,
            endCellIndex: cellIndex + totalCellsInRow - 1,
          })
          return
        }
      }
    } catch (err) {
      console.error("Failed to paste cells from clipboard", err)
    }
  }

  const getCellRef = (rowIndex: number, cellIndex: number) => {
    return getRowMap(rowIndex)?.get(cellIndex)?.ref
  }

  // Active Cell Management

  const getActiveCell = () => {
    const cellsMap = getCellsMap()

    for (const [rowIndex, row] of cellsMap.entries()) {
      for (const [cellIndex, cell] of row.entries()) {
        if (cell.isActive) {
          return { rowIndex, cellIndex }
        }
      }
    }
    return undefined
  }

  const setActiveCell = (rowIndex: number, cellIndex: number) => {
    const cellsMap = getCellsMap()

    // Clear previous active cell
    cellsMap.forEach((row) => {
      row.forEach((cell) => {
        cell.isActive = false
        cell.ref?.current?.setAttribute("data-is-active", "false")
      })
    })

    const cell = getCellState(rowIndex, cellIndex)

    if (cell) {
      const cellRef = cell.ref.current

      // Set the cell as active in the cells map
      setCellState(rowIndex, cellIndex, {
        ...cell,
        isActive: true,
      })

      // Set the cell as active in the DOM
      cellRef?.setAttribute("data-is-active", "true")
      cellRef?.focus()

      // Clear the shift traverse marker
      clearShiftTraverseMarker()

      // Clear the selected cells
      clearSelectedCells()

      // Add the cell to the selected cells
      addSelectedCell(rowIndex, cellIndex)
    }
  }

  const isActiveCell = (rowIndex: number, cellIndex: number) => {
    return getCellState(rowIndex, cellIndex)?.isActive ?? false
  }

  const setInputFocus = (rowIndex: number, cellIndex: number) => {
    const cell = getCellState(rowIndex, cellIndex)

    const inputRef = cell?.ref.current?.querySelector("input")

    if (inputRef) {
      inputRef.focus()
      const inputCharLength = inputRef.value.length
      inputRef.setSelectionRange(inputCharLength, inputCharLength)
    }
  }

  // Navigation

  const getBoundary = (
    type: "row" | "cell",
    rowIndex: number,
    boundary: "first" | "last",
  ) => {
    if (type === "row") {
      return boundary === "first" ? 0 : getCellsMap().size - 1
    }

    const row = getRowMap(rowIndex)
    if (!row) return undefined

    return boundary === "first"
      ? Number(row.entries().next().value?.[0])
      : Number(Array.from(row.entries()).pop()?.[0])
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
        ? getBoundary(
            "cell",
            currentTraverseMarker.rowIndex,
            direction === "left" ? "first" : "last",
          )
        : ["left", "up"].includes(direction)
          ? currentTraverseMarker.cellIndex - 1
          : currentTraverseMarker.cellIndex + 1

      if (nextCellIndex === undefined) {
        if (!isShiftHeld) {
          clearSelectedCells()
        }
        return
      }

      if (isShiftHeld) {
        const boundaryCellIndex = getBoundary(
          "cell",
          currentTraverseMarker.rowIndex,
          direction === "left" ? "first" : "last",
        )
        if (boundaryCellIndex === undefined) return

        const endCellIndex = isCtrlHeld ? boundaryCellIndex : nextCellIndex
        const cellRef = getCellRef(currentTraverseMarker.rowIndex, endCellIndex)
        if (cellRef) {
          setSelectedCellRange({
            startRowIndex: currentRowIndex,
            startCellIndex: currentCellIndex,
            endRowIndex: currentTraverseMarker.rowIndex,
            endCellIndex,
          })
        }
      } else {
        const cellRef = getCellRef(
          currentTraverseMarker.rowIndex,
          nextCellIndex,
        )
        if (cellRef) {
          setActiveCell(currentTraverseMarker.rowIndex, nextCellIndex)
        }
      }
    }

    const handleVerticalMovement = () => {
      const nextRowIndex = isCtrlHeld
        ? getBoundary(
            "row",
            currentTraverseMarker.rowIndex,
            direction === "up" ? "first" : "last",
          )
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

    if (["left", "right"].includes(direction)) {
      handleHorizontalMovement()
    } else {
      handleVerticalMovement()
    }
  }

  // Selection

  const isSelectedCell = (rowIndex: number, cellIndex: number) => {
    return getCellState(rowIndex, cellIndex)?.isSelected ?? false
  }

  const getSelectedCells = () => {
    const selectedCells: Array<{ rowIndex: number; cellIndex: number }> = []
    cellsMap.current.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.isSelected) {
          selectedCells.push({ rowIndex, cellIndex })
        }
      })
    })
    return selectedCells
  }

  const addSelectedCell = (rowIndex: number, cellIndex: number) => {
    const cell = getCellState(rowIndex, cellIndex)
    if (cell) {
      setCellState(rowIndex, cellIndex, {
        ...cell,
        isSelected: true,
      })
      cell.ref?.current?.setAttribute("data-is-selected", "true")
    }
  }

  const removeSelectedCell = (rowIndex: number, cellIndex: number) => {
    const cell = getCellState(rowIndex, cellIndex)
    if (cell) {
      setCellState(rowIndex, cellIndex, {
        ...cell,
        isSelected: false,
      })
      cell.ref?.current?.setAttribute("data-is-selected", "false")
    }
  }

  const toggleSelectedCell = (rowIndex: number, cellIndex: number) => {
    if (isSelectedCell(rowIndex, cellIndex)) {
      removeSelectedCell(rowIndex, cellIndex)
    } else {
      addSelectedCell(rowIndex, cellIndex)
    }
  }

  const clearSelectedCells = () => {
    cellsMap.current.forEach((row) => {
      row.forEach((cell) => {
        cell.isSelected = false
        cell.ref?.current?.setAttribute("data-is-selected", "false")
      })
    })
  }

  const clearSelectedCellsValue = () => {
    const selectedCells = getSelectedCells()
    clearCellsValue(selectedCells)
  }

  const copySelectedCells = async () => {
    const selectedCells = getSelectedCells()
    if (selectedCells.length === 0) return

    const minRow = Math.min(...selectedCells.map((cell) => cell.rowIndex))
    const minCell = Math.min(...selectedCells.map((cell) => cell.cellIndex))

    // Create a matrix of the selected cells
    const cellMatrix: string[][] = []
    selectedCells.forEach(({ rowIndex, cellIndex }) => {
      const relativeRow = rowIndex - minRow
      const relativeCell = cellIndex - minCell

      if (!cellMatrix[relativeRow]) {
        cellMatrix[relativeRow] = []
      }

      const value = getCellState(rowIndex, cellIndex)?.value ?? ""
      cellMatrix[relativeRow][relativeCell] = value
    })

    // Create a "plain text" version of the cell matrix
    const plainTextCopy = cellMatrix.map((row) => row.join("\t")).join("\n")

    // Create a "HTML" version of the cell matrix (e.g. for pasting into Excel)
    const htmlCopy = `
      <table>
        ${cellMatrix
          .map(
            (row) => `
          <tr>
            ${row.map((cell) => `<td>${cell}</td>`).join("")}
          </tr>
        `,
          )
          .join("")}
      </table>
    `

    // Copy to clipboard, assuming we're allowed
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([plainTextCopy], { type: "text/plain" }),
          "text/html": new Blob([htmlCopy], { type: "text/html" }),
        }),
      ])
    } catch (err) {
      console.error("Failed to copy cells to clipboard", err)
    }
  }

  const selectAllCells = () => {
    cellsMap.current.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        addSelectedCell(rowIndex, cellIndex)
      })
    })
  }

  const selectAllCellsInRow = (rowIndex: number) => {
    cellsMap.current.get(rowIndex)?.forEach((cell, cellIndex) => {
      addSelectedCell(rowIndex, cellIndex)
    })
  }

  const selectAllCellsInColumn = (cellIndex: number) => {
    cellsMap.current.forEach((row, rowIndex) => {
      addSelectedCell(rowIndex, cellIndex)
    })
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
    clearSelectedCells()

    const [minRow, maxRow] = [
      Math.min(startRowIndex, endRowIndex),
      Math.max(startRowIndex, endRowIndex),
    ]
    const [minCell, maxCell] = [
      Math.min(startCellIndex, endCellIndex),
      Math.max(startCellIndex, endCellIndex),
    ]

    for (let row = minRow; row <= maxRow; row++) {
      for (let cell = minCell; cell <= maxCell; cell++) {
        addSelectedCell(row, cell)
      }
    }

    setShiftTraverseMarker({ rowIndex: endRowIndex, cellIndex: endCellIndex })
  }

  // Mouse and Shift Selection

  const handleShiftClickCell = (rowIndex: number, cellIndex: number) => {
    const startCell = getActiveCell()
    if (!startCell) return

    setSelectedCellRange({
      startRowIndex: startCell.rowIndex,
      startCellIndex: startCell.cellIndex,
      endRowIndex: rowIndex,
      endCellIndex: cellIndex,
    })
  }

  const handleMouseSelectStart = (rowIndex: number, cellIndex: number) => {
    selectionState.current.mouseSelectStartCell = { rowIndex, cellIndex }

    window.addEventListener("pointerup", handleMouseSelectEnd)
  }

  const handleMouseSelectMove = (rowIndex: number, cellIndex: number) => {
    const startCell = selectionState.current.mouseSelectStartCell
    if (!startCell) return

    setSelectedCellRange({
      startRowIndex: startCell.rowIndex,
      startCellIndex: startCell.cellIndex,
      endRowIndex: rowIndex,
      endCellIndex: cellIndex,
    })
  }

  const handleMouseSelectEnd = () => {
    selectionState.current.mouseSelectStartCell = undefined
    window.removeEventListener("pointerup", handleMouseSelectEnd)
  }

  // Traverse Markers

  const getShiftTraverseMarker = ():
    | { rowIndex: number; cellIndex: number }
    | undefined => {
    return selectionState.current.shiftTraverseMarker
  }

  const startShiftTraverse = ({
    rowIndex,
    cellIndex,
  }: {
    rowIndex: number
    cellIndex: number
  }) => {
    // Don't clobber an existing shift selection
    if (!selectionState.current.shiftTraverseMarker) {
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
    selectionState.current.shiftTraverseMarker = { rowIndex, cellIndex }
  }

  const clearShiftTraverseMarker = () => {
    selectionState.current.shiftTraverseMarker = undefined
  }

  // Initialization

  useEffect(() => {
    if (pendingInitializations.current.length > 0) {
      setCellValues((prev) => {
        const newValues = new Map(prev)
        pendingInitializations.current.forEach(
          ({ rowIndex, cellIndex, value }) => {
            if (!newValues.has(rowIndex)) {
              newValues.set(rowIndex, new Map())
            }
            newValues.get(rowIndex)?.set(cellIndex, value)
          },
        )
        return newValues
      })
      pendingInitializations.current = []
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      // Cell Management
      getCellState,
      getRowMap,
      getCellsMap,
      setCellValue,
      addCellIndex,
      handlePaste,

      // Active Cell Management
      isActiveCell,
      setActiveCell,
      setInputFocus,

      // Navigation
      setNextActiveCell,

      // Selection
      isSelectedCell,
      toggleSelectedCell,
      clearSelectedCells,
      clearSelectedCellsValue,
      copySelectedCells,
      selectAllCells,
      selectAllCellsInRow,
      selectAllCellsInColumn,

      // Mouse and Shift Selection
      handleMouseSelectStart,
      handleMouseSelectMove,
      handleShiftClickCell,

      // Traverse Markers
      startShiftTraverse,
    }),
    [cellValues],
  )

  return (
    <CellsContext.Provider value={contextValue}>
      {children}
    </CellsContext.Provider>
  )
}
