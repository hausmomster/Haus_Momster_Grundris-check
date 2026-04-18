import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Grundriss-Check | Haus Momster',
  description:
    'Finde heraus, ob dein Grundriss wirklich gut geplant ist – mit dem professionellen Grundriss-Check von Haus Momster.',
  openGraph: {
    title: 'Grundriss-Check | Haus Momster',
    description: 'Ist dein Grundriss wirklich gut geplant? Finde es jetzt heraus.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
