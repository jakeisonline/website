import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { H2 } from "./ui/headings"
import NextLink from "next/link"

type ComponentCardProps = React.ComponentPropsWithoutRef<"div"> & {
  component: string
  children: React.ReactNode
}

export function ComponentCard({ component, children }: ComponentCardProps) {
  return (
    <NextLink href={`/components/${component}`} className="">
      <Card
        id={component}
        className="group hover:inner-border-link-hover/40 hover:shadow-link/30 w-full flex flex-col h-64 relative transition-all duration-200 border-0 inner-border-border inner-border-2"
      >
        {children}
        <CardFooter className="justify-end mt-auto text-primary/30 group-hover:text-link group-hover:translate-x-1 transition-all duration-200 ease-out">
          <ArrowRight className="w-5 h-5" />
        </CardFooter>
      </Card>
    </NextLink>
  )
}

type ComponentCardHeaderProps = React.ComponentPropsWithoutRef<
  typeof CardHeader
>

export function ComponentCardHeader({ children }: ComponentCardHeaderProps) {
  return (
    <CardHeader>
      <H2 className="border-0 text-xl font-normal mb-0">{children}</H2>
    </CardHeader>
  )
}

type ComponentCardContentProps = React.ComponentPropsWithoutRef<
  typeof CardContent
>

export function ComponentCardContent({ children }: ComponentCardContentProps) {
  return (
    <CardContent className="pointer-events-none flex w-auto justify-center items-center">
      {children}
    </CardContent>
  )
}
