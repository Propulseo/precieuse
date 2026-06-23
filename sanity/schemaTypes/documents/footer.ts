import { defineField, defineType } from 'sanity'

const linkObject = defineField({
  name: 'link',
  title: 'Lien',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Libellé', type: 'localizedString' }),
    defineField({ name: 'href', title: 'URL / chemin', type: 'string' }),
  ],
  preview: { select: { title: 'label.fr', subtitle: 'href' } },
})

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
 * Pied de page — correspond à FOOTER_DATA de src/lib/content/footer.ts.
 */
export const footer = defineType({
  name: 'footer',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({
      name: 'nav',
      title: 'Navigation principale',
      type: 'array',
      of: [linkObject],
    }),
    defineField({
      name: 'legal',
      title: 'Navigation légale',
      type: 'array',
      of: [linkObject],
    }),
    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [socialObject],
    }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'signature', title: 'Signature', type: 'localizedString' }),
    defineField({ name: 'copyright', title: 'Copyright', type: 'localizedString' }),
    defineField({
      name: 'credit',
      title: 'Crédit (agence)',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Libellé', type: 'string' }),
        defineField({ name: 'href', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'logoSrc',
      title: 'Logo (chemin)',
      type: 'string',
      description: 'Chemin sous /public (ex. /brand/lockup-teal.png).',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pied de page' }),
  },
})
