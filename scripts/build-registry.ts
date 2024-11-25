// Heavily inspired by and with great thanks to @bwestwood11 (https://github.com/bwestwood11/ui-cart/blob/main/scripts/build-registry.ts)

import { registry } from "@/www/registry"
import { promises as fs } from "fs"
import { z } from "zod"
import { registryItemFileSchema } from "@/www/registry/schema"
import path from "path"
import ora from "ora"

const REGISTRY_BASE_PATH = "www/registry"
const PUBLIC_FOLDER_BASE_PATH = "www/public/registry"

type File = z.infer<typeof registryItemFileSchema>
const FolderToComponentTypeMap = {
  ui: "registry:ui",
  hooks: "registry:hook",
}

const TargetFolderMap = {
  ui: "components/ui",
  hooks: "hooks",
}

const Stats = {
  filesWrittenCount: 0,
  filesWritten: [] as string[],
}

const writeFileRecursive = async (filePath: string, data: string) => {
  const dir = path.dirname(filePath) // Extract the directory path

  try {
    // Ensure the directory exists, recursively creating directories as needed
    await fs.mkdir(dir, { recursive: true })

    // Write the file
    await fs.writeFile(filePath, data, "utf-8")
  } catch (error) {
    console.error(`Error writing file`)
    console.error(error)
  }
}

function fixImports(code: string, type: string): string {
  // Strip all instances of @/registry
    return code.replace(/@\/registry/g, "@");
}

const getUIFiles = async (files: File[]) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const fileType = file.split("/")[0]
      const filePath = `${REGISTRY_BASE_PATH}/${file}`
      const fileContent = await fs.readFile(filePath, "utf-8")
      const fixedImports = fixImports(fileContent, fileType)

      Stats.filesWrittenCount++
      Stats.filesWritten.push(filePath)

      return {
        type: FolderToComponentTypeMap[
          file.split("/")[0] as keyof typeof FolderToComponentTypeMap
        ],
        content: fixedImports,
        path: file,
        target: `${TargetFolderMap[file.split("/")[0] as keyof typeof TargetFolderMap]}/${file.split("/").pop()}`,
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
  }
}

console.log("")
const spinner = ora(`Creating registry files...`).start()

main()
  .then(() => {
    spinner?.succeed()
    spinner?.info(`Wrote ${Stats.filesWrittenCount} files:`)
    Stats.filesWritten.forEach((file) => {
      console.log(`  - ${file}`)
    })
  })
  .catch((err) => {
    spinner?.fail()
    console.error(err)
  })
