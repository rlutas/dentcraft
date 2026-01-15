import { defineType, defineField } from 'sanity'

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before/After Case',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Title of the before/after case',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'The treatment/service performed',
    }),
    defineField({
      name: 'doctor',
      title: 'Doctor',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'The doctor who performed the treatment',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      description: 'Image showing the condition before treatment',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      description: 'Image showing the result after treatment',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Brief description of the case and treatment',
    }),
    defineField({
      name: 'treatmentDuration',
      title: 'Treatment Duration',
      type: 'string',
      description: 'How long the treatment took (e.g., "2 weeks", "3 months")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this case prominently on the gallery page',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.ro',
      serviceName: 'service.title.ro',
      media: 'afterImage',
      featured: 'featured',
    },
    prepare({ title, serviceName, media, featured }) {
      return {
        title: title ?? 'Untitled case',
        subtitle: `${serviceName ?? 'No service'}${featured ? ' ★ Featured' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
