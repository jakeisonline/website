import { cn } from "@/lib/utils"
import React, {
  forwardRef,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
} from "react"
import {
  CellsContextProvider,
  useCellsContext,
} from "@/registry/hooks/use-cells"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
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

const _renderCellsChildren = (children: React.ReactNode) => {
  if (!children) throw new Error("No children provided to Cells")

  const { mapRowIndex } = useCellsContext()

  let rowIndex = 0

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null

    if (
      typeof child.type === "function" &&
      (child.type as any).displayName !== "CellRow"
    )
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
  children: React.ReactNode,
) => {
  if (!children) throw new Error("No children provided to CellRow")

  const { mapCellIndex } = useCellsContext()

  let cellIndex = 0

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null

    if (
      typeof child.type === "function" &&
      (child.type as any).displayName !== "Cell"
    )
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
  children: React.ReactNode
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
      isActiveCell,
      setActiveCell,
      setInputFocus,
      setFocusCell,
      handleMouseSelectStart,
      handleMouseSelectMove,
    } = useCellsContext()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setFocusCell(rowIndex, cellIndex)
        return
      }

      if (e.key === "Enter") {
        setFocusCell(rowIndex, cellIndex)
        return
      }
    }

    const handleCellKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.target !== e.currentTarget) return
      if (rowIndex === undefined || cellIndex === undefined) return

      const keyPressed = e.key

      const keyMap: Record<string, string> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }

      const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(keyPressed)

      if (keyPressed === "Shift") {
        startShiftTraverse({
          rowIndex,
          cellIndex,
        })
        return
      }

      if (keyPressed === "Escape") {
        clearSelectedCells()
        setFocusCell(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Enter") {
        setInputFocus(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Delete" || keyPressed === "Backspace") {
        setValue("")
        return
      }

      const direction = keyMap[keyPressed]

      if (direction) {
        e.preventDefault()

        focusNextCell({
          direction,
          currentRowIndex: rowIndex,
          currentCellIndex: cellIndex,
          isShiftHeld: e.shiftKey,
          isCtrlHeld: e.ctrlKey || e.metaKey,
        })
      }

      if (isAlphaNumeric) {
        setInputFocus(rowIndex, cellIndex)
      }
    }

    const handleCellClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.ctrlKey || e.metaKey) {
        toggleSelectedCell(rowIndex, cellIndex)
        return
      }
    }

    const handleCellMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      // Effectively a double click, but much more forgiving on timing
      if (!isActiveCell(rowIndex, cellIndex)) {
        e.preventDefault()
        setFocusCell(rowIndex, cellIndex)
      }

      // Prevent the cell from being selected when ctrl or cmd is held
      // to allow for multi-cell selection
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        return
      }

      handleMouseSelectStart(rowIndex, cellIndex)
    }

    const handleCellMouseEnter = () => {
      handleMouseSelectMove(rowIndex, cellIndex)
    }

    const handleCellFocus = () => {
      setActiveCell(rowIndex, cellIndex)
    }

    const handleCellBlur = () => {
      clearSelectedCells()
    }

    const isSelected = isSelectedCell(rowIndex, cellIndex)
    const isActive = isActiveCell(rowIndex, cellIndex)

    return (
      <div
        tabIndex={0}
        className="w-20 min-w-4 cursor-pointer bg-background p-0.5 text-center [appearance:textfield] hover:inner-border-2 focus:bg-primary/5 focus:outline-none focus:inner-border-2 focus:inner-border-primary has-[:focus]:bg-primary/5 has-[:focus]:inner-border-2 has-[:focus]:inner-border-primary data-[is-selected=true]:bg-primary/5 data-[is-selected=true]:inner-border-2 [&:not(:focus)]:data-[is-selected=true]:inner-border-primary/25 [&:not(:last-child)]:border-r"
        data-is-active={isActive}
        onKeyDown={handleCellKeyDown}
        onMouseDown={handleCellMouseDown}
        onMouseEnter={handleCellMouseEnter}
        onClick={handleCellClick}
        onFocus={handleCellFocus}
        onBlur={handleCellBlur}
        data-is-selected={isSelected}
        ref={ref}
      >
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="w-full bg-transparent px-3 py-2 text-center outline-none [appearance:textfield] focus:inner-border-2 focus:inner-border-primary/25 [&:not(:focus)]:cursor-pointer"
          {...props}
          value={value}
          tabIndex={-1}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
    )
  },
)
Cell.displayName = "Cell"
