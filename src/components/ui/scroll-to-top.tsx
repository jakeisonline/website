import { Button } from "@/components/ui/button"
import cn from "clsx"
import { CircleChevronUpIcon } from "lucide-react"
import type { ComponentProps, FC, ReactNode } from "react"

const SCROLL_TO_OPTIONS = { top: 0, behavior: "smooth" } as const

const scrollToTop: ComponentProps<"button">["onClick"] = (event) => {
  const buttonElement = event.currentTarget
  const tocElement = buttonElement.parentElement!.parentElement!

  window.scrollTo(SCROLL_TO_OPTIONS)
  tocElement.scrollTo(SCROLL_TO_OPTIONS)

  buttonElement.disabled = true
}

export const ScrollToTop: FC<{
  children: ReactNode
  className?: string
  hidden: boolean
}> = ({ children, className, hidden }) => {
  return (
    <Button
      // elements with `aria-hidden: true` must not be focusable or contain focusable elements
      aria-hidden={hidden ? "true" : undefined}
      variant="link"
      onClick={scrollToTop}
      disabled={hidden}
      className={cn(
        "flex items-center gap-1.5 px-0! transition-opacity duration-300 disabled:opacity-0",
        hidden ? "" : "opacity-100",
        className,
      )}
    >
      {children}
      <CircleChevronUpIcon className="h-4 w-4" />
    </Button>
  )
}
