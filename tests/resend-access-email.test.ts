import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

const { mockSendMail, mockSupabaseQuery } = vi.hoisted(() => ({
  mockSendMail: vi.fn().mockResolvedValue({ messageId: 'access-resend-id' }),
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
          in: () => ({
            order: () => ({
              limit: () => ({
                single: mockSupabaseQuery,
              }),
            }),
          }),
        }),
      }),
    }),
  },
}))

import { GET } from '../app/api/resend-access-email/route'
import { NextRequest } from 'next/server'

const SECRET = 'test-secret-abc'
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET
process.env.NEXT_PUBLIC_APP_URL = 'https://example.com'

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/resend-access-email')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return new NextRequest(url)
}

describe('GET /api/resend-access-email', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSendMail.mockResolvedValue({ messageId: 'access-resend-id' })
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

  it('returns 404 when no active token found for email', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })
    const res = await GET(makeRequest({ secret: SECRET, email: 'unknown@example.com' }))
    expect(res.status).toBe(404)
  })

  it('sends email to the requested address', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { token: 'tok_abc123' }, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'kunde@example.com' }))
    expect(mockSendMail).toHaveBeenCalledOnce()
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.to).toBe('kunde@example.com')
  })

  it('email subject matches the initial Shopify webhook subject', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { token: 'tok_abc123' }, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.subject).toBe('Dein Grundriss-Check ist bereit ✓')
  })

  it('email HTML contains the tool URL with the token', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { token: 'tok_abc123' }, error: null })
    await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const call = (mockSendMail as Mock).mock.calls[0][0]
    expect(call.html).toContain('https://example.com/tool?token=tok_abc123')
  })

  it('returns ok:true on success', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { token: 'tok_abc123' }, error: null })
    const res = await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    const json = await res.json()
    expect(json.ok).toBe(true)
  })

  it('returns 500 when email sending fails', async () => {
    mockSupabaseQuery.mockResolvedValueOnce({ data: { token: 'tok_abc123' }, error: null })
    mockSendMail.mockRejectedValueOnce(new Error('SMTP connection refused'))
    const res = await GET(makeRequest({ secret: SECRET, email: 'test@example.com' }))
    expect(res.status).toBe(500)
  })
})
