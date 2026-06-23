import { defineField, defineType } from 'sanity'

/**
 * Témoignage / Lettre — correspond au type `Lettre` de
 * src/lib/content/lettres.ts.
 * NOTE seed : placeholders actuels — à remplacer par de vrais avis (Eméline).
 */
export const temoignage = defineType({
  name: 'temoignage',
  title: 'Témoignage (Lettre)',
  type: 'document',
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder ?',
      type: 'boolean',
      description: 'À remplacer par un vrai avis. À décocher une fois validé.',
      initialValue: true,
    }),
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'auteur',
      title: 'Auteur',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'initiale',
      title: 'Initiale',
      type: 'string',
      description: 'Lettre affichée dans la pastille (ex. « M »).',
    }),
    defineField({ name: 'ville', title: 'Ville', type: 'string' }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Date affichée, format libre (ex. « 18 mars 2025 »).',
    }),
    defineField({
      name: 'piece',
      title: 'Pièce associée (libre)',
      type: 'localizedString',
      description: "Ex. « Création sur-mesure » ou le nom d'un modèle.",
    }),
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
    select: { title: 'auteur', subtitle: 'citation.fr' },
  },
})
