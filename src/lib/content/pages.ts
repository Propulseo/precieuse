import { m } from '#/paraglide/messages'

/**
 * Petits singletons de page : en-tête du Carnet et de la Collection, plus leur
 * SEO. Le contenu vient de Sanity (`carnetPage`, `collectionPage`) ; ces replis
 * i18n prennent le relais tant que les documents ne sont pas remplis, donc
 * aucune régression possible.
 */
export type CarnetPageData = {
  title: string
  intro: string
  featuredLabel: string
  readArticleLabel: string
  emptyLabel: string
  tocLabel: string
  backLabel: string
  relatedLabel: string
  seo: { title: string; description: string }
}

export function carnetPageFallback(): CarnetPageData {
  return {
    title: m.carnet_title(),
    intro: m.carnet_intro(),
    featuredLabel: m.carnet_featured_label(),
    readArticleLabel: m.carnet_read_article(),
    emptyLabel: m.carnet_empty(),
    tocLabel: m.carnet_toc_label(),
    backLabel: m.article_back(),
    relatedLabel: m.article_related(),
    seo: { title: m.seo_carnet_title(), description: m.seo_carnet_desc() },
  }
}

export type CollectionPageData = {
  title: string
  seo: { title: string; description: string }
}

export function collectionPageFallback(): CollectionPageData {
  return {
    title: m.collection_title(),
    seo: { title: m.seo_collection_title(), description: m.seo_collection_desc() },
  }
}
