import clsx from "clsx"

type StepperFieldCollapsibleContainerProps = {
  collapsible?: boolean
  children: any
}

export default function StepperFieldCollapsibleContainer({
  collapsible,
  children,
}: StepperFieldCollapsibleContainerProps) {
  const divClass = clsx(
    "flex flex-row items-center gap-1",
    collapsible &&
      "has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1",
  )

  return <div className={divClass}>{children}</div>
}
