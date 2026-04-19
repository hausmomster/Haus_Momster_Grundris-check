'use client'

import { useEffect, useState, useRef, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { I18nProvider, useI18n } from '@/lib/i18n'
import { questions, TOTAL_QUESTIONS } from '@/lib/questions'
import { computeScore, type Answers, type ScoreResult } from '@/lib/scoring'

// ─── Token gate ───────────────────────────────────────────────────────────────

type GateState = 'loading' | 'valid' | 'invalid' | 'expired' | 'completed'

function useTokenGate(token: string | null) {
  const [state, setState] = useState<GateState>('loading')
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()

  const startHeartbeat = useCallback(() => {
    if (!token) return
    heartbeatRef.current = setInterval(async () => {
      const res = await fetch('/api/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) {
        clearInterval(heartbeatRef.current!)
        router.push('/expired')
      }
    }, 30_000)
  }, [token, router])

  useEffect(() => {
    if (!token) {
      setState('invalid')
      return
    }

    // Dev bypass
    if (token === 'dev') {
      setState('valid')
      return
    }

    fetch('/api/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setState('valid')
          startHeartbeat()
        } else if (data.reason === 'expired') {
          setState('expired')
        } else if (data.reason === 'completed') {
          setState('completed')
        } else {
          setState('invalid')
        }
      })
      .catch(() => setState('invalid'))

    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current)
    }
  }, [token, startHeartbeat])

  return state
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="h-1 bg-warm-gray-light rounded-full overflow-hidden">
        <div
          className="h-full bg-taupe transition-all duration-500 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-right font-sans text-xs text-warm-gray mt-1">
        {current} / {total}
      </p>
    </div>
  )
}

// ─── Score result view ────────────────────────────────────────────────────────

