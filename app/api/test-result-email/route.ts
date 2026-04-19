import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
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

  const score = 68
  const label = 'Gut'
  const labelColor = '#7A9E7E'
  const headline = 'Gut geplant – mit einigen Optimierungsmöglichkeiten.'
  const subline = 'Dein Grundriss hat eine solide Basis. Ein paar Punkte solltest du aber noch prüfen.'
  const bonusAnswer = 'Welche Möbel ich auswähle und wie sie das alles zusammenpasst'
  const recommendations = [
    {
      questionId: 5,
      blockTitle: 'Eingangsbereich',
      text: 'Eine vollständige Trennung lohnt sich. Selbst eine Sichtblende oder ein halbhoher Raumteiler verhindert, dass Gäste sofort ins Wohnzimmer schauen.',
    },
    {
      questionId: 12,
      blockTitle: 'Stauraum',
      text: 'Priorisiere den Hauswirtschaftsraum – 4–6 m² reichen. Er ist der am häufigsten bereute fehlende Raum bei Bauherrinnen.',
    },
    {
      questionId: 19,
      blockTitle: 'Badezimmer',
      text: 'Ein Bad ohne Tageslicht wirkt schnell bedrückend und fühlt sich wie ein Bunker an. Prüfe Dachfenster oder Oberlichter als Alternative.',
    },
  ]

  let pdfBuffer: Buffer
  try {
    pdfBuffer = await generateResultsPDF({
      score, label, labelColor, headline, subline, recommendations, bonusAnswer,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'PDF generation failed', detail: msg }, { status: 500 })
  }

  try {
    await transporter.sendMail({
    from: `"Haus Momster" <${process.env.GMAIL_USER}>`,
    to: 'lejla@concept-district.com',
    subject: `Dein Grundriss-Check – Score ${score}/100`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2C2C2C;">
        <h1 style="font-size: 26px; font-weight: 400; margin-bottom: 4px;">Dein Grundriss-Check ist fertig.</h1>
        <p style="color: #8C8880; margin-bottom: 28px; font-size: 14px;">von Haus Momster</p>

        <p style="font-size: 15px;">
          Dein Grundriss wurde bewertet – und das Ergebnis ist <strong>gut</strong>.
          Du hast <strong>${score} von 100 Punkten</strong> erreicht.
        </p>

        <p style="font-size: 15px;">
          Im Anhang findest du deine vollständigen Ergebnisse als PDF – inklusive aller
          Empfehlungen, die dir helfen, deinen Grundriss zu verbessern.
        </p>

        <div style="border-left: 2px solid #B8956A; padding-left: 14px; margin: 28px 0;">
          <p style="font-size: 11px; color: #8C8880; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
            Deine größte Unsicherheit
          </p>
          <p style="font-size: 15px; font-style: italic; margin: 0;">"${bonusAnswer}"</p>
        </div>

        <p style="font-size: 15px;">
          Genau darüber können wir sprechen – buche dir einen Termin für ein persönliches Ask Me Anything.
        </p>

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

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Email sending failed', detail: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: 'Test result email sent to lejla@concept-district.com' })
}
