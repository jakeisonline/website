import { cn, slugify } from "@/lib/utils"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  className?: string
  permalink?: boolean
  children: React.ReactNode
}

export function H1({ className, permalink, children, ...props }: HeadingProps) {
  const newProps =
    permalink && children
      ? { id: slugify(children.toString()), ...props }
      : props

  return (
    <h1
      className={cn(
        "scroll-m-20 mt-4 text-3xl font-bold tracking-tight",
        className,
      )}
      {...newProps}
    >
      {children}
    </h1>
  )
}

export function H2({ className, permalink, children, ...props }: HeadingProps) {
  const newProps =
    permalink && children
      ? { id: slugify(children.toString()), ...props }
      : props

  return (
    <h2
      className={cn(
        "font-heading mt-10 mb-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...newProps}
    >
      {children}
    </h2>
  )
}

export function H3({ className, permalink, children, ...props }: HeadingProps) {
  const newProps =
    permalink && children
      ? { id: slugify(children.toString()), ...props }
      : props

  return (
    <h3
      className={cn(
        "font-heading mt-8 pb-2 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...newProps}
    >
      {children}
    </h3>
  )
}

export function H4({ className, permalink, children, ...props }: HeadingProps) {
  const newProps =
    permalink && children
      ? { id: slugify(children.toString()), ...props }
      : props
  return (
    <h4
      className={cn(
        "font-heading mt-4 pb-2 scroll-m-20 text-sm font-semibold tracking-tight",
        className,
      )}
      {...newProps}
    >
      {children}
    </h4>
  )
}
