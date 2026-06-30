import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/** Bloc image (hotspot + alt localisé) réutilisable dans les tableaux. */
const arrayImage = (name: string, title: string) => ({
  name,
  title,
  type: 'image' as const,
  options: { hotspot: true },
  fields: [{ name: 'alt', title: 'Texte alternatif', type: 'localizedString' }],
})

/**
 * Page Sur-Mesure — singleton pilotant TOUTE la page /sur-mesure (héro, bandeau,
 * atelier, procédé, croquis, réalisations, témoignages). Correspond au contrat
 * `BespokePageData` (src/lib/content/bespoke.ts) lu par `getBespokePage`. Tant
 * que les champs sont vides, le site sert le repli i18n/photos par défaut.
 */
export const surMesurePage = defineType({
  name: 'surMesurePage',
  title: 'Page Sur-Mesure',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Héro' },
    { name: 'atelier', title: "L'atelier" },
    { name: 'process', title: 'Le procédé' },
    { name: 'split', title: 'Du croquis' },
    { name: 'real', title: 'Réalisations' },
    { name: 'voices', title: 'Témoignages' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ---------------------------------------------------------------- Héro
    defineField({ name: 'heroKicker', title: 'Sur-titre', type: 'localizedString', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Titre', type: 'localizedString', group: 'hero' }),
    defineField({ name: 'heroTitleAccent', title: 'Titre — mot accentué', type: 'localizedString', group: 'hero' }),
    defineField({ name: 'heroSub', title: 'Sous-titre', type: 'localizedText', group: 'hero' }),
    defineField({ name: 'heroCta', title: 'Bouton', type: 'localizedString', group: 'hero' }),
    localizedImage({ name: 'heroImage', title: 'Photo (moitié droite)', group: 'hero' }),
    defineField({
      name: 'heroVideo',
      title: 'Vidéo (moitié gauche)',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'hero',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Poster vidéo (image de remplacement)',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'marquee',
      title: 'Bandeau défilant (items)',
      type: 'array',
      of: [{ type: 'localizedString' }],
      group: 'hero',
    }),

    // ------------------------------------------------------------- Atelier
    defineField({ name: 'atelierTitleLead', title: 'Titre — début', type: 'localizedString', group: 'atelier' }),
    defineField({ name: 'atelierTitleAccent', title: 'Titre — mot accentué', type: 'localizedString', group: 'atelier' }),
    defineField({ name: 'atelierTitleTail', title: 'Titre — fin', type: 'localizedString', group: 'atelier' }),
    defineField({ name: 'atelierBody', title: 'Paragraphe', type: 'localizedText', group: 'atelier' }),
    defineField({ name: 'atelierLink', title: 'Libellé du lien', type: 'localizedString', group: 'atelier' }),
    defineField({ name: 'atelierBadge', title: 'Texte du médaillon tournant', type: 'localizedString', group: 'atelier' }),
    defineField({
      name: 'atelierImages',
      title: 'Photos (galerie, 3)',
      type: 'array',
      of: [arrayImage('img', 'Photo')],
      group: 'atelier',
    }),

    // ------------------------------------------------------------- Procédé
    defineField({
      name: 'steps',
      title: 'Étapes (4)',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            { name: 'title', title: 'Titre', type: 'localizedString' },
            { name: 'body', title: 'Texte', type: 'localizedText' },
          ],
          preview: { select: { title: 'title.fr' } },
        },
      ],
    }),
    defineField({ name: 'manifesteLead', title: 'Manifeste — phrase', type: 'localizedText', group: 'process' }),
    defineField({ name: 'manifesteAccent', title: 'Manifeste — mot accentué', type: 'localizedString', group: 'process' }),

    // -------------------------------------------------------------- Croquis
    defineField({ name: 'splitEyebrow', title: 'Sur-titre', type: 'localizedString', group: 'split' }),
    defineField({ name: 'splitTitleLead', title: 'Titre — début', type: 'localizedString', group: 'split' }),
    defineField({ name: 'splitTitleAccent', title: 'Titre — mot accentué', type: 'localizedString', group: 'split' }),
    defineField({ name: 'splitTitleTail', title: 'Titre — fin', type: 'localizedString', group: 'split' }),
    defineField({ name: 'splitBody', title: 'Paragraphe', type: 'localizedText', group: 'split' }),
    defineField({ name: 'splitLink', title: 'Libellé du lien', type: 'localizedString', group: 'split' }),
    localizedImage({ name: 'splitImage', title: 'Photo (esquisses)', group: 'split' }),

    // --------------------------------------------------------- Réalisations
    defineField({ name: 'realEyebrow', title: 'Sur-titre', type: 'localizedString', group: 'real' }),
    defineField({ name: 'realTitle', title: 'Titre', type: 'localizedString', group: 'real' }),
    defineField({ name: 'realIntro', title: 'Introduction', type: 'localizedText', group: 'real' }),
    defineField({ name: 'realTagAtelier', title: "Étiquette « à l'atelier »", type: 'localizedString', group: 'real' }),
    defineField({ name: 'realTagPortee', title: 'Étiquette « portée »', type: 'localizedString', group: 'real' }),
    defineField({
      name: 'pieces',
      title: 'Pièces (duos atelier / portée)',
      type: 'array',
      group: 'real',
      of: [
        {
          type: 'object',
          name: 'piece',
          fields: [
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'material', title: 'Matière', type: 'localizedString' },
            arrayImage('atelier', "Photo à l'atelier"),
            arrayImage('portee', 'Photo portée'),
          ],
          preview: { select: { title: 'name', media: 'atelier' } },
        },
      ],
    }),

    // ----------------------------------------------------------- Témoignages
    defineField({ name: 'voicesTitle', title: 'Titre de section', type: 'localizedString', group: 'voices' }),
    defineField({
      name: 'voices',
      title: 'Voix (témoignages sur-mesure)',
      type: 'array',
      group: 'voices',
      of: [
        {
          type: 'object',
          name: 'voice',
          fields: [
            { name: 'initial', title: 'Initiale (pastille)', type: 'string' },
            { name: 'quote', title: 'Citation', type: 'localizedText' },
            { name: 'name', title: 'Prénom', type: 'string' },
            { name: 'city', title: 'Ville', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'city' } },
        },
      ],
    }),

    // ------------------------------------------------------------------- SEO
    defineField({ name: 'seoTitle', title: 'SEO — titre (onglet & Google)', type: 'localizedString', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO — description', type: 'localizedText', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Sur-Mesure' }),
  },
})
