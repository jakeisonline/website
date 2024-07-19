import { H4 } from "./ui/headings"
import Link from "./ui/link"

export default function SubNav() {
  return (
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
  )
}
