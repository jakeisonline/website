import { Urbanist } from "next/font/google"
import "./globals.css"
import { ThemeContextProvider } from "@/components/ui/theme-toggle"
import GlobalHeader from "@/components/global-header"

const font = Urbanist({ subsets: ["latin"] })

export const metadata = {
  title: "Playground",
  description: "A playground for testing and developing components",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        /> */}
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
          <GlobalHeader />
          <main>{children}</main>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
