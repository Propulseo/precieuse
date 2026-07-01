# Page Créatrice éditable via Sanity — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre la page `/creatrice` entièrement pilotable depuis Sanity (tout le texte + le portrait) sans changer d'un pixel son design « lettre signée » actuel.

**Architecture:** On aligne le rendu Sanity (`CreatriceCms`) et le schéma `creatricePage` sur le design figé (`CreatriceStatic`), les décors SVG sont extraits dans un module partagé pour garantir la parité, puis on seede le document (publié). Le repli statique reste le filet de sécurité (doc absent ⇒ `CreatriceStatic`).

**Tech Stack:** TanStack Start (React 19, SSR), Sanity (schémas + `@sanity/client`), Tailwind v4, Paraglide (FR/EN/PT), `tsx` pour les scripts de seed.

## Global Constraints

- **TypeScript strict, jamais `any`** — narrower depuis `unknown` via `pickLocale(... as never, locale)` et `String(... ?? '')`, comme le reste de `content.ts`.
- **Imports relatifs** (style du dossier : `../../lib/...`, `./ornements`) — ne pas introduire d'alias `@/` dans ces fichiers.
- **i18n FR/EN/PT** : textes éditoriaux = `localizedString`/`localizedText` ; noms propres language-neutres (`Emeline Le Ray`, `Bordeaux · MMXXV`, `Emeline`) = `string` simple.
- **Aucune nouvelle dépendance.**
- **Sanity lu côté serveur uniquement** (`isSanityConfigured = Boolean(projectId) && typeof window === 'undefined'`). Le loader `/creatrice` tourne en SSR → interroge Sanity. `VITE_SANITY_PROJECT_ID=8zuvflol` et `SANITY_WRITE_TOKEN` sont dans `.env`.
- **Critère de réussite = parité pixel** : screenshot `/creatrice` avant (statique) et après (Sanity) **identiques**, 0 erreur console.
- **Le CTA (`ClosingInvite`) reste en Paraglide** (`m.creatrice_cta_title()` / `m.creatrice_cta_button()`), jamais éditable.
- Commits : préfixes `feat:`/`refactor:`/`docs:`. Type check après chaque tâche.

---

## File Structure

- **Create** `src/components/creatrice/ornements.tsx` — décors partagés `Filigrane` + `Seal` (SVG figés).
- **Modify** `src/components/creatrice/CreatriceStatic.tsx` — importe les ornements partagés (refactor pur).
- **Modify** `sanity/schemaTypes/documents/creatricePage.ts` — schéma réécrit (design lettre).
- **Modify** `src/lib/cms/content.ts` — type `CreatriceContent` + `getCreatrice()` réécrits.
- **Modify** `src/components/creatrice/CreatriceCms.tsx` — réécrit, pixel-identique au statique.
- **Create** `scripts/seed-creatrice.ts` — seed publié du singleton `creatricePage`.
- **Modify** `src/components/studio/structure.ts` — Créatrice en éditeur mono-document.

---

## Task 1 : Décors partagés + refactor CreatriceStatic

**Files:**
- Create: `src/components/creatrice/ornements.tsx`
- Modify: `src/components/creatrice/CreatriceStatic.tsx`

**Interfaces:**
- Produces: `Filigrane()` et `Seal()` — deux composants React sans props (`() => JSX.Element`), exportés depuis `./ornements`.
- Consumes: `BRAND_PICTO_MASK`, `maskStyle` depuis `../brand/brand` (déjà utilisés par CreatriceStatic).

- [ ] **Step 1 : Créer `src/components/creatrice/ornements.tsx`** (copie verbatim des définitions internes actuelles de CreatriceStatic)

