# Refonte typographique — Précieuse v2

Date : 2026-05-27
Statut : approuvé pour implémentation

## Contexte

Le site utilise actuellement **EB Garamond** comme police display (titres, nav, footer, annotations éditoriales). EB Garamond est un old-style serif humaniste, peu contrasté, qui ne rend pas le registre "haute joaillerie" attendu.

Les références fournies par l'utilisateur (Playfair Display, Didot, et un titre "PRÉCIEUSE JOAILLERIE" en très gros) sont toutes des **serifs didones à fort contraste** — déliés très fins, pleins épais, hairline serifs. C'est le style qu'on veut.

Quatre polices supplémentaires sont actuellement chargées via Google Fonts (Cormorant Garamond, Fraunces, Marcellus, Newsreader) mais **jamais utilisées dans le code** (vérifié par grep — seule occurrence dans `styles.css` au niveau des déclarations). Elles plombent la perf inutilement.

## Décisions

1. **Police display** : Playfair Display (remplace EB Garamond)
2. **Police corps** : Inter (inchangée)
3. **Police script** : Caveat, conservée pour la signature manuscrite (`AvantPropos.tsx` ligne 77 etc.)
4. **Suppression** : Cormorant Garamond, Fraunces, Marcellus, Newsreader
5. **Deux registres d'usage** :
   - `font-display` (existante) : Playfair **italic** pour nav, footer, annotations, sous-titres, accents éditoriaux
   - `font-headline` (**nouvelle utilité**) : Playfair **roman** en CAPITALES pour h1/h2 de hero et titres de sections majeures (≥40px)

## Architecture

### Fichier principal : `src/styles.css`

**Modifications :**

- Ligne 6 — Réécrire le `@import url(...)` Google Fonts :
  - Retirer : `Cormorant+Garamond`, `Fraunces`, `Marcellus`, `Newsreader`
  - Ajouter : `Playfair+Display:ital,wght@0,400..900;1,400..900`
- Ligne 71 — `--font-display` : `'EB Garamond', 'Times New Roman', serif` → `'Playfair Display', 'Times New Roman', serif`
- Lignes 73–76 — Supprimer les vars `--font-cormorant`, `--font-fraunces`, `--font-marcellus`, `--font-newsreader`
- Après l'utilité `font-display-lg` (ligne 117) — Ajouter une nouvelle utilité :
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

### Migration des h1/h2 majeurs

Composants/routes à mettre à jour (passer `font-display italic` → `font-headline` sur les titres ≥40px) :

**Composants :**
- `src/components/Hero.tsx`
- `src/components/Series.tsx` (ligne 111 : "La Collection")
- `src/components/Matieres.tsx` (ligne 10)
- `src/components/Etabli.tsx` (lignes 83, 155 : titres de sections)
- `src/components/AvantPropos.tsx` (ligne 69 : titre 52px)

**Routes :**
- `src/routes/index.tsx` (home — vérifier les hero titles)
- `src/routes/collection.tsx` (ligne 14 : "La Collection")
- `src/routes/sur-mesure.tsx` (lignes 40, 78, 105)
- `src/routes/creatrice.tsx` (lignes 48, 69, 89)
- `src/routes/carnet.tsx` (ligne 13 : "Le Carnet")

**Pages légales** (titres 48px — passer ou pas ?) :
- `src/routes/cgv.tsx`, `src/routes/confidentialite.tsx`, `src/routes/mentions-legales.tsx`
- Décision : migrer aussi, par cohérence (un seul style de h1 sur le site).

### Composants intentionnellement non touchés

- `Nav.tsx`, `Footer.tsx` — gardent `font-display italic` (annotations, pas titres)
- Tous les sous-titres, micro-copy, captions en `font-display italic text-[10–18px]` — gardent leur style

## Stratégie de validation

1. **Type check** après modification de `styles.css` (les utilités `@utility` Tailwind v4 doivent rester reconnues).
2. **Validation visuelle** sur le dev server (port 3001, déjà lancé) sur chaque page modifiée :
   - `/` (home)
   - `/collection`
   - `/sur-mesure`
   - `/creatrice`
   - `/carnet`
   - `/mentions-legales`, `/confidentialite`, `/cgv`
3. **Performance** : surveiller que le `&display=swap` reste actif pour Playfair (pas de FOIT). Playfair est plus lourd qu'EB Garamond mais le retrait des 4 polices inutiles compense.

## Hors scope

- Le corps de texte (Inter) reste sans-serif. Pas de bascule serif partout (autre chantier potentiel).
- Self-hosting de Playfair via `@fontsource/playfair-display` — à considérer plus tard si l'objectif PRD LCP mobile < 2.5s est compromis (mesurer d'abord).
- Refonte des composants `Nav` et `Footer` — leur italique fonctionnera très bien en Playfair, pas de migration nécessaire.

## Critères de complétion

- [ ] `styles.css` modifié (imports, vars, utilité `font-headline`)
- [ ] Migration des h1/h2 majeurs (5 composants + 8 routes)
- [ ] Type check OK (`pnpm exec tsc --noEmit`)
- [ ] Vérification visuelle des pages touchées sans régression
- [ ] Commit séparé par étape logique (`refactor(typo): ...`)
