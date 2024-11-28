import * as React from "react"

export const Index: Record<string, any> = {
  "stepper": {
    name: "stepper",
    component: React.lazy(
      () => import("@/components/examples/react/stepper-demo"),
    ),
    source: (await import(`@/components/examples/react/stepper-demo.tsx?raw`))
      .default,
  },
  "stepper-shift": {
    name: "stepper-shift",
    component: React.lazy(
      () => import("@/components/examples/react/stepper-shift"),
    ),
    source: (await import(`@/components/examples/react/stepper-shift.tsx?raw`))
      .default,
  },
  "stepper-collapse": {
    name: "stepper-collapse",
    component: React.lazy(
      () => import("@/components/examples/react/stepper-collapse"),
    ),
    source: (
      await import(`@/components/examples/react/stepper-collapse.tsx?raw`)
    ).default,
  },
  "range": {
    component: React.lazy(
      () => import("@/components/examples/react/range-demo"),
    ),
    source: (await import(`@/components/examples/react/range-demo.tsx?raw`))
      .default,
  },
  "cells": {
    component: React.lazy(
      () => import("@/components/examples/react/cells-demo"),
    ),
    source: (await import(`@/components/examples/react/cells-demo.tsx?raw`))
      .default,
  },
  "cells-3x3": {
    component: React.lazy(
      () => import("@/components/examples/react/cells-3x3"),
    ),
    source: (await import(`@/components/examples/react/cells-3x3.tsx?raw`))
      .default,
  },
}
