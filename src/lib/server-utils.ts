"use server"

import { URL } from "url"

export function getFinalDirectory(url: string): string {
  const parsedUrl = new URL(url)
  const pathSegments = parsedUrl.pathname.split("/").filter(Boolean)
  return pathSegments[pathSegments.length - 1] || ""
}
