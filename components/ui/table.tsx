import { cn } from "@/lib/utils"

export function Table({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <table className={cn("w-full text-left border-collapse", className)}>
      {children}
    </table>
  )
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <thead className={className}>{children}</thead>
}

export function TableBody({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <tbody className={cn("align-baseline", className)}>{children}</tbody>
}

export function TableRow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <tr className={className}>{children}</tr>
}

export function TableCell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <td className={className}>{children}</td>
}

export function TableHeadCell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <th className={className}>{children}</th>
}
