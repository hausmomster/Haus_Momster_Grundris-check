import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

// ── Mocks must be declared before any imports that trigger module execution ──

const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-id' })
const mockCreateTransport = vi.fn().mockReturnValue({ sendMail: mockSendMail })

vi.mock('nodemailer', () => ({
  default: { createTransport: mockCreateTransport },
}))

const mockSaveQuizResult = vi.fn().mockResolvedValue(undefined)
const mockSupabaseSelect = vi.fn()

vi.mock('@/lib/supabase', () => ({
  saveQuizResult: mockSaveQuizResult,
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: mockSupabaseSelect,
        }),
      }),
    }),
  },
}))

// generateResultsPDF is NOT mocked – we want the real PDF generated
// so this test also validates PDF generation does not throw.

import { POST } from '../app/api/save-result/route'
import { NextRequest } from 'next/server'

function makeRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/save-result', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  })
}

const VALID_BODY = {
  token: 'tok_test_123',
  score: 72,
  label: 'Gut',
  labelColor: '#7A9E7E',
  headline: 'Gut geplant.',
  subline: 'Die Basis ist solide.',
  answers: {},
  recommendations: [
    { questionId: 1, blockTitle: 'Eingang', text: 'Mindestanforderung: 1,20 m Breite.' },
  ],
  bonusAnswer: '',
}

describe('POST /api/save-result', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSendMail.mockResolvedValue({ messageId: 'test-id' })
  })

  it('returns 400 when token is missing', async () => {
    const res = await POST(makeRequest({ score: 70 }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when token is not a string', async () => {
    const res = await POST(makeRequest({ token: 42, score: 70 }))
    expect(res.status).toBe(400)
  })

  it('returns ok:true when no email is found for token', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: null })
    const res = await POST(makeRequest(VALID_BODY))
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('calls saveQuizResult with correct fields', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: null })
    await POST(makeRequest(VALID_BODY))
    expect(mockSaveQuizResult).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'tok_test_123',
        score: 72,
        label: 'Gut',
      })
    )
  })

  it('sends email when a valid email is found for the token', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    const res = await POST(makeRequest(VALID_BODY))
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(mockSendMail).toHaveBeenCalledOnce()
  })

  it('sends email TO the address stored in access_tokens', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'kunde@example.com' } })
    await POST(makeRequest(VALID_BODY))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.to).toBe('kunde@example.com')
  })

  it('attaches a PDF to the email', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    await POST(makeRequest(VALID_BODY))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.attachments).toHaveLength(1)
    expect(call.attachments[0].filename).toBe('grundriss-check-ergebnis.pdf')
    expect(call.attachments[0].contentType).toBe('application/pdf')
    // verify the attachment is a real PDF (starts with %PDF)
    const pdfBuf: Buffer = call.attachments[0].content
    expect(pdfBuf.slice(0, 4).toString()).toBe('%PDF')
  })

  it('email subject contains the score', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    await POST(makeRequest(VALID_BODY))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.subject).toContain('72')
  })

  it('email HTML contains the bonusAnswer when provided', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    await POST(makeRequest({ ...VALID_BODY, bonusAnswer: 'Ich bin unsicher über die Küche.' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.html).toContain('Ich bin unsicher über die Küche.')
  })

  it('does not throw when bonusAnswer contains newline (the Gonca bug)', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    const body = { ...VALID_BODY, bonusAnswer: 'Zeile 1\nZeile 2' }
    await expect(POST(makeRequest(body))).resolves.toBeTruthy()
    expect(mockSendMail).toHaveBeenCalledOnce()
  })

  it('still returns ok:true even if sendMail throws', async () => {
    mockSupabaseSelect.mockResolvedValueOnce({ data: { email: 'test@example.com' } })
    mockSendMail.mockRejectedValueOnce(new Error('SMTP connection refused'))
    const res = await POST(makeRequest(VALID_BODY))
    const json = await res.json()
    expect(json.ok).toBe(true) // email error should not fail the quiz save
  })
})
