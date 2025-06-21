import { cn } from "@/lib/utils"
import { blurhashToBase64 } from "blurhash-base64"
import { generateBlurhash } from "./image-utils"
import ImageJakesDumbFace from "./public/images/jakes-dumb-face.jpg"

export async function SimpleExample() {
  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col gap-2 items-center">
        <img
          src={ImageJakesDumbFace.src}
          alt="Jake's dumb face"
          width={128}
          height={128}
          className="rounded-full"
        />
        <p>My face</p>
        <p className="-mt-3 text-sm text-muted-foreground">61 KB</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BlurhashImage width={128} height={128} />
        <p>My blurred face</p>
        <p className="-mt-3 text-sm text-muted-foreground">
          4 KB (175% smaller)
        </p>
      </div>
    </div>
  )
}

export async function BlurhashImage({
  width = 32,
  height = 32,
  ...props
}: React.ComponentProps<"img">) {
  const hash = await generateBlurhash({
    imageFileName: "jakes-dumb-face.jpg",
    width: Number(width),
    height: Number(height),
    componentX: 6,
    componentY: 8,
  })
  const hashBase64 = await blurhashToBase64(hash)

  return (
    <img
      src={hashBase64}
      alt="Jake's blurry dumb face"
      width={width}
      height={height}
      className={cn("rounded-full", props.className)}
      {...props}
    />
  )
}
