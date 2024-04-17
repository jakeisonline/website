import StepperField from "@/components/Stepper/StepperField"

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-center w-full mx-auto text-center">
      <StepperField startNum={0} minNum={0} maxNum={10}></StepperField>
    </main>
  )
}
