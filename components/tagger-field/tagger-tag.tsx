import Image from "next/image"
import CrossIcon from "@/svgs/CrossIcon"
import useTaggerFieldContext from "@/hooks/use-tagger-field-context"

interface TaggerTagProps {
  label: string // String displayed as the tag's label
}

const TaggerTag = ({ label }: TaggerTagProps) => {
  const { handleRemoveTag } = useTaggerFieldContext()

  const handleClick = () => {
    handleRemoveTag(label)
  }

  return (
    <div className="bg-gray-100  rounded-lg pl-2.5 pr-1.5 py-1 flex">
      <span className="mr-0.5">{label}</span>
      <div
        className="flex rounded-full ml-0.5 px-1 py-0.5 opacity-55 hover:opacity-100 hover:bg-indigo-200"
        onClick={handleClick}
      >
        <CrossIcon className="relative w-4 h-4 top-0.5" />
      </div>
    </div>
  )
}

export default TaggerTag
