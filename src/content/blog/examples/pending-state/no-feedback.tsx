import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function NoFeedback() {
  const [hasFinished, setHasFinished] = useState(false)

  // Random number between 1000 and 1500
  const randomTime = Math.floor(Math.random() * 500) + 1000

  const handleClick = () => {
    window.setTimeout(() => {
      setHasFinished(true)
    }, randomTime)
  }

  const handleReset = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setHasFinished(false)
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <p>Is anything happening when this button is clicked?</p>
      <Button onClick={handleClick} disabled={hasFinished}>
        {hasFinished ? "Yes, something did happen!" : "Click me"}
      </Button>
      {hasFinished && (
        <p>
          ... but it was {randomTime}ms of not knowing 😬{" "}
          <a href="#" onClick={handleReset}>
            (reset)
          </a>
        </p>
      )}
    </div>
  )
}
