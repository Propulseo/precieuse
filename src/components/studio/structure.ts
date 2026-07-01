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
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

/**
 * Éditeur mono-document pour une page unique (singleton) : ouvre DIRECTEMENT le
 * document — pas de liste, donc pas de bouton « + Créer », donc aucun doublon
 * possible. C'est le seul garde-fou fiable : `singletonNewDocumentOptions` ne
 * filtre que le menu créer global, pas le « + » d'un volet-liste.
 *
 * L'`_id` est figé (= le type) : les 5 singletons ci-dessous sont seedés avec
 * `_id === _type` (voir scripts/seed-editabilite.ts & seed-sanity.ts), donc on
 * pointe toujours le VRAI document, jamais un doc vide.
 */
const singleton = (
  S: StructureBuilder,
  id: string,
  title: string,
  icon: typeof HomeIcon,
) => S.listItem().id(id).title(title).icon(icon).child(S.document().schemaType(id).documentId(id))

/**
 * Structure du menu du Studio, pensée pour Emeline (non-technique) : ordre
 * logique (Pages → Bijoux → Carnet → Réglages), titres en français clair, et
 * séparateurs pour grouper visuellement sans imbriquer de dossiers (moins de
 * clics). On liste TOUS les types de documents : ceux absents seraient cachés.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // — Pages — (singletons : éditeur mono-document, pas de doublon possible)
      singleton(S, 'homePage', "Page d'accueil", HomeIcon),
      singleton(S, 'surMesurePage', 'Page Sur-Mesure', SparkleIcon),
      // creatricePage : pas encore seedée (retravaillée côté front) et lue via
      // `[0]` sans `_id` canonique → on garde la liste tant qu'aucun document
      // `_id: 'creatricePage'` n'existe. À passer en singleton() une fois créé.
      S.documentTypeListItem('creatricePage').title('Page Créatrice (À propos)').icon(UserIcon),
      singleton(S, 'contact', 'Contact', CommentIcon),

      S.divider(),

      // — Bijoux — (multi-documents : liste normale)
      S.documentTypeListItem('piece').title('Les bagues (collection)').icon(DiamondIcon),
      S.documentTypeListItem('matiere').title('Matières').icon(TagIcon),

      S.divider(),

      // — Carnet — (multi-documents)
      S.documentTypeListItem('article').title('Articles du Carnet').icon(BookIcon),
      S.documentTypeListItem('temoignage').title('Témoignages').icon(UsersIcon),
      S.documentTypeListItem('etapeEtabli').title("Étapes de l'atelier").icon(CaseIcon),

      S.divider(),

      // — Réglages — (siteSettings/footer = singletons ; legalPage = multi-docs)
      singleton(S, 'siteSettings', 'Paramètres du site', CogIcon),
      singleton(S, 'footer', 'Pied de page', FolderIcon),
      S.documentTypeListItem('legalPage').title('Pages légales').icon(DocumentTextIcon),
    ])
