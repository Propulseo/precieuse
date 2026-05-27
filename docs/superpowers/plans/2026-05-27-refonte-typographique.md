# Refonte typographique Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer EB Garamond par Playfair Display sur tout le site, nettoyer les polices inutilisées, et introduire une utilité `font-headline` pour les gros titres en CAPITALES roman.

**Architecture:** Toutes les déclarations vivent dans `src/styles.css` (vars + utilités Tailwind v4). Les composants/routes consomment via `className="font-display ..."` ou `className="font-headline ..."`. La migration des gros titres se fait composant par composant en gardant les `font-display italic` partout où il s'agit d'annotations/sous-titres.

**Tech Stack:** Tailwind v4 (`@theme inline`, `@utility`), Google Fonts via `@import`, TanStack Start + React 19.

**Spec source:** [`docs/superpowers/specs/2026-05-27-refonte-typographique-design.md`](../specs/2026-05-27-refonte-typographique-design.md)

---

## File Structure

**Modifié :**
- `src/styles.css` — imports Google Fonts, vars `--font-*`, nouvelle utilité `font-headline`
- `src/components/Hero.tsx` — titre hero principal
- `src/components/Series.tsx` — h2 "La Collection"
- `src/components/Matieres.tsx` — h2 principal
- `src/components/Etabli.tsx` — h2 "À l'établi." + h3 de sections
- `src/components/AvantPropos.tsx` — titre 52px
- `src/routes/index.tsx` — vérifier hero titles
- `src/routes/collection.tsx` — h1 "La Collection"
- `src/routes/sur-mesure.tsx` — 3 titres ≥40px
- `src/routes/creatrice.tsx` — 3 titres ≥40px
- `src/routes/carnet.tsx` — h1 "Le Carnet"
- `src/routes/cgv.tsx`, `src/routes/confidentialite.tsx`, `src/routes/mentions-legales.tsx` — h1 légaux 48px

**Non touché :**
- `src/components/Nav.tsx`, `src/components/Footer.tsx` — annotations/nav, italique conservé
- Tous les sous-titres, micro-copy, captions en `font-display italic` <40px
- `convex/`, `messages/`, fichiers générés

---

## Task 1 : Mise à jour de `src/styles.css`

**Files:**
- Modify: `src/styles.css:6` (imports Google Fonts), `:71` (`--font-display`), `:73-76` (vars non utilisées), nouvelle utilité après ligne 117

- [ ] **Step 1.1 : Remplacer le `@import` Google Fonts**

Dans `src/styles.css`, remplacer la ligne 6 :

```css
/* AVANT */
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@300..700&family=Caveat:wght@400..700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Fraunces:ital,wght@0,300..800;1,300..800&family=Marcellus&family=Newsreader:ital,wght@0,200..800;1,200..800&display=swap');

/* APRÈS */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..700&family=Caveat:wght@400..700&display=swap');
```

Effet : on retire EB Garamond, Cormorant, Fraunces, Marcellus, Newsreader. On ajoute Playfair Display (italic + roman, 400 à 900).

- [ ] **Step 1.2 : Changer la variable `--font-display`**

Dans `src/styles.css`, ligne 71 :

```css
/* AVANT */
--font-display: 'EB Garamond', 'Times New Roman', serif;

/* APRÈS */
--font-display: 'Playfair Display', 'Times New Roman', serif;
```

- [ ] **Step 1.3 : Supprimer les variables des polices inutilisées**

Dans `src/styles.css`, supprimer les lignes 73 à 76 :

```css
/* À SUPPRIMER */
--font-cormorant: 'Cormorant Garamond', 'Times New Roman', serif;
--font-fraunces: 'Fraunces', 'Times New Roman', serif;
--font-marcellus: 'Marcellus', 'Times New Roman', serif;
--font-newsreader: 'Newsreader', 'Georgia', serif;
```

Après cette modif, le bloc `@theme inline` ne déclare plus que `--font-sans`, `--font-display`, `--font-script`.

