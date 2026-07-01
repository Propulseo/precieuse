import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Page Créatrice ("Moi c'est Emeline") — singleton. Le contenu vit
 * aujourd'hui en dur dans src/routes/creatrice.tsx ; ce schéma le rend
 * éditable une fois Sanity branché.
 */
export const creatricePage = defineType({
  name: 'creatricePage',
  title: 'Page Créatrice',
  type: 'document',
  fields: [
    defineField({ name: 'overline', title: 'Surtitre', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
    defineField({ name: 'intro', title: 'Introduction', type: 'localizedText' }),
    localizedImage({ name: 'portrait', title: 'Portrait' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Les blocs de texte (avec photo) qui racontent le parcours d\'Emeline, dans l\'ordre où ils apparaîtront.',
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({ name: 'overline', title: 'Surtitre', type: 'localizedString' }),
            defineField({ name: 'title', title: 'Titre', type: 'localizedString' }),
            defineField({
              name: 'body',
              title: 'Paragraphes',
              type: 'array',
              description: 'Un paragraphe par élément de la liste.',
              of: [{ type: 'localizedText' }],
            }),
            localizedImage(),
          ],
          preview: {
            select: { title: 'title.fr', subtitle: 'overline.fr', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'localizedText',
      description: 'Citation de clôture affichée en fin de page.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Créatrice' }),
  },
})
