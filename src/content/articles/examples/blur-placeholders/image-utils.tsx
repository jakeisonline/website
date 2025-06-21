import { encode } from "blurhash"
import fs from "fs"
import path from "path"
import sharp from "sharp"

export async function generateBlurhash({
  imageFileName,
  width,
  height,
  componentX = 5,
  componentY = 4,
}: {
  imageFileName: string
  width: number
  height: number
  componentX?: number
  componentY?: number
}) {
  try {
    const filePath = path.resolve(
      process.cwd(),
      `./public/images/${imageFileName}`,
    )
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

    const hash = encode(
      rgbaData,
      imageMeta.width,
      imageMeta.height,
      componentX,
      componentY,
    )
    return hash
  } catch (error) {
    console.error("Error generating blurhash:", error)
    return ""
  }
}

export async function resizeImage({
  imageFileName,
  width,
  height,
}: {
  imageFileName: string
  width: number
  height: number
}) {
  try {
    const filePath = path.resolve(
      process.cwd(),
      `./public/images/${imageFileName}`,
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
