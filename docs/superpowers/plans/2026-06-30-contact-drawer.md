# Contact Drawer (Épure) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la page `/contact` par un **drawer latéral droit** (ambiance « Épure » validée en preview), ouvert depuis le lien « Contact » du Nav, traduit FR/EN/PT.

**Architecture:** Un `ContactDrawerProvider` (React Context, calqué sur `BrandProvider`) monté dans `__root.tsx` expose `{ isOpen, open, close }`. Un unique `<ContactDrawer>` rendu à la racine affiche le panneau (voile + aside qui glisse de droite), réutilisant le composant `<ContactForm>` (envoi via `sendLead` existant). Les déclencheurs (Nav, CTA collection) appellent `open()`. La route `/contact` est supprimée.

**Tech Stack:** TanStack Start (React 19, Vite), Tailwind v4 (tokens `canard`/`poudre`/`framboise`), Paraglide i18n, `sendLead` server fn (Brevo).

## Global Constraints

- **TypeScript strict, jamais `any`** — typer ou `unknown` + narrowing.
- **Path aliases `@/...` / imports projet relatifs courts** — suivre le style des fichiers voisins (imports relatifs `../` comme l'existant ; pas de `../../../`).
- **Tout texte user-facing traduit FR/EN/PT** (3 fichiers `messages/*.json` synchronisés, mêmes clés).
- **Max ~200 lignes par fichier** — découper si dépassement.
- **Tokens couleur** : preview `--canard`→`canard`, `--poudre`→`poudre`, `--rubis`→`framboise`. Fonts : `font-display` (Spectral) pour titres/labels, police body pour les champs.
- **Pas de checkout/panier** — c'est un formulaire de mise en relation, rien d'autre.
- **Vérification** (pas de suite de tests existante → TDD non obligatoire, cf. CLAUDE.md) : chaque tâche se termine par `pnpm exec tsc --noEmit` **et** `pnpm lint` au vert. La vérif visuelle runtime est faite par l'utilisateur (ne pas lancer de navigateur soi-même).
- **Référence visuelle** : `public/previews/contact.html`, variant **Épure** (panneau ~420 px, sans scroll sauf FAQ légère, logo lockup en haut, FAQ accordéon mono-ouverture avec défilement doux de la réponse).

---

## File Structure

**Créés :**
- `src/components/contact/ContactDrawerProvider.tsx` — Context `{ isOpen, open, close }` + hook `useContactDrawer`.
- `src/components/contact/ContactForm.tsx` — formulaire (nom, email, sujet en chips, message) + états succès/erreur, appelle `sendLead`.
- `src/components/contact/ContactDrawer.tsx` — coque du drawer (voile + aside + mécanique a11y) et contenu Épure (logo, en-tête, form, réassurance, coordonnées, renvoi, FAQ).

**Modifiés :**
- `src/routes/__root.tsx` — monter le provider + le drawer, lui passer `site`.
- `src/components/Nav.tsx` — « Contact » devient un bouton qui ouvre le drawer (desktop + mobile).
- `src/routes/collection.$slug.tsx` — le CTA `/contact` ouvre le drawer.
- `src/lib/content/footer.ts` — retirer l'entrée morte `{ label:'Contact', href:'/contact' }`.
- `messages/fr.json`, `messages/en.json`, `messages/pt.json` — nouvelles clés `contact_*`.

**Supprimés :**
- `src/routes/contact.tsx` — la route page disparaît (drawer-only). `src/routeTree.gen.ts` se régénère seul (ne pas l'éditer à la main).

**Hors scope (nettoyage optionnel, autre commit)** : `src/routes/preview.contact.tsx` + `src/components/contact-variants/*` (anciennes previews React dev-only, ancienne palette) — inoffensifs, à supprimer plus tard avec le ménage `public/previews/`.

---

### Task 1: Contact drawer context

**Files:**
- Create: `src/components/contact/ContactDrawerProvider.tsx`

**Interfaces:**
- Produces: `ContactDrawerProvider({ children })`, `useContactDrawer(): { isOpen: boolean; open: () => void; close: () => void }`.

- [ ] **Step 1: Écrire le provider + hook**

```tsx
import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type ContactDrawerValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactDrawerContext = createContext<ContactDrawerValue | null>(null)

/** État global d'ouverture du drawer Contact (calqué sur BrandProvider). */
export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactDrawerContext.Provider>
  )
}

export function useContactDrawer(): ContactDrawerValue {
  const ctx = useContext(ContactDrawerContext)
  if (!ctx) {
    throw new Error('useContactDrawer must be used within a <ContactDrawerProvider>')
  }
  return ctx
}
```

- [ ] **Step 2: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur (le fichier n'est pas encore importé — c'est normal).

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactDrawerProvider.tsx
git commit -m "feat(contact): contexte d'ouverture du drawer"
```

---

### Task 2: Clés i18n FR/EN/PT

Ajouter les nouvelles clés dans **les trois** fichiers (mêmes clés, valeurs traduites). Réutiliser les clés déjà présentes : `contact_eyebrow`, `contact_title`, `contact_lede`, `contact_field_name`, `contact_field_email`, `contact_field_message`, `contact_submit`, `contact_success_title`, `contact_success_body`, `contact_label_email`, `contact_label_whatsapp`, `contact_label_atelier`, `contact_whatsapp_link`, `form_error`.

**Files:**
- Modify: `messages/fr.json`, `messages/en.json`, `messages/pt.json`

**Interfaces:**
- Produces (nouvelles clés) : `contact_field_subject`, `contact_subject_question`, `contact_subject_bespoke`, `contact_subject_care`, `contact_subject_press`, `contact_reassurance`, `contact_faq_q1`, `contact_faq_a1`, `contact_faq_q2`, `contact_faq_a2`, `contact_faq_q3`, `contact_faq_a3`, `contact_renvoi`, `contact_renvoi_link`, `contact_atelier_value`, `contact_close_aria`.

- [ ] **Step 1: FR — ajouter à `messages/fr.json`**

```json
"contact_field_subject": "Le sujet",
"contact_subject_question": "Question",
"contact_subject_bespoke": "Sur-mesure",
"contact_subject_care": "Entretien",
"contact_subject_press": "Presse",
"contact_reassurance": "Réponse sous 48 h · Paiement après échange · Bordeaux, or 18 ct",
"contact_faq_q1": "Délai d'une création sur-mesure ?",
"contact_faq_a1": "4 à 8 semaines, du premier croquis à l'écrin.",
"contact_faq_q2": "Comment se passe le paiement ?",
"contact_faq_a2": "Virement ou PayPal, après notre échange — jamais d'achat impulsif.",
"contact_faq_q3": "Puis-je venir à l'atelier ?",
"contact_faq_a3": "Oui, à Bordeaux, sur rendez-vous.",
"contact_renvoi": "Un projet sur-mesure précis en tête ?",
"contact_renvoi_link": "Parlons-en ici →",
"contact_atelier_value": "Bordeaux — sur rendez-vous",
"contact_close_aria": "Fermer le panneau de contact"
```

- [ ] **Step 2: EN — ajouter à `messages/en.json`**

```json
"contact_field_subject": "Subject",
"contact_subject_question": "Question",
"contact_subject_bespoke": "Bespoke",
"contact_subject_care": "Care",
"contact_subject_press": "Press",
"contact_reassurance": "Reply within 48h · Payment after we talk · Bordeaux, 18k gold",
"contact_faq_q1": "How long for a bespoke piece?",
"contact_faq_a1": "4 to 8 weeks, from first sketch to the case.",
"contact_faq_q2": "How does payment work?",
"contact_faq_a2": "Bank transfer or PayPal, after our conversation — never an impulse buy.",
"contact_faq_q3": "Can I visit the workshop?",
"contact_faq_a3": "Yes, in Bordeaux, by appointment.",
"contact_renvoi": "Have a specific bespoke project in mind?",
"contact_renvoi_link": "Let's talk here →",
"contact_atelier_value": "Bordeaux — by appointment",
"contact_close_aria": "Close the contact panel"
```

- [ ] **Step 3: PT — ajouter à `messages/pt.json`**

```json
"contact_field_subject": "O assunto",
"contact_subject_question": "Pergunta",
"contact_subject_bespoke": "Sob medida",
"contact_subject_care": "Manutenção",
"contact_subject_press": "Imprensa",
"contact_reassurance": "Resposta em 48 h · Pagamento após a conversa · Bordéus, ouro 18 quilates",
"contact_faq_q1": "Prazo de uma peça sob medida?",
"contact_faq_a1": "4 a 8 semanas, do primeiro esboço ao estojo.",
"contact_faq_q2": "Como funciona o pagamento?",
"contact_faq_a2": "Transferência ou PayPal, após a nossa conversa — nunca uma compra por impulso.",
"contact_faq_q3": "Posso visitar o atelier?",
"contact_faq_a3": "Sim, em Bordéus, com marcação.",
"contact_renvoi": "Tem um projeto sob medida em mente?",
"contact_renvoi_link": "Vamos falar aqui →",
"contact_atelier_value": "Bordéus — com marcação",
"contact_close_aria": "Fechar o painel de contacto"
```

- [ ] **Step 4: tsc + lint** (Paraglide régénère `m` au build/dev)

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur. Si `m.contact_*` n'est pas encore typé, lancer `pnpm dev` une fois pour régénérer Paraglide.

- [ ] **Step 5: Commit**

```bash
git add messages/fr.json messages/en.json messages/pt.json
git commit -m "i18n(contact): clés drawer (sujet, réassurance, FAQ, renvoi)"
```

---

### Task 3: ContactForm

Formulaire Épure : nom + email (sur une ligne via le parent), sujet en chips, message, bouton. Succès/erreur. `creationType` = sujet choisi.

**Files:**
- Create: `src/components/contact/ContactForm.tsx`

**Interfaces:**
- Consumes: `sendLead` de `../../lib/leads`, `getLocale` de `#/paraglide/runtime`, `m` de `#/paraglide/messages`.
- Produces: `ContactForm()` (sans props).

- [ ] **Step 1: Écrire le composant**

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { sendLead } from '../../lib/leads'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'

const SUBJECTS = [
  { id: 'question', label: () => m.contact_subject_question() },
  { id: 'bespoke', label: () => m.contact_subject_bespoke() },
  { id: 'care', label: () => m.contact_subject_care() },
  { id: 'press', label: () => m.contact_subject_press() },
] as const

type SubjectId = (typeof SUBJECTS)[number]['id']

const inputCls =
  'w-full bg-transparent border-b border-canard/30 py-1.5 font-sans text-[16px] text-canard placeholder:text-canard/40 focus:outline-none focus:border-framboise transition-colors'
const labelCls =
  'block font-display text-[10px] tracking-[0.28em] uppercase text-canard/60 mb-1.5'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [subject, setSubject] = useState<SubjectId>('question')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitting(true)
    setError(false)
    try {
      await sendLead({
        data: {
          kind: 'contact',
          name: form.name,
          email: form.email,
          message: form.message,
          creationType: subject,
          locale: getLocale(),
        },
      })
      setSent(true)
    } catch (err) {
      console.error('[contact] échec envoi :', err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-2 py-4">
        <span className="font-display text-[24px] text-canard">{m.contact_success_title()}</span>
        <p className="font-display italic text-[16px] text-framboise">{m.contact_success_body()}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-3.5">
      <div className="flex gap-[18px]">
        <label className="flex-1">
          <span className={labelCls}>{m.contact_field_name()}</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
        </label>
        <label className="flex-1">
          <span className={labelCls}>{m.contact_field_email()}</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </label>
      </div>

      <div>
        <span className={labelCls}>{m.contact_field_subject()}</span>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSubject(s.id)}
              aria-pressed={subject === s.id}
              className={`font-display text-[11.5px] rounded-full px-3 py-1.5 border transition-colors ${
                subject === s.id
                  ? 'bg-canard text-poudre border-canard'
                  : 'border-canard/40 text-canard/70 hover:text-canard'
              }`}
            >
              {s.label()}
            </button>
          ))}
        </div>
      </div>

      <label>
        <span className={labelCls}>{m.contact_field_message()}</span>
        <textarea
          required
          rows={2}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${inputCls} min-h-[54px] resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="self-start font-display text-[12px] tracking-[0.24em] uppercase px-7 py-3 rounded-full bg-canard text-poudre hover:bg-framboise transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {m.contact_submit()} →
      </button>

      {error && <p className="font-sans text-[13px] text-framboise">{m.form_error()}</p>}
    </form>
  )
}
```

- [ ] **Step 2: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "feat(contact): formulaire du drawer (sujet en chips, sendLead)"
```

