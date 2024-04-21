import classNames from "classnames"

interface StepperCollapsableContainerProps {
  collapses?: boolean
  children: any
}

const StepperCollapsableContainer = ({
  collapses,
  children,
}: StepperCollapsableContainerProps) => {
  const divClass = classNames({
    "flex flex-row items-center gap-1": true,
    "has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1":
      collapses,
  })

  return <div className={divClass}>{children}</div>
}

export default StepperCollapsableContainer
