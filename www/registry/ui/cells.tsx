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
