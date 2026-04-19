import { describe, it, expect } from 'vitest'
import { generateResultsPDF, type PDFProps } from '../lib/generate-pdf'
import { getQuestions } from '../lib/questions'

const BASE_PROPS: PDFProps = {
  score: 75,
  label: 'Gut',
  labelColor: '#7A9E7E',
  headline: 'Gut geplant – aber an einigen Stellen lohnt es sich, noch einmal genauer hinzuschauen.',
  subline: 'Die Basis deines Grundrisses ist solide.',
  recommendations: [],
  bonusAnswer: '',
}

async function generate(overrides: Partial<PDFProps>): Promise<Buffer> {
  return generateResultsPDF({ ...BASE_PROPS, ...overrides })
}

describe('generateResultsPDF()', () => {
  it('returns a Buffer for a passing score', async () => {
    const buf = await generate({ score: 85, label: 'Ausgezeichnet', labelColor: '#4A7C59' })
    expect(Buffer.isBuffer(buf)).toBe(true)
    expect(buf.length).toBeGreaterThan(1000)
  })

  it('returns a Buffer for a critical score', async () => {
    const buf = await generate({ score: 30, label: 'Kritisch', labelColor: '#C4533D' })
    expect(Buffer.isBuffer(buf)).toBe(true)
    expect(buf.length).toBeGreaterThan(1000)
  })

  it('output starts with PDF magic bytes %PDF', async () => {
    const buf = await generate({})
    expect(buf.slice(0, 4).toString()).toBe('%PDF')
  })

  it('handles empty recommendations array', async () => {
    const buf = await generate({ recommendations: [] })
    expect(Buffer.isBuffer(buf)).toBe(true)
  })

  it('handles a bonusAnswer with plain text', async () => {
    const buf = await generate({ bonusAnswer: 'Ich bin unsicher über die Raumaufteilung.' })
    expect(Buffer.isBuffer(buf)).toBe(true)
  })

  it('does not throw when bonusAnswer contains a newline (the Gonca bug)', async () => {
    await expect(generate({ bonusAnswer: 'Ich weiß nicht\nob das funktioniert.' })).resolves.toBeTruthy()
  })

  it('does not throw when bonusAnswer contains arrows and em-dashes', async () => {
    await expect(generate({ bonusAnswer: 'HWR → Küche — wichtig!' })).resolves.toBeTruthy()
  })

  it('does not throw when bonusAnswer contains smart quotes', async () => {
    await expect(generate({ bonusAnswer: '\u201CDer Plan sieht gut aus\u201D' })).resolves.toBeTruthy()
  })

  it('does not throw when bonusAnswer contains emoji', async () => {
    await expect(generate({ bonusAnswer: 'Alles gut! 😊' })).resolves.toBeTruthy()
  })

  it('does not throw with multiple recommendation cards', async () => {
    const recs = [
      { questionId: 1, blockTitle: 'Eingang', text: 'Mindestanforderung: 1,20 m Breite.' },
      { questionId: 2, blockTitle: 'Küche', text: 'Mindestanforderung: 8 m² Nutzfläche.' },
      { questionId: 3, blockTitle: 'Stauraum', text: 'Mindestanforderung: 10 m² Kellerfläche.' },
    ]
    await expect(generate({ recommendations: recs })).resolves.toBeTruthy()
  })

  it('does not throw when recommendation text contains newline', async () => {
    const recs = [{ questionId: 1, blockTitle: 'Eingang', text: 'Zeile 1\nZeile 2' }]
    await expect(generate({ recommendations: recs })).resolves.toBeTruthy()
  })

  it('does not throw when recommendation text contains special chars', async () => {
    const recs = [{
      questionId: 1,
      blockTitle: 'Test → Block',
      text: 'en-dash–, em-dash—, arrows→, quotes\u201C\u201D, ellipsis\u2026',
    }]
    await expect(generate({ recommendations: recs })).resolves.toBeTruthy()
  })

  it('generates a valid PDF for every score boundary', async () => {
    for (const score of [0, 49, 50, 69, 70, 84, 85, 100]) {
      const buf = await generate({ score })
      expect(buf.slice(0, 4).toString(), `score ${score}`).toBe('%PDF')
    }
  })
})

describe('generateResultsPDF() – all recommendation texts from questions.ts', () => {
  const allRecs: { questionId: number; blockTitle: string; text: string }[] = []

  const allQuestions = [...getQuestions('house'), ...getQuestions('apartment')]
  const seen = new Set<number>()
  for (const q of allQuestions) {
    if (seen.has(q.id)) continue
    seen.add(q.id)
    for (const opt of q.options) {
      if (opt.recommendation) {
        allRecs.push({ questionId: q.id, blockTitle: q.blockTitle.de, text: opt.recommendation.de })
        allRecs.push({ questionId: q.id, blockTitle: q.blockTitle.en, text: opt.recommendation.en })
      }
    }
  }

  it(`covers ${allRecs.length} recommendation strings (DE + EN)`, () => {
    expect(allRecs.length).toBeGreaterThan(0)
  })

  it('generates a valid PDF containing all recommendation texts at once', async () => {
    const buf = await generate({ recommendations: allRecs.slice(0, 30), score: 40, label: 'Kritisch', labelColor: '#C4533D' })
    expect(buf.slice(0, 4).toString()).toBe('%PDF')
  })

  // One test per recommendation string so failures pinpoint the exact question
  for (const rec of allRecs) {
    it(`Q${rec.questionId} "${rec.blockTitle}" option text does not cause PDF error`, async () => {
      await expect(generate({ recommendations: [rec] })).resolves.toBeTruthy()
    })
  }
})
