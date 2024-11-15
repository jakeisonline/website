import { cn } from "@/lib/utils"
import React, {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
} from "react"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode & { [key: string]: any }
}

export const Cells = forwardRef<HTMLFormElement, CellsProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) throw new Error("No children provided to Cells")

    return (
      <CellsContextProvider>
        <CellsForm className={cn("", className)} {...props} ref={ref}>
          {children}
        </CellsForm>
      </CellsContextProvider>
    )
  },
)
Cells.displayName = "Cells"

const _renderCellsChildren = (
  children: React.ReactNode & { [key: string]: any },
) => {
  if (!children) throw new Error("No children provided to Cells")

  const { mapRowIndex } = useCellsContext()

  let rowIndex = 0

  return React.Children.map(children, (child) => {
    if (!child)
      throw new Error("Failed to find child when iterating Cells children")

    if (child.type.displayName !== "CellRow")
      throw new Error("Invalid child type, only CellRow is allowed")

    const tmpKey = child.key ? child.key : rowIndex

    mapRowIndex(rowIndex, null)
    rowIndex++

    return (
      <CellRow key={tmpKey}>
        {_renderCellRowChildren(rowIndex - 1, child.props.children)}
      </CellRow>
    )
  })
}

const _renderCellRowChildren = (
  rowIndex: number,
  children: React.ReactNode & { [key: string]: any },
) => {
  if (!children) throw new Error("No children provided to CellRow")

  const { mapCellIndex } = useCellsContext()

  let cellIndex = 0

  return React.Children.map(children, (child) => {
    if (!child)
      throw new Error("Failed to find child when iterating Cells children")

    if (child.type.displayName !== "Cell")
      throw new Error("Invalid child type, only Cell is allowed")

    const childRef = useRef<HTMLInputElement>(null)

    mapCellIndex(rowIndex, cellIndex, childRef)
    cellIndex++

    return (
      <Cell
        cellIndex={cellIndex - 1}
        rowIndex={rowIndex}
        ref={childRef}
        {...child.props}
      >
        {child.props.children}
      </Cell>
    )
  })
}

interface CellsForm extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode & { [key: string]: any }
}

const CellsForm = forwardRef<HTMLFormElement, CellsForm>(
  ({ className, children, ...props }, ref) => {
    const { handleMouseDown } = useCellsContext()

    const formRef = useRef<HTMLFormElement>(null)

    return (
      <form
        onMouseDown={handleMouseDown}
        className={cn("", className)}
        {...props}
        ref={formRef}
      >
        {_renderCellsChildren(children)}
      </form>
    )
  },
)

interface CellRowProps extends React.ComponentPropsWithoutRef<"div"> {
  parentRow?: any
  className?: string
  children: React.ReactNode
}

export const CellRow = forwardRef<HTMLDivElement, CellRowProps>(
  ({ parentRow, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row border-b border-l border-r first:border-t",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)
CellRow.displayName = "CellRow"

interface CellProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  type?: HTMLInputTypeAttribute
  cellIndex?: number
  rowIndex?: number
  initialValue?: string
  className?: string
}

export const Cell = forwardRef<HTMLInputElement, CellProps>(
  (
    {
      type = "text",
      name,
      label,
      initialValue,
      cellIndex,
      rowIndex,
      className,
      ...props
    },
    ref,
  ) => {
    if (cellIndex === undefined || rowIndex === undefined)
      throw new Error("cellIndex and rowIndex are required props for Cell")
    const [value, setValue] = useState<string | undefined>(initialValue)

    const {
      isSelectedCell,
      toggleSelectedCell,
      clearSelectedCells,
      focusNextCell,
      startShiftTraverse,
    } = useCellsContext()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyMap = {
        Escape: "escape",
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }

      if (e.key === "Shift") {
        if (rowIndex !== undefined && cellIndex !== undefined)
          startShiftTraverse({
            rowIndex: rowIndex,
            cellIndex: cellIndex,
          })
      }

      // const modifier = () => {
      //   if (e.ctrlKey || e.metaKey) {
      //     return "ctrl"
      //   }
      //   if (e.shiftKey) {
      //     return "shift"
      //   }
      //   return undefined
      // }

      switch (e.key) {
        case "Escape":
          clearSelectedCells()
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
          if (rowIndex !== undefined && cellIndex !== undefined)
            focusNextCell({
              direction: keyMap[e.key],
              currentRowIndex: rowIndex,
              currentCellIndex: cellIndex,
              isShiftHeld: e.shiftKey,
              isCtrlHeld: e.ctrlKey || e.metaKey,
            })
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.metaKey) {
        toggleSelectedCell(rowIndex, cellIndex)
        return
      }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        return
      }
    }

    const handleBlur = () => {
      clearSelectedCells()
    }

    const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const isSelected = isSelectedCell(rowIndex, cellIndex)

    return (
      <>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="w-20 min-w-4 cursor-pointer bg-background px-3 py-2 text-center [appearance:textfield] hover:inner-border-2 focus:bg-primary/5 focus:outline-none focus:inner-border-2 focus:inner-border-primary data-[is-selected=true]:bg-primary/5 data-[is-selected=true]:inner-border-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&:not(:focus)]:data-[is-selected=true]:inner-border-primary/25 [&:not(:last-child)]:border-r"
          {...props}
          ref={ref}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleNewChange}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          onBlur={handleBlur}
          data-is-selected={isSelected}
        />
      </>
    )
  },
)
Cell.displayName = "Cell"

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

const useCellsContext = () => {
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

const CellsContextProvider = ({ children }: CellsContextProviderProps) => {
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
      isShiftHeld && shiftSelectCell.current
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
          isShiftHeld ? currentShiftCell.cellIndex : currentCellIndex,
        )

        if (nextCell) {
          if (isShiftHeld) {
            setSelectionRange(
              currentRowIndex,
              currentCellIndex,
              targetRowIndex,
              currentShiftCell.cellIndex,
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
