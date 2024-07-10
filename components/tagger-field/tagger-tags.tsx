import TaggerTag from "@/components/tagger-field/tagger-tag"
import useTaggerFieldContext from "@/hooks/use-tagger-field-context"

export default function TaggerTags() {
  const { tags } = useTaggerFieldContext()

  return (
    <>
      {tags.map((label: string, index: number) => (
        <TaggerTag label={label} key={index} />
      ))}
    </>
  )
}
