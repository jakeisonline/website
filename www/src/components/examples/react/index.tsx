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
}
