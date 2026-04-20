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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== process.env.SHOPIFY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const email = searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: 'Missing email param' }, { status: 400 })
  }

  // Try to find an existing unused/active token first
  let { data } = await supabase
    .from('access_tokens')
    .select('token')
    .eq('email', email)
    .in('status', ['unused', 'active'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // If all tokens are expired, create a fresh one from the same order
  if (!data) {
    const { data: existing } = await supabase
      .from('access_tokens')
      .select('order_id')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!existing) {
      return NextResponse.json({ error: 'No token found for this email' }, { status: 404 })
    }

    const newToken = crypto.randomUUID()
    const { error: insertError } = await supabase.from('access_tokens').insert({
      token: newToken,
      order_id: existing.order_id,
      email,
      status: 'unused',
    })

    if (insertError) {
      return NextResponse.json({ error: 'Failed to create token', detail: insertError.message }, { status: 500 })
    }

    data = { token: newToken }
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
  const toolUrl = `${appUrl}/tool?token=${data.token}`

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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Email sending failed', detail: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: `Access email resent to ${email}` })
}
