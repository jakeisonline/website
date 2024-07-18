import { cn } from "@/lib/utils"

export function Table({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <table
      className={cn("w-full text-left border-collapse", className)}
      {...props}
    >
      {children}
    </table>
  )
}

export function TableHead({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return <thead {...props}>{children}</thead>
}

export function TableBody({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <tbody className={cn("align-baseline", className)} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return <tr {...props}>{children}</tr>
}

export function TableCell({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <td className={cn("[&:not(:last-of-type)]:pr-8", className)} {...props}>
      {children}
    </td>
  )
}

export function TableHeadCell({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <th className={cn("[&:not(:last-of-type)]:pr-8", className)} {...props}>
      {children}
    </th>
  )
}
