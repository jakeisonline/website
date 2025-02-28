import React, { useRef } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type SubNavItems } from "@/components/SubNav.astro"
import { navigate } from "astro:transitions/client"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { prefetch } from "astro:prefetch"

// See BaseLayout.astro for the pagefind initialization
declare const pagefind: any

interface Props {
  navItems: SubNavItems
  className?: string
}

export function Search({ navItems, className, ...props }: Props) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])

  // We're going to override the scroll behavior of cmdk
  // cf. https://github.com/pacocoursey/cmdk/issues/234#issuecomment-2105098199
  const listRef = useRef<HTMLDivElement>(null)

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

  async function handleChange(value: string) {
    setQuery(value)

    // Scroll to the top of the list when the query changes
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 })
    })

    if (value === "") {
      setResults([])
      return
    }

    if (pagefind) {
      const search = await pagefind.search(query)
      const results = await Promise.all(
        // TODO: Type this when https://github.com/CloudCannon/pagefind/issues/767 is fixed
        search.results.map(async (result: any) => {
          const data = await result.data()
          return {
            title: data.meta.title,
            url: data.url,
            excerpt: data.excerpt,
          }
        }),
      )
      setResults(results)
    }
  }

  function handleSelect(url: string) {
    navigate(url)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>, url: string) {
    if (e.key === "Enter") {
      prefetch(url)
    }
  }

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
        <Command shouldFilter={false}>
          <DialogTitle className="sr-only">
            Search & Site Navigation
          </DialogTitle>
          <DialogDescription className="sr-only">
            Search for pages across this site and navigate directly to theem
          </DialogDescription>
          <CommandInput
            placeholder="Search components, tools, and more..."
            value={query}
            onValueChange={handleChange}
          />
          <CommandList ref={listRef}>
            <CommandEmpty>No results found.</CommandEmpty>
            {query.length === 0 &&
              results.length === 0 &&
              navItems.map((item) => {
                if (item.type === "heading") return null
                return (
                  <CommandItem
                    key={item.text}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    onSelect={() => handleSelect(item.href)}
                  >
                    {item.text}
                  </CommandItem>
                )
              })}
            {results &&
              results.map((result) => (
                <CommandItem
                  key={result.url}
                  onSelect={() => handleSelect(result.url)}
                  onKeyDown={(e) => handleKeyDown(e, result.url)}
                >
                  {result.title}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
