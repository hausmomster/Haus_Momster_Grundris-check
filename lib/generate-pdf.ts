import PDFDocument from 'pdfkit'

const TAUPE = '#B8956A'
const CHARCOAL = '#2C2C2C'
const WARM_GRAY = '#8C8880'
const LIGHT = '#E8E4DF'
const WHITE = '#FFFFFF'
const CREAM = '#FAF7F4'

export type PDFProps = {
  score: number
  label: string
  labelColor: string
  headline: string
  subline: string
  recommendations: { questionId: number; blockTitle: string; text: string }[]
  bonusAnswer: string
}

export async function generateResultsPDF(props: PDFProps): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 56,
      info: { Title: 'Grundriss-Check Ergebnisse', Author: 'Haus Momster' },
    })

    const chunks: Buffer[] = []
    doc.on('data', (c: Buffer) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W = doc.page.width
    const M = 56
    const CW = W - M * 2

    // Cream background
    doc.rect(0, 0, W, doc.page.height).fill(CREAM)

    // ── Header ────────────────────────────────────────────────────────────
    doc.font('Times-Roman').fontSize(22).fillColor(CHARCOAL).text('Grundriss-Check', M, 56)
    doc.font('Helvetica').fontSize(10).fillColor(WARM_GRAY).text('von Haus Momster', M, 83)
    doc.moveTo(M, 103).lineTo(W - M, 103).strokeColor(LIGHT).lineWidth(1).stroke()

    // ── Score circle ──────────────────────────────────────────────────────
    let y = 118
    const cx = M + 44
    const cy = y + 44

    doc.circle(cx, cy, 40).lineWidth(3).strokeColor(props.labelColor).stroke()

    const scoreStr = String(props.score)
    doc.font('Times-Roman').fontSize(26).fillColor(props.labelColor)
    doc.text(scoreStr, cx - 40, cy - 16, { width: 80, align: 'center' })
    doc.font('Helvetica').fontSize(9).fillColor(WARM_GRAY)
    doc.text('/ 100', cx - 40, cy + 12, { width: 80, align: 'center' })

    // ── Label + headline + subline ────────────────────────────────────────
    const tx = M + 100
    const tw = CW - 100

    doc.font('Helvetica').fontSize(8).fillColor(props.labelColor)
      .text(props.label.toUpperCase(), tx, y + 4, { width: tw, characterSpacing: 1.5 })

    doc.font('Times-Roman').fontSize(14).fillColor(CHARCOAL)
      .text(props.headline, tx, y + 18, { width: tw })

    const hh = doc.heightOfString(props.headline, { width: tw })

    doc.font('Helvetica').fontSize(10).fillColor(WARM_GRAY)
      .text(props.subline, tx, y + 22 + hh, { width: tw })

    y = cy + 44 + 24

    // ── Recommendations ───────────────────────────────────────────────────
    if (props.recommendations.length > 0) {
      doc.font('Times-Roman').fontSize(13).fillColor(CHARCOAL).text('Deine Empfehlungen', M, y)
      y += 20

      for (const rec of props.recommendations) {
        const rh = doc.heightOfString(rec.text, { width: CW - 24 })
        const cardH = rh + 36

        if (y + cardH > doc.page.height - M - 30) {
          doc.addPage()
          doc.rect(0, 0, W, doc.page.height).fill(CREAM)
          y = M
        }

        doc.roundedRect(M, y, CW, cardH, 4).fillAndStroke(WHITE, LIGHT)
        doc.font('Helvetica').fontSize(8).fillColor(WARM_GRAY)
          .text(rec.blockTitle.toUpperCase(), M + 12, y + 10, { characterSpacing: 1 })
        doc.font('Helvetica').fontSize(10).fillColor(CHARCOAL)
          .text(rec.text, M + 12, y + 23, { width: CW - 24 })

        y += cardH + 8
      }
    }

    // ── Bonus answer ──────────────────────────────────────────────────────
    if (props.bonusAnswer) {
      const bh = doc.heightOfString(`"${props.bonusAnswer}"`, { width: CW - 20 })
      const blockH = bh + 34

      if (y + blockH > doc.page.height - M - 30) {
        doc.addPage()
        doc.rect(0, 0, W, doc.page.height).fill(CREAM)
        y = M
      }

      doc.rect(M, y, 2, blockH).fill(TAUPE)
      doc.font('Helvetica').fontSize(8).fillColor(WARM_GRAY)
        .text('DEINE GRÖSSTE UNSICHERHEIT', M + 12, y + 4, { characterSpacing: 1 })
      doc.font('Helvetica-Oblique').fontSize(10).fillColor(CHARCOAL)
        .text(`"${props.bonusAnswer}"`, M + 12, y + 18, { width: CW - 20 })

      y += blockH + 16
    }

    // ── CTA box ───────────────────────────────────────────────────────────
    const ctaH = 112
    if (y + ctaH > doc.page.height - M - 30) {
      doc.addPage()
      doc.rect(0, 0, W, doc.page.height).fill(CREAM)
      y = M
    }

    doc.roundedRect(M, y, CW, ctaH, 4).fillAndStroke(WHITE, TAUPE)

    doc.font('Helvetica').fontSize(8).fillColor(TAUPE)
      .text('NÄCHSTER SCHRITT', M, y + 14, { width: W, align: 'center', characterSpacing: 1.5 })

    doc.font('Times-Roman').fontSize(14).fillColor(CHARCOAL)
      .text('Genau dafür ist mein Ask Me Anything.', M, y + 30, { width: W, align: 'center' })

    doc.font('Helvetica').fontSize(9).fillColor(WARM_GRAY)
      .text(
        'Ich würde dir gerne dabei helfen, um Räume zu schaffen, in denen du dich wohl fühlst.',
        M, y + 50, { width: W, align: 'center' }
      )

    const btnW = 160
    const btnX = (W - btnW) / 2
    doc.roundedRect(btnX, y + 72, btnW, 26, 2).fill(TAUPE)
    doc.font('Helvetica').fontSize(10).fillColor(WHITE)
      .text('Ask me anything →', btnX, y + 79, { width: btnW, align: 'center' })

    // ── Footer ────────────────────────────────────────────────────────────
    const fy = doc.page.height - M - 18
    doc.moveTo(M, fy - 8).lineTo(W - M, fy - 8).strokeColor(LIGHT).lineWidth(1).stroke()
    doc.font('Helvetica').fontSize(8).fillColor(WARM_GRAY)
      .text('Lejla · @haus_momster', M, fy, { width: CW / 2 })
    doc.font('Helvetica').fontSize(8).fillColor(WARM_GRAY)
      .text('grundriss-check-hm.vercel.app', M, fy, { width: CW, align: 'right' })

    doc.end()
  })
}
