# Refonte Sur-mesure — reproduction CustomMade (preview HTML)

> **Pour exécutant agentique :** ce plan est exécuté en **ultracode** (workflow multi-agents). Build single-author pour la cohérence, puis revue adversariale multi-lentilles, puis corrections. Vérification navigateur (Playwright) par le pilote après le workflow.

**Goal :** produire une preview HTML autonome `public/previews/sur-mesure.html` qui reproduit la **structure et le feel éditorial de CustomMade Jewelers**, adaptés à la marque Précieuse, pour valider la nouvelle page Sur-mesure avant portage React.

**Architecture :** un seul fichier HTML autonome (fonts Google Spectral+Ysabeau, tokens inline, images réelles servies depuis `/images/...`), à l'échelle d'une page complète. Convention identique aux previews existantes (`footer-mix.html`, `apropos-*`). Pas de build, pas de dépendance.

**Tech stack :** HTML/CSS/JS vanilla. CSS Grid, `position: sticky`, IntersectionObserver pour révélations, une marquee CSS. `prefers-reduced-motion` respecté.

## Global Constraints (verbatim, non négociables)

- **Marque préservée — on NE touche PAS** aux tokens de marque ni à `src/styles.css`/`Nav`/`brand*` (chantier couleurs en parallèle). La preview est autonome.
- **Palette Précieuse uniquement** (reproduit les *rôles* de CustomMade, pas ses couleurs) : fond `--poudre #eadcd3` ; encre/sections sombres `--canard #125e5e` (foncé `--canard-90 #0d4747`) ; accent (eyebrows, filets, ornements, hovers) `--rubis #b80049`. Pas de lilas, pas de bordeaux étranger. CTA primaire = `bg-canard` texte poudre, hover rubis.
- **Typo** : display/titres = **Spectral** (serif 400/500) ; corps = **Ysabeau Office** (sans 300, italique 300 pour annotations). Échelle titres ≤ ~6rem.
- **ZÉRO em-dash (—) et zéro en-dash (–)** visible. Hyphen `-` uniquement. (Règle skill design.)
- **Point médian `·`** rationné : max 1 par ligne de métadonnée.
- **Eyebrows** (petits sur-titres capitales) : max 1 pour 3 sections.
- **Images réelles** (jamais de faux écran en `<div>`). Hero en premier (LCP). Reste `loading="lazy"`.
- **Marquee** : une seule sur la page.
- **Mobile** : chaque grille multi-colonnes déclare son repli `< 768px`. `min-h-[100dvh]` jamais `h-screen`.
- **Contraste AA** : corps canard sur poudre ; sur sections canard, texte poudre. Labels de formulaire AU-DESSUS des champs (jamais placeholder-as-label).

---

## Mapping structure CustomMade → Précieuse

Ordre des sections (reproduit le flux de la référence, + clôture conversion) :

