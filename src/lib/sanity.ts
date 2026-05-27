import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? '2026-05-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export function urlForImage(source: unknown) {
  return builder.image(source as never)
}
