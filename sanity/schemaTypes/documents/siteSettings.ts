import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'baseline', title: 'Baseline', type: 'localizedString' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (URL)',
      type: 'url',
      description: 'Lien complet, ex. « https://wa.me/33612345678 ».',
    }),
    defineField({
      name: 'whatsappLabel',
      title: 'WhatsApp — libellé du bouton flottant',
      type: 'localizedString',
    }),
    defineField({ name: 'instagram', title: 'Instagram (URL)', type: 'url' }),
    defineField({
      name: 'hours',
      title: 'Horaires',
      type: 'localizedString',
      description: 'Ex. « Sur rendez-vous, du mardi au samedi ».',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      description: "Adresse de l'atelier affichée sur le site.",
      fields: [
        defineField({ name: 'street', title: 'Rue', type: 'string' }),
        defineField({ name: 'zip', title: 'Code postal', type: 'string' }),
        defineField({ name: 'city', title: 'Ville', type: 'string' }),
        defineField({ name: 'country', title: 'Pays', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'brand' },
    prepare: ({ title }) => ({ title: title || 'Paramètres du site' }),
  },
})
