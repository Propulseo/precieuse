import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Matière — correspond au type `Matiere` de src/lib/content/matieres.ts
 * (Or 18 carats, Diamants, Saphirs, Émeraudes, Rubis).
 */
export const matiere = defineType({
  name: 'matiere',
  title: 'Matière',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'localizedString' }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'localizedText',
    }),
    localizedImage(),
    defineField({
      name: 'annotationCaveat',
      title: 'Annotation (manuscrite)',
      type: 'localizedString',
    }),
    defineField({ name: 'page', title: 'Folio (ex. p. 05)', type: 'string' }),
    defineField({ name: 'order', title: "Ordre d'affichage", type: 'number' }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nom', media: 'image' },
  },
})
