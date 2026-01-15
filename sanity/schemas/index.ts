import { type SchemaTypeDefinition } from 'sanity'

import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'
import { seo } from './objects/seo'
import { portableText } from './objects/portableText'
import { localizedPortableText } from './objects/localizedPortableText'

import { service } from './documents/service'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  localizedString,
  localizedText,
  seo,
  portableText,
  localizedPortableText,
  // Documents
  service,
]
