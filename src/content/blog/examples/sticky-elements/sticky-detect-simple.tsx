import { useEffect } from "react"

export default function JustSticky() {
  useEffect(() => {
    const stickyElement: HTMLElement | null =
      document.querySelector(".detect-sticky")

    if (!stickyElement) return

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 1) {
          stickyElement.dataset.currentlySticky = "true"
        } else {
          stickyElement.dataset.currentlySticky = "false"
        }
      },
      {
        root: document.querySelector(
          "#example-detecting-sticky-elements-simple",
        ),
        threshold: [1],
        rootMargin: "-16px 0px 0px 0px",
      },
    )

    observer.observe(stickyElement)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-3/4 mr-auto">
      <EventsContainer>
        <EventsHeading date={new Date("2025-05-13")} />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </EventsContainer>
    </div>
  )
}

export function EventsContainer({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col gap-4">{children}</section>
}

export function EventsHeading({ date }: { date: Date }) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const dayOfMonth = date.toLocaleDateString("en-US", { day: "numeric" })

  return (
    <div className="sticky detect-sticky top-0 w-fit data-[currently-sticky=true]:border-foreground/10 data-[currently-sticky=true]:drop-shadow-lg data-[currently-sticky=true]:backdrop-blur data-[currently-sticky=true]:bg-background px-4 py-1 border border-transparent rounded-full transition-all duration-300">
      {dayOfMonth} {month} <span className="text-muted-foreground">{day}</span>
    </div>
  )
}

export function EventCard() {
  return (
    <div className="bg-muted border border-border rounded-lg w-full h-[120px]" />
  )
}
