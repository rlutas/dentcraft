import { defineType, defineField, defineArrayMember } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'localizedString',
      description: 'The name of the website',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Main contact phone number',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Contact email address',
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
          description: 'WhatsApp contact number (with country code, e.g., +40...)',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'localizedText',
          description: 'Full clinic address',
        }),
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Days',
              type: 'localizedString',
              description: 'E.g., "Monday - Friday" or "Luni - Vineri"',
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'E.g., "09:00 - 18:00"',
            }),
            defineField({
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              description: 'Check if clinic is closed on these days',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              days: 'days.ro',
              hours: 'hours',
              closed: 'closed',
            },
            prepare({ days, hours, closed }) {
              return {
                title: days ?? 'Untitled',
                subtitle: closed ? 'Închis / Closed' : (hours ?? ''),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The embed URL for Google Maps iframe (src attribute)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