- [ ] **Step 1.4 : Ajouter la nouvelle utilité `font-headline`**

Dans `src/styles.css`, ajouter après l'utilité `font-display-lg` (donc après la ligne 117, avant `@utility font-headline-md`) :

```css
@utility font-headline {
  font-family: var(--font-display);
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 0.95;
}
```

Effet : `className="font-headline text-[64px]"` rend du Playfair Display roman en CAPITALES, tracking serré, line-height tassé — exactement l'effet "PRÉCIEUSE JOAILLERIE" de la référence visuelle.

- [ ] **Step 1.5 : Type check**

Run: `pnpm exec tsc --noEmit`

Expected : aucune nouvelle erreur. Si l'erreur préexistante de `preview.newsletter.tsx:101` ressort, l'ignorer (hors scope).

- [ ] **Step 1.6 : Vérifier visuellement dans le dev server**

Le dev server est déjà lancé sur http://localhost:3001/. Recharger la home. Tout le texte en `font-display italic` doit maintenant s'afficher en Playfair Display italique (au lieu d'EB Garamond italique). Le rendu doit être plus contrasté, plus joaillier.

Si le rendu est cassé : vérifier la Network tab du navigateur — `fonts.googleapis.com/css2?family=Playfair+Display...` doit répondre 200.

- [ ] **Step 1.7 : Commit**

```bash
git add src/styles.css
git commit -m "refactor(typo): basculer EB Garamond -> Playfair Display + nettoyer polices inutilisees"
```

---

## Task 2 : Migrer les composants de section

**Files:**
- Modify: `src/components/Hero.tsx`, `src/components/Series.tsx:111`, `src/components/Matieres.tsx:10`, `src/components/Etabli.tsx:83,155`, `src/components/AvantPropos.tsx:69`

Règle de migration : remplacer `font-display italic` par `font-headline` sur les titres ≥40px. Garder le reste (`text-`, `text-ink`, `leading-*`, etc.) tel quel.

- [ ] **Step 2.1 : Migrer `src/components/Series.tsx`**

À la ligne 111, remplacer :

```tsx
/* AVANT */
<h2 className="font-display italic text-[40px] text-ink leading-none mb-1">La Collection</h2>

/* APRÈS */
<h2 className="font-headline text-[40px] text-ink leading-none mb-1">La Collection</h2>
```

- [ ] **Step 2.2 : Migrer `src/components/Matieres.tsx`**

À la ligne 10, remplacer :

```tsx
/* AVANT */
<h2 className="font-display italic text-[48px] sm:text-[56px] lg:text-[64px] text-ink leading-none mb-3">

/* APRÈS */
<h2 className="font-headline text-[48px] sm:text-[56px] lg:text-[64px] text-ink leading-none mb-3">
```

- [ ] **Step 2.3 : Migrer `src/components/Etabli.tsx` (2 titres)**

Lignes 83 et 155 :

```tsx
/* AVANT ligne 83 */
<h2 className="font-display italic text-[56px] text-ink leading-[0.95]">À l'établi.</h2>
/* APRÈS */
<h2 className="font-headline text-[56px] text-ink leading-[0.95]">À l'établi.</h2>

/* AVANT ligne 155 */
<h3 className="font-display italic text-[56px] text-ink leading-[0.98]">{s.title}.</h3>
/* APRÈS */
<h3 className="font-headline text-[56px] text-ink leading-[0.98]">{s.title}.</h3>
```

Ne pas toucher la ligne 163 (le `font-display float-left mr-3 mt-2 text-[72px]` est une drop-cap en italique éditorial — garde son rôle).

- [ ] **Step 2.4 : Migrer `src/components/AvantPropos.tsx`**

À la ligne 69 :

```tsx
/* AVANT */
<span className="font-display italic text-[52px] text-ink leading-none">

/* APRÈS */
<span className="font-headline text-[52px] text-ink leading-none">
```

