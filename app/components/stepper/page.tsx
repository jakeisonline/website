import { FeatureItem, FeatureList } from "@/components/feature-list"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/table"
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
import Keeb from "@/components/keeb"
import Code from "@/components/ui/code"
import Link from "@/components/ui/link"
import StepperFieldController from "@/components/stepper-field/stepper-field-controller"
import StepperFieldLabel from "@/components/stepper-field/stepper-field-label"
import StepperFieldInput from "@/components/stepper-field/stepper-field-input"
import StepperFieldCollapsibleContainer from "@/components/stepper-field/stepper-field-collapsible-container"
import StepperFieldBadge from "@/components/stepper-field/stepper-field-badge"

export default function StepperPage() {
  return (
    <div className="mx-auto w-full min-w-0">
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
      <Tabs defaultValue="example" className="mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <StepperField min={0} start={0} shift={10}>
                <StepperFieldLabel>Quantity</StepperFieldLabel>
                <StepperFieldController direction="down">
                  -
                </StepperFieldController>
                <StepperFieldInput />
                <StepperFieldController direction="up">
                  +
                </StepperFieldController>
              </StepperField>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<StepperField min={0} start={0} shift={10}>
  <StepperFieldLabel>Quantity</StepperFieldLabel>
  <StepperFieldController direction="down">
    -
  </StepperFieldController>
  <StepperFieldInput />
  <StepperFieldController direction="up">
    +
  </StepperFieldController>
</StepperField>`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <H2 permalink>Usage</H2>
      <CodeBlock className="mb-4">{`import { StepperField } from "@/components/ui/stepper-field"`}</CodeBlock>
      <CodeBlock>{`<StepperField startNum={0} />`}</CodeBlock>
      <H2>Props</H2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Prop</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Code>start</Code>
            </TableCell>
            <TableCell>number</TableCell>
            <TableCell>The initial value of the field. Required.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Code>min</Code>
            </TableCell>
            <TableCell>number</TableCell>
            <TableCell>Lowest allowed value of the field.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Code>max</Code>
            </TableCell>
            <TableCell>number</TableCell>
            <TableCell>Highest allowed value of the field</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Code>step</Code>
            </TableCell>
            <TableCell>number</TableCell>
            <TableCell>Amount the value is adjusted by.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Code>shift</Code>
            </TableCell>
            <TableCell>number</TableCell>
            <TableCell>
              Amount the value is adjusted TableBody, when using{" "}
              <Keeb>Shift</Keeb> arrow keys or <Keeb>PageUp</Keeb>/
              <Keeb>PageDown</Keeb>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H2 permalink>Accessibility</H2>
      <P>
        Adheres to the{" "}
        <Link
          external
          href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/"
        >
          Spinbutton WAI-ARIA design pattern
        </Link>
        . At its core, this component is simply a{" "}
        <Link
          external
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number"
        >
          native number field
        </Link>
        .
      </P>
      <H3 permalink>Keyboard interaction</H3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Key</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Keeb>ArrowUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>step</Code>, or <Code>1</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>ArrowDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>step</Code>, or <Code>1</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Shift</Keeb>+<Keeb>ArrowUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>shift</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Shift</Keeb>+<Keeb>ArrowDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>shift</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>PageUp</Keeb>
            </TableCell>
            <TableCell>
              Increment value by <Code>shift</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>PageDown</Keeb>
            </TableCell>
            <TableCell>
              Decrement value by <Code>shift</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>Home</Keeb>
            </TableCell>
            <TableCell>
              Set value to <Code>min</Code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Keeb>End</Keeb>
            </TableCell>
            <TableCell>
              Set value to <Code>max</Code>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H2 permalink>Examples</H2>
      <H3 permalink>Collapsing stepper fields</H3>
      <P>
        You might want to display multiple quantities in a single row. For
        example, when ordering multiple product variants in bulk, or providing
        measurements for a product.
      </P>
      <Tabs defaultValue="example" className="mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <div className="flex gap-3">
                <StepperField min={0} start={0} shift={10}>
                  <StepperFieldLabel>S</StepperFieldLabel>
                  <StepperFieldCollapsibleContainer>
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </StepperFieldCollapsibleContainer>
                  <StepperFieldBadge />
                </StepperField>
                <StepperField min={0} start={3} shift={10}>
                  <StepperFieldLabel>M</StepperFieldLabel>
                  <StepperFieldCollapsibleContainer>
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </StepperFieldCollapsibleContainer>
                  <StepperFieldBadge />
                </StepperField>
                <StepperField min={0} start={0} shift={10}>
                  <StepperFieldLabel>L</StepperFieldLabel>
                  <StepperFieldCollapsibleContainer>
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </StepperFieldCollapsibleContainer>
                  <StepperFieldBadge />
                </StepperField>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<div className="flex gap-3">
  <StepperField min={0} start={0} shift={10}>
    <StepperFieldLabel>S</StepperFieldLabel>
    <StepperFieldCollapsibleContainer>
      <StepperFieldController direction="down">
        -
      </StepperFieldController>
      <StepperFieldInput />
      <StepperFieldController direction="up">
        +
      </StepperFieldController>
    </StepperFieldCollapsibleContainer>
    <StepperFieldBadge />
  </StepperField>
  <StepperField min={0} start={3} shift={10}>
    <StepperFieldLabel>M</StepperFieldLabel>
    <StepperFieldCollapsibleContainer>
      <StepperFieldController direction="down">
        -
      </StepperFieldController>
      <StepperFieldInput />
      <StepperFieldController direction="up">
        +
      </StepperFieldController>
    </StepperFieldCollapsibleContainer>
    <StepperFieldBadge />
  </StepperField>
  <StepperField min={0} start={0} shift={10}>
    <StepperFieldLabel>L</StepperFieldLabel>
    <StepperFieldCollapsibleContainer>
      <StepperFieldController direction="down">
        -
      </StepperFieldController>
      <StepperFieldInput />
      <StepperFieldController direction="up">
        +
      </StepperFieldController>
    </StepperFieldCollapsibleContainer>
    <StepperFieldBadge />
  </StepperField>
</div>`}</CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  )
}
