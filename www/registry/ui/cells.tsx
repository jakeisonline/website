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

  const { addRowIndex } = useCellsContext()

  let rowIndex = 0

  return React.Children.map(children, (child) => {
    if (!child)
      throw new Error("Failed to find child when iterating Cells children")

    if (child.type.displayName !== "CellRow")
      throw new Error("Invalid child type, only CellRow is allowed")

    const tmpKey = child.key ? child.key : rowIndex

    addRowIndex(rowIndex, null)
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

  const { addCellIndex } = useCellsContext()

  let cellIndex = 0

  return React.Children.map(children, (child) => {
    if (!child)
      throw new Error("Failed to find child when iterating Cells children")

    if (child.type.displayName !== "Cell")
      throw new Error("Invalid child type, only Cell is allowed")

    const childRef = useRef<HTMLInputElement>(null)

    addCellIndex(rowIndex, cellIndex, childRef)
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
      setCellShiftFocus,
      clearCellShiftFocus,
      handleCellFocus,
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
          setCellShiftFocus({
            startRowIndex: rowIndex,
            startCellIndex: cellIndex,
          })
      }

      const modifier = () => {
        if (e.ctrlKey || e.metaKey) {
          return "ctrl"
        }
        if (e.shiftKey) {
          return "shift"
        }
        return undefined
      }

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
              modifier: modifier(),
            })
      }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Shift") {
        clearCellShiftFocus()
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

    const handleFocus = () => {
      handleCellFocus(rowIndex, cellIndex)
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
          className="w-20 min-w-4 cursor-pointer bg-background px-3 py-2 text-center [appearance:textfield] hover:inner-border-2 focus:bg-primary/5 focus:outline-none focus:inner-border-2 focus:inner-border-primary data-[is-selected=true]:bg-primary/5 data-[is-selected=true]:inner-border-2 data-[is-selected=true]:inner-border-primary/25 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&:not(:last-child)]:border-r"
          {...props}
          ref={ref}
          value={value}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={handleNewChange}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
          data-is-selected={isSelected}
        />
      </>
    )
  },
)
Cell.displayName = "Cell"

interface CellsContextType {
  addRowIndex: (index: number, value: any) => void
  addCellIndex: (rowIndex: number, index: number, value: any) => void
  handleMouseDown?: (e: React.MouseEvent<HTMLFormElement>) => void
  isSelectedCell: (rowIndex: number, cellIndex: number) => boolean
  toggleSelectedCell: (rowIndex: number, cellIndex: number) => void
  clearSelectedCells: () => void
  cellsMap: React.MutableRefObject<Map<string, Map<string, string>>>
  focusNextCell: ({
    direction,
    currentRowIndex,
    currentCellIndex,
    modifier,
  }: {
    direction: string
    currentRowIndex: number
    currentCellIndex: number
    modifier?: string
  }) => HTMLInputElement | undefined
  setCellShiftFocus: ({
    startRowIndex,
    startCellIndex,
  }: {
    startRowIndex: number
    startCellIndex: number
  }) => void
  clearCellShiftFocus: () => void
  handleCellFocus: (rowIndex: number, cellIndex: number) => void
}

