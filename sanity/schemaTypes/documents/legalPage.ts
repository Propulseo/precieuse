import { defineField, defineType } from 'sanity'

/**
 * Page légale — mentions légales, confidentialité, CGV.
 * (Les routes correspondantes existent déjà ; ce schéma les rendra
 * éditables une fois Sanity branché.)
 */
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Page légale',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'localizedPortableText',
    }),
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'slug.current' },
  },
})
