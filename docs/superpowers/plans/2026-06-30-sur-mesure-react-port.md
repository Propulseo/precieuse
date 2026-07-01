# Port React — Page Sur-mesure (depuis la maquette HTML)

> **Pour exécutant agentique :** SOUS-SKILL REQUISE : superpowers:subagent-driven-development (recommandé) ou superpowers:executing-plans, tâche par tâche. Étapes en cases à cocher (`- [ ]`).

**Goal :** porter la maquette validée [public/previews/sur-mesure.html](public/previews/sur-mesure.html) en vraie page React sur la route `/sur-mesure` (TanStack Start), traduite FR/EN/PT, branchée sur le Nav/Footer/ContactDrawer **globaux** du shell.

**Architecture :** la route compose des sous-composants `src/components/sur-mesure/` (un par section), copie éditoriale en clés Paraglide (`sm_*`), données répétées (étapes, pièces, voix) dans `src/lib/content/bespoke.ts`. Nav/Footer/ContactDrawer viennent déjà de `__root.tsx` → **on ne les remet PAS dans la page** (la maquette les inclut car elle est autonome). Les 5 anciens composants `sur-mesure/` + leurs loaders CMS sont remplacés.

**Tech stack :** React 19, TanStack Start, Tailwind v4 (tokens `canard`/`poudre`/`framboise` — le `--rubis` de la maquette = **`framboise`**), Paraglide i18n, composants existants `Reveal`/`Eyebrow`, `useContactDrawer`.

## Global Constraints

- **TypeScript strict, jamais `any`.** Imports projet relatifs courts (style des fichiers voisins), pas de `../../../`.
- **Tokens couleur** : maquette `--canard`→`canard`, `--poudre`→`poudre`, `--poudre-dark`→`poudre-dark`, `--rubis`→**`framboise`**. Fonts : `font-display` (Spectral) titres, police body (Ysabeau) corps. `font-headline` est utilisé ailleurs pour les gros titres — vérifier lequel rend le mieux et rester cohérent avec `Etabli.tsx`/`index.tsx`.
- **Tout texte user-facing traduit FR/EN/PT** (3 fichiers `messages/*.json`, mêmes clés). Les `alt` d'images peuvent rester FR dans `bespoke.ts` (convention existante `etabli.ts`).
- **Ne PAS toucher** `src/styles.css`, `brand*`, ni le `Nav` au-delà de la Task 11 (chantier couleurs en parallèle — cf. mémoire). Les keyframes (`marquee`, `spin`) vont dans un `<style>` scoped au composant, pas dans `styles.css`.
- **Max ~200 lignes/fichier** → un composant par section.
- **Perf** : hero = LCP, `fetchpriority="high"` sur la photo, `poster` sur la vidéo, reste `loading="lazy"`. `min-h-[100dvh]` jamais `h-screen`. `prefers-reduced-motion` : vidéo hero masquée, marquee figée, badge/spin stoppés.
- **Zéro em-dash/en-dash** dans la copie (hyphen `-` seul) ; point médian `·` rationné.
- **CTA contact** → ouvrent le **ContactDrawer** global (`useContactDrawer().open`), jamais un lien vers une page contact.
- **Vérification** (pas de suite de tests → TDD non requis) : chaque tâche finit par `pnpm exec tsc --noEmit` **et** `pnpm lint` au vert (mon code ; le bruit `src/paraglide/` généré est pré-existant). Runtime = l'utilisateur (pas de Playwright).
- **Référence visuelle = la maquette** : pour chaque section, traduire le CSS de `sur-mesure.html` en classes Tailwind à l'identique (espacements, tailles, ratios, hovers).

## ⚠️ À valider avant prod (hors blocage du port)

- **Pictos d'étapes** (`/images/process/etape-*.svg`) : retravaillés pour ne pas être un copier-coller de CustomMade (confirmé par le pilote). Garder un œil dessus avant mise en ligne publique.
- **Selects budget / fourchettes** : pas de formulaire dans cette page (→ ContactDrawer), donc non concerné ici.

