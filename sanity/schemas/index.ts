import { type SchemaTypeDefinition } from 'sanity'

import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'
import { seo } from './objects/seo'
import { portableText } from './objects/portableText'
import { localizedPortableText } from './objects/localizedPortableText'

import { service } from './documents/service'
import { teamMember } from './documents/teamMember'
import { testimonial } from './documents/testimonial'
import { beforeAfter } from './documents/beforeAfter'
import { blogCategory } from './documents/blogCategory'
import { blogPost } from './documents/blogPost'
import { faq } from './documents/faq'
import { price } from './documents/price'
import { settings } from './documents/settings'
import { legalPage } from './documents/legalPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  localizedString,
  localizedText,
  seo,
  portableText,
  localizedPortableText,
  // Documents
  service,
  teamMember,
  testimonial,
  beforeAfter,
  blogCategory,
  blogPost,
  faq,
  price,
  settings,
  legalPage,
]
