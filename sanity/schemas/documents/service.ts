import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.ro',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "Stethoscope", "Smile", "Heart")',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedString',
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedPortableText',
      description: 'Full service description with rich text',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'title.ro',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Treatment Process',
      type: 'array',
      description: 'Steps involved in the treatment',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedText',
            }),
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title.ro',
            },
            prepare({ stepNumber, title }) {
              return {
                title: `${stepNumber ?? ''}: ${title ?? 'Untitled step'}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'object',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum Price (RON)',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Maximum Price (RON)',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title.ro',
      subtitle: 'shortDescription.ro',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title.ro', direction: 'asc' }],
    },
  ],
})
