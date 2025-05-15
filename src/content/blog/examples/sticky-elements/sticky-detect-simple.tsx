import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function JustSticky() {
  useEffect(() => {
    const elm = document.querySelector(".detect-sticky")
    const badgeElm = elm?.querySelector(".sticky-badge")
    const badgeOriginalClasses = badgeElm?.className

    if (!elm || !badgeElm) return

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 1) {
          const curClasses = badgeElm.className
          badgeElm.className = cn(
            curClasses,
            "border-foreground/10 drop-shadow-lg backdrop-blur bg-background",
          )
        } else {
          badgeElm.className = cn(badgeOriginalClasses)
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

    observer.observe(elm)

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
    <div className="sticky detect-sticky top-0 w-fit">
      <div className="sticky-badge px-4 py-1 border border-transparent rounded-full transition-all duration-300">
        {dayOfMonth} {month}{" "}
        <span className="text-muted-foreground">{day}</span>
      </div>
    </div>
  )
}

export function EventCard() {
  return (
    <div className="bg-muted border border-border rounded-lg w-full h-[120px]" />
  )
}
