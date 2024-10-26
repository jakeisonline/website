import { cn } from "@/lib/utils"
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLInputTypeAttribute,
} from "react"

interface CellsProps extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

export const Cells = forwardRef<HTMLFormElement, CellsProps>(
  ({ className, children, ...props }, ref) => {
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

interface CellsForm extends React.ComponentPropsWithoutRef<"form"> {
  className?: string
  children: React.ReactNode
}

export const CellsForm = forwardRef<HTMLFormElement, CellsForm>(
  ({ className, children, ...props }, ref) => {
    const { handleMouseDown } = useCellsContext()

    return (
      <form
        onMouseDown={handleMouseDown}
        className={cn("", className)}
        {...props}
        ref={ref}
      >
        {children}
      </form>
    )
  },
)

interface CellRowProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
}

export const CellRow = forwardRef<HTMLDivElement, CellRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("flex flex-row", className)} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
CellRow.displayName = "CellRow"

interface CellProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string
  label: string
  type?: HTMLInputTypeAttribute
  initialValue?: string
  className?: string
}

export const Cell = forwardRef<HTMLInputElement, CellProps>(
  ({ type = "text", name, label, initialValue, className, ...props }, ref) => {
    return (
      <CellContextProvider initialValue={initialValue}>
        <CellInput type={type} name={name} label={label} {...props} ref={ref} />
      </CellContextProvider>
    )
  },
)
Cell.displayName = "Cell"

interface CellInputProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  type?: HTMLInputTypeAttribute
  className?: string
}

const CellInput = forwardRef<HTMLInputElement, CellProps>(
  ({ type = "text", name, label, className, ...props }, ref) => {
    const { value, handleChange } = useCellContext()

    return (
      <>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="px-3 py-2 w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-4 text-center hover:inner-border-2 focus:inner-border-primary focus:inner-border-2 inner-border focus:outline-none cursor-pointer"
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
        />
      </>
    )
  },
)

interface CellContextType {
  value: string | undefined
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CellContext = createContext<CellContextType>({
  value: undefined,
  handleChange: () => {},
})

const useCellContext = () => {
  const context = useContext(CellContext)

  if (!context) {
    throw new Error("useCellContext must be used within a CellContextProvider")
  }

  return context
}

interface CellContextProviderProps {
  initialValue?: string
  children: React.ReactElement
}

const CellContextProvider = ({
  initialValue,
  children,
}: CellContextProviderProps) => {
  const [value, setValue] = useState<string | undefined>(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <CellContext.Provider
      value={{
        value,
        handleChange,
      }}
    >
      {children}
    </CellContext.Provider>
  )
}

interface CellsContextType {
  handleMouseDown?: (e: React.MouseEvent<HTMLFormElement>) => void
}

const CellsContext = createContext<CellsContextType>({})

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
  const [mouseDownStartPoint, setMouseDownStartPoint] = useState<
    { x: number; y: number } | undefined
  >(undefined)

  const handleMouseDown = (e: React.MouseEvent<HTMLFormElement>) => {
    setMouseDownStartPoint({
      x: e.pageX,
      y: e.pageY,
    })
  }

  return (
    <CellsContext.Provider
      value={{
        handleMouseDown,
      }}
    >
      {children}
    </CellsContext.Provider>
  )
}
