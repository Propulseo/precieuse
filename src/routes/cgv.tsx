import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cgv')({ component: CgvPage })

function CgvPage() {
  return (
    <section className="bg-cream py-20 px-8 lg:px-16 min-h-screen">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-headline text-[48px] text-ink leading-none mb-8">CGV</h1>
        <p className="font-display italic text-[16px] text-ink/70">Conditions générales à compléter.</p>
      </div>
    </section>
  )
}
