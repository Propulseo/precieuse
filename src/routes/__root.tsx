import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import ConvexProvider from '../integrations/convex/provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { getSite, getFooter } from '../lib/cms'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { SplashScreen } from '../components/SplashScreen'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { BrandProvider } from '../components/brand/BrandProvider'
import { BrandToggle } from '../components/brand/BrandToggle'
import { BRAND_NO_FLASH_SCRIPT } from '../components/brand/no-flash-script'
import { ContactDrawerProvider } from '../components/contact/ContactDrawerProvider'
import { ContactDrawer } from '../components/contact/ContactDrawer'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  // Réglages globaux pilotés par Emeline dans Sanity (numéro WhatsApp, footer…),
  // avec repli sur les constantes/Paraglide si Sanity n'est pas configuré.
  loader: async () => {
    const locale = getLocale()
    const [site, footer] = await Promise.all([getSite(locale), getFooter(locale)])
    return { site, footer }
  },

  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Précieuse, Joaillerie artisanale, Bordeaux' },
      // Valeurs SEO par défaut ; chaque route les écrase via seo() (src/lib/seo.ts).
      { name: 'description', content: m.seo_default_desc() },
      { name: 'theme-color', content: '#125e5e' },
      { property: 'og:site_name', content: 'Précieuse' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: 'https://precieuse-five.vercel.app/picto.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/picto.png' },
      { rel: 'apple-touch-icon', href: '/picto.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { site, footer } = Route.useLoaderData()
  return (
    <html
      suppressHydrationWarning
      lang={getLocale()}
      data-brand="canard"
      data-hero-mark="logo"
      data-seal="rond"
      data-filigrane="losange"
      data-carousel="glisse"
    >
      <head>
        {/* No-flash : pose data-brand depuis localStorage avant le paint. */}
        <script dangerouslySetInnerHTML={{ __html: BRAND_NO_FLASH_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <SplashScreen tagline={site.baseline} />
        <ConvexProvider>
          <BrandProvider>
            <ContactDrawerProvider>
              <Nav />
              <main className="pt-16 min-h-screen">{children}</main>
              <Footer footer={footer} />
              <WhatsAppButton href={site.whatsapp} label={site.whatsappLabel} />
              <ContactDrawer site={site} />
              {/* Sélecteur de design réservé au dev : jamais exposé en prod. */}
              {import.meta.env.DEV && <BrandToggle />}
              <TanStackDevtools
                config={{
                  position: 'bottom-right',
                }}
                plugins={[
                  {
                    name: 'Tanstack Router',
                    render: <TanStackRouterDevtoolsPanel />,
                  },
                  TanStackQueryDevtools,
                ]}
              />
            </ContactDrawerProvider>
          </BrandProvider>
        </ConvexProvider>
        <Scripts />
      </body>
    </html>
  )
}
