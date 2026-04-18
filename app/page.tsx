'use client'

import { I18nProvider, useI18n } from '@/lib/i18n'

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_URL ?? '#'

const checks = [
  {
    de: 'Durchgangs-Check (Breiten & Engstellen)',
    en: 'Passage check (widths & bottlenecks)',
  },
  {
    de: 'Möblierbarkeits-Check',
    en: 'Furniture placement check',
  },
  {
    de: 'Küchenlogik & Abstandsmaße',
    en: 'Kitchen logic & clearance dimensions',
  },
  {
    de: 'Stauraum-Score',
    en: 'Storage score',
  },
  {
    de: 'Kinderfreundlichkeits-Score',
    en: 'Child-friendliness score',
  },
  {
    de: 'Konkrete Warnhinweise & Empfehlungen',
    en: 'Concrete warnings & recommendations',
  },
]

function LandingContent() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <p className="font-serif text-xl text-charcoal tracking-wide">Haus Momster</p>
        <div className="flex gap-1 text-sm font-sans">
          <button
            onClick={() => setLang('de')}
            className={`px-3 py-1 transition-colors ${
              lang === 'de' ? 'text-taupe font-medium' : 'text-warm-gray hover:text-charcoal'
            }`}
          >
            DE
          </button>
          <span className="text-warm-gray-light self-center">|</span>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 transition-colors ${
              lang === 'en' ? 'text-taupe font-medium' : 'text-warm-gray hover:text-charcoal'
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-2xl mx-auto px-6 pt-16 pb-24 text-center animate-fade-in">
        <p className="font-sans text-sm tracking-widest text-taupe uppercase mb-6">
          {t('Grundriss-Check Score', 'Floor Plan Check Score')}
        </p>

        <h1 className="font-serif text-5xl md:text-6xl leading-tight text-charcoal mb-6">
          {t(
            'Ist dein Grundriss wirklich gut geplant?',
            'Is your floor plan really well planned?'
          )}
        </h1>

        <p className="font-sans text-lg text-warm-gray leading-relaxed mb-10 max-w-lg mx-auto">
          {t(
            'Beantworte 20 Fragen zu deinem Grundriss und erhalte einen persönlichen Score mit konkreten Handlungsempfehlungen – wie eine Expertenberatung, in 10 Minuten.',
            'Answer 20 questions about your floor plan and receive a personal score with concrete recommendations – like an expert consultation, in 10 minutes.'
          )}
        </p>

        <a
          href={SHOPIFY_URL}
          className="btn-primary text-lg px-10 py-5 mb-4 inline-block"
        >
          {t('Jetzt kaufen – €19', 'Buy now – €19')}
        </a>

        <p className="font-sans text-sm text-warm-gray mt-4">
          {t(
            'Einmalige Zahlung · Sofortiger Zugang per E-Mail · Eine Sitzung',
            'One-time payment · Instant access by email · One session'
          )}
        </p>
      </main>

      {/* What you get */}
      <section className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
            {t('Was du bekommst', 'What you get')}
          </h2>
          <p className="font-sans text-warm-gray text-center mb-12">
            {t(
              'Dein persönlicher Score aus 9 Bereichen',
              'Your personal score across 9 areas'
            )}
          </p>

          <ul className="space-y-4">
            {checks.map((c, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-taupe mt-0.5 flex-shrink-0">✓</span>
                <span className="font-sans text-charcoal">{t(c.de, c.en)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blocks preview */}
      <section className="py-20 max-w-2xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
          {t('Die 9 Prüfbereiche', 'The 9 check areas')}
        </h2>
        <p className="font-sans text-warm-gray text-center mb-12">
          {t('20 Fragen · Score 0–100 · Konkrete Empfehlungen', '20 questions · Score 0–100 · Concrete recommendations')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { emoji: '🏠', de: 'Basisinfos', en: 'Basic Info' },
            { emoji: '🚪', de: 'Eingangsbereich', en: 'Entrance Area' },
            { emoji: '📏', de: 'Durchgänge', en: 'Corridors' },
            { emoji: '🍳', de: 'Küche', en: 'Kitchen' },
            { emoji: '📦', de: 'Stauraum', en: 'Storage' },
            { emoji: '🛋️', de: 'Möblierbarkeit', en: 'Furniture Fit' },
            { emoji: '👶', de: 'Kinderfreundlichkeit', en: 'Child-Friendliness' },
            { emoji: '🛁', de: 'Badezimmer', en: 'Bathroom' },
            { emoji: '💬', de: 'Bonusfrage', en: 'Bonus Question' },
          ].map((block) => (
            <div
              key={block.de}
              className="flex items-center gap-3 p-4 border border-warm-gray-light bg-white"
            >
              <span className="text-2xl">{block.emoji}</span>
              <span className="font-sans text-charcoal text-sm">{t(block.de, block.en)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA repeat */}
      <section className="bg-taupe py-20 text-center px-6">
        <h2 className="font-serif text-4xl text-cream mb-4">
          {t('Bereit für deinen Check?', 'Ready for your check?')}
        </h2>
        <p className="font-sans text-taupe-light mb-10 max-w-md mx-auto">
          {t(
            'Das wirkt wie persönliche Beratung – aber ist sofort verfügbar, zu jeder Zeit.',
            'It feels like personal advice – but is available instantly, at any time.'
          )}
        </p>
        <a href={SHOPIFY_URL} className="inline-block bg-cream text-taupe px-10 py-5 font-sans font-medium text-base tracking-wide hover:bg-taupe-light hover:text-cream transition-colors">
          {t('Jetzt kaufen – €19', 'Buy now – €19')}
        </a>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <p className="font-sans text-sm text-warm-gray">
          © {new Date().getFullYear()} Haus Momster ·{' '}
          <a
            href="https://www.instagram.com/haus_momster"
            target="_blank"
            rel="noopener noreferrer"
            className="text-taupe hover:underline"
          >
            @haus_momster
          </a>
        </p>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <I18nProvider>
      <LandingContent />
    </I18nProvider>
  )
}
