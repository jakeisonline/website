import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

type ExternalLinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export default function ExternalLink({
  children,
  href,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "text-blue-600 hover:text-blue-800 transition-colors duration-200 inline-flex",
        className,
      )}
      {...props}
    >
      {children}
      <ExternalLinkIcon className="ml-1 w-3 h-3" />
    </Link>
  )
}
