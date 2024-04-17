import * as React from "react"
import { SVGProps } from "react"
const CrossIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 48 48"
    {...props}
  >
    <path d="M24 4C12.972 4 4 12.972 4 24s8.972 20 20 20 20-8.972 20-20S35.028 4 24 4zm0 3c9.407 0 17 7.593 17 17s-7.593 17-17 17S7 33.407 7 24 14.593 7 24 7zm6.486 8.979a1.5 1.5 0 0 0-1.047.46L24 21.88l-5.44-5.44a1.5 1.5 0 0 0-1.076-.455 1.5 1.5 0 0 0-1.045 2.577L21.88 24l-5.44 5.44a1.5 1.5 0 1 0 2.122 2.12L24 26.122l5.44 5.44a1.5 1.5 0 1 0 2.12-2.122L26.122 24l5.44-5.44a1.5 1.5 0 0 0-1.075-2.581z" />
  </svg>
)
export default CrossIcon
