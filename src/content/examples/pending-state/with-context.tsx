import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CircleCheck, LoaderCircle } from "lucide-react"
import { useState } from "react"

export default function WithContext() {
  const [isPending, setIsPending] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  // Random number between 1000 and 1500
  const randomTime = Math.floor(Math.random() * 500) + 1000

  const handleClick = () => {
    setIsPending(true)
    window.setTimeout(() => {
      handleFinished()
    }, randomTime)
  }

  const handleFinished = () => {
    setIsPending(false)
    setHasFinished(true)

    window.setTimeout(() => {
      setHasFinished(false)
    }, 2500)
  }

  return (
    <div className="flex flex-row gap-1 items-center relative">
      <Button
        onClick={handleClick}
        disabled={isPending}
        className="transition-all duration-300 ease-out"
      >
        {isPending ? "Saving..." : "Save"}
        {isPending && (
          <LoaderCircle className="w-4 h-4 ml-0.5 animate-spin text-muted-background" />
        )}
      </Button>
      <span
        className={cn(
          "text-green-700 absolute -right-15 flex-row gap-1 text-xs duration-400 flex opacity-0",
          hasFinished && !isPending && "opacity-100",
        )}
      >
        <CircleCheck className="w-4 h-4 ml-2 text-muted-background stroke-green-700" />{" "}
        Saved
      </span>
    </div>
  )
}
