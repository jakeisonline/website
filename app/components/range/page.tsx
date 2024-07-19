import RangeField from "@/components/range-field"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "🛝 Playground - Range",
}

export default function Home() {
  return (
    <main className="m-auto mt-10 flex w-60 justify-center items-center flex-col">
      <RangeField
        minRange={0}
        maxRange={100}
        initialLowValue={20}
        initialHighValue={80}
      />

      <pre className="mt-6">
        <code className="text-slate-800 text-xs">
          &lt;RangeField &nbsp;&nbsp;
          <br />
          &nbsp;&nbsp;minRange=&#123;0&#125;
          <br />
          &nbsp;&nbsp;maxRange=&#123;100&#125;
          <br />
          &nbsp;&nbsp;initialLowValue=&#123;20&#125;
          <br />
          &nbsp;&nbsp;initialHighValue=&#123;80&#125;
          <br />
          /&gt;
        </code>
      </pre>
    </main>
  )
}
