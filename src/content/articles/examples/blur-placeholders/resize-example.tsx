import ImageJakesDumbFace from "@/assets/images/jakes-dumb-face.jpg"
import { cn } from "@/lib/utils"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { BlurhashImage } from "./simple-example"

export async function ResizeExample() {
  return (
    <div className="grid grid-cols-3 gap-8 justify-items-center">
      <div className="flex flex-col gap-2 items-center size-fit">
        <div className="size-[128px] flex items-center justify-center">
          <ResizedImage
            src={ImageJakesDumbFace.src}
            alt="Jake's dumb face"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <p>Resized</p>
        <p className="-mt-3 text-sm text-muted-foreground">32 x 32 pixels</p>
      </div>
      <div className="flex flex-col gap-2 items-center size-fit">
        <ResizedImage
          src={ImageJakesDumbFace.src}
          alt="Jake's dumb face"
          width={32}
          height={32}
          className="rounded-full size-[128px]"
        />
        <p>Upscaled</p>
        <p className="-mt-3 text-sm text-muted-foreground">128 x 128 pixels</p>
      </div>
      <div className="flex flex-col gap-2 items-center size-fit">
        <BlurhashImage
          alt="Jake's dumb face"
          width={128}
          height={128}
          className="rounded-full size-[128px]"
        />
        <p>Blurred & Upscaled</p>
        <p className="-mt-3 text-sm text-muted-foreground">128 x 128 pixels</p>
      </div>
    </div>
  )
}

export async function ResizedImage({
  src = ImageJakesDumbFace.src,
  width = 32,
  height = 32,
  ...props
}: React.ComponentProps<"img"> & {
  src: string
  width: number
  height: number
}) {
  const resizedImage = await resizeImage(src, width, height)

  return (
    <img
      src={`data:image/jpeg;base64,${resizedImage}`}
      alt={props.alt}
      width={width}
      height={height}
      className={cn("rounded-full", props.className)}
      {...props}
    />
  )
}

async function resizeImage(imagePath: string, width: number, height: number) {
  try {
    const filePath = path.resolve(
      process.cwd(),
      "src/assets/images/jakes-dumb-face.jpg",
    )
    const imageBuffer = fs.readFileSync(filePath)

    // Resize and ensure we get RGBA data
    const resizedImage = await sharp(imageBuffer)
      .resize(width, height, { fit: "inside" })
      .ensureAlpha()
      .toBuffer()

    return resizedImage.toString("base64")
  } catch (error) {
    console.error("Error generating image:", error)
    return ""
  }
}
