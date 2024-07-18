import { cn } from "@/lib/utils"

type StepperFieldCollapsibleContainerProps = {
  className?: string
  children: any
}

export default function StepperFieldCollapsibleContainer({
  className,
  children,
  ...props
}: StepperFieldCollapsibleContainerProps) {
  return (
    <div
      className={cn(
        "has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
