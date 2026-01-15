import { type SchemaTypeDefinition } from 'sanity'

import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'
import { seo } from './objects/seo'
import { portableText } from './objects/portableText'
import { localizedPortableText } from './objects/localizedPortableText'

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  seo,
  portableText,
  localizedPortableText,
]
