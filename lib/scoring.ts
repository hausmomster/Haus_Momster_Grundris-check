import { questions, type Lang } from './questions'

export type Answers = Record<number, string>

export type Recommendation = {
  questionId: number
  block: number
  blockTitle: string
  blockEmoji: string
  text: string
  pointsLost: number
}

export type ScoreResult = {
  total: number
  max: number
  percentage: number
  label: string
  labelColor: string
  headline: string
  subline: string
  recommendations: Recommendation[]
  bonusAnswer: string
}

const LABELS: Array<{
  min: number
  label: Record<Lang, string>
  labelColor: string
  headline: Record<Lang, string>
  subline: Record<Lang, string>
}> = [
  {
    min: 85,
    label: { de: 'Ausgezeichnet', en: 'Excellent' },
    labelColor: '#4A7C59',
    headline: {
      de: 'Dein Grundriss ist ausgezeichnet geplant.',
      en: 'Your floor plan is excellently planned.',
    },
    subline: {
      de: 'Du hast die meisten typischen Planungsfehler vermieden. Die kleinen Lücken findest du unten.',
      en: "You've avoided most typical planning errors. Find the small gaps below.",
    },
  },
  {
    min: 70,
    label: { de: 'Gut', en: 'Good' },
    labelColor: '#7A9E7E',
    headline: {
      de: 'Gut geplant – mit einigen Optimierungsmöglichkeiten.',
      en: 'Well planned – with a few areas for improvement.',
    },
    subline: {
      de: 'Dein Grundriss hat eine solide Basis. Ein paar Punkte solltest du aber noch prüfen.',
      en: 'Your floor plan has a solid foundation. But a few points are still worth reviewing.',
    },
  },
  {
    min: 50,
    label: { de: 'Mittelmäßig', en: 'Moderate' },
    labelColor: '#C4973D',
    headline: {
      de: 'Dein Grundriss hat einige typische Planungsfehler.',
      en: 'Your floor plan has several typical planning errors.',
    },
    subline: {
      de: 'Die gute Nachricht: Die meisten lassen sich noch korrigieren. Die Empfehlungen unten helfen dir dabei.',
      en: 'The good news: most can still be corrected. The recommendations below will help.',
    },
  },
  {
    min: 0,
    label: { de: 'Kritisch', en: 'Critical' },
    labelColor: '#C4533D',
    headline: {
      de: 'Achtung: Dein Grundriss hat kritische Planungsmängel.',
      en: 'Warning: Your floor plan has critical planning deficiencies.',
    },
    subline: {
      de: 'Jetzt ist genau der richtige Zeitpunkt, um gegenzusteuern – bevor etwas gebaut wird. Lies die Empfehlungen unten sorgfältig.',
      en: 'Now is exactly the right time to take corrective action – before anything is built. Read the recommendations below carefully.',
    },
  },
]

export function computeScore(answers: Answers, lang: Lang): ScoreResult {
  let total = 0
  const recommendations: Recommendation[] = []

  for (const q of questions) {
    if (!q.scorable || q.type === 'text') continue

    const selected = answers[q.id]
    if (!selected || !q.options) continue

    const chosen = q.options.find((o) => o.value === selected)
    if (!chosen) continue

    const maxPoints = Math.max(...q.options.map((o) => o.points))
    total += chosen.points

    if (chosen.points < maxPoints && chosen.recommendation) {
      recommendations.push({
        questionId: q.id,
        block: q.block,
        blockTitle: q.blockTitle[lang],
        blockEmoji: q.blockEmoji,
        text: chosen.recommendation[lang],
        pointsLost: maxPoints - chosen.points,
      })
    }
  }

  const bonusAnswer = answers[20] ?? ''

  const tier =
    LABELS.find((l) => total >= l.min) ?? LABELS[LABELS.length - 1]

  return {
    total,
    max: 100,
    percentage: total,
    label: tier.label[lang],
    labelColor: tier.labelColor,
    headline: tier.headline[lang],
    subline: tier.subline[lang],
    recommendations,
    bonusAnswer,
  }
}
