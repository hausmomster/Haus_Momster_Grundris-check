import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { supabase } from '@/lib/supabase'
import { generateResultsPDF } from '@/lib/generate-pdf'

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

  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('shopify_email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'No quiz result found for this email', detail: error?.message }, { status: 404 })
  }

  const { score, label, recommendations, bonus_answer } = data

  const labelColor =
    score >= 85 ? '#4A7C59' :
    score >= 70 ? '#7A9E7E' :
    score >= 50 ? '#C4973D' : '#C4533D'

  const scoreText =
    score >= 85 ? 'ausgezeichnet' :
    score >= 70 ? 'gut' :
    score >= 50 ? 'verbesserungswürdig' : 'kritisch'

  const headline =
    score >= 85 ? 'Dein Grundriss ist ausgezeichnet geplant – du hast vieles richtig gemacht.' :
    score >= 70 ? 'Gut geplant – aber an einigen Stellen lohnt es sich, noch einmal genauer hinzuschauen.' :
    score >= 50 ? 'Dein Grundriss hat einige typische Planungsfehler – aber noch ist Zeit zum Gegensteuern.' :
    'Achtung: Dein Grundriss hat kritische Planungsmängel, die deinen Alltag dauerhaft beeinflussen werden.'

  const subline =
    score >= 85 ? 'Du hast die meisten typischen Planungsfehler vermieden. Schau dir trotzdem die Empfehlungen an – oft sind es die kleinen Details, die am Ende den Unterschied machen.' :
    score >= 70 ? 'Die Basis deines Grundrisses ist solide. Die Empfehlungen zeigen dir, wo du mit wenig Aufwand noch deutlich mehr herausholen kannst.' :
    score >= 50 ? 'Viele der genannten Punkte lassen sich in der Planungsphase noch korrigieren. Starte mit den Punkten, die mit 0 Punkten bewertet wurden.' :
    'Was jetzt nicht korrigiert wird, ist nach dem Bau kaum noch zu ändern. Lies die Empfehlungen sehr sorgfältig und lass uns im persönlichen Gespräch schauen, was noch möglich ist.'

  let pdfBuffer: Buffer
  try {
    pdfBuffer = await generateResultsPDF({
      score,
      label,
      labelColor,
      headline,
      subline,
      recommendations: recommendations ?? [],
      bonusAnswer: bonus_answer ?? '',
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'PDF generation failed', detail: msg }, { status: 500 })
  }

  try {
    await transporter.sendMail({
      from: `"Haus Momster" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Dein Grundriss-Check – Score ${score}/100`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2C2C2C;">
          <h1 style="font-size: 26px; font-weight: 400; margin-bottom: 4px;">Dein Grundriss-Check ist fertig.</h1>
          <p style="color: #8C8880; margin-bottom: 28px; font-size: 14px;">von Haus Momster</p>

          <p style="font-size: 15px;">
            Dein Grundriss wurde bewertet – und das Ergebnis ist <strong>${scoreText}</strong>.
            Du hast <strong>${score} von 100 Punkten</strong> erreicht.
          </p>

          <p style="font-size: 15px;">
            Im Anhang findest du deine vollständigen Ergebnisse als PDF – inklusive aller
            Empfehlungen, die dir helfen, deinen Grundriss zu verbessern.
          </p>

          ${bonus_answer ? `
          <div style="border-left: 2px solid #B8956A; padding-left: 14px; margin: 28px 0;">
            <p style="font-size: 11px; color: #8C8880; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
              Deine größte Unsicherheit
            </p>
            <p style="font-size: 15px; font-style: italic; margin: 0;">"${bonus_answer}"</p>
          </div>
          <p style="font-size: 15px;">
            Genau darüber können wir sprechen – buche dir einen Termin für ein persönliches Ask Me Anything.
          </p>
          ` : `
          <p style="font-size: 15px;">
            Wenn du Fragen zu deinem Grundriss hast, stehe ich dir gerne im persönlichen
            Ask Me Anything zur Verfügung.
          </p>
          `}

          <div style="margin: 36px 0;">
            <a href="https://hausmomster.setmore.com"
               style="background: #B8956A; color: #FAF7F4; padding: 14px 28px;
                      text-decoration: none; font-family: sans-serif; font-size: 14px;
                      letter-spacing: 0.05em; display: inline-block;">
              Ask me anything &rarr;
            </a>
          </div>

          <p style="font-size: 15px; color: #2C2C2C;">Herzliche Grüße,<br/>Lejla</p>

          <hr style="border: none; border-top: 1px solid #E8E4DF; margin: 28px 0;" />
          <p style="font-size: 12px; color: #8C8880;">
            Lejla &middot; <a href="https://www.instagram.com/haus_momster" style="color: #B8956A;">@haus_momster</a>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'grundriss-check-ergebnis.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Email sending failed', detail: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: `Result email resent to ${email}` })
}
