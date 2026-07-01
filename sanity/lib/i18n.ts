import { defineField, defineType } from 'sanity'

/**
 * Localized field SCHEMA object types (FR/EN/PT). These depend on the `sanity`
 * package and must only be imported by the Studio (sanity.config.ts), never by
 * the front-end. Pure runtime helpers (`pickLocale`, types, `LOCALES`) live in
 * `./locale.ts` — import those from app code.
 */
export {
  LOCALES,
  DEFAULT_LOCALE,
  pickLocale,
  pickLocaleBlocks,
  type Locale,
  type LocalizedString,
  type LocalizedPortableText,
} from './locale'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texte (FR/EN/PT)',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'pt', title: 'Português', type: 'string' }),
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Texte long (FR/EN/PT)',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 4 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'pt', title: 'Português', type: 'text', rows: 4 }),
  ],
})

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Contenu riche (FR/EN/PT)',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'pt',
      title: 'Português',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})

/**
 * Champ image (hotspot) avec texte alternatif localisé (FR/EN/PT). Partagé par
 * tous les documents pour ne pas redéclarer le bloc image+alt à chaque schéma.
 */
export function localizedImage(options?: {
  name?: string
  title?: string
  group?: string
  /** Aide affichée sous le champ. Défaut : consigne de recadrage (hotspot). */
  description?: string
}) {
  return defineField({
    name: options?.name ?? 'image',
    title: options?.title ?? 'Image',
    type: 'image',
    options: { hotspot: true },
    description:
      options?.description ??
      'Après avoir choisi la photo, cliquez dessus et déplacez le point pour indiquer la partie à garder au recadrage sur tous les écrans.',
    ...(options?.group ? { group: options.group } : {}),
    fields: [
      defineField({
        name: 'alt',
        title: 'Texte alternatif',
        type: 'localizedString',
        description:
          'Décrit la photo (pour l’accessibilité et Google). Ex. « Bague Joséphine portée à la main ».',
      }),
    ],
  })
}

export const localizedTypes = [localizedString, localizedText, localizedPortableText]
