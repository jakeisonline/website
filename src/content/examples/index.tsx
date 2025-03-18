import React from "react"

export const Index: Record<string, any> = {
  "pending-state-no-feedback": {
    name: "pending-state-no-feedback",
    component: React.lazy(
      () => import("@/content/examples/pending-state/no-feedback"),
    ),
    source: (
      await import(`@/content/examples/pending-state/no-feedback.tsx?raw`)
    ).default,
  },
  "pending-state-with-feedback": {
    name: "pending-state-with-feedback",
    component: React.lazy(
      () => import("@/content/examples/pending-state/with-feedback"),
    ),
    source: (
      await import(`@/content/examples/pending-state/with-feedback.tsx?raw`)
    ).default,
  },
  "pending-state-with-context": {
    name: "pending-state-with-context",
    component: React.lazy(
      () => import("@/content/examples/pending-state/with-context"),
    ),
    source: (
      await import(`@/content/examples/pending-state/with-context.tsx?raw`)
    ).default,
  },
  "pending-state-apply-filters": {
    name: "pending-state-apply-filters",
    component: React.lazy(
      () => import("@/content/examples/pending-state/apply-filters"),
    ),
    source: (
      await import(`@/content/examples/pending-state/apply-filters.tsx?raw`)
    ).default,
  },
  "pending-state-navigation": {
    name: "pending-state-navigation",
    component: React.lazy(
      () => import("@/content/examples/pending-state/navigation"),
    ),
  },
}
