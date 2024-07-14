import { Urbanist } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import ThemeToggle, { ThemeContextProvider } from "@/components/ui/theme-toggle"

const font = Urbanist({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
          <header className="sticky top-0 z-50 w-full">
            <div className="container flex h-14 max-w-screen-2xl items-center text-sm font-bold">
              <div>
                <Link href="/" className="flex items-center gap-2">
                  🛝 jakeisonline/playground
                </Link>
              </div>
              <div className="justify-end flex flex-1">
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
