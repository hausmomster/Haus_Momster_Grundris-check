import { getQuestions, type Lang } from './questions'

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
      de: 'Dein Grundriss ist ausgezeichnet geplant – du hast vieles richtig gemacht.',
      en: 'Your floor plan is excellently planned – you got most things right.',
    },
    subline: {
      de: 'Du hast die meisten typischen Planungsfehler vermieden und an die richtigen Dinge gedacht. Schau dir trotzdem die Empfehlungen unten an – oft sind es die kleinen Details, die am Ende den Unterschied zwischen einem guten und einem wirklich großartigen Grundriss machen.',
      en: "You've avoided most typical planning errors and thought about the right things. Still, check the recommendations below – it's often the small details that make the difference between a good and a truly great floor plan.",
    },
  },
  {
    min: 70,
    label: { de: 'Gut', en: 'Good' },
    labelColor: '#7A9E7E',
    headline: {
      de: 'Gut geplant – aber an einigen Stellen lohnt es sich, noch einmal genauer hinzuschauen.',
      en: 'Well planned – but a few points deserve a closer look.',
    },
    subline: {
      de: 'Die Basis deines Grundrisses ist solide. Die Empfehlungen unten zeigen dir, wo du mit wenig Aufwand noch deutlich mehr herausholen kannst. Manche lassen sich jetzt noch leicht korrigieren – nach dem Bau kaum noch.',
      en: 'The foundation of your floor plan is solid. The recommendations below show where you can get significantly more out of it with little effort. Some can still be easily corrected now – but rarely after construction.',
    },
  },
  {
    min: 50,
    label: { de: 'Verbesserungswürdig', en: 'Needs Improvement' },
    labelColor: '#C4973D',
    headline: {
      de: 'Dein Grundriss hat einige typische Planungsfehler – aber noch ist Zeit zum Gegensteuern.',
      en: 'Your floor plan has several typical planning errors – but there is still time to act.',
    },
    subline: {
      de: 'Die gute Nachricht: Viele der genannten Punkte lassen sich in der Planungsphase noch korrigieren, ohne großen Aufwand. Geh die Empfehlungen unten sorgfältig durch – und starte mit den Punkten, die mit 0 Punkten bewertet wurden. Das sind die kritischen Stellen.',
      en: 'The good news: many of these points can still be corrected in the planning phase without major effort. Go through the recommendations below carefully – and start with the ones that scored 0 points. Those are the critical spots.',
    },
  },
  {
    min: 0,
    label: { de: 'Kritisch', en: 'Critical' },
    labelColor: '#C4533D',
    headline: {
      de: 'Achtung: Dein Grundriss hat kritische Planungsmängel, die deinen Alltag dauerhaft beeinflussen werden.',
      en: 'Warning: Your floor plan has critical planning deficiencies that will permanently affect your daily life.',
    },
    subline: {
      de: 'Das klingt hart – aber es ist wichtig: Was jetzt nicht korrigiert wird, ist nach dem Bau kaum noch zu ändern. Lies die Empfehlungen unten sehr sorgfältig und priorisiere die Punkte mit 0 Punkten. Dann lass uns im persönlichen Gespräch schauen, was noch möglich ist.',
      en: 'That sounds harsh – but it matters: what is not corrected now is nearly impossible to change after construction. Read the recommendations below very carefully and prioritise the 0-point items. Then let us talk in person about what is still possible.',
    },
  },
]

export function computeScore(
  answers: Answers,
  lang: Lang,
  propertyType: 'house' | 'apartment'
): ScoreResult {
  const filteredQuestions = getQuestions(propertyType)
  let rawTotal = 0
  let rawMax = 0
  const recommendations: Recommendation[] = []

  for (const q of filteredQuestions) {
    if (!q.scorable || q.type === 'text' || !q.options) continue

    const maxPoints = Math.max(...q.options.map((o) => o.points))
    rawMax += maxPoints

    // Auto-skip questions not applicable to this user's situation
    if (q.skipWhen?.(answers, propertyType)) {
      rawTotal += maxPoints
      continue
    }

    const selected = answers[q.id]
    if (!selected) continue

    // Manually skipped questions get full points — no penalty for non-applicable situations
    if (selected === 'skip') {
      rawTotal += maxPoints
      continue
    }

    const chosen = q.options.find((o) => o.value === selected)
    if (!chosen) continue

    rawTotal += chosen.points

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

  const percentage = rawMax > 0 ? Math.round((rawTotal / rawMax) * 100) : 0
  const bonusAnswer = answers[21] ?? ''
  const tier = LABELS.find((l) => percentage >= l.min) ?? LABELS[LABELS.length - 1]

  return {
    total: percentage,
    max: 100,
    percentage,
    label: tier.label[lang],
    labelColor: tier.labelColor,
    headline: tier.headline[lang],
    subline: tier.subline[lang],
    recommendations,
    bonusAnswer,
  }
}
