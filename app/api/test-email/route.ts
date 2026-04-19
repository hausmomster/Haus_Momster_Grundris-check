import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SHOPIFY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const email = 'lejla@concept-district.com'
  const token = crypto.randomUUID()

  await supabase.from('access_tokens').insert({
    token,
    order_id: 'TEST-001',
    email,
    status: 'unused',
  })

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '')
  const toolUrl = `${appUrl}/tool?token=${token}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

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

        <p style="font-size: 13px; color: #8C8880;">
          Wichtig: Dieser Link funktioniert nur einmal und verfällt nach 5 Minuten Inaktivität.
          Starte ihn erst, wenn du 10–15 Minuten ungestörte Zeit hast.
        </p>

        <hr style="border: none; border-top: 1px solid #E8E4DF; margin: 32px 0;" />
        <p style="font-size: 12px; color: #8C8880;">
          Lejla · <a href="https://www.instagram.com/haus_momster" style="color: #B8956A;">@haus_momster</a>
        </p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true, message: 'Test email sent to ' + email })
}
