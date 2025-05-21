import type { SEOProps } from "astro-seo"
import { SITE_CONFIG } from "./config"

// Define a type for our overrides that ensures required OpenGraph basic properties
type OpenGraphBasicOverride = {
  title?: string
  type?: string
  image?: string
  url?: string
}

type OpenGraphOptionalOverride = {
  audio?: string
  description?: string
  determiner?: string
  locale?: string
  localeAlternate?: string[]
  siteName?: string
  video?: string
}

type OpenGraphArticleOverride = {
  publishedTime?: string
  modifiedTime?: string
  expirationTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

export type SEOOverride = Partial<Omit<SEOProps, "openGraph">> & {
  openGraph?: {
    basic?: Partial<OpenGraphBasicOverride>
    optional?: OpenGraphOptionalOverride
    article?: OpenGraphArticleOverride
  }
}

export const defaultSEO: SEOProps = {
  charset: "UTF-8",
  extend: {
    link: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
    meta: [
      {
        name: "author",
        content: "Jake Holman (@jakeisonline)",
      },
    ],
  },
  openGraph: {
    basic: {
      type: "website",
      title: "jakeisonline",
      url: SITE_CONFIG.siteUrl,
      image: `${SITE_CONFIG.siteUrl}/images/og.png`,
    },
    optional: {
      locale: "en_GB",
      siteName: "jakeisonline",
    },
  },
  twitter: {
    card: "summary_large_image",
    image: `${SITE_CONFIG.siteUrl}/images/og.png`,
  },
}

export function mergeSEO(defaults: SEOProps, overrides: SEOOverride): SEOProps {
  // First, merge the top-level properties
  const merged = {
    ...defaults,
    ...overrides,
  }

  // Then handle nested objects
  if (overrides.openGraph) {
    merged.openGraph = {
      ...defaults.openGraph!,
      basic: {
        ...defaults.openGraph!.basic,
        ...(overrides.openGraph.basic || {}),
      },
      optional: {
        ...defaults.openGraph!.optional,
        ...(overrides.openGraph.optional || {}),
      },
      // Only include article if it's provided in overrides
      ...(overrides.openGraph.article && {
        article: overrides.openGraph.article,
      }),
    }
  }

  // Handle extend separately to merge arrays
  if (overrides.extend) {
    merged.extend = {
      link: [
        ...(defaults.extend?.link || []),
        ...(overrides.extend?.link || []),
      ],
      meta: [
        ...(defaults.extend?.meta || []),
        ...(overrides.extend?.meta || []),
      ],
    }
  }

  // Ensure required properties are present
  if (merged.openGraph) {
    merged.openGraph.basic = {
      ...defaults.openGraph!.basic,
      ...merged.openGraph.basic,
    }
  }

  return merged as SEOProps
}
