import ImageJakesDumbFace from "@/assets/images/jakes-dumb-face.jpg"
import { cn } from "@/lib/utils"
import { encode } from "blurhash"
import { blurhashToBase64 } from "blurhash-base64"
import fs from "fs"
import path from "path"
import sharp from "sharp"

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
  const blurhash = async (imagePath: string) => {
    try {
      const filePath = path.resolve(
        process.cwd(),
        "src/assets/images/jakes-dumb-face.jpg",
      )
      const imageBuffer = fs.readFileSync(filePath)

      // Resize and ensure we get RGBA data
      const { data: pixels, info } = await sharp(imageBuffer)
        .resize(32, 32, { fit: "inside" })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

      // Create a new array with the correct format
      const rgbaData = new Uint8ClampedArray(info.width * info.height * 4)
      for (let i = 0; i < pixels.length; i++) {
        rgbaData[i] = pixels[i]
      }

      const hash = encode(rgbaData, info.width, info.height, 6, 8)
      return hash
    } catch (error) {
      console.error("Error generating blurhash:", error)
      return ""
    }
  }

  const hash = await blurhash(ImageJakesDumbFace.src)
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
