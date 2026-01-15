import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
      description: 'Name of the patient (can be first name only or initials for privacy)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'patientPhoto',
      title: 'Patient Photo',
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
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1 to 5 stars',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'localizedText',
      description: 'The testimonial content in all languages',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo video URL',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Direct video file upload (alternative to video URL)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'The service this testimonial is about',
    }),
    defineField({
      name: 'doctor',
      title: 'Doctor',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'The doctor who provided the treatment',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When the testimonial was given',
    }),
  ],
  preview: {
    select: {
      title: 'patientName',
      rating: 'rating',
      media: 'patientPhoto',
      serviceName: 'service.title.ro',
    },
    prepare({ title, rating, media, serviceName }) {
      const stars = '★'.repeat(rating ?? 0) + '☆'.repeat(5 - (rating ?? 0))
      return {
        title: title ?? 'Untitled testimonial',
        subtitle: `${stars}${serviceName ? ` • ${serviceName}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Highest Rated',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})
