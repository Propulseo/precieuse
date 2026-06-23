import { defineField, defineType } from 'sanity'

const altField = defineField({
  name: 'alt',
  title: 'Texte alternatif',
  type: 'localizedString',
})

/**
 * Page Sur-Mesure — regroupe la « Métamorphose » (étapes illustrées) et les
 * « Promesses », correspondant à METAMORPHOSE et PROMESSES de
 * src/lib/content/sur-mesure.ts. Singleton.
 */
export const surMesurePage = defineType({
  name: 'surMesurePage',
  title: 'Page Sur-Mesure',
  type: 'document',
  fields: [
    defineField({
      name: 'metamorphose',
      title: 'Métamorphose (étapes illustrées)',
      type: 'array',
      of: [
        defineField({
          name: 'etape',
          title: 'Étape',
          type: 'object',
          fields: [
            defineField({
              name: 'roman',
              title: 'Numéro romain (ex. I)',
              type: 'string',
            }),
            defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
            defineField({
              name: 'annotation',
              title: 'Annotation (manuscrite)',
              type: 'localizedString',
            }),
            defineField({ name: 'detail', title: 'Détail', type: 'localizedText' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [altField],
            }),
          ],
          preview: { select: { title: 'title.fr', subtitle: 'roman', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'promesses',
      title: 'Promesses',
      type: 'array',
      of: [
        defineField({
          name: 'promesse',
          title: 'Promesse',
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Titre', type: 'localizedString' }),
            defineField({ name: 'detail', title: 'Détail', type: 'localizedString' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [altField],
            }),
          ],
          preview: { select: { title: 'titre.fr', subtitle: 'detail.fr', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Sur-Mesure' }),
  },
})
