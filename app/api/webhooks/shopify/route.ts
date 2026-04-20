import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function verifyShopifyWebhook(body: string, hmac: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET!
  const digest = crypto.createHmac('sha256', secret).update(body, 'utf8').digest('base64')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac))
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const hmac = req.headers.get('x-shopify-hmac-sha256') ?? ''

  if (!verifyShopifyWebhook(rawBody, hmac)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const order = JSON.parse(rawBody)
  const email: string = order.email ?? order.contact_email ?? ''
  const orderId: string = String(order.id)

  // Idempotency: skip if an unused or active token already exists for this order
  const { data: existing } = await supabase
    .from('access_tokens')
    .select('token')
    .eq('order_id', orderId)
    .in('status', ['unused', 'active'])
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ ok: true })
  }

  // Generate a one-time access token
  const token = crypto.randomUUID()

  const { error } = await supabase.from('access_tokens').insert({
    token,
    order_id: orderId,
    email,
    status: 'unused',
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
  const toolUrl = `${appUrl}/tool?token=${token}`

  try {
    await transporter.sendMail({
      from: `"Haus Momster" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Dein Grundriss-Check ist bereit ✓',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2C2C2C;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 8px;">
            Dein Grundriss-Check
          </h1>
          <p style="color: #8C8880; margin-bottom: 32px;">von Haus Momster</p>

          <p>Vielen Dank für deinen Kauf!</p>
          <p>
            Klicke auf den Button unten, um deinen persönlichen Grundriss-Check zu starten.
            Du hast <strong>eine Sitzung</strong> – nimm dir 10–15 Minuten Zeit.
          </p>

          <div style="margin: 40px 0;">
            <a href="${toolUrl}"
               style="background: #B8956A; color: #FAF7F4; padding: 16px 32px;
                      text-decoration: none; font-family: sans-serif; font-size: 15px;
                      letter-spacing: 0.05em; display: inline-block;">
              Grundriss-Check starten →
            </a>
          </div>

          <p>
            Wichtig: Dieser Link funktioniert nur einmal und verfällt nach 5 Minuten Inaktivität.
            Starte ihn erst, wenn du 10–15 Minuten ungestörte Zeit hast.
          </p>

          <p>
            Lejla · <a href="https://www.instagram.com/haus_momster" style="color: #B8956A;">@haus_momster</a>
          </p>
        </div>
      `,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Shopify webhook email error for order', orderId, ':', msg)
  }

  return NextResponse.json({ ok: true })
}
