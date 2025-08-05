import { TickerContextProvider } from "@/registry/hooks/use-ticker"
import { Ticker, type TickerItem } from "@/registry/ui/ticker"

const sampleItems = [
  {
    id: "3",
    badge: "Feature",
    title: "Dark mode is now available across all components",
    action: "Enable now",
  },
  {
    id: "5",
    title: "Your deployment is ready and live",
    action: "View site",
  },
  {
    id: "7",
    badge: "Success",
    title: "Your changes have been saved successfully",
  },
  {
    id: "9",
    title: "Hope you're having a great day!",
  },
] as TickerItem[]

export default function TickerDemo() {
  return (
    <TickerContextProvider>
      <Ticker id="ticker-demo" initialItems={sampleItems} canLoop={true} />
    </TickerContextProvider>
  )
}
