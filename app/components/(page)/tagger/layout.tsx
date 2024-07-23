import "./tagger.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Components | Tagger</title>
      </head>

      <body>{children}</body>
    </html>
  )
}
