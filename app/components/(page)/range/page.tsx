import { FeatureList, FeatureItem } from "@/components/feature-list"
import RangeField from "@/components/range-field"
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
import { H1, H2 } from "@/components/ui/headings"
import P from "@/components/ui/p"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Code from "@/components/ui/code"
import Link from "@/components/ui/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Playground - Range",
}

export default function Home() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Range</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <H1>Range</H1>
      <P className="mt-2">
        The Range component is a user interface element that allows users to
        easily set a minimum and maximum value (a range), using interactive
        sliders.
      </P>
      <FeatureList>
        <FeatureItem>??</FeatureItem>
        <FeatureItem>??</FeatureItem>
      </FeatureList>
      <Tabs defaultValue="example" className="mt-8">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <Card>
            <CardContent className="pt-6 min-h-44 flex w-auto justify-center items-center">
              <RangeField
                minRange={0}
                maxRange={100}
                initialLowValue={20}
                initialHighValue={80}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock>{`<RangeField
        minRange={0}
        maxRange={100}
        initialLowValue={20}
        initialHighValue={80}
      />`}</CodeBlock>
        </TabsContent>
      </Tabs>
      <H2 permalink>Accessibility</H2>
      <P>
        Adheres to the{" "}
        <Link
          external
          href="https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/"
        >
          Slider (multi-thumb) WAI-ARIA design pattern
        </Link>
        .
      </P>
      <P className="mt-3">
        Each <Code>{`<RangeGrabber>`}</Code> should have an{" "}
        <Code>{`aria-label`}</Code> prop, describing what that grabber
        represents. For example, if you have a price range, you might have a low
        price grabber with an <Code>{`aria-label="Low price"`}</Code> and a high
        price grabber with an <Code>{`aria-label="High price"`}</Code>.
      </P>
    </>
  )
}
