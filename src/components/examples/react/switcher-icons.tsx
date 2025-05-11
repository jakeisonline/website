import { Switcher, SwitcherItem } from "@/registry/ui/switcher"
import { Grid2x2Icon, ListIcon, Table2Icon } from "lucide-react"

export default function SwitcherDemo() {
  return (
    <Switcher defaultValue="list">
      <SwitcherItem value="table" className="flex items-center gap-1">
        <Table2Icon className="h-4 w-4" />
        Table
      </SwitcherItem>
      <SwitcherItem value="list" className="flex items-center gap-1">
        <ListIcon className="h-4 w-4" />
        List
      </SwitcherItem>
      <SwitcherItem value="grid" className="flex items-center gap-1">
        <Grid2x2Icon className="h-4 w-4" />
        Grid
      </SwitcherItem>
    </Switcher>
  )
}
