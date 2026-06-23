import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Article du Carnet — correspond au type `Article` de
 * src/lib/content/carnet.ts (blog / journal de l'atelier).
 */
export const article = defineType({
  name: 'article',
  title: 'Article (Carnet)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'excerpt', title: 'Extrait', type: 'localizedText' }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Atelier', value: 'Atelier' },
          { title: 'Matières', value: 'Matières' },
          { title: 'Guides', value: 'Guides' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date affichée',
      type: 'string',
      description: 'Format libre (ex. « 12 mai 2026 »).',
    }),
    defineField({ name: 'readTime', title: 'Temps de lecture', type: 'string' }),
    localizedImage(),
    defineField({
      name: 'featured',
      title: 'Mis en avant ?',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'title.fr', subtitle: 'category', media: 'image' },
  },
})
