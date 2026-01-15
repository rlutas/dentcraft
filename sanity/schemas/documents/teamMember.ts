import { defineType, defineField, defineArrayMember } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      description: 'Job title or role (e.g., "Dentist", "Orthodontist")',
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Specialization Name',
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'name.ro',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
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
      name: 'bio',
      title: 'Biography',
      type: 'localizedPortableText',
      description: 'Full biography with rich text',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
            }),
            defineField({
              name: 'degree',
              title: 'Degree',
              type: 'localizedString',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              institution: 'institution',
              degree: 'degree.ro',
              year: 'year',
            },
            prepare({ institution, degree, year }) {
              return {
                title: institution ?? 'Untitled',
                subtitle: `${degree ?? ''} ${year ? `(${year})` : ''}`.trim(),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Certification Name',
              type: 'localizedString',
            }),
            defineField({
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              name: 'name.ro',
              issuer: 'issuer',
              year: 'year',
            },
            prepare({ name, issuer, year }) {
              return {
                title: name ?? 'Untitled certification',
                subtitle: `${issuer ?? ''} ${year ? `(${year})` : ''}`.trim(),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
      description: 'Services this team member specializes in',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.ro',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
