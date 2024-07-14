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
import H1 from "@/components/ui/h1"
import P from "@/components/ui/p"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StepperPage() {
  return (
    <main className="container flex-1">
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
      <H1 className="mt-2">Stepper</H1>
      <P className="mt-2">
        The Stepper component is a user interface element that allows users to
        increment or decrement a value. It is commonly used for inputting
        numerical values, such as quantities or prices.
      </P>
      <Tabs defaultValue="example" className="w-3/5 mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <StepperField startNum={0} fieldLabelReader="Quantity" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<StepperField startNum={0} />`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10"></div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={0} minNum={0} maxNum={10} stepShiftSize={10} />
        <pre className="mt-1">
          <code className="text-slate-800 text-xs">
            &lt;StepperField &nbsp;&nbsp;
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;10&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={100} minNum={-99} maxNum={100} />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;startNum=&#123;100&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;-99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField
          fieldId="sizes_medium"
          fieldName="sizes_medium"
          fieldLabel="M"
          fieldLabelReader="Medium"
          startNum={100}
          minNum={-99}
          maxNum={100}
        />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;fieldId=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabelReader=&#123;&#34;Medium&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;100&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;-99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
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
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            3 *
            <br />
            &lt;StepperField
            <br />
            &nbsp;&nbsp;collapsible=&#123;true&#125;
            <br />
            &nbsp;&nbsp;hideBadgeNum=&#123;&#34;0&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldId=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabelReader=&#123;&#34;Medium&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
    </main>
  )
}
