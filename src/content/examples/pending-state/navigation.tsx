import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { House, Loader2, Package, ShoppingBag } from "lucide-react"
import { useRef, useState } from "react"
import ApplyFilters from "./apply-filters"

export default function Navigation() {
  const [selected, setSelected] = useState<"home" | "orders" | "products">(
    "orders",
  )
  const [pending, setPending] = useState<"home" | "orders" | "products" | null>(
    null,
  )
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNavItemClick = (item: "home" | "orders" | "products") => {
    setPending(item)

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      setPending(null)
      setSelected(item)
    }, 600)
  }

  return (
    <div className="flex gap-4 min-h-[430px]">
      <nav className="w-[200px] border-r border-border pr-2">
        <ul className="flex flex-col gap-1">
          <NavItem
            selected={selected === "home"}
            pending={pending === "home"}
            onClick={() => handleNavItemClick("home")}
          >
            <House className="size-3" />
            <span>Home</span>
            {pending === "home" && (
              <Loader2 className="size-3 animate-spin ml-auto" />
            )}
          </NavItem>
          <NavItem
            selected={selected === "orders"}
            pending={pending === "orders"}
            onClick={() => handleNavItemClick("orders")}
          >
            <ShoppingBag className="size-3" />
            <span>Orders</span>
            {pending === "orders" && (
              <Loader2 className="size-3 animate-spin ml-auto" />
            )}
          </NavItem>
          <NavItem
            selected={selected === "products"}
            pending={pending === "products"}
            onClick={() => handleNavItemClick("products")}
          >
            <Package className="size-3" />
            <span>Products</span>
            {pending === "products" && (
              <Loader2 className="size-3 animate-spin ml-auto" />
            )}
          </NavItem>
        </ul>
      </nav>
      <div className="w-[500px]">
        {pending && <SkeletonPage />}
        {!pending && <ApplyFilters />}
      </div>
    </div>
  )
}

function NavItem({
  selected,
  pending,
  children,
  ...props
}: {
  selected: boolean
  pending: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "px-2 py-1 rounded-md hover:bg-muted/40 cursor-pointer flex items-center gap-2",
        selected && "bg-muted hover:bg-muted",
        pending && "bg-muted/40 hover:bg-muted/40",
      )}
      {...props}
    >
      {children}
    </li>
  )
}

function SkeletonPage() {
  return (
    <div className="w-full flex-col items-center space-x-4 space-y-4">
      <Skeleton className="w-[250px] h-[40px]" />
      <div className="flex flex-row gap-2">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="h-4 w-[130px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="h-4 w-[130px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="flex flex-row gap-2">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="h-4 w-[130px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  )
}
