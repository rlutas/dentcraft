import { defineType, defineField } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
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
      description: 'URL path for the page (e.g., politica-confidentialitate)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedPortableText',
      description: 'Page content in rich text format',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'When this legal page was last updated',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.ro',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, lastUpdated }) {
      return {
        title: title ?? 'Untitled Legal Page',
        subtitle: lastUpdated ? `Updated: ${lastUpdated}` : 'No update date',
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title.ro', direction: 'asc' }],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
  ],
})
