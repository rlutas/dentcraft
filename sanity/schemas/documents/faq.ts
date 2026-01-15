import { defineType, defineField, defineArrayMember } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedPortableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Treatments', value: 'treatments' },
          { title: 'Appointments', value: 'appointments' },
        ],
        layout: 'radio',
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'services',
      title: 'Related Services',
      type: 'array',
      description: 'Services this FAQ is related to',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the category',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'question.ro',
      category: 'category',
    },
    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        general: 'General',
        pricing: 'Pricing',
        treatments: 'Treatments',
        appointments: 'Appointments',
      }
      return {
        title: title ?? 'Untitled FAQ',
        subtitle: categoryLabels[category as string] ?? category,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
