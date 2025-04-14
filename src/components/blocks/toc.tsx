"use client"

import { useActiveAnchor } from "@/stores/active-anchor"
import cn from "clsx"
import { ChevronRight } from "lucide-react"
import type { FC } from "react"
import { useEffect, useRef } from "react"
import { BackToTop } from "@/components/blocks/back-to-top"

export type ToCHeadingType = {
  id: string
  depth: number
  slug: string
  text: string
}

export type TOCProps = {
  headings: ToCHeadingType[]
}

const linkClassName = cn(
  "text-xs font-medium transition",
  "text-gray-600 dark:text-gray-400",
  "hover:text-gray-800 dark:hover:text-gray-200",
  "contrast-more:text-gray-700 contrast-more:dark:text-gray-100",
)

export const TOC: FC<TOCProps> = ({ headings }) => {
  const activeSlug = useActiveAnchor()
  const tocRef = useRef<HTMLUListElement>(null)

  const anchors = headings

  const hasHeadings = anchors.length > 0
  const activeIndex = headings.findIndex(({ slug }) => slug === activeSlug)

  useEffect(() => {
    if (!activeSlug) return
    const anchor = tocRef.current?.querySelector(`a[href="#${activeSlug}"]`)
    if (!anchor) return
  }, [activeSlug])

  if (!hasHeadings) return null

  return (
    <>
      <ul className="-m-2.5 mt-2" ref={tocRef}>
        {headings.map(({ text, depth, slug }) => (
          <li key={slug} className="my-2 flex scroll-my-6 scroll-py-6 text-sm">
            <a
              href={`#${slug}`}
              className={cn(
                {
                  2: "",
                  3: "ms-3",
                  4: "ms-6",
                  5: "ms-9",
                  6: "ms-12",
                }[depth],
                "flex items-start subpixel-antialiased transition-colors",
                slug === activeSlug
                  ? "text-link hover:text-link-hover font-semibold"
                  : "text-muted-foreground/70 hover:text-link-hover",
              )}
            >
              <span className="mt-1 mr-0.5 inline-flex w-3">
                {slug === activeSlug && (
                  <ChevronRight className="animate-slide-in-left h-3 w-3" />
                )}
              </span>
              {text}
            </a>
          </li>
        ))}
      </ul>
      <div className="border-border mt-6 border-t pt-1.5">
        <BackToTop className={linkClassName} hidden={activeIndex < 2}>
          Scroll to top
        </BackToTop>
      </div>
    </>
  )
}
