import StepperField from "@/components/Stepper/StepperField"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto text-center">
      <p className="mb-1 text-sm text-slate-800">
        &lt;StepperField startNum={0} minNum={0} maxNum={10} /&gt;
      </p>
      <StepperField startNum={0} minNum={0} maxNum={10} />
      <p className="mt-6 mb-1 text-sm text-slate-800">
        &lt;StepperField startNum={5} minNum={-10} maxNum={15} /&gt;
      </p>
      <StepperField startNum={5} minNum={-10} maxNum={15} />
    </main>
  )
}
