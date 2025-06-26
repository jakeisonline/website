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
            alt="A Frenchie dog wearing a green cap"
          />
          <GalleryImage
            src={"dog-6.jpg"}
            width={240}
            height={160}
            alt="A Frenchie dog in a pineapple costume laying on the ground"
          />
          <GalleryImage
            src={"dog-8.jpg"}
            width={240}
            height={360}
            alt="A Frenchie dog wearing a yellow dog sweater looking at a tennis ball"
            className="hidden md:block"
          />
        </div>
        <div className="grid gap-2 md:gap-4">
          <GalleryImage
            width={240}
            height={160}
            src={"dog-10.jpg"}
            alt="Two dogs sit next to one another, each wearing a cowboy hat"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-2.jpg"}
            alt="A Frenchie dog in a banana dog sweater"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-11.jpg"}
            alt="A dog of unknown breed wearing a neckerchief"
            className="hidden md:block"
          />
        </div>
        <div className="hidden md:grid gap-2 md:gap-4">
          <GalleryImage
            width={240}
            height={360}
            src={"dog-4.jpg"}
            alt="A Frenchie wearing a blingin' necklace and a leather baseball jersey"
          />
          <GalleryImage
            width={240}
            height={360}
            src={"dog-9.jpg"}
            alt="A Frenchie dog wearing a blinging' necklace and black dog sweater"
          />
          <GalleryImage
            width={240}
            height={160}
            src={"dog-3.jpg"}
            alt="A Frenchie dog being held in the air by a human"
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
  alt: string
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
        alt={alt}
        className={cn("rounded-xs max-w-full", aspectRatio, className)}
      />
    </div>
  )
}

async function BlurhashImage({
  src,
  width,
  height,
  alt,
  ...props
}: React.ComponentProps<"img"> & {
  src: string
  width: number
  height: number
  alt: string
}) {
  const hash = await generateBlurhash({ imageFileName: src, width, height })
  const hashBase64 = await blurhashToBase64(hash)

  return (
    <>
      <img
        src={hashBase64}
        data-original-src={`/images/${src}`}
        alt={alt}
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
