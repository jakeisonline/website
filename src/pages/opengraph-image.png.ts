/* Huge thanks to @dzmitrykozh for this!!
https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/ */

import fs from "fs"
import path from "path"
import { ImageResponse } from "@vercel/og"

export async function GET() {
  const UrbanistRegular = fs.readFileSync(
    path.join(
      process.cwd(),
      "public",
      "fonts",
      "urbanist-latin-400-normal.woff",
    ),
  )

  const html = {
    key: "home_og",
    type: "div",
    props: {
      children: [
        {
          type: "div",
          props: {
            tw: "flex flex-col justify-center -mt-16 text-5xl",
            children: [
              {
                type: "h1",
                tw: "tracking-tight",
                props: {
                  children: "👋 Hello, I make things.",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "absolute right-[40px] bottom-[40px] flex items-center",
            children: [
              {
                type: "div",
                props: {
                  tw: "text-blue-600 text-3xl",
                  children: "Jake Holman",
                },
              },
              {
                type: "div",
                props: {
                  tw: "px-2 text-3xl",
                  children: "|",
                },
              },
              {
                type: "div",
                props: {
                  tw: "text-3xl",
                  children: "jakeisonline.com",
                },
              },
            ],
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-center relative px-22 bg-white",
    },
  }

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Urbanist",
        data: UrbanistRegular.buffer,
        style: "normal",
      },
    ],
  })
}
