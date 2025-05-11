import {
  Ellipsis,
  EllipsisVertical,
  Grip,
  ListFilter,
  Menu,
} from "lucide-react"

const icons = [
  {
    name: "Burger",
    icon: Menu,
  },
  {
    name: "Bento",
    icon: Grip,
  },
  {
    name: "Doner",
    icon: ListFilter,
  },
  {
    name: "Meatballs",
    icon: Ellipsis,
  },
  {
    name: "Kebab",
    icon: EllipsisVertical,
  },
]

export default function FoodIcons() {
  return (
    <div className="flex flex-col @md:flex-row items-center gap-6">
      {icons.map((icon) => (
        <div key={icon.name} className="flex flex-col items-center gap-2">
          <icon.icon className="size-4" />
          <span>{icon.name}</span>
        </div>
      ))}
    </div>
  )
}
