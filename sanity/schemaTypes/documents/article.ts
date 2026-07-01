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
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'localizedText',
      description: 'Court résumé affiché dans la liste des articles du Carnet.',
    }),
    defineField({
      name: 'lede',
      title: 'Chapô (intro mise en avant)',
      type: 'text',
      rows: 3,
      description: 'Carnet en français uniquement pour l’instant.',
    }),
    defineField({
      name: 'body',
      title: "Corps de l'article",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paragraph',
          title: 'Paragraphe',
          fields: [{ name: 'text', title: 'Texte', type: 'text', rows: 4 }],
          preview: { select: { title: 'text' } },
        },
        {
          type: 'object',
          name: 'heading',
          title: 'Sous-titre (H2)',
          fields: [{ name: 'text', title: 'Texte', type: 'string' }],
          preview: { select: { title: 'text' } },
        },
        {
          type: 'object',
          name: 'quote',
          title: 'Citation',
          fields: [
            { name: 'text', title: 'Texte', type: 'text', rows: 3 },
            { name: 'cite', title: 'Signature', type: 'string' },
          ],
          preview: { select: { title: 'text', subtitle: 'cite' } },
        },
        {
          type: 'object',
          name: 'list',
          title: 'Liste à puces',
          fields: [{ name: 'items', title: 'Éléments', type: 'array', of: [{ type: 'string' }] }],
        },
      ],
    }),
    defineField({
      name: 'closingQuote',
      title: 'Citation de clôture (signature)',
      type: 'object',
      fields: [
        { name: 'text', title: 'Texte', type: 'text', rows: 2 },
        { name: 'cite', title: 'Signature', type: 'string' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Sert à classer et filtrer les articles sur la page Carnet.',
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
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex. « 4 min ».',
    }),
    localizedImage(),
    defineField({
      name: 'featured',
      title: 'Mis en avant ?',
      type: 'boolean',
      description: 'Cochez pour afficher cet article en tête de la page Carnet.',
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
