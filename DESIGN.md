# Design

Système visuel de Precieuse (joaillerie artisanale). Capté depuis le code réel
(`src/styles.css`, composants). Registre **brand** / éditorial premium.

## Theme

Clair, chaud, éditorial. Fond poudre (beige rosé) + encre canard (vert sarcelle
profond), accent framboise. Calme et respiration ; une seule audace par page.
Stratégie couleur : **restrained** (neutres teintés + accent ≤ ~10 %), avec des
blocs ponctuels en canard plein (façon magazine) pour rythmer.

## Color

Source unique : `src/styles.css` (`@theme`, variables `--*`). Accent de marque
pilotable via `data-brand` / toggle dev (3 couleurs : principale/secondaire/
tertiaire).

**Rôles (charte 3 couleurs)**
- **Principale — Canard** `#125e5e` (`--canard`, encre/UI/titres/logos). Variantes
  `--canard-90` `#0d4747` (hover/fort), `--canard-10` `#e6eded` (fonds muted).
- **Secondaire — Poudre** `#eadcd3` (`--poudre`, fond chaud). `--poudre-dark`
  `#d9c7b8` (bordures).
- **Tertiaire — Rubis** `#b80049` (`--framboise` — le token garde son nom, valeur
  rubis depuis 2026-06-29 ; ex-framboise `#bb4e7c` abandonné, contraste trop faible
  en petit texte ; rubis passe l'AA ~5:1 sur poudre). Accent : eyebrows, mots
  d'accent, liens/hovers, détails. Alias historiques `--rouille` / `--lie-de-vin`
  → framboise. `--violet` → `--prune`.

**Palette florale secondaire** (touches douces, disciplinées par rôle ; jamais
tout en même temps) : `--prune` `#72106b` (accent profond lisible), `--rose`
`#d07992`, `--corail` `#f98688`, `--peche` `#fbbb8b` (filets, cachet, fonds
teintés). Faible contraste sur poudre → réserver aux détails, pas au petit texte.

**Fonctionnel (hors palette de marque)** : `--alerte` `#c0392b` (erreurs de
formulaire uniquement).

**Contraste** : corps en canard (≥ 4.5:1 sur poudre). L'or a été abandonné car
trop faible sur poudre. Framboise OK en accent/gros texte, pas en corps.

## Typography

Source : Google Fonts (`src/styles.css`). Paire sur axe de contraste serif + sans.

- **Display / titres — Spectral** (serif, 500). Tokens : `font-display`,
  `font-headline` (line-height serré ~0.95), `font-display-lg/xl`,
  `font-headline-md`.
- **Corps — Ysabeau Office** (sans humaniste, **300** ; italique 300 pour les
  sous-titres/annotations). Tokens : `font-body`, `font-body-lg`, `font-script-*`.
- **Utilitaires** : `font-technical` (10px, capitales, tracking 0.4em),
  `font-subheading` (12px capitales).

**Échelle de titres** (base `h1/h2/h3` dans `@layer base`, responsive) :
- H1 `clamp(40px,6vw,76px)`, tracking -0.01em
- H2 `clamp(30px,4.2vw,50px)`, tracking -0.01em
- H3 `clamp(20px,2.4vw,28px)`, tracking 0
Plafond display ≤ ~6rem. Couleur titres = canard ; accent framboise sur eyebrows
et mots-clés. Corps 65–75ch.

## Components

- **Nav** (`src/components/Nav.tsx`) : barre fixe, 3 zones (logo gauche · liens
  centrés · CTA Sur-mesure + menu langue + burger). Transparente sur le hero
  home, opaque ailleurs. Langue = dropdown épuré (desktop) / dans le burger
  (mobile).
- **Logos** (masques CSS, suivent `--brand-accent`) : wordmark « Précieuse »
  (`BRAND_WORDMARK_MASK`), lockup fleur+texte (`BRAND_LOCKUP_MASK`), pictogramme
  fleur carré (`BRAND_PICTO_MASK`) — via `maskStyle()` (`src/components/brand/brand.ts`).
- **Boutons** : plein `bg-canard text-poudre` (hover `bg-canard-90`) ; outline
  `border-canard/40` (inverse au hover). Tracking 0.15–0.3em, capitales.
- **Cartes produit / article** : photo plein cadre + bloc texte ; éviter les
  grilles de cartes identiques et les cartes imbriquées.
- **Ornements** (`src/components/ornaments.tsx`) : `BrilliantCutScheme` (diamant),
  `ArtDecoFrieze`, filigranes — en filets framboise.
- **Toggle dev** (`BrandToggle`, dev only) : 3 sélecteurs couleur + variantes
  hero/cachet/filigrane/carousel.

## Layout

- Conteneur max `~1440px` (`max-w-[1440px]`), gouttières `px-8 lg:px-16`.
- Sections compactes : paddings verticaux resserrés (`py-8/10/14`), pas de
  filets pleine largeur entre sections (transitions douces, fond poudre continu).
- Flexbox 1D / Grid 2D. Grilles responsives sans breakpoints :
  `repeat(auto-fit, minmax(280px,1fr))` quand pertinent.
- Mobile prioritaire (LCP < 2.5s) : images optimisées (webp), lazy, focal point
  via `objectPositionStyle` (hotspot Sanity).

## Motion

- Transitions sobres, ease-out (durées 300–700ms). Hover : `scale-[1.03]` sur
  images, glissement de flèche sur les CTA.
- Révélations au scroll (`Reveal`, IntersectionObserver) — sur un défaut déjà
  visible, jamais bloquantes.
- **`prefers-reduced-motion` respecté** : repli fondu/instantané.
- Pas de bounce/elastic, pas d'animation de propriétés de layout.
