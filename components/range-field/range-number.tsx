import useRangeFieldContext from "@/hooks/use-range-field-context"

type RangeNumberProps = {
  label: string
  type: string
}

export default function RangeNumber({ label, type }: RangeNumberProps) {
  const { currentValues } = useRangeFieldContext()

  return (
    <div className="w-full">
      <label className="text-sm">{label}</label>
      <div className="has-[:focus]:inner-border-blue-500 has-[:focus]:inner-border-2 flex inner-border inner-border-slate-500 rounded-md py-2 px-2.5">
        <input
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::selection]:bg-blue-100 bg-white focus:outline-none text-sm w-full"
          {...(type === "low"
            ? { value: currentValues.low }
            : { value: currentValues.high })}
          readOnly
        />
        <span className="text-slate-600 pl-2 border-l border-slate-400">$</span>
      </div>
    </div>
  )
}
