import { TickerContextProvider } from "@/registry/hooks/use-ticker"
import { Ticker, type TickerItem } from "@/registry/ui/ticker"

const sampleItems = [
  {
    id: "2",
    badge: "Update",
    title: "New AI models available for faster generation",
    action: "Learn more",
  },
  {
    id: "3",
    badge: "Feature",
    title: "Dark mode is now available across all components",
    action: "Enable now",
  },
  {
    id: "4",
    badge: "Beta",
    title: "Try our new collaborative editing features",
    action: "Join beta",
  },
  {
    id: "5",
    title: "Your deployment is ready and live",
    action: "View site",
  },
  {
    id: "6",
    badge: "Alert",
    title: "System maintenance scheduled for tonight",
    action: "Details",
  },
  {
    id: "7",
    badge: "Success",
    title: "Your changes have been saved successfully",
  },
] as TickerItem[]

export default function TickerDemo() {
  return (
    <TickerContextProvider>
      <Ticker id="ticker-demo" initialItems={sampleItems} />
    </TickerContextProvider>
  )
}
