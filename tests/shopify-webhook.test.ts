import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import crypto from 'crypto'

const { mockSendMail, mockMaybeSingle, mockInsert } = vi.hoisted(() => ({
  mockSendMail: vi.fn().mockResolvedValue({ messageId: 'webhook-id' }),
  mockMaybeSingle: vi.fn(),
  mockInsert: vi.fn().mockResolvedValue({ error: null }),
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
            maybeSingle: mockMaybeSingle,
          }),
        }),
      }),
      insert: mockInsert,
    }),
  },
}))

import { POST } from '../app/api/webhooks/shopify/route'
import { NextRequest } from 'next/server'

const SECRET = 'test-webhook-secret'
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET
process.env.NEXT_PUBLIC_APP_URL = 'https://example.com'
process.env.GMAIL_USER = 'shop@example.com'

function makeRequest(order: object): NextRequest {
  const body = JSON.stringify(order)
  const hmac = crypto.createHmac('sha256', SECRET).update(body, 'utf8').digest('base64')
  return new NextRequest('http://localhost/api/webhooks/shopify', {
    method: 'POST',
    body,
    headers: { 'x-shopify-hmac-sha256': hmac },
  })
}

const ORDER = { id: 123456, email: 'kunde@example.com' }

describe('POST /api/webhooks/shopify', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSendMail.mockResolvedValue({ messageId: 'webhook-id' })
    mockInsert.mockResolvedValue({ error: null })
    delete process.env.ALERT_EMAIL
  })

  it('returns 401 when the HMAC signature is invalid', async () => {
    const body = JSON.stringify(ORDER)
    const wrongHmac = crypto.createHmac('sha256', 'wrong-secret').update(body, 'utf8').digest('base64')
    const res = await POST(
      new NextRequest('http://localhost/api/webhooks/shopify', {
        method: 'POST',
        body,
        headers: { 'x-shopify-hmac-sha256': wrongHmac },
      })
    )
    expect(res.status).toBe(401)
  })

  it('skips token creation if an unused/active token already exists for the order', async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: { token: 'existing-token' } })
    const res = await POST(makeRequest(ORDER))
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(mockInsert).not.toHaveBeenCalled()
  })

  it('creates a token and sends the access email on success', async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null })
    const res = await POST(makeRequest(ORDER))
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(mockInsert).toHaveBeenCalledOnce()
    expect(mockSendMail).toHaveBeenCalledOnce()
    expect(mockSendMail.mock.calls[0][0].to).toBe('kunde@example.com')
  })

  it('sends an alert email and returns 500 when the Supabase insert fails', async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null })
    mockInsert.mockResolvedValueOnce({ error: { message: 'connection refused' } })
    const res = await POST(makeRequest(ORDER))
    expect(res.status).toBe(500)

    expect(mockSendMail).toHaveBeenCalledOnce()
    const alert = (mockSendMail as Mock).mock.calls[0][0]
    expect(alert.to).toBe('shop@example.com')
    expect(alert.subject).toContain('Token-Erstellung fehlgeschlagen')
    expect(alert.text).toContain('123456')
    expect(alert.text).toContain('kunde@example.com')
    expect(alert.text).toContain('connection refused')
  })

  it('sends the alert email to ALERT_EMAIL when set', async () => {
    process.env.ALERT_EMAIL = 'owner@example.com'
    mockMaybeSingle.mockResolvedValueOnce({ data: null })
    mockInsert.mockResolvedValueOnce({ error: { message: 'connection refused' } })
    await POST(makeRequest(ORDER))
    const alert = (mockSendMail as Mock).mock.calls[0][0]
    expect(alert.to).toBe('owner@example.com')
  })

  it('sends an alert email when the access email fails to send, but still returns ok:true', async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null })
    mockSendMail
      .mockRejectedValueOnce(new Error('SMTP connection refused'))
      .mockResolvedValueOnce({ messageId: 'alert-id' })

    const res = await POST(makeRequest(ORDER))
    const json = await res.json()
    expect(json.ok).toBe(true)

    expect(mockSendMail).toHaveBeenCalledTimes(2)
    const alert = (mockSendMail as Mock).mock.calls[1][0]
    expect(alert.to).toBe('shop@example.com')
    expect(alert.subject).toContain('nicht zugestellt')
    expect(alert.text).toContain('SMTP connection refused')
  })
})
