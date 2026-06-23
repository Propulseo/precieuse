# Refonte Précieuse — état (branche `claude/refonte-bordeaux`)

Refonte du site **Précieuse** (joaillerie artisanale, **Bordeaux**) portée sur ce projet
(TanStack Start + Vite + Convex + better-auth + Sanity + Paraglide FR/EN/PT).
Toute la refonte vit sur **`claude/refonte-bordeaux`**. `main` = ancienne version (Lisbonne).

## ✅ Fait (commits sur la branche)
- **Pivot Bordeaux + retours cliente** : 18 carats (ex 19), « **Sur devis** » (aucun prix),
  « **Atelier** » (ex « Maison »), « **Emeline** » sans accent (marque « Précieuse » gardée),
  matières (or **sourcé et tracé · traité de Kimberley**, certifs **GIA/HRD**), témoignages Bordeaux,
  anglicismes retirés. (Le contenu était encore Lisbonne/Portugal.)
- **Assets réels** : 17 photos `.webp` dans `public/images/real/`, logos dans `public/brand/`,
  favicon picto `public/picto.png`. Contenu (`src/lib/content/*`) remappé sur les vraies photos.
- **Carousel « La Collection »** (`src/components/Series.tsx`) : refait en index
  (flèches/swipe/clavier, cyclique) — **scroll-jacking supprimé** (réglait sauts/blocages).
- **Fondation Sanity** : `sanity/` (12 schémas i18n FR/EN/PT) + data-layer `src/lib/cms/`
  avec **fallback statique** (rend `src/lib/content/*` tant que `VITE_SANITY_PROJECT_ID` absent).
  Routes `collection` + `collection.$slug` câblées via getters. Studio standalone
  (`sanity.config.ts` → `npx sanity dev`) ; **embed différé**.
- **Toggle marque** (pastille bas-gauche, `src/components/brand/`) : **5 teintes**
  (canard `#125e5e`, blush `#b97e72`, or `#b08d57`, lie-de-vin `#7a2e3e`, nuit `#2f3e4d`)
  pilotant `--brand-accent` (→ `--canard` site-wide) + switch **Logo / Texte** pour la hero.
  Persistance localStorage + script anti-flash.
- **Hero** (`src/components/hero-variants/HeroSplitSezane.tsx`) : logo en **masque CSS** coloré
  par `--brand-accent` (ou texte « Précieuse. » selon le switch), contenu **centré**,
  2 boutons **largeur égale**, accroche « Joaillerie artisanale · Bordeaux » qui suit la couleur.

## ⏭️ À faire
- **SEO** (Phase 5) : title/meta par page, `sitemap`, `robots`, JSON-LD (JewelryStore + Product) ; drafts EN/PT.
- Décision **« La vôtre. »** (sous-titre hero, figé `text-lie-de-vin`) : suivre la couleur du toggle, ou non.
- **Portrait d'Emeline** : absent du kit → placeholders (`/images/emeline-portrait.jpg`,
  `/images/emeline/emeline-atelier.jpg`). Fournir une vraie photo.
- Photos **saphir / émeraude** : substituts « pierre de couleur » (pas de photo dédiée).
- Quand le **projet Sanity** existe : définir `VITE_SANITY_PROJECT_ID` / `DATASET` / `API_VERSION`,
  installer `sanity @sanity/vision`, seed + upload images, basculer le CMS en live.
- `src/lib/sanity.ts` (client *eager*) throw si `projectId` vide côté serveur → préférer
  `src/lib/cms/client.ts` (guardé).

## Conventions
- **`pnpm build` doit rester vert** — la branche **auto-déploie** en preview Vercel (projet `precieuse`).
- Pousser sur **`claude/refonte-bordeaux`**, **jamais `main`** directement (passer par une PR).
- Le site rend en **mode statique** sans Convex/Sanity (fallbacks en place).
- Lancer : `pnpm install` puis `pnpm dev` → http://localhost:3000.