---

## File Structure

**Créés :**
- `src/lib/content/bespoke.ts` — données structurées : `BESPOKE_STEPS` (svg + clés titre/corps), `BESPOKE_PIECES` (2 images + alt + clés nom/matière), `BESPOKE_VOICES` (initiale + clés citation/nom + ville), `BESPOKE_MARQUEE` (clés items).
- `src/components/sur-mesure/BespokeHero.tsx` — héro split vidéo|photo.
- `src/components/sur-mesure/BespokeMarquee.tsx` — bande défilante (keyframes scoped).
- `src/components/sur-mesure/BespokeAtelier.tsx` — section Emeline + galerie + badge tournant.
- `src/components/sur-mesure/BespokeProcess.tsx` — frise 4 étapes + manifeste.
- `src/components/sur-mesure/BespokeSplit.tsx` — « Du croquis à la promesse ».
- `src/components/sur-mesure/BespokeRealisations.tsx` — 3 duos atelier/portée.
- `src/components/sur-mesure/BespokeVoices.tsx` — 3 témoignages.

**Modifiés :**
- `src/routes/sur-mesure.tsx` — recompose la page avec les nouveaux composants.
- `messages/fr.json`, `messages/en.json`, `messages/pt.json` — clés `sm_*`.
- `src/components/Nav.tsx` — (Task 11, optionnelle/flaggée) mode transparent au-dessus du héro sur `/sur-mesure`.

**Supprimés (anciens, remplacés) :**
- `src/components/sur-mesure/HeroBespoke.tsx`, `Metamorphose.tsx`, `Promesses.tsx`, `HistoireSandrine.tsx`, `FormulaireInvitation.tsx`.
- Loaders CMS devenus inutiles (`getMetamorphose`, `getPromesses`) **si** non utilisés ailleurs (à vérifier par grep) + clés `bespoke_*`/`surmesure_*` orphelines.

**Assets (présents, à committer) :** `public/images/process/etape-1..4.svg`, `public/images/video/ring-box.mp4`. Les `public/images/real/*.webp` référencés existent déjà.

**Ordre de la page (maquette actuelle, après permutation) :** Hero → Marquee → Atelier → Process → Split → Réalisations → Voices.

---

## Décisions actées (pilote, 2026-06-30)

1. **Nav transparent au-dessus du héro** ✅ → héro plein cadre via `-mt-16` **+** Task 11 (extension du Nav) **obligatoire**. À coordonner avec le chantier couleurs.
2. **i18n** : nouvelles clés `sm_*` ; **nettoyer** les `bespoke_*`/`surmesure_*` orphelines (Task 13).
3. **Garder un loader CMS** ✅ → la page conserve un `loader` qui alimente les contenus **pilotables par Emeline** depuis Sanity, avec **repli statique** `bespoke.ts`. Cibles naturelles : **témoignages (voix)** et **réalisations (pièces)** (déjà dans le périmètre Sanity du projet). Les getters exacts (réutiliser/mapper `getTestimonials`/produits, ou nouveaux) sont à confirmer au démarrage de la Task 12 ; en conséquence, `BespokeVoices`/`BespokeRealisations` prennent leurs données **en props** (CMS → fallback), et `bespoke.ts` sert de repli.

---

### Task 1 : Committer les assets de la maquette

**Files :** `public/images/process/etape-1..4.svg`, `public/images/video/ring-box.mp4`

- [ ] **Step 1 : Vérifier suivi git**

Run : `git status --short public/images/process public/images/video`
Expected : fichiers non suivis (`??`).

- [ ] **Step 2 : Committer**

```bash
git add public/images/process/etape-1.svg public/images/process/etape-2.svg public/images/process/etape-3.svg public/images/process/etape-4.svg public/images/video/ring-box.mp4
git commit -m "chore(sur-mesure): assets page (pictos étapes, vidéo héro)"
```

> Ne PAS committer `hero-dessin-bijoux.mp4` (alternative non utilisée) ni `v2-video3.jpeg` / autres bruts hors périmètre.

---

