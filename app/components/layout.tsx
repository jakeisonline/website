import Link from "@/components/ui/link"
import { H4 } from "@/components/ui/headings"

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
      <aside className="top-20 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 sticky block">
        <H4 className="mt-0">Components</H4>
        <div className="grid gap-1 text-sm">
          <Link href="/components/range" className="text-foreground/60">
            Range
          </Link>
          <Link href="/components/stepper" className="text-foreground/60">
            Stepper
          </Link>
        </div>
      </aside>
      <div className="relative grid xl:grid-cols-[1fr_300px]">{children}</div>
    </div>
  )
}
