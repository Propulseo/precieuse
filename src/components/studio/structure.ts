import {
  BookIcon,
  CaseIcon,
  CogIcon,
  CommentIcon,
  DiamondIcon,
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
  SparkleIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
} from '@sanity/icons'
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
      S.documentTypeListItem('homePage').title("Page d'accueil").icon(HomeIcon),
      S.documentTypeListItem('surMesurePage').title('Page Sur-Mesure').icon(SparkleIcon),
      S.documentTypeListItem('creatricePage').title('Page Créatrice (À propos)').icon(UserIcon),
      S.documentTypeListItem('contact').title('Contact').icon(CommentIcon),

      S.divider(),

      // — Bijoux —
      S.documentTypeListItem('piece').title('Les bagues (collection)').icon(DiamondIcon),
      S.documentTypeListItem('matiere').title('Matières').icon(TagIcon),

      S.divider(),

      // — Carnet —
      S.documentTypeListItem('article').title('Articles du Carnet').icon(BookIcon),
      S.documentTypeListItem('temoignage').title('Témoignages').icon(UsersIcon),
      S.documentTypeListItem('etapeEtabli').title("Étapes de l'atelier").icon(CaseIcon),

      S.divider(),

      // — Réglages —
      S.documentTypeListItem('siteSettings').title('Paramètres du site').icon(CogIcon),
      S.documentTypeListItem('footer').title('Pied de page').icon(FolderIcon),
      S.documentTypeListItem('legalPage').title('Pages légales').icon(DocumentTextIcon),
    ])