### Task 2 : Données structurées `bespoke.ts`

**Files :** Create `src/lib/content/bespoke.ts`

**Interfaces :**
- Produces : `BESPOKE_STEPS: BespokeStep[]`, `BESPOKE_PIECES: BespokePiece[]`, `BESPOKE_VOICES: BespokeVoice[]`, `BESPOKE_MARQUEE: string[]` (clés de message), + types exportés.

- [ ] **Step 1 : Écrire le fichier**

```ts
// Données structurées de la page Sur-mesure. Les libellés user-facing sont des
// CLÉS Paraglide (résolues au rendu via m[key]()) ; seuls les alt restent FR
// (convention etabli.ts).

export type BespokeStep = { svg: string; titleKey: string; bodyKey: string }
export const BESPOKE_STEPS: BespokeStep[] = [
  { svg: '/images/process/etape-1.svg', titleKey: 'sm_step1_title', bodyKey: 'sm_step1_body' },
  { svg: '/images/process/etape-2.svg', titleKey: 'sm_step2_title', bodyKey: 'sm_step2_body' },
  { svg: '/images/process/etape-3.svg', titleKey: 'sm_step3_title', bodyKey: 'sm_step3_body' },
  { svg: '/images/process/etape-4.svg', titleKey: 'sm_step4_title', bodyKey: 'sm_step4_body' },
]

export type BespokePiece = {
  atelierSrc: string; atelierAlt: string
  porteeSrc: string; porteeAlt: string
  name: string; matKey: string
}
export const BESPOKE_PIECES: BespokePiece[] = [
  { atelierSrc: '/images/real/bague-entouree-josephine.webp', atelierAlt: "Bague Joséphine photographiée à l'atelier",
    porteeSrc: '/images/real/main-chaise-josephine.webp', porteeAlt: 'Bague Joséphine portée, main posée sur une chaise',
    name: 'Joséphine', matKey: 'sm_real_mat_josephine' },
  { atelierSrc: '/images/real/bague-pierre-aurore.webp', atelierAlt: "Bague Aurore photographiée à l'atelier",
    porteeSrc: '/images/real/bague-main-chaise-aurore.webp', porteeAlt: 'Bague Aurore portée, main posée sur une chaise',
    name: 'Aurore', matKey: 'sm_real_mat_aurore' },
  { atelierSrc: '/images/real/bague-boule-thelma.webp', atelierAlt: "Bague Thelma photographiée à l'atelier",
    porteeSrc: '/images/real/mains-poche-thelma.webp', porteeAlt: 'Bague Thelma portée, mains glissées dans les poches',
    name: 'Thelma', matKey: 'sm_real_mat_thelma' },
]

export type BespokeVoice = { initial: string; quoteKey: string; name: string; city: string }
export const BESPOKE_VOICES: BespokeVoice[] = [
  { initial: 'M', quoteKey: 'sm_voice1_quote', name: 'Martine B.', city: 'Bordeaux' },
  { initial: 'S', quoteKey: 'sm_voice2_quote', name: 'Sandrine L.', city: 'Lyon' },
  { initial: 'C', quoteKey: 'sm_voice3_quote', name: 'Camille R.', city: 'Paris' },
]

export const BESPOKE_MARQUEE = [
  'sm_marquee_1', 'sm_marquee_2', 'sm_marquee_3', 'sm_marquee_4', 'sm_marquee_5',
] as const
```

> Accès message dynamique par clé : `import { m } from '#/paraglide/messages'` puis `(m as Record<string, () => string>)[step.titleKey]()`. Garder ce cast typé `Record<string, () => string>` (jamais `any`).

- [ ] **Step 2 : tsc + lint** → `pnpm exec tsc --noEmit && pnpm lint`. Expected : vert.
- [ ] **Step 3 : Commit** → `feat(sur-mesure): données structurées (étapes, pièces, voix)`

---

### Task 3 : Clés i18n `sm_*` (FR/EN/PT)

**Files :** Modify `messages/fr.json`, `messages/en.json`, `messages/pt.json`

