import type { Metadata } from 'next'
import { Bebas_Neue, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/shared/Cursor'
import GlobalBackgroundLoader from '../components/GlobalBackgroundLoader'

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Forion — AI-Native Infrastructure',
  description: 'Build and deploy AI-native apps in minutes, not months.',
  keywords: ['AI infrastructure', 'multi-agent', 'LLM orchestration'],
  openGraph: {
    title: 'Forion',
    description: 'AI-native infrastructure for the next frontier.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorant.variable} ${jetbrains.variable}`}
      style={{ background: '#000', overflowX: 'hidden', maxWidth: '100vw' }}
    >
      <body className="antialiased" style={{ background: 'transparent', margin: 0, overflowX: 'hidden', maxWidth: '100vw' }}>

        {/* Layer 0 — fixed WebGL black hole background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000' }}>
          <GlobalBackgroundLoader />
        </div>

        {/* Layer 1 — all page content sits on top */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Cursor />
          {children}
        </div>

      </body>
    </html>
  )
}
