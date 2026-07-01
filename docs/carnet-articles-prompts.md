# Carnet — prompts de recherche & rédaction des articles

But : produire le **corps** de chaque article du Carnet, avec des **faits vérifiés**
et la **voix de la marque**.

Mode d'emploi : ouvrir une **nouvelle conversation Claude avec recherche web
activée**, coller le **PROMPT DE CONTEXTE GÉNÉRAL** ci-dessous **+ un prompt
d'article**. Claude rend le contenu prêt à intégrer (format de blocs décrit).

---

## PROMPT DE CONTEXTE GÉNÉRAL (à coller en tête de chaque demande)

```
Tu rédiges un article pour Le Carnet, le journal éditorial de Précieuse, un atelier de joaillerie artisanale (créatrice : Emeline Le Ray, joaillière diplômée). TOUT est fabriqué EN FRANCE, à l'atelier de Bordeaux — ne JAMAIS écrire Portugal ni Lisbonne. Or 18 carats (750‰, standard français), jamais 19 carats. Diamants/pierres certifiés GIA ou HRD.

Lectrices : des femmes (et leurs proches) en quête d'un bijou qui a du sens — fiançailles, alliance, transmission — en phase de découverte et de confiance, PAS un public d'experts. Ce n'est PAS un e-commerce : on ne vend pas en ligne, le parcours se termine par un échange humain (sur-mesure, devis).

Voix : chaleureuse, intime, précieuse, à la première personne de l'atelier (« je », « à l'atelier »). On montre le geste, on ne récite pas un slogan « luxe ». Français vulgarisé, sans jargon (ou jargon expliqué). Phrases claires, rythme lent. Aucun prix, aucune affirmation marketing invérifiable. Sur l'or : parler de « traçabilité garantie » — NE PAS dire « traité de Kimberley » (qui ne concerne QUE les diamants bruts, pas l'or).

Exigence factuelle : tout fait technique (gemmologie, métallurgie, certifications, traçabilité) doit être exact et vérifié sur le web. Corrige les idées reçues. Cite tes sources (liens) en fin de réponse.

Format de sortie (texte simple, PAS de JSON) :
1. CHAPÔ : 1–2 phrases, préfixées « Chapô : ».
2. 3 à 5 sections : un sous-titre sur sa propre ligne, puis les paragraphes.
3. Citation (si pertinent) : ligne « Citation : "…" — Auteur ». Liste (si pertinent) : « Liste : » puis des puces « - ».
4. Longueur = le temps de lecture indiqué.
5. SOURCES : liens fiables en fin de réponse.
Donne juste un texte clair et structuré ; la mise en forme finale (intégration) sera faite ensuite.
```

---

## PROMPTS PAR ARTICLE

### 1. `chemin-dune-bague` — « Le chemin d'une bague : de l'esquisse à l'écrin » (Atelier · ~6 min)
*(Déjà rédigé en exemple — ce prompt sert à l'enrichir/refaire.)*
```
ARTICLE : « Le chemin d'une bague : de l'esquisse à l'écrin » (Atelier · ~6 min).
Angle : la fabrication complète d'une bague entourage (type « Joséphine », or 18 carats, diamants) en ~4 semaines, à l'atelier de Bordeaux. Récit sensible, pas un mode d'emploi.
À inclure/vérifier : dessin/croquis ; passage en volume (cire sculptée OU CAO/prototypage) ; fonte à la cire perdue ; sertissage main (griffes/pavé) ; polissage ; contrôle ; gravure intérieure ; écrin. Vérifie la terminologie métier.
```

### 2. `or-18kt-source-trace` — « L'or 18 carats, sourcé et tracé » (Matières · ~4 min)
```
ARTICLE : « L'or 18 carats, sourcé et tracé » (Matières · ~4 min).
Angle : ce que veut dire un or 18 carats et comment garantir un or responsable.
À expliquer : or 18 carats = ~75 % d'or pur + alliage (18/24, soit 750‰) ; pourquoi ce titrage en joaillerie (solidité vs pureté) ; couleurs jaune/blanc/rose selon l'alliage.
Traçabilité de l'or (RECHERCHE et explique) : or recyclé, Fairmined, Fairtrade Gold, Responsible Jewellery Council (RJC) Chain of Custody.
⚠️ NE PAS attribuer la traçabilité de l'or au « traité de Kimberley » : Kimberley concerne les DIAMANTS bruts, pas l'or. Ton pédagogique, rassurant.
```

### 3. `journal-fonte-matinee-atelier` — « Journal de fonte : une matinée à l'atelier » (Atelier · ~5 min)
```
ARTICLE : « Journal de fonte : une matinée à l'atelier » (Atelier · ~5 min).
Angle : récit immersif et sensoriel d'une fonte à la cire perdue, un matin à l'atelier de Bordeaux (tension, geste, « une seule chance »).
⚠️ VÉRIFIE LA TEMPÉRATURE : 1 064 °C est le point de fusion de l'or PUR (24 ct). Un or 18 carats (alliage) fond à une température différente (souvent plus basse) — recherche la valeur correcte et ajuste, ou parle explicitement de l'or pur.
À expliquer simplement : le principe de la cire perdue (moule réfractaire, cire évacuée, métal coulé). Ton narratif.
```

### 4. `choisir-pierre-precieuse` — « Comment choisir sa pierre précieuse » (Guides · ~7 min)
```
ARTICLE : « Comment choisir sa pierre précieuse » (Guides · ~7 min).
Angle : guide clair pour choisir une pierre, sans jargon.
À vérifier/expliquer : les 4 C du diamant — Carat (poids), Cut (taille/proportions), Color (couleur), Clarity (pureté). Désambiguïse « taille » en français (= poids ET travail de taille). Ajoute l'origine/traçabilité et la certification (GIA, HRD : qui sont ces labos, ce que certifie un rapport). Précise que pour les pierres de couleur les critères diffèrent (la couleur prime). Termine par 4-5 conseils concrets.
```

### 5. `rhodolite-pierre-oubliee` — « La rhodolite, pierre oubliée » (Matières · ~3 min)
```
ARTICLE : « La rhodolite, pierre oubliée » (Matières · ~3 min). Court, vivant, factuel.
Angle : portrait d'une gemme discrète qui mérite l'attention.
À vérifier (gemmologie) : la rhodolite est un grenat (série pyrope–almandin) ; couleur rose framboise à pourpre ; dureté ~7–7,5 Mohs (adaptée au port quotidien) ; prix abordable ; provenances (Tanzanie, Mozambique, Sri Lanka…). Explique pourquoi elle est sous-estimée et pour quels bijoux elle convient.
```

### 6. `bague-portee-au-quotidien` — « Portée au quotidien : les gestes qui comptent » (Guides · ~4 min)
```
ARTICLE : « Portée au quotidien : les gestes qui comptent » (Guides · ~4 min).
Angle : guide d'entretien bienveillant et pratique d'une bague en or sertie.
À vérifier/inclure : nettoyage maison (eau tiède + savon doux + brosse souple ; précautions selon la pierre — certaines craignent les ultrasons/la chaleur) ; quand retirer la bague (sport, ménage, piscine/chlore, crèmes) ; rangement (séparé, à l'abri des chocs) ; contrôle pro périodique (griffes, sertissage). Donne une liste de gestes simples.
```

---

## Intégration (une fois le contenu reçu)

Le `lede` → champ `lede` ; le `body` (tableau de blocs) → champ `body` de l'article
dans `src/lib/content/carnet.ts` (type `ArticleBlock`). La page `/carnet/<slug>` les
rend automatiquement. Penser à traduire EN/PT ensuite (ou via Sanity).
