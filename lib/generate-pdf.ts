import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'

// ── Colours ───────────────────────────────────────────────────────────────────
const CREAM   = rgb(250/255, 247/255, 244/255)
const CHARCOAL = rgb(44/255,  44/255,  44/255)
const TAUPE   = rgb(184/255, 149/255, 106/255)
const GRAY    = rgb(140/255, 136/255, 128/255)
const LIGHT   = rgb(232/255, 228/255, 223/255)
const WHITE   = rgb(1, 1, 1)

function hex(h: string) {
  return rgb(parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255)
}

// ── Sanitise text for WinAnsi encoding ───────────────────────────────────────
function san(t: string): string {
  return t
    .replace(/\r?\n/g, ' ').replace(/\t/g, ' ')
    .replace(/→/g, '>').replace(/←/g, '<').replace(/↑/g, '^').replace(/↓/g, 'v')
    .replace(/–/g, '-').replace(/—/g, '-')
    .replace(/\u2018|\u2019/g, "'").replace(/\u201C|\u201D/g, '"')
    .replace(/\u2026/g, '...').replace(/\u00B7/g, '|')
    .replace(/[\x00-\x09\x0B-\x1F\x7F]/g, '')
    .replace(/[^\x00-\xFF]/g, '')
}

// ── Text wrapping ─────────────────────────────────────────────────────────────
function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const test = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(test, size) > maxW && line) {
      lines.push(line); line = word
    } else { line = test }
  }
  if (line) lines.push(line)
  return lines
}

function drawWrapped(
  page: PDFPage, text: string, font: PDFFont, size: number,
  x: number, y: number, maxW: number, color = CHARCOAL, leading = 1.45
): number {
  let curY = y
  for (const line of wrap(san(text), font, size, maxW)) {
    page.drawText(line, { x, y: curY, size, font, color })
    curY -= size * leading
  }
  return y - curY
}

function wrappedHeight(text: string, font: PDFFont, size: number, maxW: number, leading = 1.45): number {
  return wrap(san(text), font, size, maxW).length * size * leading
}

// ── Types ─────────────────────────────────────────────────────────────────────
export type PDFProps = {
  score: number
  label: string
  labelColor: string
  headline: string
  subline: string
  recommendations: { questionId: number; blockTitle: string; text: string }[]
  bonusAnswer: string
}

