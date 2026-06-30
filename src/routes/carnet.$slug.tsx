import { createFileRoute, notFound } from '@tanstack/react-router'
import { CarnetArticle } from '../components/carnet/CarnetArticle'
import { getArticles } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/carnet/$slug')({
  component: ArticlePage,
  // Lit Sanity quand configuré, sinon le contenu statique (fallback des getters).
  loader: async ({ params }) => {
    const articles = await getArticles(getLocale())
    const article = articles.find((a) => a.slug === params.slug)
    if (!article) throw notFound()
    // « À lire aussi » : on privilégie la même catégorie, puis on complète.
    const related = [
      ...articles.filter((a) => a.slug !== article.slug && a.category === article.category),
      ...articles.filter((a) => a.slug !== article.slug && a.category !== article.category),
    ].slice(0, 3)
    return { article, related }
  },
  // head après loader : TanStack n'infère `loaderData` que si loader est déclaré avant.
  head: ({ loaderData }) =>
    loaderData?.article
      ? seo({
          title: `${loaderData.article.title} — Le Carnet · Précieuse`,
          description: loaderData.article.excerpt,
          path: `/carnet/${loaderData.article.slug}`,
          image: loaderData.article.image,
          type: 'article',
        })
      : {},
})

function ArticlePage() {
  const { article, related } = Route.useLoaderData()
  return <CarnetArticle article={article} related={related} />
}