Ne pas toucher les autres `font-display italic` du fichier (annotations, signatures, sous-titres <40px — gardent leur registre éditorial).

- [ ] **Step 2.5 : Vérifier `src/components/Hero.tsx`**

Lire le fichier complet. Identifier tout titre `text-[40px]` ou plus en `font-display italic` et le migrer vers `font-headline` selon la même règle. Si aucun titre ≥40px présent, laisser le fichier tel quel et noter "RAS" en commentaire de commit.

- [ ] **Step 2.6 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected : aucune nouvelle erreur.

- [ ] **Step 2.7 : Vérifier visuellement les pages /, /collection (qui rend Series, Matieres), /creatrice (qui rend Etabli, AvantPropos)**

Sur http://localhost:3001/, recharger les pages. Les gros titres listés ci-dessus doivent maintenant être en CAPITALES roman Playfair Display (au lieu d'italique). Les annotations, citations, signatures doivent rester en italique.

- [ ] **Step 2.8 : Commit**

```bash
git add src/components/
git commit -m "refactor(typo): migrer h1/h2 des composants vers font-headline (capitales roman)"
```

---

## Task 3 : Migrer les routes (pages principales)

**Files:**
- Modify: `src/routes/index.tsx`, `src/routes/collection.tsx:14`, `src/routes/sur-mesure.tsx:40,78,105`, `src/routes/creatrice.tsx:48,69,89`, `src/routes/carnet.tsx:13`

- [ ] **Step 3.1 : Migrer `src/routes/collection.tsx`**

À la ligne 14 :

```tsx
/* AVANT */
<h1 className="font-display italic text-[64px] text-ink leading-none">La Collection</h1>
/* APRÈS */
<h1 className="font-headline text-[64px] text-ink leading-none">La Collection</h1>
```

- [ ] **Step 3.2 : Migrer `src/routes/carnet.tsx`**

À la ligne 13 :

```tsx
/* AVANT */
<h1 className="font-display italic text-[64px] text-ink leading-none">Le Carnet</h1>
/* APRÈS */
<h1 className="font-headline text-[64px] text-ink leading-none">Le Carnet</h1>
```

- [ ] **Step 3.3 : Migrer `src/routes/sur-mesure.tsx` (3 titres ≥40px)**

Lignes 40, 78, 105. Pour chacune, remplacer `font-display italic` par `font-headline`. NE PAS toucher la ligne 49 (`font-display italic text-gold text-[40px]` — c'est un chiffre décoratif "1.", "2." style éditorial, garde son rôle d'accent — vérifier le contexte au moment du switch et trancher visuellement si besoin).

Exemple ligne 40 :

```tsx
/* AVANT */
<h2 className="font-display italic text-[40px] text-ink leading-none mb-14">
/* APRÈS */
<h2 className="font-headline text-[40px] text-ink leading-none mb-14">
```

Procéder de même lignes 78 et 105.

- [ ] **Step 3.4 : Migrer `src/routes/creatrice.tsx` (3 titres)**

Lignes 48, 69, 89. Pour chacune, `font-display italic text-[40px|48px]` → `font-headline text-[40px|48px]`.

- [ ] **Step 3.5 : Vérifier `src/routes/index.tsx`**

Lire le fichier complet. Migrer chaque `font-display italic text-[≥40px]` vers `font-headline`. Si aucun, RAS.

- [ ] **Step 3.6 : Type check**

Run: `pnpm exec tsc --noEmit`
Expected : aucune nouvelle erreur.

- [ ] **Step 3.7 : Vérifier visuellement chaque route**

Sur http://localhost:3001/ : naviguer vers `/`, `/collection`, `/carnet`, `/sur-mesure`, `/creatrice`. Tous les gros titres en CAPITALES roman Playfair. Si un titre paraît trop "criard" ou cassé visuellement → noter et discuter (peut nécessiter un ajustement de `letter-spacing` ou de `font-weight` dans `font-headline`).

- [ ] **Step 3.8 : Commit**