```tsx
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'

/** Filigrane losange — séparateur éditorial entre les mouvements de la lettre. */
export function Filigrane() {
  return (
    <div className="my-10 flex justify-center text-framboise/50" aria-hidden>
      <svg viewBox="0 0 86 24" className="h-6 w-[86px]" fill="none">
        <line x1="8" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="0.6" />
        <rect x="39" y="8" width="8" height="8" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 43 12)" />
        <line x1="50" y1="12" x2="78" y2="12" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  )
}

/** Cachet d'atelier — sceau rond ATELIER · BORDEAUX · MMXXV, fleur de la marque au centre. */
export function Seal() {
  return (
    <div className="relative h-24 w-24 shrink-0 text-canard" aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full opacity-80" fill="none">
        <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <text x="60" y="32" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">ATELIER</text>
        <text x="60" y="92" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">BORDEAUX</text>
        <text x="60" y="104" textAnchor="middle" fontSize="6.5" fill="currentColor" fontFamily="serif" letterSpacing="2.6">MMXXV</text>
      </svg>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 32, height: 32, ...maskStyle(BRAND_PICTO_MASK) }}
      />
    </div>
  )
}
```

- [ ] **Step 2 : Dans `CreatriceStatic.tsx`, supprimer les définitions locales `Filigrane` et `Seal`** (lignes ~6-36) et **remplacer l'import** de brand par l'import des ornements. En tête du fichier, remplacer :

```tsx
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
```

par (garder `maskStyle`/`BRAND_PICTO_MASK` car encore utilisés pour les filigranes du portrait) :

```tsx
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { Filigrane, Seal } from './ornements'
```

Puis supprimer les fonctions `Filigrane()` et `Seal()` internes. Le corps de `CreatriceStatic()` reste identique (il appelle déjà `<Filigrane />` et `<Seal />`).

- [ ] **Step 3 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4 : Parité visuelle (baseline)** — page toujours en repli statique (aucun doc Sanity). Charger `http://localhost:3000/creatrice` (serveur `pnpm dev` déjà lancé), attendre la fin du splash, screenshot plein écran `creatrice-baseline.jpeg`. Vérifier visuellement : identique à avant (portrait + filigranes + légende + lettrine + cachet + signature). **Conserver ce screenshot** — c'est la référence de parité pour la Task 4.

- [ ] **Step 5 : Commit**

```bash
git add src/components/creatrice/ornements.tsx src/components/creatrice/CreatriceStatic.tsx
git commit -m "refactor(creatrice): extrait Filigrane/Seal en decors partages"
```

---

## Task 2 : Réécriture du schéma `creatricePage`

**Files:**
- Modify: `sanity/schemaTypes/documents/creatricePage.ts`

**Interfaces:**
- Produces: type de document Sanity `creatricePage` avec les champs `introTitle`, `introLede`, `portrait` (+`alt`), `captionName`, `captionPlace`, `parcours[]`, `philosophieBody`, `quote`, `signatureName`, `signatureRole`.
- Consumes: `defineType`, `defineField` (`sanity`) ; `localizedImage` (déjà importé dans ce fichier). `localizedString`/`localizedText` = types custom déjà enregistrés.

