import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

const { mockSendMail, mockSupabaseQuery } = vi.hoisted(() => ({
  mockSendMail: vi.fn().mockResolvedValue({ messageId: 'resend-id' }),
  mockSupabaseQuery: vi.fn(),
}))

vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({ sendMail: mockSendMail }),
  },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            limit: () => ({
              single: mockSupabaseQuery,
            }),
          }),
        }),
      }),
    }),
  },
}))

import { GET } from '../app/api/resend-result-email/route'
import { NextRequest } from 'next/server'

const SECRET = 'test-secret-abc'
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/resend-result-email')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return new NextRequest(url)
}

const QUIZ_RESULT = {
  score: 78,
  label: 'Gut',
  recommendations: [
    { questionId: 1, blockTitle: 'Eingang', text: 'Mindestens 60 cm tief.' },
  ],
  bonus_answer: 'Ich bin unsicher über die Raumaufteilung.',
}

describe('GET /api/resend-result-email', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSendMail.mockResolvedValue({ messageId: 'resend-id' })
  })

  it('returns 401 when secret is missing', async () => {
    const res = await GET(makeRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(401)
  })

  it('returns 401 when secret is wrong', async () => {
    const res = await GET(makeRequest({ secret: 'wrong', email: 'test@example.com' }))
    expect(res.status).toBe(401)
  })

  it('returns 400 when email param is missing', async () => {
    const res = await GET(makeRequest({ secret: SECRET }))
    expect(res.status).toBe(400)
  })

  it('returns 404 when no quiz result found for email', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })
    const res = await GET(makeRequest({ secret: SECRET, email: 'unknown@example.com' }))
    expect(res.status).toBe(404)
  })

  it('sends email to the requested address', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: QUIZ_RESULT, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'kunde@example.com' }))
    expect(mockSendMail).toHaveBeenCalledOnce()
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.to).toBe('kunde@example.com')
  })

  it('attaches a real PDF to the resent email', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: QUIZ_RESULT, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.attachments).toHaveLength(1)
    expect(call.attachments[0].filename).toBe('grundriss-check-ergebnis.pdf')
    const pdfBuf: Buffer = call.attachments[0].content
    expect(pdfBuf.slice(0, 4).toString()).toBe('%PDF')
  })

  it('email subject contains the score from the stored result', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: QUIZ_RESULT, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.subject).toContain('78')
  })

  it('email HTML contains the bonusAnswer from the stored result', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: QUIZ_RESULT, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.html).toContain('Ich bin unsicher über die Raumaufteilung.')
  })

  it('returns ok:true on success', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: QUIZ_RESULT, error: null })
    const res = await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const json = await res.json()
    expect(json.ok).toBe(true)
  })

  it('works with no bonusAnswer in stored result', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { ...QUIZ_RESULT, bonus_answer: null }, error: null })
    const res = await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(mockSendMail).toHaveBeenCalledOnce()
  })

  it('works with no recommendations in stored result', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { ...QUIZ_RESULT, recommendations: null }, error: null })
    const res = await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const json = await res.json()
    expect(json.ok).toBe(true)
  })

  it('does not throw when bonusAnswer contains newline', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({
      data: { ...QUIZ_RESULT, bonus_answer: 'Zeile 1\nZeile 2' },
      error: null,
    })
    await expect(GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))).resolves.toBeTruthy()
    expect(mockSendMail).toHaveBeenCalledOnce()
  })

  it('generates correct label colour for each score range', async () => {
    for (const [score, color] of [[90, '#4A7C59'], [75, '#7A9E7E'], [60, '#C4973D'], [30, '#C4533D']] as const) {
      vi.clearAllMocks()
      mockSendMail.mockResolvedValue({ messageId: 'id' })
      mockSupabaseQuery.mockResolvedValueOnce({ data: { ...QUIZ_RESULT, score }, error: null })
      await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
      const pdfBuf: Buffer = (mockSendMail as Mock).mock.calls[0][0].attachments[0].content
      expect(pdfBuf.slice(0, 4).toString(), `score ${score}`).toBe('%PDF')
    }
  })
})
