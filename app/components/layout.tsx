import { Urbanist } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import ThemeToggle, { ThemeContextProvider } from "@/components/ui/theme-toggle"
import { Navigation, NavigationItem } from "@/components/ui/navigation"

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
                <Link href="/" rel="noreferrer" target="_blank">
                  🛝 jakeisonline/playground
                </Link>
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
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