const CellsContext = createContext<CellsContextType>({
  addRowIndex: () => {},
  addCellIndex: () => {},
  isSelectedCell: () => false,
  toggleSelectedCell: () => {},
  clearSelectedCells: () => {},
  cellsMap: { current: new Map() },
  focusNextCell: () => undefined,
  setCellShiftFocus: () => {},
  clearCellShiftFocus: () => {},
  handleCellFocus: () => {},
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
  const shiftFocusCell = useRef<
    { startRowIndex: number; startCellIndex: number } | undefined
  >(undefined)
  const [selectedCellsMap, setSelectedCellsMap] = useState<
    Map<string, string[]>
  >(new Map())
  const cellsMap = useRef<Map<string, Map<string, any>>>(new Map())

  const addRowIndex = (index: number, value: any) => {
    cellsMap.current.set(`row-${index.toString()}`, new Map(value))
  }

  const addCellIndex = (rowIndex: number, index: number, inputRef: any) => {
    cellsMap.current
      .get(`row-${rowIndex}`)
      ?.set(`cell-${index.toString()}`, inputRef)
  }

  const focusNextCell = ({
    direction,
    currentRowIndex,
    currentCellIndex,
    modifier,
  }: {
    direction: string
    currentRowIndex: number
    currentCellIndex: number
    modifier?: string
  }) => {
    const directionCalc = (direction: string, a: number, b: number) => {
      switch (direction) {
        case "left":
        case "up":
          return a - b
        case "right":
        case "down":
          return a + b
      }
    }

    let nextCell: { current: HTMLInputElement } | undefined
    let nextRow: Map<string, any> | undefined

    switch (direction) {
      case "left":
      case "right":
        const currentCell = cellsMap.current
          .get(`row-${currentRowIndex}`)
          ?.get(`cell-${currentCellIndex.toString()}`)

        if (!currentCell) return undefined

        if (modifier === "ctrl") {
          const currentRow = cellsMap.current.get(`row-${currentRowIndex}`)

          if (direction === "left") {
            const firstCell = currentRow?.entries().next().value
            nextCell = firstCell?.[1]
          } else if (direction === "right") {
            nextCell = currentRow?.get(`cell-${currentRow.size - 1}`)
          }
        } else {
          nextCell = cellsMap.current
            .get(`row-${currentRowIndex}`)
            ?.get(`cell-${directionCalc(direction, currentCellIndex, 1)}`)
        }

        if (nextCell) {
          nextCell.current.focus()

          if (shiftFocusCell.current) {
            const { startRowIndex, startCellIndex } = shiftFocusCell.current
          }
          return nextCell.current
        }

        nextRow = cellsMap.current.get(
          `row-${directionCalc(direction, currentRowIndex, 1)}`,
        )

        if (nextRow) {
          if (direction === "right") {
            nextCell = nextRow.values().next().value
          } else {
            const lastRowIndex = directionCalc(direction, nextRow.size, 1)
            nextCell = nextRow.get(`cell-${lastRowIndex}`)
          }

          if (nextCell) {
            nextCell.current.focus()
            return nextCell.current
          }
        }

        return undefined

      case "up":
      case "down":
        if (modifier === "ctrl") {
          if (direction === "up") {
            const firstRowIndex = 0
            nextRow = cellsMap.current.get(`row-${firstRowIndex}`)
          } else if (direction === "down") {
            const lastRowIndex = cellsMap.current.size - 1
            nextRow = cellsMap.current.get(`row-${lastRowIndex}`)
          }
        } else {
          nextRow = cellsMap.current.get(
            `row-${directionCalc(direction, currentRowIndex, 1)}`,
          )
        }

        if (nextRow) {
          nextCell = nextRow.get(`cell-${currentCellIndex}`)
        }

        if (nextCell) {
          nextCell.current.focus()
          return nextCell.current
        }

        return undefined
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

    if (startingCell) {
      let currentRowIndex = startRowIndex
      let currentCellIndex = startCellIndex

      addSelectedCell(currentRowIndex, currentCellIndex)

      while (currentRowIndex <= endRowIndex) {
        const currentRow = cellsMap.current.get(`row-${currentRowIndex}`)

        if (currentRow) {
          while (currentCellIndex < endCellIndex) {
            const currentCell = currentRow.get(`cell-${currentCellIndex}`)

            if (currentCell) {
              addSelectedCell(currentRowIndex, currentCellIndex)
            }

            currentCellIndex++
          }
        }

        currentRowIndex++
      }
    }
  }

  const setCellShiftFocus = ({
    startRowIndex,
    startCellIndex,
  }: {
    startRowIndex: number
    startCellIndex: number
  }) => {
    shiftFocusCell.current = { startRowIndex, startCellIndex }
  }

  const handleCellFocus = (rowIndex: number, cellIndex: number) => {
    if (shiftFocusCell.current) {
      const { startRowIndex, startCellIndex } = shiftFocusCell.current

      setSelectedCellRange({
        startRowIndex,
        startCellIndex,
        endRowIndex: rowIndex,
        endCellIndex: cellIndex,
      })
    }
  }

  const clearCellShiftFocus = () => {
    shiftFocusCell.current = undefined
  }

  return (
    <CellsContext.Provider
      value={{
        addRowIndex,
        addCellIndex,
        isSelectedCell,
        toggleSelectedCell,
        clearSelectedCells,
        cellsMap,
        focusNextCell,
        setCellShiftFocus,
        clearCellShiftFocus,
        handleCellFocus,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
