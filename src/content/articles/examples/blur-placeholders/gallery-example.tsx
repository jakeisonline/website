import { cn } from "@/lib/utils"
import { encode } from "blurhash"
import { blurhashToBase64 } from "blurhash-base64"
import fs from "fs"
import { InfoIcon } from "lucide-react"
import path from "path"
import sharp from "sharp"

export function GalleryExample() {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-start gap-1 justify-center text-xs text-muted-foreground">
        <InfoIcon className="size-3 mt-0.5" />
        <span className="text-xs">
          Loading times have been slowed here to simulate a slower connection.
        </span>
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <div className="grid gap-2 md:gap-4">
          <GalleryImage
            src={"dog-1.jpg"}
            width={240}
            height={360}
            alt="Dog 1"
          />
          <GalleryImage
            src={"dog-6.jpg"}
            width={240}
            height={160}
            alt="Dog 6"
          />
          <GalleryImage
            src={"dog-8.jpg"}
            width={240}
            height={360}
            alt="Dog 8"
            className="hidden md:block"
          />
        </div>
        <div className="grid gap-2 md:gap-4">
          <GalleryImage
            width={240}
            height={160}
            src={"dog-10.jpg"}
            alt="Dog 10"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-2.jpg"}
            alt="Dog 2"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-11.jpg"}
            alt="Dog 11"
            className="hidden md:block"
          />
        </div>
        <div className="hidden md:grid gap-2 md:gap-4">
          <GalleryImage
            width={240}
            height={360}
            src={"dog-4.jpg"}
            alt="Dog 4"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-9.jpg"}
            alt="Dog 9"
          />
          <GalleryImage
            width={240}
            height={160}
            src={"dog-3.jpg"}
            alt="Dog 3"
          />
        </div>
      </div>
    </div>
  )
}

function GalleryImage({
  src,
  alt,
  width = 32,
  height = 32,
  className,
  ...props
}: React.ComponentProps<"img"> & {
  src: string
  width: number
  height: number
}) {
  const aspectRatio = width > height ? "aspect-3/2" : "aspect-2/3"

  return (
    <div>
      <BlurhashImage
        src={src}
        width={width}
        height={height}
        className={cn("rounded-xs max-w-full", aspectRatio, className)}
      />
    </div>
  )
}

async function BlurhashImage({
  src,
  width,
  height,
  ...props
}: React.ComponentProps<"img"> & {
  src: string
  width: number
  height: number
}) {
  const hash = await generateBlurhash({ imagePath: src, width, height })
  const hashBase64 = await blurhashToBase64(hash)

  return (
    <>
      <img
        src={hashBase64}
        data-src={`/images/${src}`}
        alt="Jake's blurry dumb face"
        width={width}
        height={height}
        {...props}
      />
      <script data-astro-rerun>
        {`
          (function() {
            const img = document.currentScript.previousElementSibling;
            if (!img || !img.dataset.src) return;

            const loadHighQualityImage = () => {
              const originalSrc = img.dataset.src;

              // Disconnect observer to prevent any accidental
              // loading due to erratic scrolling
              observer.disconnect();

              // Deliberately add a random 350-650ms delay
              window.setTimeout(() => {
                // Set the src directly, which will trigger browser
              // to load the image
              img.src = originalSrc;

              // May as well clean up after ourselves
              delete img.dataset.src;
              }, Math.random() * 650 + 350);
            };

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    loadHighQualityImage();
                  }
                });
              },
            );

            observer.observe(img);
          })();
        `}
      </script>
    </>
  )
}

async function generateBlurhash({
  imagePath,
  width,
  height,
}: {
  imagePath: string
  width: number
  height: number
}) {
  try {
    const filePath = path.resolve(process.cwd(), `./public/images/${imagePath}`)
    const imageBuffer = fs.readFileSync(filePath)

    // Calculate optimal dimensions for blurhash
    const aspectRatio = Number(width) / Number(height)
    const minDimension = 32

    // Calculate dimensions ensuring minimum of 32 pixels on the smaller side
    let blurWidth, blurHeight
    if (aspectRatio >= 1) {
      // Landscape or square
      blurHeight = minDimension
      blurWidth = Math.round(minDimension * aspectRatio)
    } else {
      // Portrait
      blurWidth = minDimension
      blurHeight = Math.round(minDimension / aspectRatio)
    }

    // Resize and ensure we get RGBA data
    const { data: imageData, info: imageMeta } = await sharp(imageBuffer)
      .resize(blurWidth, blurHeight, { fit: "inside" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Create a new array with the correct format
    const rgbaData = new Uint8ClampedArray(
      imageMeta.width * imageMeta.height * 4,
    )
    for (let i = 0; i < imageData.length; i++) {
      rgbaData[i] = imageData[i]
    }

    const hash = encode(rgbaData, imageMeta.width, imageMeta.height, 5, 4)
    return hash
  } catch (error) {
    console.error("Error generating blurhash:", error)
    return ""
  }
}
