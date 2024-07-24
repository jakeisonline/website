import RangeField from "@/components/range-field"
import {
  StepperField,
  StepperFieldButton,
  StepperFieldInput,
  StepperFieldLabel,
} from "@/components/custom/stepper-field"
import {
  ComponentCard,
  ComponentCardHeader,
  ComponentCardContent,
} from "@/components/component-card"

export default function ComponentsPage() {
  return (
    <div className="m-auto col-span-full min-h-lvh pt-10">
      <h1 className="font-semibold text-3xl">Components</h1>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <ComponentCard component="stepper">
          <ComponentCardHeader>Stepper</ComponentCardHeader>
          <ComponentCardContent>
            <StepperField min={0} start={0} shift={10}>
              <StepperFieldLabel htmlFor="quantity">Quantity</StepperFieldLabel>
              <StepperFieldButton direction="down">-</StepperFieldButton>
              <StepperFieldInput id="quantity" />
              <StepperFieldButton direction="up">+</StepperFieldButton>
            </StepperField>
          </ComponentCardContent>
        </ComponentCard>
        <ComponentCard component="range">
          <ComponentCardHeader>Range</ComponentCardHeader>
          <ComponentCardContent>
            <RangeField
              minRange={0}
              maxRange={100}
              initialLowValue={20}
              initialHighValue={80}
            />
          </ComponentCardContent>
        </ComponentCard>
      </div>
    </div>
  )
}
