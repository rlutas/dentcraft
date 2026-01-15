import { createClient } from '@sanity/client'

const projectId = process.env['NEXT_PUBLIC_SANITY_PROJECT_ID'] || ''
const dataset = process.env['NEXT_PUBLIC_SANITY_DATASET'] || 'production'
const apiVersion = process.env['NEXT_PUBLIC_SANITY_API_VERSION'] || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Preview client with token for draft content
export function getClient(preview?: boolean) {
  if (preview) {
    const token = process.env['SANITY_API_TOKEN'] || ''
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  }
  return client
}
