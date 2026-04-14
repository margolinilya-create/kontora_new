import type { Metadata, Viewport } from 'next'
import { fontBody, fontMono, fontDisplay } from '@/lib/fonts'
import { cn } from '@/lib/utils/cn'
import { rootMetadata } from '@/lib/seo/metadata'
import {
  organizationJsonLd,
  websiteJsonLd,
  jsonLdScript,
} from '@/lib/seo/jsonld'
import { siteLang } from '@/lib/routes'
import './globals.css'

export const metadata: Metadata = rootMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F0F0F',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={siteLang}
      className={cn(fontBody.variable, fontMono.variable, fontDisplay.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
      </head>
      <body className="min-h-dvh bg-dark font-body text-cream antialiased">
        <a href="#main" className="skip-link">
          Перейти к контенту
        </a>
        <div id="main">{children}</div>
      </body>
    </html>
  )
}
