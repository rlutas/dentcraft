import { type SchemaTypeDefinition } from 'sanity'

import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
]
