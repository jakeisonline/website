import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

type ExternalLinkProps = {
  children: React.ReactNode
  props: React.ComponentPropsWithoutRef<typeof ExternalLink>
}

export default function ExternalLink({
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-blue-600 hover:text-blue-800 transition-colors duration-200 inline-flex",
        props.className,
      )}
      {...props}
    >
      {children}
      <ExternalLinkIcon className="ml-1 w-3 h-3" />
    </Link>
  )
}