function ResultView({ result, onRestart }: { result: ScoreResult; onRestart: () => void }) {
  const { t } = useI18n()

  return (
    <div className="animate-slide-up space-y-10 print-result">
      {/* Logo shown only in PDF */}
      <div className="hidden print:flex justify-center pb-4 border-b border-warm-gray-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Haus Momster" className="h-16 w-auto" style={{ mixBlendMode: 'multiply' }} />
      </div>
      {/* Score circle */}
      <div className="text-center">
        <div
          className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 mb-6"
          style={{ borderColor: result.labelColor }}
        >
          <span className="font-serif text-5xl leading-none" style={{ color: result.labelColor }}>
            {result.total}
          </span>
          <span className="font-sans text-xs text-warm-gray mt-1">/ 100</span>
        </div>
        <div
          className="inline-block font-sans text-sm tracking-widest uppercase px-3 py-1 mb-4"
          style={{ color: result.labelColor, backgroundColor: `${result.labelColor}15` }}
        >
          {result.label}
        </div>
        <h2 className="font-serif text-3xl text-charcoal mb-2">{result.headline}</h2>
        <p className="font-sans text-warm-gray max-w-md mx-auto">{result.subline}</p>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div>
          <h3 className="font-serif text-2xl text-charcoal mb-6">
            {t('Deine Empfehlungen', 'Your Recommendations')}
          </h3>
          <div className="space-y-4">
            {result.recommendations.map((rec) => (
              <div key={rec.questionId} className="rec-card border border-warm-gray-light bg-white p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                    {rec.blockTitle}
                  </span>
                  <span className="ml-auto font-sans text-xs text-blush">
                    -{rec.pointsLost} {t('Punkte', 'pts')}
                  </span>
                </div>
                <p className="font-sans text-sm text-charcoal leading-relaxed">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bonus answer */}
      {result.bonusAnswer && (
        <div className="border-l-2 border-taupe pl-5">
          <p className="font-sans text-xs tracking-widest uppercase text-warm-gray mb-2">
            {t('Deine größte Unsicherheit', 'Your biggest concern')}
          </p>
          <p className="font-sans text-charcoal italic">"{result.bonusAnswer}"</p>
        </div>
      )}

      {/* Perfect score */}
      {result.recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="font-serif text-2xl text-taupe">
            {t(
              'Keine Empfehlungen – dein Grundriss ist exzellent geplant!',
              'No recommendations – your floor plan is excellently planned!'
            )}
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-warm-gray-light text-center no-print">
        <p className="font-sans text-sm text-warm-gray">
          {t(
            'Folge @haus_momster auf Instagram für mehr Grundriss-Tipps.',
            'Follow @haus_momster on Instagram for more floor plan tips.'
          )}
        </p>
        <a
          href="https://www.instagram.com/haus_momster"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 font-sans text-sm text-taupe hover:underline"
        >
          @haus_momster →
        </a>
      </div>

      <div className="pt-2 text-center no-print">
        <button
          onClick={() => window.print()}
          className="btn-secondary"
        >
          {t('Ergebnis als PDF speichern', 'Save result as PDF')}
        </button>
      </div>
    </div>
  )
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

function Quiz() {
  const { lang, setLang, t } = useI18n()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const gateState = useTokenGate(token)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [textInput, setTextInput] = useState('')
  const [result, setResult] = useState<ScoreResult | null>(null)
  const [animKey, setAnimKey] = useState(0)

  const currentQ = questions[currentIndex]

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
  }

  function handleNext() {
    if (currentIndex === TOTAL_QUESTIONS - 1) {
      const finalAnswers = { ...answers }
      if (currentQ.type === 'text' && textInput.trim()) {
        finalAnswers[currentQ.id] = textInput.trim()
      }
      setResult(computeScore(finalAnswers, lang))
      if (token && token !== 'dev') {
        fetch('/api/complete-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
      }
      return
    }
    if (currentQ.type === 'text') {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: textInput.trim() }))
    }
    setAnimKey((k) => k + 1)
    setCurrentIndex((i) => i + 1)
  }

  function handleBack() {
    if (currentIndex === 0) return
    setAnimKey((k) => k + 1)
    setCurrentIndex((i) => i - 1)
  }

  const canProceed =
    currentQ.type === 'text'
      ? true
      : !!answers[currentQ.id]

  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1

  if (gateState === 'loading') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-sans text-warm-gray animate-pulse">
          {t('Zugang wird geprüft …', 'Checking access …')}
        </p>
      </div>
    )
  }

  if (gateState === 'expired') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="font-serif text-4xl text-charcoal mb-4">
            {t('Sitzung abgelaufen', 'Session Expired')}
          </p>
          <p className="font-sans text-warm-gray mb-8">
            {t(
              'Deine Sitzung ist abgelaufen. Dieser Link kann nicht erneut genutzt werden.',
              'Your session has expired. This link cannot be used again.'
            )}
          </p>
          <a href="/" className="btn-primary">
            {t('Zurück zur Startseite', 'Back to homepage')}
          </a>
        </div>
      </div>
    )
  }

  if (gateState === 'invalid') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="font-serif text-4xl text-charcoal mb-4">
            {t('Kein gültiger Zugang', 'Invalid Access')}
          </p>
          <p className="font-sans text-warm-gray mb-8">
            {t(
              'Dieser Link ist ungültig. Bitte prüfe deine E-Mail oder kaufe erneut.',
              'This link is invalid. Please check your email or purchase again.'
            )}
          </p>
          <a href="/" className="btn-primary">
            {t('Zur Startseite', 'Go to homepage')}
          </a>
        </div>
      </div>
    )
  }

  if (gateState === 'completed') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="font-serif text-4xl text-charcoal mb-4">
            {t('Check abgeschlossen', 'Check Completed')}
          </p>
          <p className="font-sans text-warm-gray mb-8">
            {t(
              'Du hast diesen Grundriss-Check bereits abgeschlossen. Jeder Link kann nur einmal verwendet werden.',
              'You have already completed this floor plan check. Each link can only be used once.'
            )}
          </p>
          <a href="/" className="btn-primary">
            {t('Zur Startseite', 'Go to homepage')}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="no-print flex items-center justify-between px-6 py-5 max-w-2xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Haus Momster" className="h-10 w-auto" style={{ mixBlendMode: 'multiply' }} />
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

      <main className="max-w-2xl mx-auto px-6 pb-20">
        {result ? (
          <ResultView result={result} onRestart={() => {}} />
        ) : (
          <>
            <div className="mb-8">
              <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} />
            </div>

            <div key={animKey} className="animate-slide-up">
              {/* Block label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                  {currentQ.blockTitle[lang]}
                </span>
              </div>

              {/* Question */}
              <h2 className="font-serif text-3xl text-charcoal leading-snug mb-8">
                {currentQ.question[lang]}
              </h2>

              {/* Options */}
              {currentQ.type === 'single' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((opt) => {
                    const selected = answers[currentQ.id] === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`option-card ${selected ? 'option-card-selected' : ''}`}
                      >
                        {opt.label[lang]}
                      </button>
                    )
                  })}
                </div>
              )}

              {currentQ.type === 'text' && (
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={t(
                    'Schreib hier deine Gedanken …',
                    'Write your thoughts here …'
                  )}
                  rows={5}
                  className="w-full border border-warm-gray-light bg-white p-4 font-sans text-charcoal
                             placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-taupe
                             resize-none"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-10">
              {currentIndex > 0 && (
                <button onClick={handleBack} className="btn-secondary flex-shrink-0">
                  ←
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`btn-primary flex-1 ${!canProceed ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {isLastQuestion
                  ? t('Ergebnis anzeigen', 'Show result')
                  : t('Weiter', 'Next')}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function ToolPage() {
  return (
    <I18nProvider>
      <Suspense>
        <Quiz />
      </Suspense>
    </I18nProvider>
  )
}