Ajouter les mêmes clés dans les 3 fichiers. **FR = source (copie de la maquette, verbatim)** ; produire EN/PT en traduction fidèle au ton (sobre, premium), zéro em-dash.

- [ ] **Step 1 : FR — valeurs (verbatim maquette)**

```json
"sm_hero_kicker": "Création sur-mesure · Bordeaux",
"sm_hero_title": "Votre bijou n'existe",
"sm_hero_title_accent": "pas encore.",
"sm_hero_sub": "Une pièce dessinée avec vous, coulée à la main à Bordeaux, faite pour traverser le temps.",
"sm_hero_cta": "Commencer votre projet",
"sm_hero_photo_alt": "Bague Précieuse en or 18 carats portée à la main",
"sm_marquee_1": "Introuvable en boutique",
"sm_marquee_2": "Or 18 carats tracé",
"sm_marquee_3": "Satisfaction garantie",
"sm_marquee_4": "Croquis à la main",
"sm_marquee_5": "Fait main à Bordeaux",
"sm_about_title_lead": "Créatrice. Joaillière.",
"sm_about_title_accent": "Un peu",
"sm_about_title_tail": "lectrice de pensées.",
"sm_about_body": "Derrière chaque pièce, une approche profondément humaine et des mains expertes. Emeline écoute, dessine, façonne. Tout est fabriqué en France, dans son atelier bordelais, où elle coule l'or 18 carats à la cire perdue.",
"sm_about_link": "Rencontrer Emeline",
"sm_about_badge": "Précieuse · Atelier · Bordeaux · ",
"sm_step1_title": "Exploration du style",
"sm_step1_body": "On parle de vous, de l'occasion, de ce qui vous fait vibrer.",
"sm_step2_title": "Croquis & dessin",
"sm_step2_body": "Deux ou trois esquisses à la main, affinées ensemble.",
"sm_step3_title": "Détails, peaufinés",
"sm_step3_body": "Pierre, volumes, finitions : chaque détail validé avec vous.",
"sm_step4_title": "Façonnage du bijou",
"sm_step4_body": "Cire perdue, or 18 carats, sertissage à la main, à Bordeaux.",
"sm_step_label": "Étape",
"sm_manifeste_lead": "Je ne vends pas des bijoux. Je vous aide à créer le vôtre. Dessiné sur mesure, façonné à la main, fait pour",
"sm_manifeste_accent": "compter.",
"sm_split_eyebrow": "Du croquis à la promesse",
"sm_split_title_lead": "Je le fais",
"sm_split_title_accent": "unique.",
"sm_split_title_tail": "Vous le rendez vôtre.",
"sm_split_body": "Tout commence par une conversation : votre histoire, votre style. Ensemble, on esquisse, on dessine, on ajuste, jusqu'à une pièce unique, prête à porter (et à émouvoir).",
"sm_split_link": "En savoir plus",
"sm_split_img_alt": "Esquisses au crayon d'une bague améthyste posées sur l'établi",
"sm_real_eyebrow": "Réalisations",
"sm_real_title": "La pièce, et la vie qu'elle prend",
"sm_real_intro": "Chaque création photographiée à l'atelier, puis portée par celle pour qui elle est née.",
"sm_real_tag_atelier": "À l'atelier",
"sm_real_tag_portee": "Portée",
"sm_real_mat_josephine": "Or 18 ct · diamants",
"sm_real_mat_aurore": "Or 18 ct · pierre de couleur",
"sm_real_mat_thelma": "Or 18 ct · perle",
"sm_voices_title": "Ce qu'elles en disent",
"sm_voice1_quote": "Emeline est tout simplement une artiste. Le résultat est au-delà de ce que j'avais imaginé. Je suis émue et enthousiasmée.",
"sm_voice2_quote": "Très contente de votre création pour ma bague. Professionnelle, agréable. Je recommande sans hésiter.",
"sm_voice3_quote": "On sent dans chaque pièce le temps passé, la précision, l'amour du métier. Toujours aussi belle deux ans après."
```

