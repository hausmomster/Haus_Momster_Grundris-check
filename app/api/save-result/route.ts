import { NextRequest, NextResponse } from 'next/server'
import { saveQuizResult, supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'
import { generateResultsPDF } from '@/lib/generate-pdf'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, score, label, labelColor, headline, subline, answers, recommendations, bonusAnswer } = body

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await saveQuizResult({ token, score, label, answers, recommendations, bonusAnswer })

  // Fetch customer email from access_tokens
  const { data } = await supabase
    .from('access_tokens')
    .select('email')
    .eq('token', token)
    .single()

  const email = data?.email
  if (!email) return NextResponse.json({ ok: true })

  try {
    // Generate PDF
    const pdfBuffer = await generateResultsPDF({
      score,
      label,
      labelColor: labelColor ?? '#B8956A',
      headline: headline ?? '',
      subline: subline ?? '',
      recommendations: recommendations ?? [],
      bonusAnswer: bonusAnswer ?? '',
    })

    const scoreText = score >= 85 ? 'ausgezeichnet' : score >= 70 ? 'gut' : score >= 50 ? 'verbesserungsfähig' : 'kritisch'

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

          ${bonusAnswer ? `
          <div style="border-left: 2px solid #B8956A; padding-left: 14px; margin: 28px 0;">
            <p style="font-size: 11px; color: #8C8880; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
              Deine größte Unsicherheit
            </p>
            <p style="font-size: 15px; font-style: italic; margin: 0;">"${bonusAnswer}"</p>
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
              Ask me anything →
            </a>
          </div>

          <p style="font-size: 15px; color: #2C2C2C;">Herzliche Grüße,<br/>Lejla</p>

          <hr style="border: none; border-top: 1px solid #E8E4DF; margin: 28px 0;" />
          <p style="font-size: 12px; color: #8C8880;">
            Lejla · <a href="https://www.instagram.com/haus_momster" style="color: #B8956A;">@haus_momster</a>
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
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('PDF/email error for', email, ':', msg)
  }

  return NextResponse.json({ ok: true })
}
