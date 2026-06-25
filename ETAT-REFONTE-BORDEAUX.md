# Refonte Précieuse — état (branche `claude/refonte-bordeaux`)

Refonte du site **Précieuse** (joaillerie artisanale, **Bordeaux**) portée sur ce projet
(TanStack Start + Vite + Convex + better-auth + Sanity + Paraglide FR/EN/PT).
La refonte est désormais **mergée sur `main` et déployée en prod** (la branche `claude/refonte-bordeaux` = `main`).

---

## 🟢 ÉTAT ACTUEL — 2026-06-25 (handoff / reprise sur un autre PC)

**Le site est EN LIGNE et la prod lit Sanity.** Emeline peut gérer photos + contenu depuis le Studio, ça s'affiche en ligne.

### Liens
| Quoi | URL |
|---|---|
| 🌐 Site public (live, FR/EN/PT) | https://precieuse-five.vercel.app |
| 🎛️ Sanity Studio (Emeline gère le contenu) | https://precieuse.sanity.studio |
| 🛠️ Sanity Manage (membres, tokens, contenu) | https://www.sanity.io/manage/project/8zuvflol |
| ▲ Vercel (déploiements, env, logs) | https://vercel.com/propulseos-projects/precieuse |
| 💻 GitHub | https://github.com/Propulseo/precieuse |
| 🧪 Local app / Studio | http://localhost:3000 · http://localhost:3333 |

*Pas encore de nom de domaine custom — l'adresse publique est `precieuse-five.vercel.app`.*

### Ce qui marche (vérifié en prod, commit `2cb494f`)
- **Prod lit Sanity** : 4 variables d'env posées sur Vercel (Production+Preview) — `VITE_SANITY_PROJECT_ID=8zuvflol`, `VITE_SANITY_DATASET=production`, `VITE_SANITY_API_VERSION=2026-05-01`, `SANITY_API_READ_TOKEN` (token **Viewer**, lecture seule). Vérifié : `object-position:54% 48%` + 46 images `cdn.sanity.io` + EN traduit.
- **Cadrage photos = point focal Sanity (hotspot)** : Emeline déplace le réticule dans le Studio → le site suit (plus de cadrage codé). Catalogue complet dans Sanity : 5 pièces, 5 matières, 6 articles, 4 étapes établi.
- **Carousel Collection** : 3 modes (glissé/fondu/coverflow) + auto-défilement. **Établi** : chiffres romains retirés des photos. **Eugénie** = dessin. **Joséphine** recentrée.
- **Blindage CMS** (commit `8750c23`) : `cmsFetch()` → repli statique si Sanity échoue. **Jamais de 500** même si le token tombe.

### ⏭️ Reste à faire
1. **`pnpm studio:deploy`** → republier `precieuse.sanity.studio` avec le schéma à jour (demande `sanity login` interactif — auth CLI locale expirée).
2. **Inviter Emeline** en rôle **Editor** : [Sanity → Members](https://www.sanity.io/manage/project/8zuvflol/members) (besoin de son email).
3. **Hygiène** : retirer la ligne `VERCEL_TOKEN` du `.env` (token temporaire 24 h ajouté pour configurer Vercel).
4. *(Optionnel)* brancher un **nom de domaine** dans Vercel → Settings → Domains.
5. Vérifier les **photos Matières** (une opale montrait peut-être une autre pierre — corrigeable au Studio).

### 🔁 Reprendre sur un autre PC
1. `git clone git@github.com:Propulseo/precieuse.git` (tout le code + ce doc).
2. **Recréer `.env`** (gitignoré, voir `.env.example`). Le plus simple : **copier le `.env` de l'ancien PC** (il contient les tokens), puis **enlever `VERCEL_TOKEN`**. Variables clés : `VITE_SANITY_PROJECT_ID=8zuvflol`, `VITE_SANITY_DATASET=production`, `VITE_SANITY_API_VERSION=2026-05-01`, `SANITY_WRITE_TOKEN=…`, `SANITY_API_READ_TOKEN=…`.
3. Installer **Node 22 + pnpm**, puis `pnpm install`.
4. `pnpm dev` → http://localhost:3000 · `pnpm studio:dev` → http://localhost:3333.
5. **Dossiers locaux NON suivis par git** (à copier à la main si besoin) : `Logo/` (4 Mo), `Photos-3-001/` (6 Mo), `Retour cliente/` (2 Mo), `public/images/Photo Precieus/`, et `.env`. → Pour tout emporter d'un coup : copier le dossier `~/Desktop/Lyes/Precieuse` **sans** `node_modules/` (904 Mo) ni `.output/`.

### ✉️ Brouillon email à Emeline (prêt à envoyer)
> **Objet :** Précieuse — ta nouvelle version est en ligne ✨
>
> Bonjour Emeline,
>
> Bonne nouvelle : la nouvelle version du site est en ligne → **https://precieuse-five.vercel.app**
>
> Ce qui a été ajusté suite à tes retours :
> - **Photos** : Eugénie = le dessin, **Joséphine** recentrée, **Matières** en photos de pierres.
> - **L'Établi** : chiffres romains retirés des photos.
> - **La Collection** : carrousel retravaillé (défilement fluide et automatique).
> - Site traduit en **FR / EN / PT**.
>
> Et surtout : **tu peux gérer toi-même tes photos et textes** → **https://precieuse.sanity.studio** (remplacer une photo, ajuster le cadrage en déplaçant le point sur l'image, modifier les textes ; tout changement publié apparaît sur le site). Tu vas recevoir une invitation par mail pour y accéder.
>
> N'hésite pas à y jeter un œil et à me faire tes retours. Belle journée, *[prénom]*

---

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
