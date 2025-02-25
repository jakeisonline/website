import React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import Link from "../ui/Link.astro"

interface Props {
  className?: string
}

export function Search({ className, ...props }: Props) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "group relative h-8 bg-muted px-3 text-xs hover:border-foreground/80",
          className,
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="mr-1 hidden text-muted-foreground group-hover:text-foreground md:block">
          Search things...
        </span>
        <span className="mr-1 block text-muted-foreground group-hover:text-foreground md:hidden">
          Search...
        </span>
        <kbd className="hidden select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-2xs font-medium text-muted-foreground opacity-100 group-hover:text-foreground md:flex">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components, tools, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Site Navigation">
            <CommandItem>Components</CommandItem>
            <CommandItem>Tools</CommandItem>
            <CommandItem>About</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
