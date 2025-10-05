import ora from "ora"
import path from "path"
import puppeteer from "puppeteer"

const SCREENSHOT_DIR = path.join(process.cwd(), "src/assets/images")
const SCREENSHOT_URLS = [
  { name: "numberformat", url: "https://numberformat.app/" },
  {
    name: "next-auth-template",
    url: "https://next-auth-template-demo.vercel.app/",
  },
] as { name: string; url: string }[]

const Stats = {
  screenshotsCapturedCount: 0,
  screenshotsCaptured: [] as string[],
}

async function captureScreenshots() {
  spinner!.suffixText = `[Starting browser...]`
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
    },
  })

  spinner!.suffixText = `[Browser started.]`

  for (const { name, url } of SCREENSHOT_URLS) {
    const page = await browser.newPage()
    const screenshotName = `${name}-capture.png`
    const screenshotPath = path.join(SCREENSHOT_DIR, screenshotName)

    spinner!.suffixText = `[Capturing ${Stats.screenshotsCapturedCount + 1}/${SCREENSHOT_URLS.length}]`

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ])

    await page.goto(url, { waitUntil: "networkidle2" })
    await page.evaluate(() => {
      localStorage.setItem("theme", "light")
    })

    await page.reload({ waitUntil: "networkidle2" })
    await page.screenshot({ path: screenshotPath as `${string}.png` })

    Stats.screenshotsCapturedCount++
    Stats.screenshotsCaptured.push(screenshotName)

    await page.close()
  }

  spinner!.suffixText = ""
  await browser.close()
}

async function resizeScreenshots() {}

const spinner = ora(`Capturing screenshots...`).start()

try {
  await captureScreenshots()
  spinner?.succeed("Screenshots captured successfully!")

  Stats.screenshotsCaptured.forEach((file) => {
    console.log(`  - ${file}`)
  })
} catch (error) {
  spinner?.fail()
  console.error(error)
  process.exit(1)
}
