"use client"

import { cn } from "@/lib/utils"
import React, {
  forwardRef,
  useRef,
  type HTMLInputTypeAttribute,
  memo,
} from "react"
import {
  CellsContextProvider,
  useCellsContext,
} from "@/registry/hooks/use-cells"
import { CellContextProvider, useCellContext } from "@/registry/hooks/use-cell"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLFormElement, CellsProps>(
  ({ className, children, ...props }, ref) => (
    <CellsContextProvider aria-multiselectable="true">
      <CellsForm className={cn("", className)} {...props} ref={ref}>
        {children}
      </CellsForm>
    </CellsContextProvider>
  ),
)
Cells.displayName = "Cells"

const _renderCells = (children: React.ReactNode, parentRowIndex?: number) => {
  if (!children) throw new Error("No children provided")

  const { addCellIndex } = useCellsContext()
  let rowIndex = parentRowIndex ?? 0
  let cellIndex = 0

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null

    if (parentRowIndex === undefined) {
      if (
        typeof child.type === "function" &&
        (child.type as any).displayName !== "CellRow"
      ) {
        throw new Error("Invalid child type, only CellRow is allowed")
      }

      const tmpKey = child.key ? child.key : rowIndex
      rowIndex++

      return (
        <CellRow key={tmpKey}>
          {_renderCells(child.props.children, rowIndex - 1)}
        </CellRow>
      )
    }

    if (
      typeof child.type === "function" &&
      (child.type as any).displayName !== "Cell"
    ) {
      throw new Error("Invalid child type, only Cell is allowed")
    }

    const childRef = useRef<HTMLInputElement>(null)
    const initialValue = child.props.initialValue || ""

    addCellIndex(rowIndex, cellIndex, childRef, initialValue)
    cellIndex++

    return (
      <CellContextProvider rowIndex={rowIndex} cellIndex={cellIndex - 1}>
        <Cell
          cellIndex={cellIndex - 1}
          rowIndex={rowIndex}
          ref={childRef}
          {...child.props}
        >
          {child.props.children}
        </Cell>
      </CellContextProvider>
    )
  })
}

interface CellsForm extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

const CellsForm = forwardRef<HTMLFormElement, CellsForm>(
  ({ className, children, ...props }, ref) => {
    return (
      <form className={cn("", className)} role="grid" {...props} ref={ref}>
        {_renderCells(children)}
      </form>
    )
  },
)
CellsForm.displayName = "CellsForm"

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
        role="row"
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
  autoselect?: boolean
  type?: HTMLInputTypeAttribute
  cellIndex?: number
  rowIndex?: number
  className?: string
}

export const Cell = memo(
  forwardRef<HTMLInputElement, CellProps>(
    (
      {
        type = "text",
        name,
        label,
        autoselect,
        cellIndex,
        rowIndex,
        className,
        ...props
      },
      ref,
    ) => {
      if (cellIndex === undefined || rowIndex === undefined)
        throw new Error("cellIndex and rowIndex are required props for Cell")

      const {
        cellValue,
        isSelected,
        isEditing,
        isActive,
        handleBlur,
        handleFocus,
        handleChange,
        handleKeyDown,
        handlePointerDown,
        handlePointerEnter,
        handleDoubleClick,
      } = useCellContext()

      return (
        <div
          tabIndex={0}
          className="w-20 min-w-4 cursor-pointer bg-background p-0.5 text-center [appearance:textfield] hover:inner-border-2 focus:bg-primary/5 focus:outline-none focus:inner-border-2 focus:inner-border-primary has-[:focus]:bg-primary/5 has-[:focus]:inner-border-2 has-[:focus]:inner-border-primary data-[is-selected=true]:bg-primary/5 data-[is-selected=true]:inner-border-2 [&:not(:focus)]:data-[is-selected=true]:inner-border-primary/25 [&:not(:last-child)]:border-r"
          role="gridcell"
          aria-colindex={cellIndex + 1} // ARIA indices are 1 based, not 0
          aria-selected={isSelected}
          aria-label={`${label}: ${cellValue}`}
          aria-expanded={isEditing}
          data-is-editing={isEditing}
          data-is-active={isActive}
          data-is-selected={isSelected}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          ref={ref}
          autoFocus={autoselect}
        >
          <label htmlFor={name} className="sr-only">
            {label}
          </label>
          <input
            type={type}
            name={name}
            className="w-full bg-transparent px-3 py-2 text-center outline-none [appearance:textfield] focus:inner-border-2 focus:inner-border-primary/25 [&:not(:focus)]:cursor-pointer"
            aria-hidden={!isEditing}
            value={cellValue}
            tabIndex={-1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>
      )
    },
  ),
)
Cell.displayName = "Cell"
