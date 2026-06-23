import { defineField, defineType } from 'sanity'

/**
 * Étape du parcours sur-mesure — correspond au type `ProcessStep`
 * (BESPOKE_PROCESS) de src/lib/content/site.ts.
 */
export const etapeSurMesure = defineType({
  name: 'etapeSurMesure',
  title: 'Étape sur-mesure',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Numéro (ex. 01)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
  ],
  orderings: [
    {
      title: 'Numéro',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],
  preview: {
    select: { number: 'number', title: 'title.fr' },
    prepare: ({ number, title }) => ({
      title: `${number ?? ''} — ${title ?? ''}`.trim(),
    }),
  },
})
