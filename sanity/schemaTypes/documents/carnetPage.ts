import { defineField, defineType } from 'sanity'

/**
 * Page Carnet — singleton pilotant l'en-tête de la liste d'articles et les
 * quelques libellés qui l'entourent. Les articles eux-mêmes sont des documents
 * `article` séparés. Lu par `getCarnetPage` (src/lib/cms/content.ts), repli i18n
 * via `carnetPageFallback()` : chaque champ vide retombe sur la traduction.
 *
 * Les libellés à variable (« 4 min de lecture », « 3 chapitres ») restent en
 * code : ils contiennent un emplacement technique que le Studio ne protège pas.
 */
export const carnetPage = defineType({
  name: 'carnetPage',
  title: 'Page Carnet',
  type: 'document',
  groups: [
    { name: 'entete', title: 'En-tête' },
    { name: 'libelles', title: 'Libellés' },
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
      name: 'intro',
      title: 'Paragraphe d’introduction',
      type: 'localizedText',
      group: 'entete',
    }),
    defineField({
      name: 'featuredLabel',
      title: 'Mention de l’article mis en avant',
      type: 'localizedString',
      description: 'Affichée au-dessus du grand article en haut de page, ex. « À la une ».',
      group: 'libelles',
    }),
    defineField({
      name: 'readArticleLabel',
      title: 'Lien « Lire l’article »',
      type: 'localizedString',
      group: 'libelles',
    }),
    defineField({
      name: 'emptyLabel',
      title: 'Message quand il n’y a aucun article',
      type: 'localizedString',
      group: 'libelles',
    }),
    defineField({
      name: 'tocLabel',
      title: 'Titre du sommaire (dans un article)',
      type: 'localizedString',
      description: 'Ex. « Sommaire », affiché à côté du texte de l’article.',
      group: 'libelles',
    }),
    defineField({
      name: 'backLabel',
      title: 'Lien de retour vers le Carnet',
      type: 'localizedString',
      group: 'libelles',
    }),
    defineField({
      name: 'relatedLabel',
      title: 'Titre « À lire aussi »',
      type: 'localizedString',
      group: 'libelles',
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
  preview: { prepare: () => ({ title: 'Page Carnet' }) },
})
