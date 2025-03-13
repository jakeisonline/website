import { Button } from "@/components/ui/button"
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
      setIsPending(false)
      setHasFinished(true)
    }, randomTime)
  }

  const handleReset = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setHasFinished(false)
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
          <LoaderCircle className="w-4 h-4 ml-2 animate-spin text-muted-background" />
        )}
      </Button>
      {hasFinished && !isPending && (
        <CircleCheck className="w-4 h-4 ml-2 text-muted-background stroke-green-700 animate-slide-in-left duration-400 absolute -right-6" />
      )}
    </div>
  )
}
