import MapContextProvider from "./contexts/mapContextProvider"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Experiments</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <MapContextProvider>{children}</MapContextProvider>
      </body>
    </html>
  )
}