- [ ] **Step 1 : Remplacer le contenu de `sanity/schemaTypes/documents/creatricePage.ts`** (l'ancien `sections[]`/`quote` est supprimé — 0 document existant, aucune migration). Garder l'import existant de `localizedImage` (même chemin que l'actuel).

```ts
import { defineType, defineField } from 'sanity'
import { localizedImage } from '../../lib/i18n'

export const creatricePage = defineType({
  name: 'creatricePage',
  title: 'Page Créatrice',
  type: 'document',
  fields: [
    defineField({
      name: 'introTitle',
      title: 'Titre',
      type: 'localizedString',
      description: 'Grand titre en haut de page, ex. « Moi c’est Emeline. ».',
    }),
    defineField({
      name: 'introLede',
      title: 'Phrase d’introduction',
      type: 'localizedText',
      description: 'Courte phrase en italique sous le titre.',
    }),
    localizedImage({ name: 'portrait', title: 'Portrait d’Emeline' }),
    defineField({
      name: 'captionName',
      title: 'Légende — nom',
      type: 'string',
      description: 'Affiché sous le portrait, ex. « Emeline Le Ray ».',
    }),
    defineField({
      name: 'captionPlace',
      title: 'Légende — lieu · année',
      type: 'string',
      description: 'Après le point, ex. « Bordeaux · MMXXV ».',
    }),
    defineField({
      name: 'parcours',
      title: 'Parcours (paragraphes)',
      type: 'array',
      description: 'Le récit du parcours. Un paragraphe par élément ; le premier reçoit la lettrine.',
      of: [{ type: 'localizedText' }],
    }),
    defineField({
      name: 'philosophieBody',
      title: 'Philosophie (paragraphe)',
      type: 'localizedText',
      description: 'Paragraphe après le séparateur, sur l’approche et les valeurs.',
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'localizedText',
      description: 'Citation en exergue, mise en avant au centre.',
    }),
    defineField({
      name: 'signatureName',
      title: 'Signature — prénom',
      type: 'string',
      description: 'Grand prénom en clôture, ex. « Emeline ».',
    }),
    defineField({
      name: 'signatureRole',
      title: 'Signature — rôle',
      type: 'localizedString',
      description: 'Sous la signature, ex. « Créatrice & joaillière · Précieuse ».',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Page Créatrice' }),
  },
})
```

- [ ] **Step 2 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected: exit 0. (Le schéma est autonome ; `getCreatrice` sera aligné en Task 3.)

- [ ] **Step 3 : Commit**

```bash
git add sanity/schemaTypes/documents/creatricePage.ts
git commit -m "feat(creatrice): schema creatricePage aligne sur le design lettre"
```

---

## Task 3 : Nouveau modèle de contenu (type + getCreatrice + CreatriceCms)

Ces trois éléments partagent le contrat `CreatriceContent` : on les change ensemble pour garder `tsc` vert.

**Files:**
- Modify: `src/lib/cms/content.ts` (type `CreatriceContent` ~ligne 507 + `getCreatrice` ~lignes 521-561)
- Modify: `src/components/creatrice/CreatriceCms.tsx` (réécriture complète)

**Interfaces:**
- Produces: `type CreatriceContent = { introTitle: string; introLede: string; portrait: { url: string; alt: string; position: string | undefined }; captionName: string; captionPlace: string; parcours: string[]; philosophieBody: string; quote: string; signatureName: string; signatureRole: string }` ; `getCreatrice(locale?): Promise<CreatriceContent | null>`.
- Consumes: `pickLocale`, `hotspotToPosition`, `cmsFetch`, `isSanityConfigured`, `DEFAULT_LOCALE`, `Locale` (déjà dans `content.ts`) ; `Filigrane`/`Seal` (Task 1) ; `EditorialHeader`, `ClosingInvite`, `BRAND_PICTO_MASK`, `maskStyle`, `m` (Paraglide).

- [ ] **Step 1 : Dans `content.ts`, remplacer le type `CreatriceContent`** par :

```ts
export type CreatriceContent = {
  introTitle: string
  introLede: string
  portrait: { url: string; alt: string; position: string | undefined }
  captionName: string
  captionPlace: string
  parcours: string[]
  philosophieBody: string
  quote: string
  signatureName: string
  signatureRole: string
}
```

- [ ] **Step 2 : Dans `content.ts`, remplacer entièrement `getCreatrice`** par :

```ts
export async function getCreatrice(
  locale: Locale = DEFAULT_LOCALE,
): Promise<CreatriceContent | null> {
  if (!isSanityConfigured) return null
  const data = await cmsFetch<Record<string, unknown> | null>(
    `*[_type == "creatricePage"][0]{
      introTitle, introLede,
      "portrait": portrait.asset->url, "portraitAlt": portrait.alt, "portraitHotspot": portrait.hotspot,
      captionName, captionPlace,
      parcours, philosophieBody, quote,
      signatureName, signatureRole
    }`,
  )
  if (!data) return null
  return {
    introTitle: pickLocale(data.introTitle as never, locale),
    introLede: pickLocale(data.introLede as never, locale),
    portrait: {
      url: String(data.portrait ?? ''),
      alt: pickLocale(data.portraitAlt as never, locale),
      position: hotspotToPosition(data.portraitHotspot),
    },
    captionName: String(data.captionName ?? ''),
    captionPlace: String(data.captionPlace ?? ''),
    parcours: ((data.parcours as Array<unknown> | undefined) ?? [])
      .map((p) => pickLocale(p as never, locale))
      .filter(Boolean),
    philosophieBody: pickLocale(data.philosophieBody as never, locale),
    quote: pickLocale(data.quote as never, locale),
    signatureName: String(data.signatureName ?? ''),
    signatureRole: pickLocale(data.signatureRole as never, locale),
  }
}
```

- [ ] **Step 3 : Remplacer entièrement `src/components/creatrice/CreatriceCms.tsx`** (port pixel-identique du statique, alimenté par `content`) :

```tsx
import { m } from '#/paraglide/messages'
import type { CreatriceContent } from '../../lib/cms'
import { EditorialHeader } from '../editorial/EditorialHeader'
import { ClosingInvite } from '../ClosingInvite'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { Filigrane, Seal } from './ornements'

/**
 * Page Créatrice pilotée par Sanity (document `creatricePage`). Rend EXACTEMENT
 * le même design « lettre signée » que `CreatriceStatic` (le repli), mais depuis
 * le document d'Emeline. Toute divergence visuelle est un bug (cf. spec parité).
 */
export function CreatriceCms({ content }: { content: CreatriceContent }) {
  return (
    <>
      <EditorialHeader title={content.introTitle}>
        {content.introLede ? (
          <p className="mx-auto max-w-[54ch] font-body italic font-light text-[clamp(14px,1.4vw,17px)] leading-[1.5] text-canard-90 [text-wrap:pretty]">
            {content.introLede}
          </p>
        ) : null}
      </EditorialHeader>

      <section className="overflow-hidden bg-poudre px-8 pb-6 pt-3 lg:px-16 lg:pt-4">
        <div className="mx-auto max-w-[680px]">
          {/* Portrait encadré + légende, avec filigranes de marque dans les marges. */}
          <figure className="relative mb-12 flex flex-col items-center">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 lg:block"
              style={{ width: 360, height: 360, marginLeft: -560, opacity: 0.07, ...maskStyle(BRAND_PICTO_MASK, 'var(--canard)') }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 -scale-x-100 lg:block"
              style={{ width: 360, height: 360, marginLeft: 200, opacity: 0.07, ...maskStyle(BRAND_PICTO_MASK, 'var(--canard)') }}
            />
            {content.portrait.url ? (
              <div className="relative aspect-[3/4] w-[240px] max-w-[64vw] overflow-hidden border border-canard/30">
                <img
                  src={content.portrait.url}
                  alt={content.portrait.alt}
                  style={{ objectPosition: content.portrait.position }}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : null}
            <figcaption className="mt-3 flex items-baseline gap-3.5 font-display text-[12px] uppercase tracking-[0.22em]">
              <span className="text-canard/75">{content.captionName}</span>
              <span className="text-framboise">·</span>
              <span className="text-canard">{content.captionPlace}</span>
            </figcaption>
          </figure>

          {/* Corps de lettre — lettrine sur le premier paragraphe. */}
          {content.parcours.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'font-display text-[18px] leading-[1.95] text-canard/85 first-letter:float-left first-letter:pr-3 first-letter:pt-2 first-letter:font-headline first-letter:text-[56px] first-letter:leading-[0.7] first-letter:text-framboise'
                  : 'mt-5 font-display text-[18px] leading-[1.95] text-canard/85'
              }
            >
              {p}
            </p>
          ))}

          <Filigrane />

          {content.philosophieBody ? (
            <p className="font-display text-[18px] leading-[1.95] text-canard/85">
              {content.philosophieBody}
            </p>
          ) : null}

          {content.quote ? (
            <blockquote className="relative mx-auto my-14 max-w-[560px] text-center">
              <span aria-hidden className="mx-auto mb-6 block h-0.5 w-16 bg-framboise" />
              <p className="font-display italic text-[clamp(23px,3.2vw,31px)] leading-[1.45] text-canard">
                {content.quote}
              </p>
            </blockquote>
          ) : null}

          {/* Clôture : cachet + signature. */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-canard/15 pt-8">
            <Seal />
            <div className="text-center">
              <div className="font-headline italic text-[44px] leading-none text-canard">
                {content.signatureName}
              </div>
              <div className="mt-2.5 font-display text-[12px] uppercase tracking-[0.24em] text-canard/55">
                {content.signatureRole}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingInvite title={m.creatrice_cta_title()} cta={m.creatrice_cta_button()} />
    </>
  )
}
```

- [ ] **Step 4 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected: exit 0 (le type, le getter et le composant sont cohérents ; la page rend encore `CreatriceStatic` tant qu'aucun doc n'existe).

- [ ] **Step 5 : Commit**

```bash
git add src/lib/cms/content.ts src/components/creatrice/CreatriceCms.tsx
git commit -m "feat(creatrice): rendu CMS pixel-identique au statique + getCreatrice"
```

---

## Task 4 : Seed du document + vérification de parité

**Files:**
- Create: `scripts/seed-creatrice.ts`

**Interfaces:**
- Consumes: `@sanity/client`, `.env` (`VITE_SANITY_PROJECT_ID`, `SANITY_WRITE_TOKEN`), `messages/{fr,en,pt}.json`, `public/images/emeline-portrait.jpg`.
- Produces: document Sanity publié `_id: 'creatricePage'` conforme au schéma Task 2.

- [ ] **Step 1 : Créer `scripts/seed-creatrice.ts`**

```ts
/**
 * Seed du singleton `creatricePage` (page Créatrice) depuis la version statique
 * (Paraglide FR/EN/PT + littéraux). Idempotent : createOrReplace sur un _id
 * déterministe. Publié (pas de brouillon) → la page devient pilotée par Sanity.
 *
 * Lancer : node_modules/.bin/tsx scripts/seed-creatrice.ts
 * Requiert dans .env : VITE_SANITY_PROJECT_ID, SANITY_WRITE_TOKEN (rôle Editor).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

try {
  ;(process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile('.env')
} catch {
  /* déjà chargé via --env-file */
}

const projectId = process.env.VITE_SANITY_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-05-01'

if (!projectId || !token) {
  console.error('❌ VITE_SANITY_PROJECT_ID et/ou SANITY_WRITE_TOKEN manquant(s)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const FR = JSON.parse(readFileSync('messages/fr.json', 'utf8')) as Record<string, string>
const EN = JSON.parse(readFileSync('messages/en.json', 'utf8')) as Record<string, string>
const PT = JSON.parse(readFileSync('messages/pt.json', 'utf8')) as Record<string, string>

/** localizedString/Text depuis une clé Paraglide (FR + EN/PT si présents). */
function L(key: string, type: 'localizedString' | 'localizedText' = 'localizedString') {
  return {
    _type: type,
    fr: FR[key] ?? '',
    ...(EN[key] ? { en: EN[key] } : {}),
    ...(PT[key] ? { pt: PT[key] } : {}),
  }
}
/** Membre de tableau localizedText avec _key (requis par Sanity). */
function Lk(key: string, arrayKey: string) {
  return { _key: arrayKey, ...L(key, 'localizedText') }
}

async function main() {
  const asset = await client.assets.upload(
    'image',
    readFileSync(join('public', 'images/emeline-portrait.jpg')),
    { filename: 'emeline-portrait.jpg' },
  )

  await client.createOrReplace({
    _id: 'creatricePage',
    _type: 'creatricePage',
    introTitle: L('creatrice_intro_title'),
    introLede: L('creatrice_intro_lede', 'localizedText'),
    portrait: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: L('creatrice_intro_portrait_alt'),
    },
    captionName: 'Emeline Le Ray',
    captionPlace: 'Bordeaux · MMXXV',
    parcours: [Lk('creatrice_parcours_p1', 'p1'), Lk('creatrice_parcours_p2', 'p2')],
    philosophieBody: L('creatrice_philosophie_body', 'localizedText'),
    quote: L('creatrice_philosophie_quote', 'localizedText'),
    signatureName: 'Emeline',
    signatureRole: L('creatrice_signature_role'),
  })

  console.log('✅ creatricePage seedé (publié)')
}

main().catch((e) => {
  console.error('Erreur seed:', e.message)
  process.exit(1)
})
```

- [ ] **Step 2 : Type check du script**

Run: `pnpm exec tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3 : Exécuter le seed**

Run: `node_modules/.bin/tsx scripts/seed-creatrice.ts`
Expected: sortie `✅ creatricePage seedé (publié)`, exit 0.

- [ ] **Step 4 : Vérifier que Sanity pilote bien la page (SSR)**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/creatrice`
Expected: `200`. Puis, dans le navigateur Playwright, naviguer vers `http://localhost:3000/creatrice` (chargement frais = SSR → `getCreatrice` interroge Sanity), attendre la fin du splash.

- [ ] **Step 5 : Parité pixel** — screenshot plein écran `creatrice-sanity.jpeg`. Comparer à `creatrice-baseline.jpeg` (Task 1, Step 4) : ils doivent être **identiques** (titre, intro, portrait + filigranes, légende « Emeline Le Ray · Bordeaux · MMXXV », lettrine, filigrane séparateur, philosophie, citation, cachet, signature « Emeline », CTA). Vérifier aussi la **console : 0 erreur**. Si un écart existe → corriger `CreatriceCms.tsx` jusqu'à parité, puis re-screenshot.

- [ ] **Step 6 : Commit**

```bash
git add scripts/seed-creatrice.ts
git commit -m "feat(creatrice): script de seed du singleton creatricePage (publie)"
```

---

## Task 5 : Verrou singleton dans le Studio

**Files:**
- Modify: `src/components/studio/structure.ts`

**Interfaces:**
- Consumes: helper `singleton(S, id, title, icon)` déjà présent dans `structure.ts` ; `UserIcon` (déjà importé).

- [ ] **Step 1 : Dans `structure.ts`, remplacer l'entrée `creatricePage`** (aujourd'hui `S.documentTypeListItem('creatricePage')...` avec le commentaire « pas encore seedée ») par l'éditeur mono-document, et **supprimer le commentaire de report** :

```ts
      singleton(S, 'creatricePage', 'Page Créatrice (À propos)', UserIcon),
```

(Placé au même endroit dans la section « Pages », entre `surMesurePage` et `contact`.)

- [ ] **Step 2 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected: exit 0.

- [ ] **Step 3 : Vérification Studio (Playwright)** — naviguer vers `http://localhost:3000/studio/structure/creatricePage`, attendre le chargement. Attendu : l'**éditeur du document s'ouvre directement, rempli** (titre « Moi c’est Emeline. », portrait, paragraphes…), statut « Publié » ; **plus** de volet-liste ni de bouton « + Créer ». Ouvrir le menu « + Créer » global : `creatricePage` **absent** (déjà garanti par `SINGLETON_TYPES`).

- [ ] **Step 4 : Commit**

```bash
git add src/components/studio/structure.ts
git commit -m "feat(studio): page Creatrice verrouillee en editeur mono-document"
```

---

## Vérification finale (tranche complète)

- [ ] `pnpm exec tsc --noEmit` → exit 0.
- [ ] `/creatrice` (public) : parité pixel avec la baseline, 0 erreur console.
- [ ] `/studio/structure/creatricePage` : éditeur rempli, pas de bouton créer.
- [ ] `/` et `/sur-mesure` : toujours 200, chrome intact (non-régression).
- [ ] Nettoyer les screenshots de vérif (`creatrice-baseline.jpeg`, `creatrice-sanity.jpeg`, dossier `.playwright-mcp`).
- [ ] Mettre à jour la mémoire `[[sanity-editabilite]]` : `creatricePage` n'est plus un trou (seedé + éditable + verrouillé) ; retirer le PIÈGE devenu caduc.

## Rollback

Supprimer le document `creatricePage` (Studio → une fois déverrouillé, ou script `client.delete('creatricePage')`) ⇒ `getCreatrice()` renvoie `null` ⇒ `CreatriceStatic` reprend la main. Aucune perte (repli et seed partagent la source Paraglide).