- [ ] **Step 2 : EN** — mêmes clés, valeurs traduites (ex. `sm_hero_title` = "Your jewel doesn't exist", `sm_hero_title_accent` = "yet.", `sm_step_label` = "Step", `sm_real_tag_atelier` = "At the atelier", `sm_real_tag_portee` = "Worn", matières "18k gold · diamonds"…). Noms propres et villes inchangés.
- [ ] **Step 3 : PT** — idem (ex. `sm_hero_title` = "A sua joia ainda não existe" / accent à recomposer, `sm_step_label` = "Etapa", villes inchangées).
- [ ] **Step 4 : Recompiler Paraglide + vérifier**

```bash
pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/paraglide
pnpm exec tsc --noEmit
```
Expected : `m.sm_*` résolus, tsc vert. (`src/paraglide/` est gitignoré, non committé.)

- [ ] **Step 5 : Commit** → `i18n(sur-mesure): clés de la page (hero, marquee, atelier, procédé, split, réalisations, voix)`

---

### Tasks 4-10 : Composants de section

> Patron commun à chaque tâche : créer le composant, **traduire le CSS de la section homonyme de `sur-mesure.html` en Tailwind à l'identique** (tokens `canard`/`poudre`/`framboise`), brancher les `m.sm_*()`, envelopper les sous-blocs animés dans `<Reveal>`. Puis `tsc + lint`, puis commit `feat(sur-mesure): section <nom>`.

### Task 4 : `BespokeHero`

**Files :** Create `src/components/sur-mesure/BespokeHero.tsx`
**Interfaces :** Consumes `useContactDrawer`, `m`. Produces `BespokeHero()`.

- [ ] **Step 1 : Composant** (réf maquette `.hero` l.81-102, 355-372)

Points clés :
- Conteneur `relative min-h-[100dvh] flex items-center justify-center overflow-hidden`.
- Split absolu 50/50 : gauche `<video autoPlay muted loop playsInline poster="/images/real/bague-pierre-precieuse-perle.webp">` `<source src="/images/video/ring-box.mp4" type="video/mp4" />` ; droite `<img src="/images/real/bague-main-chaise-thelma.webp" alt={m.sm_hero_photo_alt()} fetchPriority="high" />`. Mobile (`max-[680px]`) : photo masquée, vidéo pleine largeur.
- `prefers-reduced-motion` : vidéo masquée (classe `motion-reduce:hidden`).
- Voile dégradé canard (`bg-[linear-gradient(...)]` repris l.90-91).
- Bloc texte centré poudre : kicker (`m.sm_hero_kicker`), `h1` avec accent framboise italique (`m.sm_hero_title` + `<i className="text-framboise">{m.sm_hero_title_accent()}</i>`), sub (`m.sm_hero_sub`), CTA `<button onClick={openContact}>` (poudre/canard, hover inversé) → `m.sm_hero_cta`.
- ⚠️ JSX : `autoplay`→`autoPlay`, `muted`, `playsinline`→`playsInline`, `fetchpriority`→`fetchPriority`.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 5 : `BespokeMarquee`

**Files :** Create `src/components/sur-mesure/BespokeMarquee.tsx`
**Interfaces :** Consumes `BESPOKE_MARQUEE`, `m`. Produces `BespokeMarquee()`.

- [ ] **Step 1 : Composant** (réf `.marquee` l.104-113, 374-377, 555-558)

