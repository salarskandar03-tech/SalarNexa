import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Splash } from '@/components/Splash'

import '../styles.css'

const siteName = 'SALAR 07'
const siteDescription = 'سالار ۰۷ | پلتفرم تبلیغات و بازاریابی دیجیتال'

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/.netlify/images?url=/img/salar07-icon.png&w=64&fm=webp',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'theme-color',
        content: '#070b17',
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body>
        <Splash />
        {children}
        <Scripts />
      </body>
    </html>
  )
}