'use client'

import { I18nProvider, useI18n } from '@/lib/i18n'

function ExpiredContent() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
        <p className="font-serif text-lg text-charcoal">Haus Momster</p>
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

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-in">
          <p className="font-sans text-4xl mb-6">⏱</p>
          <h1 className="font-serif text-4xl text-charcoal mb-4">
            {t('Sitzung beendet', 'Session Ended')}
          </h1>
          <p className="font-sans text-warm-gray leading-relaxed mb-10">
            {t(
              'Deine Sitzung ist abgelaufen. Der Grundriss-Check ist als Einzel-Sitzung konzipiert und kann nicht erneut geöffnet werden.',
              'Your session has ended. The Floor Plan Check is designed as a single session and cannot be reopened.'
            )}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_URL ?? '/'}
            className="btn-primary"
          >
            {t('Erneut kaufen', 'Purchase again')}
          </a>
          <div className="mt-8">
            <a href="/" className="font-sans text-sm text-warm-gray hover:text-charcoal transition-colors">
              ← {t('Zur Startseite', 'Back to homepage')}
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ExpiredPage() {
  return (
    <I18nProvider>
      <ExpiredContent />
    </I18nProvider>
  )
}
