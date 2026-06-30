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
    { name: 'sections', title: 'En-têtes de section' },
    { name: 'seo', title: 'SEO' },
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
    defineField({ name: 'heroEyebrow', title: 'Sur-titre (au-dessus du logo)', type: 'localizedString', group: 'hero' }),

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

    // ----------------------------------------------------- En-têtes de section
    defineField({
      name: 'reassurance',
      title: 'Bandeau réassurance (garanties)',
      type: 'array',
      of: [{ type: 'localizedString' }],
      group: 'sections',
    }),
    defineField({ name: 'matieresTitle', title: 'Matières — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'matieresSubtitle', title: 'Matières — sous-titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'matieresMarginNote', title: 'Matières — note de marge', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'bespokeTitle', title: 'Bloc sur-mesure — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'bespokeIntro', title: 'Bloc sur-mesure — paragraphe', type: 'localizedText', group: 'sections' }),
    defineField({ name: 'bespokeTagline', title: 'Bloc sur-mesure — accroche', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'bespokeMeta', title: 'Bloc sur-mesure — mention sous le bouton', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'etabliOverline', title: 'Établi — sur-titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'etabliTitle', title: 'Établi — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'collectionTitle', title: 'Collection — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'collectionSubtitle', title: 'Collection — sous-titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'testimonialsTitleLine1', title: 'Témoignages — titre (ligne 1)', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'testimonialsTitleLine2', title: 'Témoignages — titre (ligne 2)', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'leadCaptureTitle', title: 'Formulaire — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'leadCaptureSubtitle', title: 'Formulaire — sous-titre', type: 'localizedText', group: 'sections' }),
    defineField({ name: 'leadCaptureConsentPrefix', title: 'Formulaire — consentement (avant le lien)', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'leadCaptureConsentLink', title: 'Formulaire — libellé du lien confidentialité', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'leadCaptureConsentSuffix', title: 'Formulaire — consentement (après le lien)', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'newsletterEyebrow', title: 'Newsletter — sur-titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'newsletterTitle', title: 'Newsletter — titre', type: 'localizedString', group: 'sections' }),
    defineField({ name: 'newsletterSubtitle', title: 'Newsletter — sous-titre', type: 'localizedString', group: 'sections' }),

    // ------------------------------------------------------------------- SEO
    defineField({ name: 'seoTitle', title: 'SEO — titre (onglet & Google)', type: 'localizedString', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO — description', type: 'localizedText', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
})
