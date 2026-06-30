import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Page d'accueil — singleton pilotant le contenu éditorial du héro d'accueil
 * (les 2 photos plein cadre + la promesse). Lu par `getHomePage`
 * (src/lib/cms/content.ts) ; repli i18n/photos via `homePageFallback()`
 * (src/lib/content/home.ts) tant que les champs sont vides. Les libellés d'UI
 * (sur-titre, boutons) restent gérés par Paraglide.
 */
export const homePage = defineType({
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  groups: [
    { name: 'hero', title: 'Héro' },
    { name: 'avantPropos', title: 'Avant-propos' },
  ],
  fields: [
    localizedImage({ name: 'heroImageLeft', title: 'Photo de gauche', group: 'hero' }),
    localizedImage({ name: 'heroImageRight', title: 'Photo de droite', group: 'hero' }),
    defineField({
      name: 'heroTaglineLead',
      title: 'Promesse — début',
      type: 'localizedString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTaglineAccent',
      title: 'Promesse — mot accentué',
      type: 'localizedString',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Sous-ligne',
      type: 'localizedText',
      group: 'hero',
    }),

    // ----------------------------------------------------------- Avant-propos
    localizedImage({ name: 'aproposPortrait', title: "Portrait d'Emeline", group: 'avantPropos' }),
    defineField({ name: 'aproposName', title: 'Nom (créatrice)', type: 'string', group: 'avantPropos' }),
    defineField({ name: 'aproposPlace', title: 'Lieu · millésime', type: 'string', group: 'avantPropos' }),
    defineField({
      name: 'aproposManifesto',
      title: 'Manifeste (paires « pas / mais »)',
      type: 'array',
      group: 'avantPropos',
      of: [
        {
          type: 'object',
          name: 'pair',
          fields: [
            { name: 'pas', title: '« Pas… »', type: 'localizedString' },
            { name: 'mais', title: '« Mais… »', type: 'localizedString' },
          ],
          preview: { select: { title: 'mais.fr', subtitle: 'pas.fr' } },
        },
      ],
    }),
    defineField({ name: 'aproposQualification', title: 'Qualification', type: 'localizedString', group: 'avantPropos' }),
    defineField({ name: 'aproposFounder', title: 'Mention fondatrice', type: 'localizedString', group: 'avantPropos' }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
})
