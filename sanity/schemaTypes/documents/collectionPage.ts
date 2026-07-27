import { defineField, defineType } from 'sanity'

/**
 * Page Collection — singleton pour le titre de la page et son SEO. Les bagues
 * elles-mêmes sont des documents `piece`. Lu par `getCollectionPage`
 * (src/lib/cms/content.ts), repli i18n via `collectionPageFallback()`.
 */
export const collectionPage = defineType({
  name: 'collectionPage',
  title: 'Page Collection',
  type: 'document',
  groups: [
    { name: 'entete', title: 'En-tête' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'localizedString',
      group: 'entete',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO — titre (onglet & Google)',
      type: 'localizedString',
      description: 'Texte affiché dans l’onglet du navigateur et dans Google. ~60 caractères.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — description',
      type: 'localizedText',
      description: 'Texte affiché sous le titre dans les résultats Google. ~150 caractères.',
      group: 'seo',
    }),
  ],
  preview: { prepare: () => ({ title: 'Page Collection' }) },
})
