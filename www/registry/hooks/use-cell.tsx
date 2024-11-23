import { createContext, useContext, useMemo, useState } from "react"
import { useCellsContext, type CellTraverseDirection } from "./use-cells"

interface CellContextType {
  cellValue: string
  isSelected: boolean
  isEditing: boolean
  isActive: boolean
  handleBlur: (e: React.FocusEvent<HTMLDivElement | HTMLInputElement>) => void
  handleFocus: (e: React.FocusEvent<HTMLDivElement | HTMLInputElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ) => void
  handlePointerDown: (e: React.PointerEvent<HTMLInputElement>) => void
  handlePointerEnter: () => void
  handleDoubleClick: () => void
}

const CellContext = createContext<CellContextType>({
  cellValue: "",
  isSelected: false,
  isEditing: false,
  isActive: false,
  handleBlur: () => {},
  handleFocus: () => {},
  handleChange: () => {},
  handleKeyDown: () => {},
  handlePointerDown: () => {},
  handlePointerEnter: () => {},
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

  const [isEditing, setIsEditing] = useState(false)

  const cellState = getCellState(rowIndex, cellIndex)
  const cellValue = cellState?.value ?? ""
  const isSelected = cellState?.isSelected ?? false
  const isActive = cellState?.isActive ?? false

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCellValue(rowIndex, cellIndex, newValue)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLDivElement | HTMLInputElement>,
  ) => {
    // Don't respond to window/tab blur
    if (e.target !== document.activeElement) {
      const elmType = (e.target as HTMLElement).tagName.toLowerCase()

      if (elmType === "div") {
        clearSelectedCells()
      } else if (elmType === "input") {
        setIsEditing(false)
      }
    }
  }

  const handleFocus = (
    e: React.FocusEvent<HTMLDivElement | HTMLInputElement>,
  ) => {
    const elmType = (e.target as HTMLElement).tagName.toLowerCase()

    if (elmType === "input") {
      setIsEditing(true)
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

  const handlePointerDown = (e: React.PointerEvent<HTMLInputElement>) => {
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

  const handlePointerEnter = () => {
    handleMouseSelectMove(rowIndex, cellIndex)
  }

  const contextValue = useMemo(() => {
    return {
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
    }
  }, [
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
  ])

  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  )
}
