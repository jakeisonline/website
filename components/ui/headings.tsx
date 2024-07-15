import { cn } from "@/lib/utils"

type HeadingProps = {
  className?: string
  children: React.ReactNode
}

export function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 mt-4 text-3xl font-bold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading mt-10 mb-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "font-heading mt-8 pb-2 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
        { ...props },
      )}
    >
      {children}
    </h3>
  )
}

export function H4({ className, children, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "font-heading mt-4 pb-2 scroll-m-20 text-sm font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  )
}
