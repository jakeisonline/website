"use client"

import { setActiveSlug } from "@/stores/active-anchor"
import type { FC } from "react"
import { useEffect, useRef } from "react"

const callback: IntersectionObserverCallback = (entries) => {
  const entry = entries.find((entry) => entry.isIntersecting)

  if (entry) {
    const slug = (entry.target as HTMLAnchorElement).hash.slice(1)
    setActiveSlug(decodeURI(slug))
  }
}

const observer: IntersectionObserver =
  typeof window === "undefined"
    ? null!
    : new IntersectionObserver(callback, {
        rootMargin: `0% 0% -80%`,
      })

export const HeadingAnchor: FC<{ id: string }> = ({ id }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null!)

  useEffect(() => {
    const el = anchorRef.current
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [])

  return (
    <a
      href={`#${id}`}
      className="text-muted-foreground ml-1.5 no-underline opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-label="Permalink for this section"
      ref={anchorRef}
    >
      #
    </a>
  )
}
