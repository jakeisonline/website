import { FeatureItem, FeatureList } from "@/components/feature-list"
import {
  PropsTable,
  PropsTableBody,
  PropsTableCell,
  PropsTableHead,
  PropsTableHeadCell,
  PropsTableRow,
} from "@/components/props-table"
import StepperField from "@/components/stepper-field"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import CodeBlock from "@/components/ui/code-block"
import { H1, H2, H3 } from "@/components/ui/headings"
import P from "@/components/ui/p"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StepperPage() {
  return (
    <main className="container flex-1 pb-20 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stepper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <H1>Stepper</H1>
      <P className="mt-2">
        The Stepper component is a user interface element that allows users to
        increment or decrement a value. It is commonly used for inputting
        numerical values, such as quantities or prices.
      </P>
      <FeatureList>
        <FeatureItem>Native form element (number input)</FeatureItem>
        <FeatureItem>Keyboard editable, controllable & accessible</FeatureItem>
        <FeatureItem>Custom step size and range (optional)</FeatureItem>
        <FeatureItem>Shift stepping for power users (optional)</FeatureItem>
      </FeatureList>
      <Tabs defaultValue="example" className="w-3/5 mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <StepperField
                minNum={0}
                startNum={0}
                stepShiftSize={10}
                fieldId={"quantity"}
                fieldName={"quantity"}
                fieldLabel={"Quantity"}
                fieldLabelReader={"Quantity"}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<StepperField
  minNum={0}
  startNum={0}
  stepShiftSize={10}
  fieldId={"quantity"}
  fieldName={"quantity"}
  fieldLabel={"Quantity"}
  fieldLabelReader={"Quantity"}
/>`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <H2>Usage</H2>
      <CodeBlock className="mb-4 w-3/5">{`import { StepperField } from "@/components/ui/stepper-field"`}</CodeBlock>
      <CodeBlock className="w-3/5">{`<StepperField startNum={0} />`}</CodeBlock>
      <H2>Props</H2>
      <PropsTable>
        <PropsTableHead>
          <PropsTableRow>
            <PropsTableHeadCell>Prop</PropsTableHeadCell>
            <PropsTableHeadCell>Type</PropsTableHeadCell>
            <PropsTableHeadCell>Default</PropsTableHeadCell>
            <PropsTableHeadCell>Description</PropsTableHeadCell>
          </PropsTableRow>
        </PropsTableHead>
        <PropsTableBody>
          <PropsTableRow>
            <PropsTableCell>collapsible</PropsTableCell>
            <PropsTableCell>boolean</PropsTableCell>
            <PropsTableCell>false</PropsTableCell>
            <PropsTableCell>Collapsed or not?</PropsTableCell>
          </PropsTableRow>
        </PropsTableBody>
      </PropsTable>
      <H2>Examples</H2>
      <H3>Collapsing stepper fields</H3>
      <P>
        You might want to display multiple quantities in a single row. For
        example, when ordering multiple product variants in bulk, or providing
        measurements for a product.
      </P>
      <Tabs defaultValue="example" className="w-3/5 mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <div className="flex gap-3">
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_small"
                  fieldName="sizes_small"
                  fieldLabel="S"
                  fieldLabelReader="Small"
                  startNum={0}
                  minNum={0}
                  maxNum={100}
                />
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_med"
                  fieldName="sizes_medium"
                  fieldLabel="M"
                  fieldLabelReader="Medium"
                  startNum={3}
                  minNum={0}
                  maxNum={100}
                />
                <StepperField
                  collapsible={true}
                  hideBadgeNum={0}
                  fieldId="sizes_large"
                  fieldName="sizes_large"
                  fieldLabel="L"
                  fieldLabelReader="Large"
                  startNum={0}
                  minNum={0}
                  maxNum={100}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<div className="flex gap-3">
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_small"
    fieldName="sizes_small"
    fieldLabel="S"
    fieldLabelReader="Small"
    startNum={0}
    minNum={0}
    maxNum={100}
  />
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_med"
    fieldName="sizes_medium"
    fieldLabel="M"
    fieldLabelReader="Medium"
    startNum={3}
    minNum={0}
    maxNum={100}
  />
  <StepperField
    collapsible={true}
    hideBadgeNum={0}
    fieldId="sizes_large"
    fieldName="sizes_large"
    fieldLabel="L"
    fieldLabelReader="Large"
    startNum={0}
    minNum={0}
    maxNum={100}
  />
</div>`}</CodeBlock>
        </TabsContent>
      </Tabs>
    </main>
  )
}
