import { StructureBuilder } from 'sanity/structure'
import { CogIcon, FileTextIcon, UsersIcon, StarIcon, ImagesIcon, FileIcon, HelpCircleIcon, DollarSignIcon, BookOpenIcon, ScaleIcon } from 'lucide-react'
import type { ComponentType } from 'react'

// Helper to cast Lucide icons to the expected type
const icon = (Icon: ComponentType) => Icon as ComponentType

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton
      S.listItem()
        .title('Site Settings')
        .icon(icon(CogIcon))
        .child(
          S.document()
            .schemaType('settings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Services
      S.listItem()
        .title('Services')
        .icon(icon(FileTextIcon))
        .child(S.documentTypeList('service').title('Services')),

      // Team Members
      S.listItem()
        .title('Team Members')
        .icon(icon(UsersIcon))
        .child(S.documentTypeList('teamMember').title('Team Members')),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .icon(icon(StarIcon))
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      // Before/After Gallery
      S.listItem()
        .title('Before/After Gallery')
        .icon(icon(ImagesIcon))
        .child(S.documentTypeList('beforeAfter').title('Before/After Cases')),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog')
        .icon(icon(BookOpenIcon))
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(icon(FileIcon))
                .child(S.documentTypeList('blogPost').title('Blog Posts')),
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('blogCategory').title('Blog Categories')),
            ])
        ),

      // FAQs
      S.listItem()
        .title('FAQs')
        .icon(icon(HelpCircleIcon))
        .child(S.documentTypeList('faq').title('FAQs')),

      // Prices
      S.listItem()
        .title('Prices')
        .icon(icon(DollarSignIcon))
        .child(S.documentTypeList('price').title('Prices')),

      S.divider(),

      // Legal Pages
      S.listItem()
        .title('Legal Pages')
        .icon(icon(ScaleIcon))
        .child(S.documentTypeList('legalPage').title('Legal Pages')),
    ])
