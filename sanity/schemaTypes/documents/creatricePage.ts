import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Page Créatrice ("Moi c'est Emeline") — singleton. Schéma aligné sur le design
 * « lettre signée » (cf. CreatriceStatic / CreatriceCms) : intro, portrait +
 * légende, paragraphes de parcours (lettrine sur le 1er), philosophie, citation,
 * signature. Les décors (filigranes, cachet, fleur) restent figés dans le code.
 */
export const creatricePage = defineType({
  name: 'creatricePage',
  title: 'Page Créatrice',
  type: 'document',
  fields: [
    defineField({
      name: 'introTitle',
      title: 'Titre',
      type: 'localizedString',
      description: 'Grand titre en haut de page, ex. « Moi c’est Emeline. ».',
    }),
    defineField({
      name: 'introLede',
      title: 'Phrase d’introduction',
      type: 'localizedText',
      description: 'Courte phrase en italique sous le titre.',
    }),
    localizedImage({ name: 'portrait', title: 'Portrait d’Emeline' }),
    defineField({
      name: 'captionName',
      title: 'Légende — nom',
      type: 'string',
      description: 'Affiché sous le portrait, ex. « Emeline Le Ray ».',
    }),
    defineField({
      name: 'captionPlace',
      title: 'Légende — lieu · année',
      type: 'string',
      description: 'Après le point, ex. « Bordeaux · MMXXV ».',
    }),
    defineField({
      name: 'parcours',
      title: 'Parcours (paragraphes)',
      type: 'array',
      description: 'Le récit du parcours. Un paragraphe par élément ; le premier reçoit la lettrine.',
      of: [{ type: 'localizedText' }],
    }),
    defineField({
      name: 'philosophieBody',
      title: 'Philosophie (paragraphe)',
      type: 'localizedText',
      description: 'Paragraphe après le séparateur, sur l’approche et les valeurs.',
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'localizedText',
      description: 'Citation en exergue, mise en avant au centre.',
    }),
    defineField({
      name: 'signatureName',
      title: 'Signature — prénom',
      type: 'string',
      description: 'Grand prénom en clôture, ex. « Emeline ».',
    }),
    defineField({
      name: 'signatureRole',
      title: 'Signature — rôle',
      type: 'localizedString',
      description: 'Sous la signature, ex. « Créatrice & joaillière · Précieuse ».',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Créatrice' }),
  },
})
