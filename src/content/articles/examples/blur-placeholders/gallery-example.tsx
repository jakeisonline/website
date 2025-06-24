import { cn } from "@/lib/utils"
import { blurhashToBase64 } from "blurhash-base64"
import { InfoIcon } from "lucide-react"
import { generateBlurhash } from "./image-utils"

export function GalleryExample() {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-start gap-1 justify-center text-xs text-muted-foreground">
        <InfoIcon className="size-3 mt-0.5" />
        <span className="text-xs">
          Loading artificially slowed, simulating a slower connection. Refresh
          if you missed the blurred images.
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
  const hash = await generateBlurhash({ imageFileName: src, width, height })
  const hashBase64 = await blurhashToBase64(hash)

  return (
    <>
      <img
        src={hashBase64}
        data-original-src={`/images/${src}`}
        alt="Jake's blurry dumb face"
        width={width}
        height={height}
        {...props}
      />
      <script data-astro-rerun>
        {`
          (function() {
            const img = document.currentScript.previousElementSibling;
            if (!img || !img.dataset.originalSrc) return;

            const loadHighQualityImage = () => {
              const originalSrc = img.dataset.originalSrc;

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
