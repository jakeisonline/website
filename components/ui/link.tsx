import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import NextLink from "next/link"

type LinkProps = {
  href: string
  external?: boolean
  noIcon?: boolean
  className?: string
  children: React.ReactNode
}

export default function Link({
  href,
  external,
  noIcon,
  className,
  children,
  ...props
}: LinkProps) {
  const newProps = !external
    ? props
    : { target: "_blank", rel: "noreferrer", ...props }

  return (
    <NextLink
      href={href}
      className={cn(
        "text-link hover:text-link-hover transition-colors duration-200 inline-flex",
        className,
      )}
      {...newProps}
    >
      {children}
      {external && !noIcon && <ExternalLinkIcon className="ml-1 w-3 h-3" />}
    </NextLink>
  )
}
