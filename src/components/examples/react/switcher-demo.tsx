import { Switcher, SwitcherItem } from "@/registry/ui/switcher"

export default function SwitcherDemo() {
  return (
    <Switcher defaultValue="24h">
      <SwitcherItem value="12h">12-hour</SwitcherItem>
      <SwitcherItem value="24h">24-hour</SwitcherItem>
    </Switcher>
  )
}
