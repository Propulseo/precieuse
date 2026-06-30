import { defineField, defineType } from 'sanity'

const socialObject = defineField({
  name: 'social',
  title: 'Réseau social',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Libellé', type: 'string' }),
    defineField({ name: 'handle', title: 'Identifiant affiché', type: 'string' }),
    defineField({ name: 'href', title: 'URL', type: 'url' }),
  ],
  preview: { select: { title: 'label', subtitle: 'handle' } },
})

/**
 * Pied de page — éditable par Emeline : réseaux sociaux + email + textes
 * éditoriaux (signature, ligne de réponse 48 h, copyright, cachet d'atelier).
 * Les libellés de navigation/légaux et le crédit agence restent gérés par le
 * code/Paraglide (FR/EN/PT). Repli i18n via `footerFallback()` tant que vide.
 */
export const footer = defineType({
  name: 'footer',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [socialObject],
    }),
    defineField({ name: 'email', title: 'Email de contact', type: 'string' }),
    defineField({
      name: 'signature',
      title: 'Signature (à côté du logo)',
      type: 'localizedText',
    }),
    defineField({
      name: 'responseLine1',
      title: 'Délai de réponse — ligne 1',
      type: 'localizedString',
    }),
    defineField({
      name: 'responseLine2',
      title: 'Délai de réponse — ligne 2',
      type: 'localizedString',
    }),
    defineField({ name: 'copyright', title: 'Copyright', type: 'localizedString' }),
    defineField({
      name: 'atelierStamp',
      title: "Cachet d'atelier (un élément par ligne)",
      type: 'localizedText',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pied de page' }),
  },
})
