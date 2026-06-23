import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Pièce de collection — correspond au type `Product` de
 * src/lib/content/products.ts (Joséphine, Aurore, Eugénie, Thelma, Louise).
 */
export const piece = defineType({
  name: 'piece',
  title: 'Pièce (collection)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'tagline', title: 'Accroche', type: 'localizedString' }),
    defineField({
      name: 'priceLabel',
      title: 'Mention de prix',
      type: 'localizedString',
      description: 'Tous les prix sont « Sur devis » — aucun montant affiché.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({ name: 'materials', title: 'Matières', type: 'localizedText' }),
    defineField({ name: 'story', title: 'Histoire', type: 'localizedText' }),
    localizedImage(),
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
    select: { title: 'name', media: 'image' },
  },
})
