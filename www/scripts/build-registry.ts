// Heavily inspired by and with great thanks to @bwestwood11 (https://github.com/bwestwood11/ui-cart/blob/main/scripts/build-registry.ts)

import { registry } from "../registry"
import { promises as fs } from "fs"
import { z } from "zod"
import { registryItemFileSchema } from "@/registry/schema"
import path from "path"

const REGISTRY_BASE_PATH = "registry"
const PUBLIC_FOLDER_BASE_PATH = "public/registry"
const COMPONENT_FOLDER_PATH = "components"

type File = z.infer<typeof registryItemFileSchema>
const FolderToComponentTypeMap = {
  ui: "registry:ui",
}

const writeFileRecursive = async (filePath: string, data: string) => {
  const dir = path.dirname(filePath) // Extract the directory path

  try {
    // Ensure the directory exists, recursively creating directories as needed
    await fs.mkdir(dir, { recursive: true })

    // Write the file
    await fs.writeFile(filePath, data, "utf-8")
    console.log(`File written to ${filePath}`)
  } catch (error) {
    console.error(`Error writing file`)
    console.error(error)
  }
}

const getUIFiles = async (files: File[]) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const filePath = `${REGISTRY_BASE_PATH}/${file}`
      const fileContent = await fs.readFile(filePath, "utf-8")
      return {
        type: FolderToComponentTypeMap[
          file.split("/")[0] as keyof typeof FolderToComponentTypeMap
        ],
        content: fileContent,
        path: file,
        target: `${COMPONENT_FOLDER_PATH}/${file}`,
      }
    }
  })
  const filesArray = await Promise.all(filesArrayPromises)

  return filesArray
}

const main = async () => {
  // make a json file and put it in public folder
  for (let i = 0; i < registry.length; i++) {
    const component = registry[i]
    const files = component.files
    if (!files) throw new Error("No files found for component")

    const filesArray = await getUIFiles(files)

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2,
    )
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`
    await writeFileRecursive(jsonPath, json)
    console.log(json)
  }
}

main()
  .then(() => {
    console.log("done")
  })
  .catch((err) => {
    console.error(err)
  })
