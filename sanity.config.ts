'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { deskStructure } from './sanity/deskStructure'

const projectId = process.env['NEXT_PUBLIC_SANITY_PROJECT_ID'] || ''
const dataset = process.env['NEXT_PUBLIC_SANITY_DATASET'] || 'production'

export default defineConfig({
  name: 'dentcraft-studio',
  title: 'Dentcraft CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
