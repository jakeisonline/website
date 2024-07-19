import SubNav from "@/components/sub-nav"

export const metadata = {
  title: "🛝 Playground - Components",
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex-1 pt-6 pb-20 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <SubNav />
      <div className="relative grid xl:grid-cols-[1fr_300px]">{children}</div>
    </div>
  )
}
