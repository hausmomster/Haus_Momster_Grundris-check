'use client'

import { useState } from 'react'
import { I18nProvider, useI18n } from '@/lib/i18n'

const SHOPIFY_URL = process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_URL ?? '#'

const showTestimonials = false // TODO: Testimonials einfügen und Flag auf true setzen

// ── Data ──────────────────────────────────────────────────────────────────────

const targetGroups = [
  {
    de: '… du gerade mit Architekt oder Bauträger planst und unsicher bist, ob alles passt.',
    en: '… you are currently planning with an architect or developer and are unsure whether everything works.',
  },
  {
    de: '… du einen Fertighaus-Grundriss bekommen hast und eine zweite Meinung willst.',
    en: '… you have received a prefab house floor plan and want a second opinion.',
  },
  {
    de: '… du umbauen willst und wissen möchtest, wo die Schwachstellen liegen.',
    en: '… you want to renovate and would like to know where the weak points are.',
  },
]

const checks = [
  {
    de: 'Durchgangs-Check: Du erfährst, wo Türen und Flure zu eng werden – bevor der Umzugswagen kommt.',
    en: 'Passage check: You find out where doors and hallways are too narrow – before the moving van arrives.',
  },
  {
    de: 'Möblierbarkeits-Check: Du siehst, ob Sofa, Esstisch und Bett wirklich gut platziert werden können.',
    en: 'Furniture placement check: You see whether sofa, dining table and bed can actually be placed well.',
  },
  {
    de: 'Küchenlogik: Du findest heraus, ob deine Küche im Alltag funktioniert – oder dich täglich nervt.',
    en: 'Kitchen logic: You find out whether your kitchen works in daily use – or will frustrate you every day.',
  },
  {
    de: 'Stauraum-Score: Du erkennst Lücken, bevor die Kartons nach dem Einzug im Flur stehen.',
    en: 'Storage score: You spot gaps before the boxes end up in the hallway after moving in.',
  },
  {
    de: 'Kinderfreundlichkeit: Du bewertest, ob der Grundriss mit Kindern langfristig funktioniert.',
    en: 'Child-friendliness: You assess whether the floor plan works long-term with children.',
  },
  {
    de: 'Konkrete Warnhinweise & Empfehlungen – verständlich formuliert, ohne Fachchinesisch.',
    en: 'Concrete warnings & recommendations – clearly written, without technical jargon.',
  },
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

const testimonials = [
  {
    text: { de: '{{TESTIMONIAL_1_TEXT}}', en: '{{TESTIMONIAL_1_TEXT}}' },
    author: { de: '{{TESTIMONIAL_1_AUTHOR}}', en: '{{TESTIMONIAL_1_AUTHOR}}' },
  },
  {
    text: { de: '{{TESTIMONIAL_2_TEXT}}', en: '{{TESTIMONIAL_2_TEXT}}' },
    author: { de: '{{TESTIMONIAL_2_AUTHOR}}', en: '{{TESTIMONIAL_2_AUTHOR}}' },
  },
  {
    text: { de: '{{TESTIMONIAL_3_TEXT}}', en: '{{TESTIMONIAL_3_TEXT}}' },
    author: { de: '{{TESTIMONIAL_3_AUTHOR}}', en: '{{TESTIMONIAL_3_AUTHOR}}' },
  },
]

const faqs = [
  {
    q: { de: 'Wie läuft der Check ab?', en: 'How does the check work?' },
    a: {
      de: 'Du klickst dich durch 20 Fragen (ca. 10 Minuten). Danach bekommst du deinen Score und die Empfehlungen direkt angezeigt und per E-Mail.',
      en: 'You click through 20 questions (approx. 10 minutes). You then receive your score and recommendations directly on screen and by email.',
    },
  },
  {
    q: { de: 'Brauche ich technisches Vorwissen?', en: 'Do I need technical knowledge?' },
    a: {
      de: 'Nein. Die Fragen sind so formuliert, dass du sie ohne Architekturkenntnisse beantworten kannst.',
      en: 'No. The questions are written so that you can answer them without any architectural knowledge.',
    },
  },
  {
    q: { de: 'Bekomme ich das Ergebnis als PDF?', en: 'Do I receive the result as a PDF?' },
    a: {
      de: 'Ja, du kannst deinen Report speichern und z. B. an deinen Architekten weitergeben.',
      en: 'Yes, you can save your report and share it with your architect, for example.',
    },
  },
  {
    q: { de: 'Gilt der Zugang dauerhaft?', en: 'Is access permanent?' },
    a: {
      de: 'Der Check ist für eine Sitzung gedacht. Wenn du einen zweiten Grundriss prüfen willst, kannst du den Check erneut kaufen.',
      en: 'The check is designed for one session. If you want to check a second floor plan, you can purchase the check again.',
    },
  },
  {
    q: { de: 'Ersetzt das einen Architekten?', en: 'Does this replace an architect?' },
    a: {
      de: 'Nein. Der Check ist eine schnelle, günstige Zweitmeinung – keine Bauplanung.',
      en: 'No. The check is a quick, affordable second opinion – not a building plan.',
    },
  },
]

// ── FAQ accordion item ────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-warm-gray-light last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 focus:outline-none group"
        aria-expanded={open}
      >
        <span className="font-sans font-medium text-charcoal group-hover:text-taupe transition-colors">
          {q}
        </span>
        <span className="flex-shrink-0 text-taupe text-xl leading-none select-none">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="font-sans text-sm text-warm-gray leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

function LandingContent() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <p className="font-serif text-xl text-charcoal tracking-wide">Haus Momster</p>
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
      </header>

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 pt-6 pb-24 animate-fade-in">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Haus Momster"
            className="h-20 w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">

          {/* Photo – position unchanged */}
          <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.jpg"
              alt="Lejla Krstic – Haus Momster"
              className="w-full aspect-[3/4] md:aspect-auto md:h-[420px] object-cover object-center rounded-2xl"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="font-sans text-xs tracking-widest text-taupe uppercase mb-5">
              {t('Grundriss-Check Score', 'Floor Plan Check Score')}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal mb-6">
              {t(
                'Bevor du baust oder umbaust: Lass deinen Grundriss checken.',
                'Before you build or renovate: Get your floor plan checked.'
              )}
            </h1>

            <p className="font-sans text-base text-warm-gray leading-relaxed mb-8 max-w-md">
              {t(
                'Kleine Planungsfehler kosten später fünfstellige Summen – oder jeden Tag Nerven. In 10 Minuten weißt du, ob dein Grundriss wirklich funktioniert.',
                'Small planning mistakes can cost five-figure sums later – or daily frustration. In 10 minutes you will know whether your floor plan truly works.'
              )}
            </p>

            {/* Three bullets */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {[
                t('20 gezielte Fragen', '20 targeted questions'),
                t('Persönlicher Score 0–100', 'Personal score 0–100'),
                t('Konkrete Optimierungsvorschläge', 'Concrete improvement suggestions'),
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 font-sans text-sm text-charcoal">
                  <span className="text-taupe">✓</span>
                  {item}
                </span>
              ))}
            </div>

            <a href={SHOPIFY_URL} className="btn-primary inline-block mb-4">
              {t('Jetzt Grundriss checken – 29 \u20AC', 'Check my floor plan now – \u20AC29')}
            </a>

            <p className="font-sans text-xs text-warm-gray mt-3">
              {t(
                'Einmalzahlung \u00B7 Sofort per E-Mail \u00B7 Kein Abo',
                'One-time payment \u00B7 Instant by email \u00B7 No subscription'
              )}
            </p>
          </div>
        </div>
      </main>

      {/* ── 2. Für wen ist das? ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-14 text-center">
            {t('Für dich, wenn \u2026', 'For you, if \u2026')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {targetGroups.map((item, i) => (
              <div
                key={i}
                className="bg-cream border border-warm-gray-light rounded-2xl px-6 py-8"
              >
                <p className="font-sans text-charcoal leading-relaxed">{t(item.de, item.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Was du bekommst ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
            {t('Was du bekommst', 'What you get')}
          </h2>
          <p className="font-sans text-warm-gray text-center mb-14">
            {t(
              'Du bekommst keinen anonymen Score, sondern konkrete Hinweise, was du \u00E4ndern solltest \u2013 und warum.',
              'You do not get an anonymous score, but concrete guidance on what you should change \u2013 and why.'
            )}
          </p>
          <ul className="space-y-5">
            {checks.map((c, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-taupe mt-0.5 flex-shrink-0">✓</span>
                <span className="font-sans text-charcoal leading-relaxed">{t(c.de, c.en)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. Die 9 Prüfbereiche ───────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-2 text-center">
            {t('Die 9 Pr\u00FCfbereiche', 'The 9 check areas')}
          </h2>
          <p className="font-sans text-warm-gray text-center mb-16">
            {t(
              '20 Fragen, verteilt auf 9 Bereiche \u2013 genau die Punkte, an denen Grundrisse in der Praxis am h\u00E4ufigsten scheitern.',
              '20 questions across 9 areas \u2013 exactly the points where floor plans most commonly fail in practice.'
            )}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {blocks.map((block, i) => (
              <div
                key={block.de}
                className="flex flex-col gap-3 px-5 py-4 rounded-xl bg-cream border border-warm-gray-light hover:border-taupe hover:shadow-sm transition-all duration-200 cursor-default"
              >
                <span className="font-serif text-lg text-taupe leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-sm text-charcoal leading-snug">
                  {t(block.de, block.en)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Stimmen (Social Proof) ────────────────────────────────────────── */}
      {/* TODO: Testimonials einfügen und Flag auf true setzen */}
      {showTestimonials && (
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-charcoal mb-14 text-center">
              {t('Stimmen', 'What others say')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-warm-gray-light rounded-2xl px-6 py-8"
                >
                  <p className="font-sans text-charcoal leading-relaxed mb-4 italic">
                    &bdquo;{lang === 'de' ? item.text.de : item.text.en}&ldquo;
                  </p>
                  <p className="font-sans text-sm text-warm-gray">
                    &ndash; {lang === 'de' ? item.author.de : item.author.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-14 text-center">
            {t('H\u00E4ufige Fragen', 'Frequently asked questions')}
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={lang === 'de' ? faq.q.de : faq.q.en}
                a={lang === 'de' ? faq.a.de : faq.a.en}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Finaler CTA mit Risikoumkehr ─────────────────────────────────── */}
      <section className="bg-taupe py-24 text-center px-6">
        <h2 className="font-serif text-4xl text-cream mb-6 max-w-xl mx-auto leading-tight">
          {t(
            'Plan noch nicht final? Dann ist jetzt der richtige Moment.',
            'Plan not final yet? Then now is the right moment.'
          )}
        </h2>
        <p className="font-sans text-cream opacity-80 mb-10 max-w-md mx-auto leading-relaxed">
          {t(
            'Nach dem Einzug ist jede \u00C4nderung zehnmal so teuer. Ein einziger gefundener Planungsfehler spart dir meist ein Vielfaches des Preises.',
            'After moving in, every change costs ten times as much. A single planning mistake found saves you many times the price.'
          )}
        </p>
        <a
          href={SHOPIFY_URL}
          className="inline-block bg-cream text-taupe px-10 py-5 font-sans font-medium text-base tracking-wide hover:bg-taupe-light hover:text-cream transition-colors rounded-xl"
        >
          {t('Jetzt f\u00FCr 29 \u20AC pr\u00FCfen lassen', 'Check now for \u20AC29')}
        </a>
        <p className="font-sans text-xs text-cream opacity-60 mt-5">
          {t(
            'Einmalzahlung \u00B7 Sofort per E-Mail \u00B7 Kein Abo',
            'One-time payment \u00B7 Instant by email \u00B7 No subscription'
          )}
        </p>
      </section>

      {/* ── 8. Footer ────────────────────────────────────────────────────────── */}
      <footer className="py-10 text-center">
        <p className="font-sans text-sm text-warm-gray">
          &copy; {new Date().getFullYear()} Haus Momster &middot;{' '}
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
