import { cn } from "@/lib/utils"
import React, {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
  type RefAttributes,
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
        parentRowIndex={rowIndex}
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

    return (
      <form
        onMouseDown={handleMouseDown}
        className={cn("", className)}
        {...props}
        ref={ref}
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
      <div className={cn("flex flex-row", className)} {...props} ref={ref}>
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
  parentRowIndex?: number
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
      parentRowIndex,
      className,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string | undefined>(initialValue)

    const {
      isSelectedCell,
      toggleSelectedCell,
      clearSelectedCells,
      focusNextSelectableCell,
    } = useCellsContext()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyMap = {
        Escape: "escape",
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }

      switch (e.key) {
        case "Escape":
          clearSelectedCells()
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
          if (parentRowIndex !== undefined && cellIndex !== undefined)
            focusNextSelectableCell(keyMap[e.key], parentRowIndex, cellIndex)
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.metaKey) {
        toggleSelectedCell(name)
        return
      }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        return
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      clearSelectedCells()
    }

    const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const isSelected = isSelectedCell(name)

    return (
      <>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="w-20 min-w-4 cursor-pointer px-3 py-2 text-center inner-border [appearance:textfield] hover:inner-border-2 focus:outline-none focus:inner-border-2 focus:inner-border-primary data-[is-selected=true]:inner-border-2 data-[is-selected=true]:inner-border-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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

interface CellInputProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  type?: HTMLInputTypeAttribute
  cellIndex?: number
  parentRowIndex?: number
  className?: string
}

interface CellsContextType {
  addRowIndex: (index: number, value: any) => void
  addCellIndex: (parentRowIndex: number, index: number, value: any) => void
  handleMouseDown?: (e: React.MouseEvent<HTMLFormElement>) => void
  isSelectedCell: (name: string) => boolean
  toggleSelectedCell: (name: string) => void
  clearSelectedCells: () => void
  cellsMap: React.MutableRefObject<Map<string, Map<string, string>>>
  focusNextSelectableCell: (
    direction: string,
    currentRowIndex: number,
    currentCellIndex: number,
  ) => void
}

const CellsContext = createContext<CellsContextType>({
  addRowIndex: () => {},
  addCellIndex: () => {},
  isSelectedCell: () => false,
  toggleSelectedCell: () => {},
  clearSelectedCells: () => {},
  cellsMap: { current: new Map() },
  focusNextSelectableCell: () => null,
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

interface CellsMapType {
  current: string
}

interface CellsContextProviderProps {
  children: React.ReactElement
}

const CellsContextProvider = ({ children }: CellsContextProviderProps) => {
  const [mouseDownStartPoint, setMouseDownStartPoint] = useState<
    { x: number; y: number } | undefined
  >(undefined)
  const [selectedCells, setSelectedCells] = useState<string[]>([])
  const cellsMap = useRef<Map<string, Map<string, any>>>(new Map())

  const handleMouseDown = (e: React.MouseEvent<HTMLFormElement>) => {
    setMouseDownStartPoint({
      x: e.pageX,
      y: e.pageY,
    })
  }

  const addRowIndex = (index: number, value: any) => {
    cellsMap.current.set(`row-${index.toString()}`, new Map(value))
  }

  const addCellIndex = (
    parentRowIndex: number,
    index: number,
    inputRef: any,
  ) => {
    cellsMap.current
      .get(`row-${parentRowIndex}`)
      ?.set(`cell-${index.toString()}`, inputRef)
  }

  const focusNextSelectableCell = (
    direction: string,
    currentRowIndex: number,
    currentCellIndex: number,
  ) => {
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

    switch (direction) {
      case "left":
      case "right":
        const currentCell = cellsMap.current
          .get(`row-${currentRowIndex}`)
          ?.get(`cell-${currentCellIndex.toString()}`)

        if (!currentCell) return null

        const nextSelectableCell = cellsMap.current
          .get(`row-${currentRowIndex}`)
          ?.get(`cell-${directionCalc(direction, currentCellIndex, 1)}`)

        if (nextSelectableCell) {
          nextSelectableCell.current.focus()
          return nextSelectableCell.current
        }

        const nextSelectableRow = cellsMap.current.get(
          `row-${directionCalc(direction, currentRowIndex, 1)}`,
        )

        if (nextSelectableRow) {
          if (direction === "right") {
            const nextCell = nextSelectableRow.values().next().value

            nextCell.current.focus()
            return nextCell.current
          } else {
            const lastRowIndex = directionCalc(
              direction,
              nextSelectableRow.size,
              1,
            )
            const selectableCell = nextSelectableRow.get(`cell-${lastRowIndex}`)

            selectableCell.current.focus()
            return selectableCell.current
          }
        }

        return null

      case "up":
      case "down":
        const nextRow = cellsMap.current.get(
          `row-${directionCalc(direction, currentRowIndex, 1)}`,
        )

        if (!nextRow) return null

        const nextCell = nextRow.get(`cell-${currentCellIndex}`)

        if (!nextCell) return null

        nextCell.current.focus()
        return nextCell.current
    }
  }

  const isSelectedCell = (name: string) => {
    return selectedCells.includes(name)
  }

  const addSelectedCell = (name: string) => {
    setSelectedCells([...selectedCells, name])
  }

  const removeSelectedCell = (name: string) => {
    setSelectedCells(selectedCells.filter((cell) => cell !== name))
  }

  const toggleSelectedCell = (name: string) => {
    if (isSelectedCell(name)) {
      removeSelectedCell(name)
    } else {
      addSelectedCell(name)
    }
  }

  const clearSelectedCells = () => {
    setSelectedCells([])
  }

  return (
    <CellsContext.Provider
      value={{
        handleMouseDown,
        addRowIndex,
        addCellIndex,
        isSelectedCell,
        toggleSelectedCell,
        clearSelectedCells,
        cellsMap,
        focusNextSelectableCell,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