- Bande poudre, filets haut/bas `canard/15`, `overflow-hidden`.
- Piste dupliquée (items + losange framboise tourné 45°), animation `scroll-x` 30s linéaire infinie, pause au survol, `prefers-reduced-motion` → wrap centré sans animation.
- **Keyframes scoped** (pas de `styles.css`) : inclure dans le composant un `<style>{`@keyframes sm-scroll-x{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>` et appliquer `style={{ animation: 'sm-scroll-x 30s linear infinite' }}` (ou classe arbitraire). `aria-hidden` sur la bande.
- Items via `BESPOKE_MARQUEE.map(k => (m as Record<string,()=>string>)[k]())`, rendus 2× pour la boucle.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 6 : `BespokeAtelier`

**Files :** Create `src/components/sur-mesure/BespokeAtelier.tsx`
**Interfaces :** Consumes `m`, `Reveal`, `Link`. Produces `BespokeAtelier()`.

- [ ] **Step 1 : Composant** (réf `.about`/`.gallery`/`.badge-circ` l.182-208, 379-401)

- Grille 2 col (`1.05fr .95fr`), repli 1 col `<768px`.
- Copy : `h2` titre en 3 morceaux (`sm_about_title_lead` + `<i className="text-framboise">{sm_about_title_accent}</i>` + `sm_about_title_tail`), `p` corps, `<Link to="/creatrice">` lien `m.sm_about_link` (style `.link-r`, soulignement framboise + chevron `›` qui glisse).
- Galerie 3 images (g1/g2/g3, ratios 3/4, 3/4 décalée, 16/9 pleine largeur) + **badge circulaire tournant** : disque framboise, picto poudre, `<svg>` textPath `m.sm_about_badge` répété, animation `spin` (keyframes scoped `sm-spin`), `prefers-reduced-motion` stoppe.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 7 : `BespokeProcess`

**Files :** Create `src/components/sur-mesure/BespokeProcess.tsx`
**Interfaces :** Consumes `BESPOKE_STEPS`, `m`, `Reveal`. Produces `BespokeProcess()`.

- [ ] **Step 1 : Composant** (réf `.process`/`.steps`/`.statement` l.135-152, 314-317, 403-435)

- Fond `poudre-dark`. Frise 4 colonnes reliées par un filet horizontal framboise/30 (pseudo-élément → ici une `<span>` absolue derrière), repli 2×2 puis 1 col (filet masqué).
- Chaque étape : icône SVG (`<img src={step.svg} alt="" aria-hidden />`, hauteur 88px, fond poudre-dark pour « couper » le filet), `num` = `${m.sm_step_label()} ${i+1}` (framboise), titre `(m as …)[step.titleKey]()`, corps `[step.bodyKey]()`.
- Manifeste dessous : `h2` (`sm_manifeste_lead` + `<i className="text-framboise">{sm_manifeste_accent}</i>`) + ornement (filet framboise · picto canard masqué · filet framboise).

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 8 : `BespokeSplit`

**Files :** Create `src/components/sur-mesure/BespokeSplit.tsx`
**Interfaces :** Consumes `m`, `Reveal`. Produces `BespokeSplit()`.

- [ ] **Step 1 : Composant** (réf `.split` l.124-133, 437-448)

- Grille 2 col, repli 1 col (copy avant image). Eyebrow `sm_split_eyebrow`, `h2` (`sm_split_title_lead` + `<i className="text-framboise">{accent}</i>` + tail), `p` corps, lien `.link-r` `m.sm_split_link` → ancre `#process` (`<a href="#process">`). Image `esquisses-amethyste.jpg` ratio 4/5, hover zoom.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 9 : `BespokeRealisations`

**Files :** Create `src/components/sur-mesure/BespokeRealisations.tsx`
**Interfaces :** Consumes `BESPOKE_PIECES`, `m`, `Reveal`. Produces `BespokeRealisations()`.

- [ ] **Step 1 : Composant** (réf `.real`/`.piece` l.210-227, 450-475)

- En-tête : eyebrow `sm_real_eyebrow`, `h2` `sm_real_title`, `p` intro `sm_real_intro`.
- `BESPOKE_PIECES.map` → bloc 2 col : 2 `.shot` (tag `m.sm_real_tag_atelier` / `sm_real_tag_portee`, image + hover zoom), puis `.meta` pleine largeur (filets latéraux, `h3` = `piece.name`, `.mat` = `(m as …)[piece.matKey]()`). Repli 1 col `<680px`.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

### Task 10 : `BespokeVoices`

**Files :** Create `src/components/sur-mesure/BespokeVoices.tsx`
**Interfaces :** Consumes `BESPOKE_VOICES`, `m`, `Reveal`. Produces `BespokeVoices()`.

- [ ] **Step 1 : Composant** (réf `.voices`/`.voice` l.229-241, 477-505)

- Fond `poudre-dark`. En-tête `h2` `sm_voices_title`. Grille 3 col (repli 1 col `<880px`, max-w 520).
- `BESPOKE_VOICES.map` → carte poudre : citation `(m as …)[v.quoteKey]()` (italique), médaillon canard initiale `v.initial`, `name` + `loc` (ville).

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit**

---

### Task 11 : Nav transparent au-dessus du héro (acté)

> Décidé. Touche le `Nav` partagé → coordination chantier couleurs (prévenir avant de pousser).

**Files :** Modify `src/components/Nav.tsx`

- [ ] **Step 1 : Étendre le mode transparent**

Dans `Nav.tsx`, la transparence dépend de `isHomeTop = pathname === '/' && !scrolled`. Généraliser aux routes à héro plein cadre :

```tsx
const FULL_BLEED_HERO = new Set(['/', '/sur-mesure'])
const isHeroTop = FULL_BLEED_HERO.has(pathname) && !scrolled
```
Remplacer les usages de `isHomeTop` par `isHeroTop`.

- [ ] **Step 2 : tsc + lint** · **Step 3 : Commit** → `feat(nav): transparent au-dessus du héro sur /sur-mesure`

---

### Task 12 : Recomposer la route `/sur-mesure`

**Files :** Modify `src/routes/sur-mesure.tsx`

- [ ] **Step 1 : Réécrire le composant de route**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { BespokeHero } from '../components/sur-mesure/BespokeHero'
import { BespokeMarquee } from '../components/sur-mesure/BespokeMarquee'
import { BespokeAtelier } from '../components/sur-mesure/BespokeAtelier'
import { BespokeProcess } from '../components/sur-mesure/BespokeProcess'
import { BespokeSplit } from '../components/sur-mesure/BespokeSplit'
import { BespokeRealisations } from '../components/sur-mesure/BespokeRealisations'
import { BespokeVoices } from '../components/sur-mesure/BespokeVoices'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  // Loader CMS (décision actée) : voix + réalisations pilotables par Emeline,
  // repli statique bespoke.ts si Sanity non configuré. Getters exacts à
  // confirmer (réutiliser getTestimonials / produits, ou mapper).
  loader: async () => {
    const locale = getLocale()
    const [voices, pieces] = await Promise.all([
      getBespokeVoices(locale), // → BespokeVoice[] (fallback BESPOKE_VOICES)
      getBespokePieces(locale), // → BespokePiece[] (fallback BESPOKE_PIECES)
    ])
    return { voices, pieces }
  },
})

