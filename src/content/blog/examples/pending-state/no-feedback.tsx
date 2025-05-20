import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function NoFeedback() {
  const [hasFinished, setHasFinished] = useState(false)
  const [didRageClick, setDidRageClick] = useState(false)
  const [timeoutId, setTimeoutId] = useState<Number | null>(null)

  // Random number between 1000 and 2300
  const randomTime = Math.floor(Math.random() * 1300) + 1000

  const handleClick = () => {
    if (timeoutId) {
      setDidRageClick(true)
      return
    }

    const newTimeoutId = window.setTimeout(() => {
      setHasFinished(true)
      setTimeoutId(null)
    }, randomTime)

    setTimeoutId(newTimeoutId)
  }

  const handleReset = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setHasFinished(false)
    setDidRageClick(false)
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
          {!timeoutId && didRageClick && (
            <>
              <br />
              <span className="text-red-500">... and you rage clicked! 😡</span>
            </>
          )}
        </p>
      )}
    </div>
  )
}