1. **Nav** (sticky, transparente sur hero puis opaque) — logo « Précieuse » (masque `/brand/logo-teal.png`) à gauche ; liens centre : *Le procédé · L'atelier · Réalisations · Témoignages* ; droite : CTA plein « Prendre rendez-vous ». Une seule ligne desktop, hauteur ≤ 72px ; burger < 900px (statique, non fonctionnel en preview).
2. **Héro** plein cadre — image `/images/real/deux-mains.webp`, voile canard. H1 serif `clamp(44px,6.4vw,86px)` : « Votre bijou n'existe *pas encore.* » (accent rubis italique sur « pas encore »). Sous-titre ≤ 20 mots. 1 CTA « Commencer votre projet » → `#invitation`. `min-h-[100dvh]`.
3. **Marquee** bande poudre, filets haut/bas canard/15, items défilants séparés par un petit losange rubis : `PIÈCE UNIQUE · OR 18 CARATS · FABRIQUÉ À BORDEAUX · PIERRES CERTIFIÉES · FAIT MAIN · RÉPONSE 48 H`. Pause au survol, fige en reduced-motion.
4. **Manifeste** centré (« WHAT WE DO ») — eyebrow rubis « CE QUE JE FAIS » (eyebrow #1), grande déclaration serif : « Je ne vends pas des bijoux. Je vous aide à faire naître le vôtre. Dessiné pour vous, façonné à la main, fait pour durer. » Ornement picto Précieuse dessous (masque `/brand/picto-teal.png`, filet rubis de part et d'autre).
5. **Split « du croquis à votre main »** — gauche : titre « Je le fais *unique*. Vous le rendez vôtre. » + paragraphe (échange → esquisse → affinage) + lien « En savoir plus → ». Droite : photo `/images/atelier/esquisses-amethyste.jpg`. (Pas d'eyebrow ici.)
6. **Le procédé** — 4 étapes reliées par un filet horizontal, chacune une **icône au trait** (SVG ligne simple, stroke rubis 1.5, style « dessiné main » assumé pour matcher la réf) + label : **Échange · Esquisse · Fonte · Écrin**. Mobile : 2×2 puis 1 colonne.
7. **Le choix de la pierre** (section sombre canard, façon « SELECTING THE STONE ») — gauche photo `/images/real/bague-pierre-aurore.webp` ; droite : eyebrow rubis-clair « LA PIERRE » *(non — réserver le budget eyebrow ; utiliser un simple filet)*, titre poudre « Classique, colorée, ou totalement inattendue. » + paragraphe (diamants GIA/HRD, pierres de couleur, choisies une à une) + 2 liens soulignés rubis « Diamants certifiés » / « Pierres de couleur ».
8. **Garantie** (carte claire en débord sur bande canard + sceau) — petite ligne « ON SE COMPREND. », phrase « C'est une grande décision. Je vous accompagne et vous protège à chaque étape. » + lien « Voir les garanties → » + médaillon sceau (picto Précieuse cerclé).
9. **L'atelier / Emeline** (« ABOUT US ») — titre « Créatrice. Joaillière. *Un peu* lectrice de pensées. » photos dispersées : `/images/emeline/emeline-atelier.jpg` + `/images/atelier/bague-en-fabrication.jpg` + `/images/real/main-poche-josephine.webp` ; badge circulaire texte « PRÉCIEUSE · ATELIER · BORDEAUX » ; paragraphe (approche humaine, mains expertes, fabriqué en France) + lien « Rencontrer Emeline → ».
10. **Réalisations** (exclusif Sur-mesure) — duos *atelier + portée*, 3 pièces : Joséphine (`bague-entouree-josephine` + `main-chaise-josephine`), Aurore (`bague-pierre-aurore` + `bague-main-chaise-aurore`), Thelma (`bague-boule-thelma` + `mains-poche-thelma`). Légende centrale (titre + matière). Eyebrow rubis « RÉALISATIONS » (eyebrow #2).
11. **Témoignages** — 3 voix réelles (LETTRES) : Martine B. (Bordeaux), Sandrine L. (Lyon), Camille R. (Paris). Citation ≤ 3 lignes, médaillon initiale, attribution `Prénom · Ville`.
12. **Invitation (formulaire)** — bandeau clair ; gauche : présence d'Emeline (« Premier échange, sans engagement », « Racontez-moi votre projet. », réponse 48 h, signature « Emeline », WhatsApp + email Bordeaux) ; droite : carte formulaire. Champs **avec labels au-dessus** : Prénom/Nom, Email, Téléphone (optionnel), Type de création (select), Budget indicatif (select), Votre projet (textarea), bouton « Envoyer ma demande », ligne légale → confidentialité.
13. **Footer** — bloc canard de clôture : picto + wordmark, nav, « Atelier · Bordeaux », mentions légales.

## Copie (verbatim, source = audit + content existant)

- Témoignages : Martine B. « Emeline est tout simplement une artiste. Le résultat est au-delà de ce que j'avais imaginé. Je suis émue et enthousiasmée. » / Sandrine L. « Très contente de votre création pour ma bague. Professionnelle, agréable. Je recommande sans hésiter. » / Camille R. « On sent dans chaque pièce le temps passé, la précision, l'amour du métier. Toujours aussi belle deux ans après. »
- Procédé (détails courts) : Échange = « Vous me parlez de vous, de l'occasion, du geste imaginé. » · Esquisse = « Deux ou trois croquis au crayon, autant de directions. » · Fonte = « Cire perdue, or 18 carats coulé pièce unique, à Bordeaux. » · Écrin = « Polissage et sertissage à la main, certificat, remise sécurisée. »
- Selects : Type = Bague / Alliance / Pendentif / Boucles d'oreilles / Autre création. Budget = Je préfère en discuter / Création sur-mesure / Pièce d'exception *(à remplacer par de vraies fourchettes côté Emeline — noter en commentaire)*.

## Assets disponibles (vérifiés)

`/images/real/*.webp` (deux-mains, mains-poche-thelma, bague-*, main-chaise-*, buste-thelma-louise, eugenie-dessin.png) · `/images/emeline/emeline-atelier.jpg` · `/images/atelier/{bague-en-fabrication,dessin-aquarelle,esquisses-amethyste}.jpg` · `/images/matieres/{diamants,emeraudes,or-19kt,rubis,saphirs}-v2.jpg` · `/brand/{picto-teal.png,logo-teal.png}`.

---

## Exécution ultracode (workflow)

- **Phase Build** — 1 agent écrit `public/previews/sur-mesure.html` en entier à partir de ce spec (auteur unique = cohérence visuelle).
- **Phase Revue** (parallèle, adversariale) — lentilles indépendantes sur le fichier produit :
  1. *Design tells* (règles skill design-taste : eyebrows, zigzag, hero stack, em-dash, marquee, faux écrans).
  2. *A11y / contraste* (AA, labels au-dessus, focus, alt).
  3. *Responsive / mobile* (replis déclarés, `100dvh`, grilles).
  4. *Fidélité CustomMade* (les 9 sections de la réf présentes et reconnaissables).
  5. *Copie / marque* (zéro em-dash, point médian rationné, ton FR, palette poudre/canard/rubis only).
- **Phase Fix** — 1 agent applique les findings confirmés (verdict réel) au fichier.
- **Vérif pilote** — Playwright : screenshots desktop (1440) + mobile (390), 0 erreur console, marquee + reveals + nav OK. Ajout d'une carte dans `public/previews/index.html`.

## Definition of Done

- [ ] `public/previews/sur-mesure.html` reproduit les 13 sections, palette Précieuse, fidèle au feel CustomMade.
- [ ] Hook design (`impeccable`) sans finding non justifié ; pre-flight skill OK (eyebrows ≤ 2-3, zéro em-dash, hero ≤ 2 lignes, marquee unique, mobile replié).
- [ ] Rendu navigateur vérifié desktop + mobile, 0 erreur console.
- [ ] Carte ajoutée dans l'index des previews.
- [ ] (Hors scope ici) portage React + i18n FR/EN/PT à planifier ensuite.
