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

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Liens principaux',
      type: 'array',
      of: [linkObject],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
})
