import { toString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export function remarkReadingTime() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 150 })

    data.astro.frontmatter.readingMinutes = Math.ceil(readingTime.minutes)
    data.astro.frontmatter.readingWords = readingTime.words
  }
}