function SurMesurePage() {
  const { voices, pieces } = Route.useLoaderData()
  return (
    <div className="-mt-16">{/* héro plein cadre sous le Nav fixe */}
      <BespokeHero />
      <BespokeMarquee />
      <BespokeAtelier />
      <BespokeProcess />
      <BespokeSplit />
      <BespokeRealisations pieces={pieces} />
      <BespokeVoices voices={voices} />
    </div>
  )
}
```

> `BespokeRealisations`/`BespokeVoices` prennent leurs données en props (cf. décision n°3) ; les autres sections sont statiques + i18n. Définir `getBespokeVoices`/`getBespokePieces` dans `src/lib/cms` (Sanity → repli `BESPOKE_VOICES`/`BESPOKE_PIECES`) au démarrage de cette tâche — sinon, repli pur sur les constantes. Le `-mt-16` annule le `pt-16` du `<main>` pour le héro plein cadre ; vérifier qu'aucune section suivante ne passe sous le Nav (au besoin, n'appliquer le négatif qu'au héro).

- [ ] **Step 2 : tsc + lint** (runtime : pilote vérifie le rendu) · **Step 3 : Commit** → `feat(sur-mesure): recompose la page (port React de la maquette)`

---

### Task 13 : Supprimer l'ancien (composants, loaders, clés orphelines)

**Files :** Delete `src/components/sur-mesure/{HeroBespoke,Metamorphose,Promesses,HistoireSandrine,FormulaireInvitation}.tsx` ; Modify `src/lib/cms/*` (loaders) ; Modify `messages/*.json` (clés orphelines).

- [ ] **Step 1 : Confirmer qu'ils ne servent plus ailleurs**

Run : `grep -rn "HeroBespoke\|Metamorphose\|Promesses\|HistoireSandrine\|FormulaireInvitation\|getMetamorphose\|getPromesses" src --include=*.tsx --include=*.ts | grep -v "components/sur-mesure/\(HeroBespoke\|Metamorphose\|Promesses\|HistoireSandrine\|FormulaireInvitation\)"`
Expected : aucune référence hors les fichiers à supprimer.

- [ ] **Step 2 : Supprimer les composants**

```bash
git rm src/components/sur-mesure/HeroBespoke.tsx src/components/sur-mesure/Metamorphose.tsx src/components/sur-mesure/Promesses.tsx src/components/sur-mesure/HistoireSandrine.tsx src/components/sur-mesure/FormulaireInvitation.tsx
```

- [ ] **Step 3 : Retirer les loaders CMS inutilisés** `getMetamorphose`/`getPromesses` (et leurs types/usages) **si** le grep Step 1 les a confirmés orphelins.

- [ ] **Step 4 : Retirer les clés i18n orphelines** `bespoke_*` et `surmesure_*` (vérifier d'abord `grep -rn "bespoke_\|surmesure_" src` → 0 usage) dans les 3 `messages/*.json`, puis recompiler Paraglide.

- [ ] **Step 5 : tsc + lint** → `pnpm exec tsc --noEmit && pnpm lint`. Expected : vert.
- [ ] **Step 6 : Commit** → `refactor(sur-mesure): supprime l'ancienne page et ses dépendances mortes`

---

### Task 14 : Vérification finale

- [ ] **Step 1 : Type + lint + build**

Run : `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected : tsc vert, lint propre (hors `src/paraglide/`), build OK (régénère aussi le routeTree si besoin).

- [ ] **Step 2 : Checklist runtime (pilote, navigateur)**
  - `/sur-mesure` : héro vidéo|photo joue (mp4), CTA « Commencer votre projet » **ouvre le ContactDrawer**.
  - Marquee défile + pause au survol ; `prefers-reduced-motion` fige tout (vidéo, marquee, badge).
  - Reveals au scroll ; ancre « En savoir plus » → frise.
  - Bascule FR/EN/PT : toute la page traduite.
  - Mobile (390) : héro vidéo plein cadre, grilles repliées, badge bien placé, 0 scroll horizontal.
  - Nav : (si Task 11) transparent en haut puis opaque ; sinon opaque correct.
  - 0 erreur console.

---

## Self-Review

**Couverture maquette → tâches :** Hero (T4), Marquee (T5), Atelier (T6), Process+manifeste (T7), Split (T8), Réalisations (T9), Voices (T10), Nav/Footer = globaux (shell), route (T12), i18n (T3), assets (T1), données (T2), nettoyage ancien (T13). ✅

**Placeholders :** aucun « TBD » ; FR verbatim fourni, EN/PT à traduire dans T3 (source = FR), markup référencé sur la maquette par numéros de ligne.

**Cohérence types :** `BESPOKE_STEPS/PIECES/VOICES/MARQUEE` définis en T2, consommés en T6/T7/T9/T10/T5 ; accès message dynamique typé `Record<string, () => string>` partout (jamais `any`) ; `useContactDrawer().open` (déjà livré) consommé en T4.

**Vigilance :** (1) `-mt-16` du héro à surveiller (ne pas faire passer les sections suivantes sous le Nav) ; (2) keyframes en `<style>` scoped, pas dans `styles.css` ; (3) attributs JSX vidéo (`autoPlay`/`playsInline`/`fetchPriority`) ; (4) Task 11 touche le Nav partagé → coordination chantier couleurs ; (5) pictos étapes = à garder « maison » avant prod.
