export default function Tag({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className="inline-block text-xs rounded-sm bg-accent px-2 py-1 text-foreground"
      {...props}
    >
      {children}
    </span>
  )
}
