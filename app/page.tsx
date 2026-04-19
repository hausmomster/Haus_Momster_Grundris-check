'use client'

import { I18nProvider, useI18n } from '@/lib/i18n'

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_URL ?? '#'

const checks = [
  { de: 'Durchgangs-Check (Breiten & Engstellen)', en: 'Passage check (widths & bottlenecks)' },
  { de: 'Möblierbarkeits-Check', en: 'Furniture placement check' },
  { de: 'Küchenlogik & Abstandsmaße', en: 'Kitchen logic & clearance dimensions' },
  { de: 'Stauraum-Score', en: 'Storage score' },
  { de: 'Kinderfreundlichkeits-Score', en: 'Child-friendliness score' },
  { de: 'Konkrete Warnhinweise & Empfehlungen', en: 'Concrete warnings & recommendations' },
]

const blocks = [
  { de: 'Basisinfos', en: 'Basic Info' },
  { de: 'Eingangsbereich', en: 'Entrance Area' },
  { de: 'Durchgänge', en: 'Corridors' },
  { de: 'Küche', en: 'Kitchen' },
  { de: 'Stauraum', en: 'Storage' },
  { de: 'Möblierbarkeit', en: 'Furniture Fit' },
  { de: 'Kinderfreundlichkeit', en: 'Child-Friendliness' },
  { de: 'Badezimmer', en: 'Bathroom' },
  { de: 'Bonusfrage', en: 'Bonus Question' },
]

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex gap-1 text-sm font-sans">
      <button
        onClick={() => setLang('de')}
        className={`px-3 py-1 transition-colors ${lang === 'de' ? 'text-taupe font-medium' : 'text-warm-gray hover:text-charcoal'}`}
      >
        DE
      </button>
      <span className="text-warm-gray-light self-center">|</span>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 transition-colors ${lang === 'en' ? 'text-taupe font-medium' : 'text-warm-gray hover:text-charcoal'}`}
      >
        EN
      </button>
    </div>
  )
}

function LandingContent() {
  const { t } = useI18n()

  return (
    <div className="bg-cream">

      {/* ── HERO: full-height split ─────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row min-h-screen">

        {/* Left — photo */}
        <div className="relative w-full md:w-1/2 h-[60vh] md:h-screen flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.jpg"
            alt="Lejla Krstic – Haus Momster"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Right — content */}
        <div className="w-full md:w-1/2 bg-cream flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-10 py-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Haus Momster"
              className="h-9 w-auto"
              style={{ mixBlendMode: 'multiply' }}
            />
            <LangToggle />
          </div>

          {/* Centered text */}
          <div className="flex-1 flex flex-col justify-center px-10 md:px-16 pb-16 animate-fade-in">
            <p className="font-sans text-xs tracking-widest text-taupe uppercase mb-8">
              {t('Grundriss-Check Score', 'Floor Plan Check Score')}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal mb-7">
              {t(
                'Ist dein Grundriss wirklich gut geplant?',
                'Is your floor plan really well planned?'
              )}
            </h1>

            <p className="font-sans text-base text-warm-gray leading-relaxed mb-10 max-w-sm">
              {t(
                'Beantworte 20 Fragen zu deinem Grundriss und erhalte einen persönlichen Score mit konkreten Handlungsempfehlungen – wie eine Expertenberatung, aber in 10 Minuten.',
                'Answer 20 questions about your floor plan and receive a personal score with concrete recommendations – like an expert consultation, but in 10 minutes.'
              )}
            </p>

            <div>
              <a href={SHOPIFY_URL} className="btn-primary inline-block">
                {t('Jetzt kaufen – €29', 'Buy now – €29')}
              </a>
              <p className="font-sans text-xs text-warm-gray mt-4">
                {t(
                  'Einmalige Zahlung · Sofortiger Zugang per E-Mail · Eine Sitzung',
                  'One-time payment · Instant access by email · One session'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
            {t('Was du bekommst', 'What you get')}
          </h2>
          <p className="font-sans text-warm-gray text-center mb-14">
            {t(
              'Check mit konkreten Hinweisen auf Fehler inklusive Optimierungsvorschlägen.',
              'Check with concrete pointers on errors including optimisation suggestions.'
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

      {/* ── 9 PRÜFBEREICHE ──────────────────────────────────────────────── */}
      <section className="py-24 max-w-2xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
          {t('Die 9 Prüfbereiche', 'The 9 check areas')}
        </h2>
        <p className="font-sans text-warm-gray text-center mb-16">
          {t('20 Fragen · Score 0–100 · Konkrete Empfehlungen', '20 questions · Score 0–100 · Concrete recommendations')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {blocks.map((block, i) => (
            <div
              key={block.de}
              className="flex flex-col gap-3 px-5 py-4 rounded-xl bg-white border border-warm-gray-light hover:border-taupe hover:shadow-sm transition-all duration-200 cursor-default"
            >
              <span className="font-serif text-lg text-taupe leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-sans text-sm text-charcoal leading-snug">{t(block.de, block.en)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA REPEAT ──────────────────────────────────────────────────── */}
      <section className="bg-taupe py-24 text-center px-6">
        <h2 className="font-serif text-4xl text-cream mb-4">
          {t('Bereit für deinen Check?', 'Ready for your check?')}
        </h2>
        <p className="font-sans text-taupe-light mb-10 max-w-md mx-auto">
          {t('Deine persönliche Online Beratung.', 'Your personal online consultation.')}
        </p>
        <a
          href={SHOPIFY_URL}
          className="inline-block bg-cream text-taupe px-10 py-5 font-sans font-medium text-base tracking-wide hover:bg-taupe-light hover:text-cream transition-colors rounded-xl"
        >
          {t('Jetzt kaufen – €29', 'Buy now – €29')}
        </a>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
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
