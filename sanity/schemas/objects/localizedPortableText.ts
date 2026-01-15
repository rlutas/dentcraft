import { defineType, defineField } from 'sanity'

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized Portable Text',
  type: 'object',
  fields: [
    defineField({
      name: 'ro',
      title: 'Romanian',
      type: 'portableText',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'portableText',
    }),
    defineField({
      name: 'hu',
      title: 'Hungarian',
      type: 'portableText',
    }),
  ],
})
