export default function JustSticky() {
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
  return <section className="flex flex-col gap-4">{children}</section>
}

export function EventsHeading({ date }: { date: Date }) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const dayOfMonth = date.toLocaleDateString("en-US", { day: "numeric" })

  return (
    <div className="sticky -top-1 pt-2 -mt-4 w-fit">
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
