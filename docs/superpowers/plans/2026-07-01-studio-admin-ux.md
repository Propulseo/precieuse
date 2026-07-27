# Studio Sanity — UX admin pour Emeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre le Studio Sanity embarqué (`/studio`) évident et rassurant pour Emeline (non-technique), sans réécrire de CMS : rebrand, interface en français, structure claire, garde-fous, et édition visuelle « clic-sur-la-page ».

**Architecture:** On garde le moteur Sanity Studio (robuste), monté client-only à `/studio` dans l'app TanStack Start. Toutes les améliorations « chrome » vivent dans la config Studio (`sanity.config.ts` + `src/components/studio/*`) — aucune ne touche les schémas, SAUF la Phase 4 (textes d'aide / onglets / aperçus), qui se coordonne avec la session Sanity parallèle. L'édition visuelle (Presentation) ajoute une route d'aperçu « brouillon » sur le site + stega.

**Tech Stack:** TanStack Start (React 19, Vite 8), Sanity Studio (`sanity`), `@sanity/vision` (retiré), `@sanity/locale-fr-fr` (à ajouter), `sanity/presentation` + `@sanity/preview-url-secret` (à ajouter), pnpm.

## Global Constraints

- Gestionnaire de paquets : **pnpm** (jamais npm/yarn). Ne pas éditer `pnpm-lock.yaml` à la main.
- TypeScript strict, **jamais `any`**. Path : le repo utilise des imports **relatifs** (pas d'alias `@/`), sauf `#/paraglide/*`. Suivre cette convention.
- **Ne pas toucher aux schémas** `sanity/schemaTypes/**` avant la Phase 4, et seulement après accord de la session Sanity parallèle (risque de conflit de merge).
- `sanity.config.ts` est **partagé** avec le Studio CLI standalone ET potentiellement édité par la session Sanity → éditer par petits diffs, prévenir avant.
- Après chaque modif de code : `pnpm exec tsc --noEmit` doit passer.
- Vérification runtime = **l'utilisateur** ouvre `http://localhost:3000/studio` et valide visuellement (ne pas lancer de navigateur soi-même). Le serveur de dev tourne déjà (`pnpm dev`).
- Le Studio est **client-only** : ne jamais l'importer/évaluer en SSR/build (déjà géré par `src/routes/studio.$.tsx`).
- Commits séparés par changement logique, préfixes `feat:`/`fix:`/`chore:`, trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Types singletons (documents uniques) : `homePage`, `siteSettings`, `surMesurePage`, `creatricePage`, `footer`, `contact`. Types listes : `piece`, `matiere`, `article`, `temoignage`, `etapeEtabli`, `legalPage`. **À reconfirmer** en Phase 3 avant de s'appuyer dessus pour les garde-fous.

---

## Phase 0 — Déjà réalisé (rappel d'état)

- Studio embarqué à `/studio` (route splat client-only, chrome du site masqué, conteneur plein écran) — **committé** (`4edcccd`).
- Rebrand Précieuse : thème clair poudre/canard, logo, titre — **committé** (`aab9049`).
- Structure du menu regroupée/renommée + Vision masqué — **implémenté, NON committé** (`src/components/studio/structure.ts`, `sanity.config.ts`). ➜ À valider visuellement puis committer en Task 1.

---

### Task 1: Figer la structure + Vision masqué (Phase 0 en attente)

**Files:**
- Modify: `sanity.config.ts`
- Create: `src/components/studio/structure.ts` (déjà écrit)

**Interfaces:**
- Produces: `structure` (StructureResolver) consommé par `structureTool({ structure })`.

- [ ] **Step 1: Vérifier le type check**

Run: `pnpm exec tsc --noEmit`
Expected: aucune sortie (pass).

- [ ] **Step 2: Vérification visuelle (utilisateur)**

Ouvrir `http://localhost:3000/studio`. Attendu : menu gauche ordonné Pages → Bijoux → Carnet → Réglages avec séparateurs ; onglet « Vision » absent.

- [ ] **Step 3: Commit**

```bash
git add sanity.config.ts src/components/studio/structure.ts
git commit -m "feat(studio): structure du menu regroupee/renommee + Vision masque" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Phase 1 — Améliorations « chrome » sûres (config uniquement)

### Task 2 (A): Interface du Studio en français

Traduit tout le chrome Sanity (Publish → Publier, Search, Drafts, menus…) via le pack de langue officiel.

**Files:**
- Modify: `package.json` (dépendance, via pnpm), `pnpm-lock.yaml` (auto)
- Modify: `sanity.config.ts`

**Interfaces:**
- Consumes: `defineConfig` plugins array.
- Produces: rien de réutilisable (effet UI global).

- [ ] **Step 1: Installer le pack de langue FR**

Run: `pnpm add @sanity/locale-fr-fr`
Expected: ajouté aux dependencies. Si la version n'est pas compatible avec `sanity` installé, l'installer en version alignée : `pnpm add @sanity/locale-fr-fr@<version-alignée>` (voir la page npm du paquet pour la table de compat).

- [ ] **Step 2: Brancher le plugin + défaut FR dans la config**

Dans `sanity.config.ts`, ajouter l'import et le plugin (après `structureTool`) :

```ts
import { frFRLocale } from '@sanity/locale-fr-fr'
// ...
export default defineConfig({
  // ...
  plugins: [structureTool({ structure }), frFRLocale()],
  i18n: { bundles: [] }, // laissé vide : le plugin fournit le bundle fr-FR
})
```

Note : selon la version, la sélection de langue peut être automatique (locale du navigateur) ou nécessiter de forcer `fr-FR`. Si le Studio reste en anglais, ajouter la sélection par défaut documentée sur la page du paquet (souvent rien à faire : il devient dispo dans le sélecteur de langue en bas).

- [ ] **Step 3: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: pass.

- [ ] **Step 4: Vérification visuelle (utilisateur)**

Recharger `/studio`. Attendu : boutons/menus en français (Publier, Rechercher, Brouillons…). Si un sélecteur de langue apparaît, choisir « Français ».

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml sanity.config.ts
git commit -m "feat(studio): interface en francais (pack @sanity/locale-fr-fr)" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3 (B): Icônes par rubrique

Icône devant chaque type dans le menu → repérage immédiat.

**Files:**
- Modify: `src/components/studio/structure.ts`

**Interfaces:**
- Consumes: `@sanity/icons` (déjà transitivement dispo via `sanity`).
- Produces: `structure` enrichi (même export).

- [ ] **Step 1: Ajouter les icônes aux items**

Dans `src/components/studio/structure.ts`, importer des icônes et les poser via `.icon()` :

```ts
import { HomeIcon, DiamondIcon, DocumentTextIcon, CogIcon, UsersIcon, ImageIcon, CaseIcon } from '@sanity/icons'
```

Puis sur chaque `documentTypeListItem(...)`, ajouter `.icon(XIcon)`. Exemple :

```ts
S.documentTypeListItem('homePage').title("Page d'accueil").icon(HomeIcon),
S.documentTypeListItem('piece').title('Les bagues (collection)').icon(DiamondIcon),
S.documentTypeListItem('article').title('Articles du Carnet').icon(DocumentTextIcon),
S.documentTypeListItem('temoignage').title('Témoignages').icon(UsersIcon),
S.documentTypeListItem('siteSettings').title('Paramètres du site').icon(CogIcon),
// ... (choisir une icône cohérente pour chaque item)
```

Si un nom d'icône n'existe pas dans `@sanity/icons`, en choisir un proche (voir icons.sanity.build).

- [ ] **Step 2: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: pass.

- [ ] **Step 3: Vérification visuelle (utilisateur)**

Recharger `/studio` : chaque entrée du menu a une icône.

- [ ] **Step 4: Commit**

```bash
git add src/components/studio/structure.ts
git commit -m "feat(studio): icones par rubrique dans le menu" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4 (D): Garde-fous sur les documents uniques (singletons)

Empêcher la suppression / duplication / création multiple des pages-config (Accueil, Sur-Mesure, Créatrice, Contact, Réglages, Pied de page). Emeline ne peut plus casser la structure par erreur.

**Files:**
- Create: `src/components/studio/singletons.ts`
- Modify: `sanity.config.ts`

**Interfaces:**
- Produces: `SINGLETON_TYPES: string[]` et `singletonDocumentActions` / `singletonNewDocumentOptions` (consommés par `defineConfig`).

- [ ] **Step 1: Confirmer la liste des singletons**

Run: `grep -rl "type: 'document'" sanity/schemaTypes/documents` puis, pour chaque, vérifier si le schéma limite déjà les actions (`__experimental_actions`) ou si le getter CMS lit `[0]` (un seul doc). Confirmer la liste : `homePage, siteSettings, surMesurePage, creatricePage, footer, contact`.

- [ ] **Step 2: Écrire le module singletons**

Create `src/components/studio/singletons.ts` :

```ts
import type { DocumentActionComponent } from 'sanity'
import type { TemplateItem } from 'sanity'

/** Documents uniques : une seule instance, non supprimable/dupliquable. */
export const SINGLETON_TYPES = new Set<string>([
  'homePage',
  'siteSettings',
  'surMesurePage',
  'creatricePage',
  'footer',
  'contact',
])

/** Retire delete/duplicate/unpublish pour les singletons. */
export function singletonDocumentActions(
  prev: DocumentActionComponent[],
  ctx: { schemaType: string },
): DocumentActionComponent[] {
  if (!SINGLETON_TYPES.has(ctx.schemaType)) return prev
  return prev.filter(
    (action) =>
      !['delete', 'duplicate', 'unpublish'].includes(
        (action as unknown as { action?: string }).action ?? '',
      ),
  )
}

/** Retire les singletons du menu « + Créer » global. */
export function singletonNewDocumentOptions(
  prev: TemplateItem[],
  ctx: { creationContext: { type: string } },
): TemplateItem[] {
  if (ctx.creationContext.type === 'global') {
    return prev.filter((t) => !SINGLETON_TYPES.has(t.templateId))
  }
  return prev
}
```

- [ ] **Step 3: Brancher dans la config**

Dans `sanity.config.ts` :

```ts
import { singletonDocumentActions, singletonNewDocumentOptions } from './src/components/studio/singletons'
// ...
export default defineConfig({
  // ...
  document: {
    actions: singletonDocumentActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
})
```

- [ ] **Step 4: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: pass. (Ajuster les signatures/typages selon la version de `sanity` si erreur — les callbacks `document.actions`/`newDocumentOptions` sont typés par le SDK.)

- [ ] **Step 5: Vérification visuelle (utilisateur)**

Ouvrir « Page d'accueil » → le menu « … » (actions) ne propose plus Supprimer/Dupliquer. Le bouton « + » global ne liste plus les pages-config.

- [ ] **Step 6: Commit**

```bash
git add src/components/studio/singletons.ts sanity.config.ts
git commit -m "feat(studio): garde-fous singletons (pas de suppression/duplication des pages-config)" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5 (C): Page d'accueil du Studio « Que voulez-vous modifier ? »

Un premier écran avec des raccourcis lisibles vers les tâches courantes d'Emeline, au lieu d'atterrir sur un type au hasard.

**Files:**
- Modify: `src/components/studio/structure.ts`

**Interfaces:**
- Produces: `structure` avec un item d'accueil en tête.

- [ ] **Step 1: Ajouter un panneau d'accueil**

Deux options selon l'effort voulu :

**Option simple (reco) — mettre en tête les tâches les plus fréquentes** déjà lisibles (Accueil, Bagues, Articles) : elles sont déjà en haut du menu → aucune action, on considère C couvert par l'ordre du menu. Documenter ce choix et **sauter au Step 3**.

**Option riche — vrai écran d'accueil custom** : créer `src/components/studio/WelcomePane.tsx` (composant `@sanity/ui` : titre « Bonjour Emeline », gros boutons `Card`/`Button` qui `router.navigateUrl` vers `/studio/structure/homePage` etc.) et l'ajouter comme 1er item :

```ts
S.listItem().title('Accueil').icon(HomeIcon).child(
  S.component(WelcomePane).title('Que voulez-vous modifier ?')
),
S.divider(),
```

- [ ] **Step 2: Type check**

Run: `pnpm exec tsc --noEmit`
Expected: pass.

- [ ] **Step 3: Vérification visuelle (utilisateur) + décision**

Recharger `/studio`. Décider avec l'utilisateur si l'ordre du menu suffit (Option simple) ou s'il veut l'écran custom (Option riche). N'implémenter l'Option riche que si demandé.

- [ ] **Step 4: Commit (si changement)**

```bash
git add src/components/studio/structure.ts src/components/studio/WelcomePane.tsx
git commit -m "feat(studio): ecran d'accueil du Studio (raccourcis)" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Édition visuelle (Presentation / clic-sur-la-page)

Le gros saut UX : Emeline voit la vraie page Précieuse à côté du formulaire, et clique sur un texte/une photo dans la page pour l'éditer, avec mise à jour en direct. Effort moyen (plusieurs pièces). **À faire en dernier**, après validation de la Phase 1.

### Task 6: Route d'aperçu « brouillon » (draft mode) sur le site

**Files:**
- Modify: `package.json` (deps), `pnpm-lock.yaml`
- Create: `src/routes/api/draft-mode/enable.ts` (ou équivalent server function TanStack)
- Modify: `src/lib/sanity.ts` (client : activer `stega` + `perspective: 'previewDrafts'` quand en mode aperçu)

**Interfaces:**
- Produces: un endpoint qui active le mode brouillon via un secret signé, et un client Sanity « aperçu » (stega activé).

- [ ] **Step 1: Installer les paquets Presentation/preview**

Run: `pnpm add @sanity/preview-url-secret @sanity/client`
(Le `@sanity/client` est déjà là — vérifier la version ; ajouter seulement `@sanity/preview-url-secret`.)

- [ ] **Step 2: Client Sanity « aperçu » avec stega**

Dans `src/lib/sanity.ts`, exposer un client aperçu :

```ts
export const previewClient = client.withConfig({
  perspective: 'previewDrafts',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // lecture des brouillons (jamais côté navigateur)
  stega: { enabled: true, studioUrl: '/studio' },
})
```

- [ ] **Step 3: Endpoint d'activation du draft mode**

Créer une server function (route API TanStack) qui valide le secret (`@sanity/preview-url-secret`) et pose un cookie « draft ». Le loader des pages lit ce cookie pour utiliser `previewClient` au lieu du client normal. Documenter le flux : Presentation ouvre `/api/draft-mode/enable?secret=…&slug=/` → cookie posé → page rendue en brouillon avec stega.

- [ ] **Step 4: Type check + vérif**

Run: `pnpm exec tsc --noEmit` → pass. Vérifier que le site normal (sans cookie) est inchangé (repli client standard).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/sanity.ts src/routes/api/draft-mode/enable.ts
git commit -m "feat(preview): mode brouillon + client stega pour l'apercu Studio" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

### Task 7: Brancher `presentationTool` dans le Studio

**Files:**
- Modify: `sanity.config.ts`
- Create: `src/components/studio/resolve.ts` (mappe un document → URL de la page à afficher)

**Interfaces:**
- Consumes: `previewClient`, l'endpoint draft-mode.
- Produces: onglet « Aperçu » dans le Studio.

- [ ] **Step 1: Résolveur document → URL**

Create `src/components/studio/resolve.ts` : mappe `homePage → /`, `piece → /collection/{slug}`, `article → /carnet/{slug}`, `surMesurePage → /sur-mesure`, `creatricePage → /creatrice`. Format `PresentationResolver` (locations/mainDocuments).

- [ ] **Step 2: Ajouter le plugin**

Dans `sanity.config.ts` :

```ts
import { presentationTool } from 'sanity/presentation'
import { resolve } from './src/components/studio/resolve'
// ...
plugins: [
  presentationTool({
    resolve,
    previewUrl: { origin: '', draftMode: { enable: '/api/draft-mode/enable' } },
  }),
  structureTool({ structure }),
  frFRLocale(),
],
```

- [ ] **Step 3: Type check**

Run: `pnpm exec tsc --noEmit` → pass.

- [ ] **Step 4: Vérification visuelle (utilisateur)**

`/studio` a un onglet « Aperçu ». En l'ouvrant : la vraie page à gauche, l'édition à droite ; cliquer un texte de la page ouvre le champ. Modifier → la page se met à jour.

- [ ] **Step 5: Commit**

```bash
git add sanity.config.ts src/components/studio/resolve.ts
git commit -m "feat(studio): apercu en direct + clic-sur-la-page (Presentation)" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Phase 3 — À coordonner avec la session Sanity (touche les schémas)

⚠️ **Bloqué tant que la session Sanity parallèle n'a pas donné le feu vert** (edits sur `sanity/schemaTypes/**` = conflits de merge sinon). Faire type-check + `convex`/`sanity` build après.

### Task 8 (F): Textes d'aide sous les champs

**Files:** Modify (avec accord) : `sanity/schemaTypes/documents/*.ts`

- [ ] Ajouter `description: '…'` (français, avec exemple) sur les champs importants de chaque document. Un commit par document (`docs(sanity): aide des champs — <document>`). Vérif : le texte d'aide s'affiche sous le champ dans `/studio`.

### Task 9 (G): Champs regroupés en onglets

**Files:** Modify (avec accord) : `sanity/schemaTypes/documents/*.ts`

- [ ] Sur les documents longs (`homePage`, `surMesurePage`), déclarer `groups: [{name:'contenu',title:'Contenu',default:true},{name:'seo',title:'SEO'}]` et poser `group: 'contenu'|'seo'` sur chaque champ. Vérif : onglets en haut du formulaire.

### Task 10 (H): Beaux aperçus dans les listes

**Files:** Modify (avec accord) : `sanity/schemaTypes/documents/{piece,article,temoignage}.ts`

- [ ] Ajouter/soigner `preview: { select: { title, subtitle, media } }` pour afficher photo + titre + sous-titre dans les listes. Vérif : les listes montrent une vignette et un libellé lisibles.

---

## Notes hors-code (à faire par l'utilisateur / la session Sanity)

- **CORS Sanity** pour la prod/preview : `pnpm dlx sanity cors add https://precieuse-five.vercel.app --credentials` (+ domaines preview si besoin). Sans ça, le Studio embarqué ne se connecte pas sur le domaine déployé.
- **Inviter Emeline** au projet Sanity `8zuvflol` (sanity.io/manage → Members) : le login du Studio = compte Sanity, pas BetterAuth.
- **Vérifier le build Vercel** après la Phase 0 (le Studio embarqué alourdit le build ; s'assurer que `pnpm build` passe et que `/studio` n'est pas pré-rendu en SSR).

---

## Self-Review

- **Couverture spec (A→H)** : A=Task 2, B=Task 3, C=Task 5, D=Task 4, E=Tasks 6–7, F=Task 8, G=Task 9, H=Task 10. Phase 0 (embed+rebrand+structure) = Task 1 + déjà committé. ✅
- **Placeholders** : les étapes « à coordonner » (Phase 3) sont volontairement moins détaillées car elles dépendent des schémas existants (non réécrits ici) et d'un accord externe — ce n'est pas un TODO masqué mais une dépendance explicite.
- **Cohérence des types** : `SINGLETON_TYPES` (Set) réutilisé dans `singletonDocumentActions`/`singletonNewDocumentOptions` ; `structure` (StructureResolver) export unique enrichi au fil des tasks ; `previewClient` produit en Task 6, consommé en Task 7.
- **Risque récurrent** : compat version `sanity ^6.1.0` ↔ paquets `@sanity/locale-fr-fr`, `sanity/presentation`, `@sanity/preview-url-secret` — à valider à l'install (Tasks 2, 6, 7). Si incompatible, aligner les versions ou reporter la task concernée.
