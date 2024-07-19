import "./globals.css"
import { Urbanist } from "next/font/google"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Navigation, NavigationItem } from "@/components/ui/navigation"
import "./globals.css"
import ThemeToggle, { ThemeContextProvider } from "@/components/ui/theme-toggle"
import Link from "@/components/ui/link"

const font = Urbanist({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Playground</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>

      <body
        className={`min-h-screen bg-background ${font.className}`}
        suppressHydrationWarning
      >
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur supports[backdrop-filter]:bg-background/20">
            <div className="container flex h-14 max-w-screen-2xl items-center text-sm font-bold">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-foreground">
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
          <main>{children}</main>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
