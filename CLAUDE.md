# CLAUDE.md — Precieuse v2

## Projet
Site editorial premium pour Precieuse (joaillerie artisanale d'Emeline, fabrication Portugal).
Objectif : capter des leads sur-mesure, presenter la collection (5 modeles), batir la confiance via le storytelling.
**Pas un e-commerce classique** : paiements hors-site apres echange humain (virement / PayPal).

## Stack
- **Framework** : TanStack Start (React 19, Vite 8, SSR + streaming)
- **Backend** : Convex (leads sur-mesure, contact, newsletter, souscriptions entretien)
- **CMS** : Sanity (catalogue produits, temoignages, articles, copy editoriale) — gere par Emeline
- **Auth** : BetterAuth (acces admin interne dashboard leads)
- **UI** : Tailwind v4 + shadcn/ui + lucide-react
- **i18n** : Paraglide (FR base, EN, PT)
- **Emails** : Brevo (transactionnel + newsletter) — a brancher
- **Deploiement** : Nitro adapter → Coolify sur VPS OVH (staging)

## Commandes
- Dev (front + Convex) : `pnpm dev` puis `pnpm exec convex dev` dans un autre terminal
- Build : `pnpm build`
- Type check : `pnpm exec tsc --noEmit`
- Lint : `pnpm lint`
- Format : `pnpm format`
- Tests : `pnpm test`

## Architecture
- `src/routes/` → routes file-based TanStack
- `src/components/` → composants UI (shadcn dans `ui/`)
- `src/integrations/convex/`, `src/integrations/better-auth/` → providers cle en main
- `src/lib/` → helpers (`utils.ts`, `auth-client.ts`, `auth.ts`, `sanity.ts`)
- `convex/` → schemas, queries, mutations, actions (backend)
- `convex/_generated/` → genere automatiquement, NE PAS toucher
- `messages/` → traductions Paraglide (`fr.json`, `en.json`, `pt.json`)
- Source de contenu/design existant : `C:\Users\cleme\Desktop\Propulseo\precieuse-old\` (ancien Next.js a porter)

## Regles
- **IMPORTANT — Pas de checkout, pas de panier, pas de compte client.** Le PRD est explicite : site de mise en relation premium, pas e-commerce transactionnel.
- **Catalogue produits dans Sanity, jamais dans Convex.** Convex stocke uniquement les leads et donnees dynamiques.
- **BetterAuth uniquement pour l'admin interne** (Lyes + Emeline). Pas d'auth grand public.
- **IMPORTANT — Toutes les pages doivent etre traduites FR/EN/PT** des qu'elles ont du contenu user-facing.
- **Convex queries/mutations = fonctions pures.** Pour les appels externes (Brevo, Sanity webhooks), utiliser une `action`.
- **Schema Convex strict** : tout ID = `Id<"table">`, validation des args via `v.*` de `convex/values`.
- **IMPORTANT — Performance** : LCP mobile < 2.5s (objectif PRD pour les Ads). Optimiser images, lazy-load, splitter les bundles.
- **Migration depuis precieuse-old** : reutiliser le PRD (`precieuse-old/docs/precieuse-prd.md`), le design choisi (v3, v3a/b/c, ou v4c — a decider), les assets `precieuse-old/content/`.

## Workflow
- Avant de coder une feature : verifier le PRD (`precieuse-old/docs/precieuse-prd.md`) pour les FR/NFR correspondants.
- Modifs minimales, pas de refactor non lie. Confirmer avant gros changements (refonte UI, migration schema Convex).
- Apres changement de `convex/schema.ts` : verifier dans le terminal `convex dev` qu'aucune migration manquante n'est signalee.
- Commits separes par changement logique. Prefixes : `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `i18n:`.
- Type check obligatoire apres chaque modif de code.

## Hors scope
- NE PAS modifier `convex/_generated/` (regenere automatiquement).
- NE PAS toucher `.env.local` ni les secrets sans accord explicite.
- NE PAS desactiver le strict TS ni les regles de lint.
- NE PAS ajouter de logique de panier / checkout / paiement direct.
- NE PAS supprimer ou modifier `precieuse-old/` (c'est notre source d'archive).

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
