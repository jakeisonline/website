import { useEffect } from "react"

export default function JustSticky() {
  useEffect(() => {
    const stickyElements = document.querySelectorAll(
      ".detect-sticky",
    ) as NodeListOf<HTMLElement>

    if (!stickyElements) return

    const observers: IntersectionObserver[] = []

    stickyElements.forEach((stickyElement) => {
      const observer = new IntersectionObserver(
        ([e]) => {
          let isSticky = false

          if (e.intersectionRect.top === e.rootBounds?.top) {
            isSticky = true
          }

          stickyElement.dataset.currentlySticky = String(isSticky)
        },
        {
          root: document.querySelector(
            "#example-detecting-sticky-elements-simple",
          ),
          threshold: [1],
          rootMargin: "-14px 0px 0px 0px",
        },
      )

      observer.observe(stickyElement)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => {
        observer.disconnect()
      })
    }
  }, [])

  return (
    <div className="w-3/4 mr-auto">
      <EventsContainer>
        <EventsHeading date={new Date("2025-05-13")} />
        <EventCard />
        <EventCard />
      </EventsContainer>
      <EventsContainer>
        <EventsHeading date={new Date("2025-05-14")} />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </EventsContainer>
      <EventsContainer>
        <EventsHeading date={new Date("2025-05-15")} />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </EventsContainer>
    </div>
  )
}

export function EventsContainer({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col gap-4 mb-8">{children}</section>
}

export function EventsHeading({ date }: { date: Date }) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const dayOfMonth = date.toLocaleDateString("en-US", { day: "numeric" })

  return (
    <div className="sticky detect-sticky top-0 w-fit data-[currently-sticky=true]:border-foreground/10 data-[currently-sticky=true]:drop-shadow-lg data-[currently-sticky=true]:backdrop-blur data-[currently-sticky=true]:bg-background px-4 py-1 border border-transparent rounded-full transition-all duration-150">
      {dayOfMonth} {month} <span className="text-muted-foreground">{day}</span>
    </div>
  )
}

export function EventCard() {
  return (
    <div className="bg-muted border border-border rounded-lg w-full h-[120px]" />
  )
}
