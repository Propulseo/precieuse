# Page Créatrice éditable via Sanity — sans régression visuelle

**Date :** 2026-07-01
**Branche :** `claude/refonte-bordeaux`
**Statut :** Design validé, prêt pour plan d'implémentation

## Problème

La page `/creatrice` a un design figé et soigné — une « lettre signée » : portrait
encadré avec filigranes de marque, légende « Emeline Le Ray · Bordeaux · MMXXV »,
corps en lettrine, séparateur filigrane, citation en exergue, cachet d'atelier rond
et signature « Emeline ». Ce design vit dans `CreatriceStatic.tsx` (repli Paraglide).

C'est la **seule page/type Sanity vide** (audit 2026-07-01 : `creatricePage` = 0 doc
publié ; tous les autres types remplis). Elle avait été volontairement laissée hors
du seed pendant sa refonte front.

Le rendu piloté par Sanity existant, `CreatriceCms.tsx`, affiche un design **différent
et générique** (en-tête + portrait simple + `sections[]` à image alternée + citation) :
ni filigranes, ni légende, ni lettrine, ni cachet, ni signature. Le schéma
`creatricePage` (overline/title/intro/sections/quote) modélise ce vieux design.

`creatrice.tsx` : `getCreatrice()` non-null ⇒ rend `<CreatriceCms>`, sinon
`<CreatriceStatic>`. **Conséquence : créer un document `creatricePage` bascule la page
sur le rendu CMS générique = régression visuelle.**

## Objectif

Rendre la page Créatrice **entièrement éditable par Emeline depuis Sanity** (tout le
texte + le portrait, décision utilisateur), **sans changer d'un pixel** son apparence
actuelle. On aligne le rendu CMS et le schéma sur le design figé, puis on seede.

## Hors périmètre (non-goals)

- Ne pas modifier le **design** de la page (il est figé).
- Ne pas rendre éditable le **bandeau de clôture** (CTA `ClosingInvite`) : sa microcopie
  (`creatrice_cta_title` / `creatrice_cta_button`) reste en Paraglide, comme le reste de
  la microcopie structurelle du site.
- Ne toucher **aucune autre page** ni aucun autre type Sanity.
- Décors purement graphiques (SVG filigrane, cachet rond, fleur, lettrine) : restent
  codés en dur, jamais éditables.

## Décisions (validées)

1. **Éditable = tout le texte + le portrait.** Seuls les décors SVG restent figés.
2. **Paragraphes de parcours = liste** (`array` de paragraphes) : Emeline peut en
   ajouter/retirer ; la lettrine s'applique automatiquement au premier.
3. **Seed publié directement** : la page devient pilotée par Sanity immédiatement et
   reste identique. Retour arrière = supprimer le document (repli statique reprend).
4. Le CTA reste en Paraglide (cf. hors-périmètre).

## Champs éditables (mapping)

Textes éditoriaux = `localizedString`/`localizedText` (FR/EN/PT). Noms propres
language-neutres = `string` simple (comme `footer.social.label`, `siteSettings.email`).

