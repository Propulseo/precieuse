import type { StructureResolver } from 'sanity/structure'

/**
 * Structure du menu du Studio, pensée pour Emeline (non-technique) : ordre
 * logique (Pages → Bijoux → Carnet → Réglages), titres en français clair, et
 * séparateurs pour grouper visuellement sans imbriquer de dossiers (moins de
 * clics). On liste TOUS les types de documents : ceux absents seraient cachés.
 *
 * `documentTypeListItem` affiche toujours les vrais documents existants (aucun
 * ID codé en dur), donc pas de risque de pointer un document vide/incorrect.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // — Pages —
      S.documentTypeListItem('homePage').title("Page d'accueil"),
      S.documentTypeListItem('surMesurePage').title('Page Sur-Mesure'),
      S.documentTypeListItem('creatricePage').title('Page Créatrice (À propos)'),
      S.documentTypeListItem('contact').title('Contact'),

      S.divider(),

      // — Bijoux —
      S.documentTypeListItem('piece').title('Les bagues (collection)'),
      S.documentTypeListItem('matiere').title('Matières'),

      S.divider(),

      // — Carnet —
      S.documentTypeListItem('article').title('Articles du Carnet'),
      S.documentTypeListItem('temoignage').title('Témoignages'),
      S.documentTypeListItem('etapeEtabli').title("Étapes de l'atelier"),

      S.divider(),

      // — Réglages —
      S.documentTypeListItem('siteSettings').title('Paramètres du site'),
      S.documentTypeListItem('footer').title('Pied de page'),
      S.documentTypeListItem('legalPage').title('Pages légales'),
    ])
