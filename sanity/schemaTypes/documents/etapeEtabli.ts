import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Étape de l'établi (atelier) — correspond au type `EtabliStep` de
 * src/lib/content/etabli.ts (L'Esquisse, La Cire, La Fonte, Le Polissage).
 */
export const etapeEtabli = defineType({
  name: 'etapeEtabli',
  title: "Étape de l'établi",
  type: 'document',
  fields: [
    defineField({
      name: 'roman',
      title: 'Numéro romain (ex. I)',
      type: 'string',
      description: 'Chiffre romain affiché devant l\'étape, ex. « I », « II », « III ».',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'index',
      title: 'Index numérique',
      type: 'number',
      description: 'Détermine l\'ordre d\'affichage des étapes (1, 2, 3…).',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
    defineField({
      name: 'annotation',
      title: 'Annotation (manuscrite)',
      type: 'localizedString',
      description: 'Petite note affichée comme écrite à la main à côté du titre.',
    }),
    defineField({ name: 'detail', title: 'Détail', type: 'localizedText' }),
    localizedImage(),
  ],
  orderings: [
    {
      title: 'Index',
      name: 'indexAsc',
      by: [{ field: 'index', direction: 'asc' }],
    },
  ],
  preview: {
    select: { roman: 'roman', title: 'title.fr', media: 'image' },
    prepare: ({ roman, title, media }) => ({
      title: `${roman ?? ''} — ${title ?? ''}`.trim(),
      media,
    }),
  },
})
