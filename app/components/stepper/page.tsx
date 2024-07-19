import {
  StepperField,
  StepperFieldBadge,
  StepperFieldController,
  StepperFieldInput,
  StepperFieldLabel,
} from "@/components/stepper-field"
import { FeatureItem, FeatureList } from "@/components/feature-list"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/table"
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
        <FeatureItem>Native form element</FeatureItem>

        <FeatureItem>Optional step size and range</FeatureItem>
        <FeatureItem>Keyboard editable, controllable & accessible</FeatureItem>
        <FeatureItem>Optional shift stepping</FeatureItem>
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
                <StepperFieldLabel htmlFor="quantity">
                  Quantity
                </StepperFieldLabel>
                <StepperFieldController direction="down">
                  -
                </StepperFieldController>
                <StepperFieldInput id="quantity" />
                <StepperFieldController direction="up">
                  +
                </StepperFieldController>
              </StepperField>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<StepperField min={0} start={0} shift={10}>
  <StepperFieldLabel htmlFor="quantity">
    Quantity
  </StepperFieldLabel>
  <StepperFieldController direction="down">
    -
  </StepperFieldController>
  <StepperFieldInput id="quantity" />
  <StepperFieldController direction="up">
    +
  </StepperFieldController>
</StepperField>`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <H2 permalink>Usage</H2>
      <CodeBlock className="mb-4">{`import {
  StepperField,
  StepperFieldBadge,
  StepperFieldCollapsibleContainer,
  StepperFieldController,
  StepperFieldInput,
  StepperFieldLabel,
} from "@/components/stepper-field"`}</CodeBlock>
      <CodeBlock>{`<StepperField start={0}>
  <StepperFieldLabel htmlFor="stepper">
    Quantity
  </StepperFieldLabel>
  <StepperFieldController direction="down">
    -
  </StepperFieldController>
  <StepperFieldInput id="stepper" />
  <StepperFieldController direction="up">
    +
  </StepperFieldController>
</StepperField>`}</CodeBlock>
      <H2 permalink>Component Reference</H2>
      <H3 permalink>StepperField</H3>
      <P className="mb-6">
        Used to wrap a single stepper field. Also provides context for all child
        components.
      </P>
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
      <H3 permalink>StepperFieldLabel</H3>
      <P className="mb-6">
        The <Code>{`<label>`}</Code> of the stepper field.
      </P>
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
              <Code>htmlFor</Code>
            </TableCell>
            <TableCell>string</TableCell>
            <TableCell>
              Should match the <Code>id</Code> of the{" "}
              <Code>StepperFieldInput</Code>.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H3 permalink>StepperFieldController</H3>
      <P className="mb-6">
        The controller <Code>{`<button>`}</Code> of a stepper field, which users
        can interact with to step the value up or down.
      </P>
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
              <Code>direction</Code>
            </TableCell>
            <TableCell>string</TableCell>
            <TableCell>
              <Code>up</Code> or <Code>down</Code> depending on desired
              direction. Required.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <H3 permalink>StepperFieldInput</H3>
      <P className="mb-6">
        The <Code>{`<input>`}</Code> of the stepper field.
      </P>
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
              <Code>id</Code>
            </TableCell>
            <TableCell>string</TableCell>
            <TableCell>
              Should match the <Code>htmlFor</Code> of the{" "}
              <Code>StepperFieldLabel</Code>.
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
      <P className="mt-3">
        <Code>{`<StepperFieldInput>`}</Code> requires the property{" "}
        <Code>id</Code> (string) to be set, and should match the{" "}
        <Code>htmlFor</Code> (string) of the{" "}
        <Code>{`<StepperFieldLabel>`}</Code>.
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
                <StepperField min={0} start={0} shift={10} className="min-w-8">
                  <StepperFieldLabel
                    htmlFor="small"
                    className="group-has-[:focus]:border-r border-r-0 mr-0"
                  >
                    S
                  </StepperFieldLabel>
                  <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput id="small" />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </div>
                  <StepperFieldBadge />
                </StepperField>
                <StepperField min={0} start={3} shift={10} className="min-w-8">
                  <StepperFieldLabel
                    htmlFor="medium"
                    className="group-has-[:focus]:border-r border-r-0 mr-0"
                  >
                    M
                  </StepperFieldLabel>
                  <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput id="medium" />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </div>
                  <StepperFieldBadge />
                </StepperField>
                <StepperField min={0} start={0} shift={10} className="min-w-8">
                  <StepperFieldLabel
                    htmlFor="large"
                    className="group-has-[:focus]:border-r border-r-0 mr-0"
                  >
                    L
                  </StepperFieldLabel>
                  <div className="has-[:focus]:opacity-100 has-[:focus]:w-full has-[:focus]:overflow-auto opacity-0 w-0 overflow-hidden flex flex-row items-center gap-1">
                    <StepperFieldController direction="down">
                      -
                    </StepperFieldController>
                    <StepperFieldInput id="large" />
                    <StepperFieldController direction="up">
                      +
                    </StepperFieldController>
                  </div>
                  <StepperFieldBadge />
                </StepperField>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<div className="flex gap-3">
<StepperField min={0} start={0} shift={10} className="min-w-8">
  <StepperFieldLabel className="group-has-[:focus]:border-r border-r-0 mr-0">
    S
  </StepperFieldLabel>
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
<StepperField min={0} start={3} shift={10} className="min-w-8">
  <StepperFieldLabel className="group-has-[:focus]:border-r border-r-0 mr-0">
    M
  </StepperFieldLabel>
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
<StepperField min={0} start={0} shift={10} className="min-w-8">
  <StepperFieldLabel className="group-has-[:focus]:border-r border-r-0 mr-0">
    L
  </StepperFieldLabel>
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
