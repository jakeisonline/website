import crossIcon from "/cross.svg"

interface TaggerTagProps {
  label: string // String displayed as the tag's label
  removeTag: (tag: string) => void
}

const TaggerTag = ({ label, removeTag }: TaggerTagProps) => {
  const handleRemove = () => {
    removeTag(label)
  }

  return (
    <div className="bg-gray-100  rounded-lg px-2.5 py-1 flex">
      <span className="mr-0.5">{label}</span>
      <div
        className="flex rounded-full ml-0.5 px-1 py-0.5 opacity-55 hover:opacity-100 hover:bg-indigo-200"
        onClick={handleRemove}
      >
        <img src={crossIcon} className="w-4" />
      </div>
    </div>
  )
}

export default TaggerTag
