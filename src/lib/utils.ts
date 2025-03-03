import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  )
}

export function sanitizePathname(pathname: string) {
  const noHash = pathname.split("#")[0]
  const noQueryParams = noHash.split("?")[0]
  const noTrailingSlash = noQueryParams.replace(/\/$/, "")
  const pathSegments = noTrailingSlash.split("/")
  return pathSegments.join("/")
}
