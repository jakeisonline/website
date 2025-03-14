import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"

export default function WithContext() {
  const [isPending, setIsPending] = useState(false)

  // Random number between 1000 and 1500
  const randomTime = Math.floor(Math.random() * 500) + 1000

  const handleClick = () => {
    setIsPending(true)
    window.setTimeout(() => {
      setIsPending(false)
    }, randomTime)
  }

  return (
    <div className="flex flex-row gap-1 items-center relative">
      <Button
        onClick={handleClick}
        disabled={isPending}
        className="transition-all duration-300"
      >
        Save
        {isPending && (
          <LoaderCircle className="w-4 h-4 ml-0.5 animate-spin text-muted-background" />
        )}
      </Button>
    </div>
  )
}
