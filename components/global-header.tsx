import { GlobalNav } from "./global-nav"
import { Button } from "./ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "./ui/link"
import ThemeToggle from "./ui/theme-toggle"

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur supports[backdrop-filter]:bg-background/20">
      <div className="container flex h-14 max-w-screen-2xl items-center text-sm font-bold">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-foreground">
            🛝 jakeisonline/playground
          </Link>
          <GlobalNav />
        </div>
        <div className="justify-end flex flex-1 gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent"
            asChild
          >
            <Link
              external
              noIcon
              href="https://github.com/jakeisonline/playground"
              className="text-foreground"
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
