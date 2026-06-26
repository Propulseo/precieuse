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
 * Pied de page — partie éditable par Emeline : réseaux sociaux + email.
 * Les libellés de navigation, la signature et le copyright sont gérés par les
 * traductions (Paraglide, FR/EN/PT) ; le crédit agence est figé dans le code.
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
  ],
  preview: {
    prepare: () => ({ title: 'Pied de page' }),
  },
})
