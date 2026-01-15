import { defineType, defineField } from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'ro',
      title: 'Romanian',
      type: 'text',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
    defineField({
      name: 'hu',
      title: 'Hungarian',
      type: 'text',
    }),
  ],
})
