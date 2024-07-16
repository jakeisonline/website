import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import slugifyString from "slugify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return slugifyString(text, {
    lower: true,
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
  })
}
