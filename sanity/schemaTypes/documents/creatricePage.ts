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
    defineField({ name: 'quote', title: 'Citation', type: 'localizedText' }),
    defineField({
      name: 'realisations',
      title: 'Réalisations',
      description: 'Pièces présentées en bas de la page : chacune en photo « à l’atelier » et photo « portée ».',
      type: 'array',
      of: [
        defineField({
          name: 'realisation',
          title: 'Réalisation',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Nom de la pièce', type: 'localizedString' }),
            defineField({ name: 'material', title: 'Matière', type: 'localizedString' }),
            localizedImage({ name: 'studio', title: 'Photo à l’atelier' }),
            localizedImage({ name: 'worn', title: 'Photo portée' }),
          ],
          preview: {
            select: { title: 'title.fr', subtitle: 'material.fr', media: 'studio' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Créatrice' }),
  },
})
