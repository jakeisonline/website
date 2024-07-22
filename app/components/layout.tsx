import SubNav from "@/components/sub-nav"

export const metadata = {
  title: "Playground - Components",
}

export default async function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { name: "Range", href: "/components/range" },
    { name: "Stepper", href: "/components/stepper" },
  ]

  return (
    <div className="container flex-1 pt-6 pb-20 items-start md:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <SubNav title="Components" navItems={navItems} />
      <div className="relative grid xl:grid-cols-[1fr_300px]">{children}</div>
    </div>
  )
}
