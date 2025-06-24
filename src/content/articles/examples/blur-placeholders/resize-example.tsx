import { cn } from "@/lib/utils"
import { resizeImage } from "./image-utils"
import { BlurhashImage } from "./simple-example"

export async function ResizeExample() {
  return (
    <div className="grid grid-cols-2 gap-8 justify-items-center text-center">
      <div className="flex flex-col gap-2 items-center size-fit">
        <div className="size-[128px] flex items-center justify-center">
          <ResizedImage
            src={`/images/jakes-dumb-face.jpg`}
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
  src = `/images/jakes-dumb-face.jpg`,
  width = 32,
  height = 32,
  ...props
}: React.ComponentProps<"img"> & {
  src: string
  width: number
  height: number
}) {
  const resizedImage = await resizeImage({
    imageFileName: "jakes-dumb-face.jpg",
    width,
    height,
  })

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
