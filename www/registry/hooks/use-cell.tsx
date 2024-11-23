import { createContext, useContext, useMemo } from "react"
import { useCellsContext, type CellTraverseDirection } from "./use-cells"

interface CellContextType {
  cellValue: string
  isSelected: boolean
  isActive: boolean
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ) => void
  handleMouseDown: (e: React.MouseEvent<HTMLInputElement>) => void
  handleMouseEnter: () => void
  handleDoubleClick: () => void
}

const CellContext = createContext<CellContextType>({
  cellValue: "",
  isSelected: false,
  isActive: false,
  handleBlur: () => {},
  handleChange: () => {},
  handleKeyDown: () => {},
  handleMouseDown: () => {},
  handleMouseEnter: () => {},
  handleDoubleClick: () => {},
})

export const useCellContext = ({
  rowIndex,
  cellIndex,
}: {
  rowIndex: number
  cellIndex: number
}) => {
  const context = useContext(CellContext)

  if (!context) {
    throw new Error("useCellContext must be used within a CellContextProvider")
  }

  return context
}

export const CellContextProvider = ({
  rowIndex,
  cellIndex,
  children,
}: {
  rowIndex: number
  cellIndex: number
  children: React.ReactElement
}) => {
  const {
    setCellValue,
    setActiveCell,
    startShiftTraverse,
    clearSelectedCells,
    setInputFocus,
    setNextActiveCell,
    toggleSelectedCell,
    handleShiftClickCell,
    handleMouseSelectStart,
    getCellState,
    handleMouseSelectMove,
  } = useCellsContext()

  const cellState = getCellState(rowIndex, cellIndex)
  const cellValue = cellState?.value ?? ""
  const isSelected = cellState?.isSelected ?? false
  const isActive = cellState?.isActive ?? false

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCellValue(rowIndex, cellIndex, newValue)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target !== document.activeElement) {
      clearSelectedCells()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ) => {
    const elmType = (e.target as HTMLElement).tagName.toLowerCase()

    if (elmType === "input") {
      if (e.key === "Escape") {
        setActiveCell(rowIndex, cellIndex)
        return
      }

      if (e.key === "Enter") {
        setActiveCell(rowIndex, cellIndex)
        return
      }
    }

    if (elmType === "div") {
      if (e.target !== e.currentTarget) return
      if (rowIndex === undefined || cellIndex === undefined) return

      const keyPressed = e.key

      const keyMap: Record<string, CellTraverseDirection> = {
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
        setActiveCell(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Enter") {
        setInputFocus(rowIndex, cellIndex)
        return
      }

      if (keyPressed === "Delete" || keyPressed === "Backspace") {
        setCellValue(rowIndex, cellIndex, "")
        return
      }

      const direction = keyMap[keyPressed]

      if (direction) {
        e.preventDefault()

        setNextActiveCell({
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
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    // Prevent the cell from being selected when ctrl or cmd is held
    // to allow for multi-cell selection
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      toggleSelectedCell(rowIndex, cellIndex)
      return
    } else if (e.shiftKey) {
      e.preventDefault()
      handleShiftClickCell(rowIndex, cellIndex)
      return
    } else {
      e.preventDefault()
      setActiveCell(rowIndex, cellIndex)
      handleMouseSelectStart(rowIndex, cellIndex)
    }
  }

  const handleDoubleClick = () => {
    setInputFocus(rowIndex, cellIndex)
  }

  const handleMouseEnter = () => {
    handleMouseSelectMove(rowIndex, cellIndex)
  }

  const contextValue = useMemo(() => {
    return {
      cellValue,
      isSelected,
      isActive,
      handleBlur,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleMouseEnter,
      handleDoubleClick,
    }
  }, [
    cellValue,
    isSelected,
    isActive,
    handleBlur,
    handleChange,
    handleKeyDown,
    handleMouseDown,
    handleMouseEnter,
    handleDoubleClick,
  ])

  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  )
}
