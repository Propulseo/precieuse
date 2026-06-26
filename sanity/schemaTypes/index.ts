import type { SchemaTypeDefinition } from 'sanity'

import { localizedTypes } from '../lib/i18n'
import { siteSettings } from './documents/siteSettings'
import { piece } from './documents/piece'
import { matiere } from './documents/matiere'
import { article } from './documents/article'
import { temoignage } from './documents/temoignage'
import { etapeSurMesure } from './documents/etapeSurMesure'
import { etapeEtabli } from './documents/etapeEtabli'
import { surMesurePage } from './documents/surMesurePage'
import { creatricePage } from './documents/creatricePage'
import { legalPage } from './documents/legalPage'
import { footer } from './documents/footer'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Shared localized field object types (FR/EN/PT)
  ...localizedTypes,
  // Documents
  siteSettings,
  piece,
  matiere,
  article,
  temoignage,
  etapeSurMesure,
  etapeEtabli,
  surMesurePage,
  creatricePage,
  legalPage,
  footer,
]
