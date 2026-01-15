import { defineType, defineField } from 'sanity'

export const price = defineType({
  name: 'price',
  title: 'Price',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Treatment Name',
      type: 'localizedString',
      description: 'Specific treatment or procedure name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Brief description of what is included',
    }),
    defineField({
      name: 'priceMin',
      title: 'Minimum Price (RON)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'priceMax',
      title: 'Maximum Price (RON)',
      type: 'number',
      description: 'Leave empty if price is fixed',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'e.g., "per tooth", "per session", "per arch"',
    }),
    defineField({
      name: 'isPromotion',
      title: 'Is Promotion?',
      type: 'boolean',
      description: 'Mark if this is a promotional price',
      initialValue: false,
    }),
    defineField({
      name: 'promotionPrice',
      title: 'Promotional Price (RON)',
      type: 'number',
      description: 'Discounted price if promotion is active',
      hidden: ({ parent }) => !parent?.isPromotion,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'includesInCalculator',
      title: 'Include in Calculator',
      type: 'boolean',
      description: 'Include this price in the price calculator feature',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name.ro',
      service: 'service.title.ro',
      priceMin: 'priceMin',
      priceMax: 'priceMax',
      isPromotion: 'isPromotion',
    },
    prepare({ title, service, priceMin, priceMax, isPromotion }) {
      const priceDisplay = priceMax
        ? `${priceMin ?? 0} - ${priceMax} RON`
        : `${priceMin ?? 0} RON`
      const promoIndicator = isPromotion ? ' 🏷️' : ''
      return {
        title: `${title ?? 'Untitled'}${promoIndicator}`,
        subtitle: `${service ?? 'No service'} • ${priceDisplay}`,
      }
    },
  },
  orderings: [
    {
      title: 'Service',
      name: 'serviceAsc',
      by: [{ field: 'service.title.ro', direction: 'asc' }],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'priceMin', direction: 'asc' }],
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{ field: 'priceMin', direction: 'desc' }],
    },
  ],
})
