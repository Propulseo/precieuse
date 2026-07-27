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
    { name: 'fiche', title: 'Fiche d’une bague' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'localizedString',
      group: 'entete',
    }),

    // Libellés partagés par toutes les fiches produit (une seule saisie).
    defineField({
      name: 'backLabel',
      title: 'Lien de retour vers la collection',
      type: 'localizedString',
      group: 'fiche',
    }),
    defineField({
      name: 'materialsLabel',
      title: 'Titre du bloc « Matières »',
      type: 'localizedString',
      group: 'fiche',
    }),
    defineField({
      name: 'storyLabel',
      title: 'Titre du bloc « Histoire »',
      type: 'localizedString',
      group: 'fiche',
    }),
    defineField({
      name: 'requestCta',
      title: 'Bouton de demande',
      type: 'localizedString',
      description: 'Ex. « Demander cette pièce ». Ouvre le formulaire de contact.',
      group: 'fiche',
    }),
    defineField({
      name: 'reassurance',
      title: 'Mention rassurante sous le bouton',
      type: 'localizedString',
      description: 'Ex. « Réponse sous 48 h, sans engagement ».',
      group: 'fiche',
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
