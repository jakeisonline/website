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
      <nav className="@md:w-[200px] border-r border-border pr-2">
        <ul className="flex flex-col gap-1">
          <NavItem
            type="home"
            selected={selected === "home"}
            pending={pending === "home"}
            onClick={() => handleNavItemClick("home")}
          />
          <NavItem
            type="orders"
            selected={selected === "orders"}
            pending={pending === "orders"}
            onClick={() => handleNavItemClick("orders")}
          />
          <NavItem
            type="products"
            selected={selected === "products"}
            pending={pending === "products"}
            onClick={() => handleNavItemClick("products")}
          />
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
  type,
  selected,
  pending,
  ...props
}: {
  type: "home" | "orders" | "products"
  selected: boolean
  pending: boolean
} & React.HTMLAttributes<HTMLLIElement>) {
  const types = {
    home: {
      label: "Home",
      icon: House,
    },
    orders: {
      label: "Orders",
      icon: ShoppingBag,
    },
    products: {
      label: "Products",
      icon: Package,
    },
  }

  const Icon = types[type].icon

  return (
    <li
      className={cn(
        "px-2 py-1 rounded-md hover:bg-muted/40 cursor-pointer flex items-center gap-2",
        selected && "bg-muted hover:bg-muted",
        pending && "bg-muted/40 hover:bg-muted/40",
      )}
      {...props}
    >
      {pending && <Loader2 className="size-3 animate-spin" />}
      <Icon className={cn("size-3", pending && "hidden")} />
      <span className="hidden @sm:block">{types[type].label}</span>
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
