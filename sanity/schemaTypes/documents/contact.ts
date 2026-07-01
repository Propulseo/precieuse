import { defineField, defineType } from 'sanity'

const faqItem = defineField({
  name: 'faqItem',
  title: 'Question / réponse',
  type: 'object',
  fields: [
    defineField({ name: 'q', title: 'Question', type: 'localizedString' }),
    defineField({ name: 'a', title: 'Réponse', type: 'localizedText' }),
  ],
  preview: { select: { title: 'q.fr' } },
})

/**
 * Contact (drawer) — singleton pilotant le contenu éditorial du panneau de
 * contact ET, par partage, le bandeau de clôture (`ClosingInvite`). Lu par
 * `getContact` ; repli i18n via `contactFallback()` tant que les champs sont
 * vides. Les libellés de champs/coordonnées et les chips de sujet restent gérés
 * par Paraglide (structurels).
 */
export const contact = defineType({
  name: 'contact',
  title: 'Contact (drawer)',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Sur-titre', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
    defineField({ name: 'lede', title: 'Accroche', type: 'localizedText' }),
    defineField({
      name: 'reassurance',
      title: 'Ligne de réassurance',
      type: 'localizedText',
      description: 'Courte phrase qui rassure avant l\'envoi, ex. « Réponse sous 48 h, sans engagement ».',
    }),
    defineField({
      name: 'faq',
      title: 'Mini-FAQ',
      type: 'array',
      description: 'Questions fréquentes affichées dans le panneau de contact.',
      of: [faqItem],
    }),
    defineField({
      name: 'successTitle',
      title: 'Message de succès — titre',
      type: 'localizedString',
      description: 'Affiché juste après l\'envoi du formulaire de contact.',
    }),
    defineField({
      name: 'successBody',
      title: 'Message de succès — corps',
      type: 'localizedString',
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact (drawer)' }) },
})