| Champ Sanity      | Type                     | Source du seed                     | Rendu (statique actuel)                 |
|-------------------|--------------------------|------------------------------------|-----------------------------------------|
| `introTitle`      | `localizedString`        | `creatrice_intro_title`            | Titre EditorialHeader (« Moi c'est Emeline. ») |
| `introLede`       | `localizedText`          | `creatrice_intro_lede`             | Paragraphe d'intro (italique)           |
| `portrait`        | `image` (hotspot) + `alt` `localizedString` | `/images/emeline-portrait.jpg` + `creatrice_intro_portrait_alt` | Portrait encadré |
| `captionName`     | `string`                 | littéral « Emeline Le Ray »        | Légende, avant le point framboise       |
| `captionPlace`    | `string`                 | littéral « Bordeaux · MMXXV »      | Légende, après le point framboise       |
| `parcours`        | `array` de `localizedText` | `[creatrice_parcours_p1, creatrice_parcours_p2]` | Corps de lettre (lettrine sur le 1er) |
| `philosophieBody` | `localizedText`          | `creatrice_philosophie_body`       | Paragraphe après le filigrane           |
| `quote`           | `localizedText`          | `creatrice_philosophie_quote`      | Citation en exergue                     |
| `signatureName`   | `string`                 | littéral « Emeline »               | Signature (grand serif italique)        |
| `signatureRole`   | `localizedString`        | `creatrice_signature_role`         | Rôle sous la signature                  |

Chaque champ reçoit une **aide (`description`) en français** dans l'esprit des 52 aides
déjà en place (cf. lot Studio).

## Architecture

### 1. Schéma `sanity/schemaTypes/documents/creatricePage.ts` (réécrit)

L'ancien contenu (`overline`, `sections[]`) est supprimé : 0 document existant, donc
aucune migration. Nouveaux champs = tableau ci-dessus. `preview.prepare` inchangé
(`{ title: 'Page Créatrice' }`). Réutilise le helper `localizedImage()` pour le portrait.

### 2. Ornements partagés `src/components/creatrice/ornements.tsx` (nouveau)

Extraction de `Filigrane` et `Seal` (aujourd'hui internes à `CreatriceStatic.tsx`) dans
un module partagé, importé par les deux rendus. Garantit que statique et CMS affichent
**exactement** les mêmes décors. Refactor pur, aucun changement visuel.

### 3. `src/components/creatrice/CreatriceStatic.tsx` (léger refactor)

Importe `Filigrane`/`Seal` depuis `ornements`. Sinon inchangé — reste le repli exact
quand le document Sanity est vide/supprimé.

### 4. `src/components/creatrice/CreatriceCms.tsx` (réécrit)

Rend le **même JSX que `CreatriceStatic`**, mais en lisant `content.*` au lieu des clés
Paraglide et des littéraux codés en dur :
- `content.introTitle`, `content.introLede`
- portrait : `content.portrait.url` + `alt` + `objectPosition` (hotspot)
- légende : `content.captionName` / `content.captionPlace`
- `content.parcours[]` (lettrine sur l'index 0), `Filigrane`, `content.philosophieBody`
- citation `content.quote`, cachet `Seal` + `content.signatureName` / `content.signatureRole`
- CTA : `ClosingInvite` avec `m.creatrice_cta_title()` / `m.creatrice_cta_button()` (Paraglide)

Rendu conditionnel de chaque bloc si la valeur est présente (comme aujourd'hui).

### 5. `src/lib/cms/content.ts` — `getCreatrice()` + type `CreatriceContent`

- Nouveau `CreatriceContent` (forme résolue pour une locale) :
  `{ introTitle, introLede, portrait{url,alt,position}, captionName, captionPlace,
     parcours: string[], philosophieBody, quote, signatureName, signatureRole }`.
- Requête GROQ mise à jour pour projeter les nouveaux champs ; mapping via `pickLocale`
  pour les localisés, valeurs brutes pour les `string`. Renvoie `null` si non configuré
  ou si aucun document (comportement de repli inchangé).

### 6. `scripts/seed-creatrice.ts` (nouveau)

Même ossature que `seed-editabilite.ts` (client `@sanity/client`, `.env`, helpers
`L()`/`uploadImage()`). Upload le portrait, construit le document depuis Paraglide +
littéraux, `createOrReplace` sur `_id: 'creatricePage'` (publié). Idempotent.
Documenté dans l'en-tête (commande de lancement + variables requises).

### 7. `src/components/studio/structure.ts` — verrou singleton

`creatricePage` passe de `documentTypeListItem(...)` à
`singleton(S, 'creatricePage', 'Page Créatrice (À propos)', UserIcon)` (helper déjà en
place). Fini la liste + bouton « + » ; le doc est déjà exclu du menu créer global.

## Vérification

- **`pnpm exec tsc --noEmit`** → exit 0.
- **Parité pixel (Playwright)** : screenshot `/creatrice` **avant** (repli statique) et
  **après** le seed (rendu CMS piloté par Sanity). Les deux doivent être **identiques**.
  Console **0 erreur** sur la page publique. Si un écart apparaît → corriger
  `CreatriceCms` jusqu'à parité (c'est le critère de réussite).
- Dans le **Studio** : la Créatrice ouvre désormais **directement l'éditeur rempli**
  (plus « Aucun document de ce type »), et n'offre plus de bouton créer.

## Rollback

Supprimer le document `creatricePage` (Studio ou script) ⇒ `getCreatrice()` renvoie
`null` ⇒ `CreatriceStatic` reprend la main. Aucune perte : le repli statique et le seed
proviennent de la même source Paraglide.

## Séquence d'implémentation (tranche verticale)

1. Ornements partagés + refactor `CreatriceStatic` (aucun changement visuel — vérifier).
2. Schéma `creatricePage` réécrit.
3. `getCreatrice()` + type `CreatriceContent`.
4. `CreatriceCms` réécrit (parité avec le statique).
5. `seed-creatrice.ts` + exécution (seed publié).
6. Verrou singleton dans `structure.ts`.
7. Vérif tsc + parité pixel Playwright + Studio.
