import { defineField, defineType } from 'sanity'
import { localizedImage } from '../../lib/i18n'

/**
 * Pièce de collection — correspond au type `Product` de
 * src/lib/content/products.ts (Joséphine, Aurore, Eugénie, Thelma, Louise).
 */
export const piece = defineType({
  name: 'piece',
  title: 'Pièce (collection)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'localizedString',
      description: 'Courte phrase qui accompagne le nom de la pièce, ex. « La discrète ».',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Mention de prix',
      type: 'localizedString',
      description: 'Laissez « Sur devis » si le prix dépend de la demande.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'materials',
      title: 'Matières',
      type: 'localizedText',
      description: 'Ex. « Or 18 carats, diamants ». Les matières utilisées dans cette pièce.',
    }),
    defineField({
      name: 'story',
      title: 'Histoire',
      type: 'localizedText',
      description: "Le récit derrière la pièce : inspiration, symbolique, anecdote de création.",
    }),
    localizedImage({ title: 'Image principale (défilé + fiche)' }),
    localizedImage({
      name: 'photoPortee',
      title: 'Photo portée (grille /collection)',
    }),
    localizedImage({
      name: 'packshot',
      title: 'Packshot détouré (grille /collection)',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie de la fiche produit',
      description:
        'Photos montrées sur la fiche de la pièce, cliquables (agrandissement). Ajoutez-en autant que vous voulez ; privilégiez des photos avec un vrai fond (portée, atelier, détails). Si vide, la fiche réutilise l’image principale et la photo portée.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'localizedString' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'imageZoom',
      title: 'Zoom de cadrage (défilé accueil)',
      type: 'number',
      description: '1 = aucun zoom. Ex. 1.35 = +35 % sur la photo du défilé d’accueil.',
    }),
    defineField({ name: 'order', title: "Ordre d'affichage", type: 'number' }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
