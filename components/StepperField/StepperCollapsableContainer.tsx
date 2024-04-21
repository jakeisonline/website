interface StepperCollapsableContainerProps {
  collapses?: boolean
  children: any
}

const StepperCollapsableContainer = ({
  collapses,
  children,
}: StepperCollapsableContainerProps) => {
  const classes = collapses
    ? "has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1"
    : "flex flex-row items-center gap-1"
  return <div className={classes}>{children}</div>
}

export default StepperCollapsableContainer
