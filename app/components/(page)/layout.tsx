export default function ComponentPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto w-full min-w-0">{children}</div>
}
