import { Urbanist } from "next/font/google"
import "./globals.css"
import Link from "@/components/ui/link"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import ThemeToggle, { ThemeContextProvider } from "@/components/ui/theme-toggle"
import { Navigation, NavigationItem } from "@/components/ui/navigation"
import { H4 } from "@/components/ui/headings"

const font = Urbanist({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Components</title>
      </head>

      <body className={`min-h-screen bg-background ${font.className}`}>
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur supports[backdrop-filter]:bg-background/20">
            <div className="container flex h-14 max-w-screen-2xl items-center text-sm font-bold">
              <div className="flex items-center gap-8">
                <Link href="/">🛝 jakeisonline/playground</Link>
                <Navigation>
                  <NavigationItem href="/components">Components</NavigationItem>
                </Navigation>
              </div>
              <div className="justify-end flex flex-1 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent"
                  asChild
                >
                  <Link href="https://github.com/jakeisonline/playground">
                    <GitHubLogoIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div className="container flex-1 pt-6 pb-20 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="top-20 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 sticky block">
              <H4 className="mt-0">Components</H4>
              <div className="grid gap-1 text-sm">
                <Link href="/components/range">Range</Link>
                <Link href="/components/stepper">Stepper</Link>
              </div>
            </aside>
            <main className="relative grid xl:grid-cols-[1fr_300px]">
              {children}
            </main>
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