```bash
git add src/routes/index.tsx src/routes/collection.tsx src/routes/carnet.tsx src/routes/sur-mesure.tsx src/routes/creatrice.tsx
git commit -m "refactor(typo): migrer h1/h2 des routes principales vers font-headline"
```

---

## Task 4 : Migrer les pages légales

**Files:**
- Modify: `src/routes/cgv.tsx:9`, `src/routes/confidentialite.tsx:9`, `src/routes/mentions-legales.tsx:9`

- [ ] **Step 4.1 : Migrer les 3 h1 légaux**

Mêmes 3 fichiers, même pattern, ligne 9 de chacun :

```tsx
/* AVANT */
<h1 className="font-display italic text-[48px] text-ink leading-none mb-8">{TITRE}</h1>
/* APRÈS */
<h1 className="font-headline text-[48px] text-ink leading-none mb-8">{TITRE}</h1>
```

où `{TITRE}` est respectivement `CGV`, `Confidentialité`, `Mentions légales`.

- [ ] **Step 4.2 : Type check final**

Run: `pnpm exec tsc --noEmit`
Expected : aucune nouvelle erreur (l'erreur préexistante `preview.newsletter.tsx:101` peut rester, hors scope).

- [ ] **Step 4.3 : Vérifier visuellement les 3 pages**

Naviguer vers `/cgv`, `/confidentialite`, `/mentions-legales`. Les h1 en CAPITALES roman Playfair.

- [ ] **Step 4.4 : Commit**

```bash
git add src/routes/cgv.tsx src/routes/confidentialite.tsx src/routes/mentions-legales.tsx
git commit -m "refactor(typo): migrer h1 des pages legales vers font-headline"
```

---

## Task 5 : Validation finale et nettoyage

- [ ] **Step 5.1 : Grep de contrôle**

Run: `rg "font-display italic.*text-\[[4-9]\d|font-display italic.*text-\[1\d{2}" src/`

Expected : aucun résultat (ou uniquement des occurrences volontairement gardées comme la drop-cap d'Etabli.tsx:163 — vérifier qu'elles correspondent à des accents éditoriaux et pas à des h1/h2).

S'il reste des résultats inattendus, les migrer ou justifier leur conservation.

- [ ] **Step 5.2 : Recherche de références aux polices supprimées**

Run: `rg "font-cormorant|font-fraunces|font-marcellus|font-newsreader|EB Garamond" src/`

Expected : aucun résultat. S'il y en a, les supprimer.

- [ ] **Step 5.3 : Tour visuel final**

Sur http://localhost:3001/, parcourir toutes les routes principales. Vérifier :
- Pas de FOUT trop visible au chargement (Playfair est lourd mais `display=swap` actif)
- Hiérarchie typo cohérente : gros titres en CAPITALES roman, sous-titres et nav en italique
- Pas de texte qui tombe en fallback `Times New Roman` (signe que Playfair ne charge pas)

- [ ] **Step 5.4 : Commit final s'il reste des ajustements**

Si des ajustements ont été nécessaires (ex : tweaker `letter-spacing` de `font-headline`), commiter séparément :

```bash
git add -p
git commit -m "refactor(typo): ajuster <ce qui a ete ajuste>"
```

Sinon, le chantier est terminé.

---

## Critères de complétion (à cocher en fin de chantier)

- [ ] Tous les `font-display italic text-[≥40px]` ont été migrés vers `font-headline` (sauf accents éditoriaux justifiés)
- [ ] Aucune référence aux polices supprimées (Cormorant, Fraunces, Marcellus, Newsreader, EB Garamond)
- [ ] Type check passe (`pnpm exec tsc --noEmit`)
- [ ] Vérification visuelle OK sur toutes les routes (`/`, `/collection`, `/sur-mesure`, `/creatrice`, `/carnet`, `/cgv`, `/confidentialite`, `/mentions-legales`)
- [ ] 4-5 commits séparés (CSS, composants, routes principales, pages légales, ajustements éventuels)
