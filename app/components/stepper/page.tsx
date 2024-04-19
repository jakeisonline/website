import StepperField from "@/components/Stepper/StepperField"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto text-center">
      <StepperField startNum={0} minNum={0} maxNum={10} />
      <pre className="mt-1">
        <code className="text-slate-800 text-xs">
          &lt;StepperField startNum={0} minNum={0} maxNum={10} /&gt;
        </code>
      </pre>
      <p className="mt-8" />
      <StepperField startNum={1000} minNum={-99} maxNum={1000} />
      <pre className="mt-1">
        <code className="mt-2 text-slate-800 text-xs">
          &lt;StepperField startNum={1000} minNum={99} maxNum={1000} /&gt;
        </code>
      </pre>
    </main>
  )
}
