import { renderOgImage, loadUserConfig } from "og-images-generator/api"

import type { APIRoute } from "astro"

export const GET: APIRoute = async (/* { params, request } */) => {
  const config = await loadUserConfig()
  const image = await renderOgImage(config, { path: "/" })

  return new Response(image)
}
