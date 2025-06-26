import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { encode } from "blurhash"
import { blurhashToBase64 } from "blurhash-base64"
import { RefreshCcwIcon } from "lucide-react"
import { useEffect, useState } from "react"

function useBlurhash(imageUrl: string, componentX: number, componentY: number) {
  const [base64Hash, setBase64Hash] = useState<string>("")

  useEffect(() => {
    let isMounted = true

    const generateHash = async () => {
      try {
        // Fetch the image
        const response = await fetch(imageUrl)
        if (!response.ok)
          throw new Error(`Failed to fetch image: ${response.statusText}`)
        const blob = await response.blob()

        // Create a data URL from the blob
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })

        // Load the image and get its dimensions
        const img = new Image()
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = reject
          img.src = dataUrl
        })

        // Create canvas and resize image
        const canvas = document.createElement("canvas")
        const aspectRatio = img.width / img.height
        const minDimension = 32
        const [blurWidth, blurHeight] =
          aspectRatio >= 1
            ? [Math.round(minDimension * aspectRatio), minDimension]
            : [minDimension, Math.round(minDimension / aspectRatio)]

        canvas.width = blurWidth
        canvas.height = blurHeight

        // Draw and get image data
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Could not get canvas context")

        ctx.drawImage(img, 0, 0, blurWidth, blurHeight)
        const imageData = ctx.getImageData(0, 0, blurWidth, blurHeight)

        // Generate blurhash and convert to base64
        const hash = encode(
          imageData.data,
          imageData.width,
          imageData.height,
          componentX,
          componentY,
        )
        const base64 = await blurhashToBase64(hash)

        if (isMounted) {
          setBase64Hash(base64)
        }
      } catch (error) {
        console.error("Error generating blurhash:", error)
      }
    }

    generateHash()

    return () => {
      isMounted = false
    }
  }, [imageUrl, componentX, componentY])

  return base64Hash
}

export function BlurControlExample() {
  const [componentX, setComponentX] = useState(5)
  const [componentY, setComponentY] = useState(4)

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Reset to default values"
            className="absolute z-10 right-2.5 md:right-5 top-2.5 md:top-5"
            variant="outline"
            size="sm"
            onClick={() => {
              setComponentX(5)
              setComponentY(4)
            }}
          >
            <RefreshCcwIcon className="size-3 md:size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset to default values</TooltipContent>
      </Tooltip>
      <div className="flex flex-col">
        <div className="w-full space-y-4 flex flex-row gap-x-4 items-center">
          <BlurExample
            width={128}
            height={128}
            componentX={componentX}
            componentY={componentY}
          />
          <ControlSlider
            label="componentY"
            orient="vertical"
            value={componentY}
            onChange={setComponentY}
          />
        </div>
        <ControlSlider
          label="componentX"
          orient="horizontal"
          value={componentX}
          onChange={setComponentX}
          className="w-28"
        />
      </div>
    </>
  )
}

function BlurExample({
  width,
  height,
  componentX,
  componentY,
  className,
  ...props
}: React.ComponentProps<"img"> & {
  width: number
  height: number
  componentX: number
  componentY: number
  className?: string
}) {
  const imageUrl = "/images/jakes-dumb-face.jpg"
  const base64Hash = useBlurhash(imageUrl, componentX, componentY)

  if (!base64Hash) {
    return (
      <div
        className={cn(
          "size-[128px] bg-gray-200 animate-pulse rounded-full",
          className,
        )}
      />
    )
  }

  return (
    <img
      src={base64Hash}
      data-src={imageUrl}
      alt="Jake's blurry dumb face"
      width={width}
      height={height}
      className={cn("rounded-full mt-4", className)}
      {...props}
    />
  )
}

function ControlSlider({
  value,
  min = 1,
  max = 9,
  step = 1,
  orient,
  label,
  onChange,
  className,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  orient: "horizontal" | "vertical"
  label: string
  onChange: (value: number) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2",
        orient === "vertical" && "[writing-mode:vertical-lr] w-min h-28",
        className,
      )}
    >
      <label className="text-sm font-medium" htmlFor={label}>
        {label} = <code>{value}</code>
      </label>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "accent-blue-600",
          orient === "vertical" && "[writing-mode:vertical-lr]",
        )}
      />
    </div>
  )
}
