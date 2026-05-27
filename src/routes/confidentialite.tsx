import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/confidentialite')({ component: ConfidentialitePage })

function ConfidentialitePage() {
  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-headline text-[48px] text-ink leading-none mb-8">Confidentialité</h1>
        <p className="font-display italic text-[16px] text-ink/70">Page à compléter.</p>
      </div>
    </section>
  )
}