// ── Main generator ────────────────────────────────────────────────────────────
export async function generateResultsPDF(props: PDFProps): Promise<Buffer> {
  const doc  = await PDFDocument.create()
  const W    = 595.28   // A4 width  (pt)
  const H    = 841.89   // A4 height (pt)
  const M    = 52       // margin
  const CW   = W - M*2  // content width

  const serif  = await doc.embedFont(StandardFonts.TimesRoman)
  const sans   = await doc.embedFont(StandardFonts.Helvetica)
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique)

  let page = doc.addPage([W, H])
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM })

  // ── Top y position (pdf-lib: y=0 is bottom) ───────────────────────────────
  let y = H - M   // current top cursor

  // ── Header ────────────────────────────────────────────────────────────────
  page.drawText(san('Grundriss-Check'), { x: M, y, font: serif, size: 22, color: CHARCOAL })
  y -= 20
  page.drawText(san('von Haus Momster'), { x: M, y, font: sans, size: 10, color: GRAY })
  y -= 14
  page.drawLine({ start: { x: M, y }, end: { x: W-M, y }, thickness: 0.75, color: LIGHT })
  y -= 20

  // ── Score circle ──────────────────────────────────────────────────────────
  const circleR = 38
  const cx = M + circleR + 2
  const cy = y - circleR         // centre y

  const lc = hex(props.labelColor)

  page.drawCircle({ x: cx, y: cy, size: circleR, borderColor: lc, borderWidth: 3, color: CREAM })

  const scoreStr = String(props.score)
  const scoreW   = serif.widthOfTextAtSize(scoreStr, 26)
  page.drawText(san(scoreStr), { x: cx - scoreW/2, y: cy + 4, font: serif, size: 26, color: lc })
  const subW = sans.widthOfTextAtSize('/ 100', 9)
  page.drawText(san('/ 100'), { x: cx - subW/2, y: cy - 14, font: sans, size: 9, color: GRAY })

  // ── Label + headline + subline ────────────────────────────────────────────
  const tx = M + circleR*2 + 16
  const tw = CW - circleR*2 - 16

  let ty = y - 6
  page.drawText(san(props.label.toUpperCase()), { x: tx, y: ty, font: sans, size: 8, color: lc })
  ty -= 14
  const hh = drawWrapped(page, props.headline, serif, 13, tx, ty, tw, CHARCOAL)
  ty -= hh + 4
  drawWrapped(page, props.subline, sans, 9.5, tx, ty, tw, GRAY)

  y = cy - circleR - 24  // move below circle

  // ── Recommendations ───────────────────────────────────────────────────────
  if (props.recommendations.length > 0) {
    page.drawText(san('Deine Empfehlungen'), { x: M, y, font: serif, size: 13, color: CHARCOAL })
    y -= 18

    for (const rec of props.recommendations) {
      const th  = wrappedHeight(rec.text, sans, 9.5, CW - 24)
      const cardH = th + 34

      if (y - cardH < M + 80) {
        page = doc.addPage([W, H])
        page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM })
        y = H - M
      }

      const cardY = y - cardH
      page.drawRectangle({ x: M, y: cardY, width: CW, height: cardH, color: WHITE, borderColor: LIGHT, borderWidth: 1 })
      page.drawText(san(rec.blockTitle.toUpperCase()), { x: M+12, y: y-14, font: sans, size: 7.5, color: GRAY })
      drawWrapped(page, rec.text, sans, 9.5, M+12, y-26, CW-24, CHARCOAL)

      y -= cardH + 8
    }
  }

  // ── Bonus answer ──────────────────────────────────────────────────────────
  if (props.bonusAnswer) {
    const bh  = wrappedHeight(`"${props.bonusAnswer}"`, italic, 10, CW - 18)
    const blockH = bh + 32

    if (y - blockH < M + 120) {
      page = doc.addPage([W, H])
      page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM })
      y = H - M
    }

    page.drawRectangle({ x: M, y: y - blockH, width: 2, height: blockH, color: TAUPE })
    page.drawText(san('DEINE GRÖSSTE UNSICHERHEIT'), { x: M+12, y: y-12, font: sans, size: 7.5, color: GRAY })
    drawWrapped(page, `"${props.bonusAnswer}"`, italic, 10, M+12, y-26, CW-18, CHARCOAL)

    y -= blockH + 20
  }

  // ── CTA box ───────────────────────────────────────────────────────────────
  const ctaH = 118
  if (y - ctaH < M + 30) {
    page = doc.addPage([W, H])
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM })
    y = H - M
  }

  const ctaY = y - ctaH
  page.drawRectangle({ x: M, y: ctaY, width: CW, height: ctaH, color: WHITE, borderColor: TAUPE, borderWidth: 1 })

  const ctaLabel = san('NÄCHSTER SCHRITT')
  const ctaLabelW = sans.widthOfTextAtSize(ctaLabel, 8)
  page.drawText(ctaLabel, { x: W/2 - ctaLabelW/2, y: y-16, font: sans, size: 8, color: TAUPE })

  const ctaHead = san('Genau dafür ist mein Ask Me Anything.')
  const ctaHeadW = serif.widthOfTextAtSize(ctaHead, 13)
  page.drawText(ctaHead, { x: W/2 - ctaHeadW/2, y: y-32, font: serif, size: 13, color: CHARCOAL })

  const ctaBody = san('Ich würde dir gerne dabei helfen, um Räume zu schaffen, in denen du dich wohl fühlst.')
  drawWrapped(page, ctaBody, sans, 9, M+20, y-50, CW-40, GRAY)

  const btnW = 150; const btnH = 26
  const btnX = W/2 - btnW/2
  const btnY = ctaY + 12
  page.drawRectangle({ x: btnX, y: btnY, width: btnW, height: btnH, color: TAUPE })
  const btnText = san('Ask me anything')
  const btnTextW = sans.widthOfTextAtSize(btnText, 10)
  page.drawText(btnText, { x: W/2 - btnTextW/2, y: btnY + 8, font: sans, size: 10, color: WHITE })

  y = ctaY - 20

  // ── Footer ────────────────────────────────────────────────────────────────
  const fy = M + 18
  page.drawLine({ start: { x: M, y: fy+10 }, end: { x: W-M, y: fy+10 }, thickness: 0.75, color: LIGHT })
  page.drawText(san('Lejla | @haus_momster'), { x: M, y: fy-4, font: sans, size: 8, color: GRAY })
  const urlText = san('grundriss-check-hm.vercel.app')
  const urlW = sans.widthOfTextAtSize(urlText, 8)
  page.drawText(urlText, { x: W-M-urlW, y: fy-4, font: sans, size: 8, color: GRAY })

  const bytes = await doc.save()
  return Buffer.from(bytes)
}