---

### Task 4: ContactDrawer (coque + contenu Épure + a11y)

**Files:**
- Create: `src/components/contact/ContactDrawer.tsx`

**Interfaces:**
- Consumes: `useContactDrawer` (Task 1), `ContactForm` (Task 3), `BRAND_LOCKUP_MASK` + `maskStyle` de `../brand/brand`, `m`, et un objet `site` (`{ email: string; whatsapp: string }`) passé en prop.
- Produces: `ContactDrawer({ site })` où `site: { email: string; whatsapp: string }`.

- [ ] **Step 1: Écrire le composant**

```tsx
import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { BRAND_LOCKUP_MASK, maskStyle } from '../brand/brand'
import { ContactForm } from './ContactForm'
import { useContactDrawer } from './ContactDrawerProvider'

const FAQ = [
  { q: () => m.contact_faq_q1(), a: () => m.contact_faq_a1() },
  { q: () => m.contact_faq_q2(), a: () => m.contact_faq_a2() },
  { q: () => m.contact_faq_q3(), a: () => m.contact_faq_a3() },
]

const kCls = 'font-display text-[9px] tracking-[0.24em] uppercase text-canard/55 mb-px'

export function ContactDrawer({ site }: { site: { email: string; whatsapp: string } }) {
  const { isOpen, close } = useContactDrawer()
  const panelRef = useRef<HTMLElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  // Esc ferme ; verrou de scroll du fond ; focus entrant/sortant.
  useEffect(() => {
    if (!isOpen) return
    lastFocused.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panelRef.current?.focus(), 60)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
      lastFocused.current?.focus?.()
    }
  }, [isOpen, close])

  // Quand une question s'ouvre, on amène doucement sa réponse dans le champ visible.
  function revealAnswer(e: React.SyntheticEvent<HTMLDetailsElement>) {
    if (e.currentTarget.open) {
      const el = e.currentTarget
      window.setTimeout(() => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 70)
    }
  }

  return (
    <>
      {/* Voile */}
      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={close}
        className={`fixed inset-0 z-[90] bg-canard-90/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panneau */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={m.contact_title()}
        tabIndex={-1}
        className={`fixed top-0 right-0 z-[95] h-screen w-[420px] max-w-[94vw] bg-poudre text-canard shadow-[-30px_0_60px_-30px_rgba(13,71,71,0.5)] outline-none transition-transform duration-500 ease-[cubic-bezier(.4,0,.1,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label={m.contact_close_aria()}
          className="absolute top-[18px] right-[18px] z-[5] flex h-[38px] w-[38px] items-center justify-center rounded-full border border-canard/60 text-canard opacity-70 hover:opacity-100 hover:rotate-90 transition-all"
        >
          ✕
        </button>

        <div className="flex h-full min-h-0 flex-col overflow-y-auto px-[34px] pt-2 pb-6 [scrollbar-width:thin]">
          {/* En-tête */}
          <span
            role="img"
            aria-label="Précieuse"
            className="block h-12 w-[210px]"
            style={{ aspectRatio: '8284 / 2955', ...maskStyle(BRAND_LOCKUP_MASK, 'var(--brand-accent)') }}
          />
          <p className="mt-4 font-display text-[11px] tracking-[0.4em] uppercase text-framboise">
            {m.contact_eyebrow()}
          </p>
          <h2 className="mt-2.5 font-display text-[30px] leading-[1.04] text-canard">
            {m.contact_title()}
          </h2>
          <p className="mt-2 font-display italic text-[14px] leading-[1.45] text-canard/75 max-w-[40ch]">
            {m.contact_lede()}
          </p>

          {/* Formulaire */}
          <ContactForm />

          {/* Réassurance */}
          <p className="mt-[18px] font-display text-[11.5px] leading-[1.6] text-canard/65">
            {m.contact_reassurance()}
          </p>

          {/* Coordonnées */}
          <div className="mt-3.5 grid grid-cols-2 gap-x-[18px] gap-y-2">
            <div className="col-span-2">
              <div className={kCls}>{m.contact_label_email()}</div>
              <a href={`mailto:${site.email}`} className="font-display text-[13.5px] text-canard hover:text-framboise transition-colors">
                {site.email}
              </a>
            </div>
            <div>
              <div className={kCls}>{m.contact_label_whatsapp()}</div>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-display text-[13.5px] text-canard hover:text-framboise transition-colors">
                {m.contact_whatsapp_link()}
              </a>
            </div>
            <div>
              <div className={kCls}>{m.contact_label_atelier()}</div>
              <span className="font-display text-[13.5px] text-canard">{m.contact_atelier_value()}</span>
            </div>
          </div>

          {/* Renvoi sur-mesure */}
          <p className="mt-3.5 font-display text-[12.5px] text-canard/85">
            {m.contact_renvoi()}{' '}
            <Link to="/sur-mesure" onClick={close} className="text-framboise border-b border-framboise">
              {m.contact_renvoi_link()}
            </Link>
          </p>

          {/* FAQ — accordéon mono-ouverture, réponse révélée en douceur */}
          <div className="mt-3.5">
            {FAQ.map((item, i) => (
              <details key={i} name="contact-faq" onToggle={revealAnswer} className="border-t border-canard/15 py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3.5 font-display text-[13.5px] [&::-webkit-details-marker]:hidden">
                  {item.q()}
                  <span className="text-[16px] opacity-60">+</span>
                </summary>
                <p className="pt-1.5 font-display italic text-[12.5px] leading-[1.55] text-canard/75 max-w-[40ch]">
                  {item.a()}
                </p>
              </details>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
```

> Note style : le `+` ne tourne pas en `×` à l'ouverture comme dans la preview CSS (`details[open] .plus{rotate}`). Si on le veut, ajouter une classe ciblée `group`/`open:` — refinement optionnel, non bloquant.

- [ ] **Step 2: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur. Vérifier que `BRAND_LOCKUP_MASK` est bien exporté par `src/components/brand/brand.ts` (utilisé par `Nav.tsx`).

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactDrawer.tsx
git commit -m "feat(contact): coque du drawer Épure (a11y, coordonnées, FAQ)"
```

---

### Task 5: Monter provider + drawer dans la racine

**Files:**
- Modify: `src/routes/__root.tsx`

**Interfaces:**
- Consumes: `ContactDrawerProvider`, `ContactDrawer`, et `site` déjà dans `Route.useLoaderData()`.

- [ ] **Step 1: Importer**

Ajouter aux imports de `src/routes/__root.tsx` :

```tsx
import { ContactDrawerProvider } from '../components/contact/ContactDrawerProvider'
import { ContactDrawer } from '../components/contact/ContactDrawer'
```

- [ ] **Step 2: Envelopper le contenu et rendre le drawer**

Dans `RootDocument`, à l'intérieur de `<BrandProvider>`, envelopper l'arbre dans `<ContactDrawerProvider>` et ajouter `<ContactDrawer site={site} />` juste avant `<BrandToggle/>`. Le `<BrandProvider>` actuel englobe `<Nav/> … <BrandToggle/>` : ajouter le provider Contact juste à l'intérieur.

```tsx
        <ConvexProvider>
          <BrandProvider>
            <ContactDrawerProvider>
              <Nav />
              <main className="pt-16 min-h-screen">{children}</main>
              <Footer footer={footer} />
              <WhatsAppButton href={site.whatsapp} />
              <ContactDrawer site={site} />
              {/* Sélecteur de design réservé au dev : jamais exposé en prod. */}
              {import.meta.env.DEV && <BrandToggle />}
              <TanStackDevtools
                config={{ position: 'bottom-right' }}
                plugins={[
                  { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
                  TanStackQueryDevtools,
                ]}
              />
            </ContactDrawerProvider>
          </BrandProvider>
        </ConvexProvider>
```

> `site` provient de `Route.useLoaderData()` (déjà déstructuré) et expose `email` + `whatsapp` (cf. usage existant `WhatsAppButton href={site.whatsapp}` et l'ancienne `contact.tsx`).

- [ ] **Step 3: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur. Si le type de `site` n'inclut pas `email`/`whatsapp`, vérifier `getSite` dans `src/lib/cms` (l'ancienne `contact.tsx` lisait `site.email`/`site.whatsapp`).

- [ ] **Step 4: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat(contact): monte le drawer Contact à la racine"
```

---

### Task 6: Déclencheur Nav (« Contact » ouvre le drawer)

Le lien « Contact » du Nav ne navigue plus : il ouvre le drawer. Desktop ET menu mobile.

**Files:**
- Modify: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: `useContactDrawer` (Task 1).

- [ ] **Step 1: Importer le hook + retirer Contact de `navLinks`**

En haut de `src/components/Nav.tsx`, ajouter l'import :

```tsx
import { useContactDrawer } from './contact/ContactDrawerProvider'
```

Retirer l'entrée Contact du tableau `navLinks` (elle devient un bouton dédié) :

```tsx
const navLinks = [
  { label: () => m.nav_about(), href: '/creatrice' },
  { label: () => m.nav_collection(), href: '/collection' },
  { label: () => m.nav_journal(), href: '/carnet' },
]
```

- [ ] **Step 2: Appeler le hook dans `Nav`**

Dans `export function Nav()`, après les `useState`, ajouter :

```tsx
const { open: openContact } = useContactDrawer()
```

- [ ] **Step 3: Ajouter le bouton Contact desktop**

Dans la zone centre (la `<div className="hidden items-center justify-self-center gap-10 md:flex">`), après le `.map(navLinks)`, ajouter un bouton au même style que les liens :

```tsx
            <button
              type="button"
              onClick={openContact}
              className={`font-display text-[14px] transition-colors duration-300 ${
                isHomeTop ? 'text-poudre/85 hover:text-poudre' : 'text-canard/70 hover:text-canard'
              } ${homeTopShadow}`}
            >
              {m.nav_contact()}
            </button>
```

- [ ] **Step 4: Ajouter le bouton Contact dans le menu mobile**

Dans le panneau mobile (`{menuOpen && (...)}`), après le `.map(navLinks)`, avant le CTA Sur-mesure :

```tsx
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                openContact()
              }}
              className="border-b border-canard/10 py-3 text-left font-display text-[16px] text-canard/85 transition-colors hover:text-canard"
            >
              {m.nav_contact()}
            </button>
```

- [ ] **Step 5: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur. (Vérif runtime utilisateur : clic « Contact » ouvre le drawer, desktop + mobile.)

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat(contact): « Contact » du Nav ouvre le drawer"
```

---

### Task 7: Déclencheur CTA collection

Le CTA `/contact` de la fiche collection ouvre le drawer au lieu de naviguer.

**Files:**
- Modify: `src/routes/collection.$slug.tsx:54-58` (le `<Link to="/contact">`)

**Interfaces:**
- Consumes: `useContactDrawer` (Task 1).

- [ ] **Step 1: Importer le hook**

```tsx
import { useContactDrawer } from '../components/contact/ContactDrawerProvider'
```

- [ ] **Step 2: Récupérer `open` dans le composant**

Dans le composant qui rend ce CTA, ajouter :

```tsx
const { open: openContact } = useContactDrawer()
```

- [ ] **Step 3: Remplacer le `<Link>` par un `<button>`**

Remplacer le lien (lignes ~54-58) :

```tsx
              <button
                type="button"
                onClick={openContact}
                className="inline-block font-display italic text-[16px] text-ink border border-ink/30 px-8 py-3 mt-6 hover:bg-ink hover:text-cream transition-all duration-300"
              >
```

(conserver le libellé enfant existant ; fermer avec `</button>`.)

- [ ] **Step 4: tsc + lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: aucune erreur.

- [ ] **Step 5: Commit**

```bash
git add src/routes/collection.$slug.tsx
git commit -m "feat(contact): CTA fiche collection ouvre le drawer"
```

---

### Task 8: Supprimer la route `/contact` + entrée morte footer

**Files:**
- Delete: `src/routes/contact.tsx`
- Modify: `src/lib/content/footer.ts` (retirer `{ label:'Contact', href:'/contact' }`)
- Auto: `src/routeTree.gen.ts` (régénéré, ne pas éditer à la main)

- [ ] **Step 1: Supprimer le fichier route**

```bash
git rm src/routes/contact.tsx
```

- [ ] **Step 2: Retirer l'entrée Contact morte de `footer.ts`**

Dans `src/lib/content/footer.ts`, supprimer la ligne :

```ts
    { label: 'Contact', href: '/contact' },
```

- [ ] **Step 3: Régénérer le routeTree + vérifier l'absence de référence**

Lancer `pnpm dev` un instant (le plugin TanStack régénère `routeTree.gen.ts` sans `/contact`), puis couper. Vérifier qu'il ne reste aucune référence route :

Run: `grep -rn "to=\"/contact\"\|'/contact'\|routes/contact" src` (hors `preview.contact.tsx`/`contact-variants` qui sont des previews dev).
Expected: aucune occurrence de lien vers la route `/contact`.

- [ ] **Step 4: tsc + lint + test**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm test`
Expected: tout au vert (`pnpm test` = vitest run, aucune suite → succès).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(contact): supprime la route /contact (drawer-only)"
```

---

## Self-Review

**Spec coverage :**
- Déclencheur Nav « Contact » → Task 6. ✅
- Contenu form + coordonnées + réassurance + mini-FAQ + renvoi → Tasks 3 & 4. ✅
- Ambiance Épure sans scroll (sauf FAQ légère) + logo en haut → Task 4 (réf preview). ✅
- Retrait de `/contact` → Task 8. ✅
- i18n FR/EN/PT → Task 2 (+ réutilisation des clés existantes). ✅
- Envoi lead via `sendLead` → Task 3. ✅
- CTA collection rebranché → Task 7. ✅

**Placeholders :** aucun « TBD »/« TODO » ; code complet à chaque étape.

**Type consistency :** `useContactDrawer()` renvoie `{ isOpen, open, close }` (Task 1), consommé tel quel (Tasks 4/6/7) ; `ContactDrawer({ site })` avec `site: { email, whatsapp }` (Task 4) appelé avec `site={site}` (Task 5) ; `ContactForm()` sans props (Task 3) rendu dans Task 4.

**Points de vigilance runtime (vérif utilisateur)** : focus-trap complet non implémenté (focus entrant + Esc + restitution seulement) ; le `+` de la FAQ ne se transforme pas en `×` ; largeur 420 px à confirmer sur écran court. Tous non bloquants, ajustables après revue visuelle.
