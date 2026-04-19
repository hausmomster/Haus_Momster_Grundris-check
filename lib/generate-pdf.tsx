import React from 'react'
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'

const TAUPE = '#B8956A'
const CHARCOAL = '#2C2C2C'
const WARM_GRAY = '#8C8880'
const LIGHT = '#E8E4DF'

const s = StyleSheet.create({
  page: { padding: '20mm 15mm', backgroundColor: '#FAF7F4', fontFamily: 'Helvetica', color: CHARCOAL },
  header: { borderBottomWidth: 1, borderBottomColor: LIGHT, paddingBottom: 12, marginBottom: 24 },
  headerTitle: { fontSize: 22, fontFamily: 'Times-Roman', color: CHARCOAL },
  headerSub: { fontSize: 10, color: WARM_GRAY, marginTop: 2 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 16 },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  scoreNum: { fontSize: 28, fontFamily: 'Times-Roman' },
  scoreMax: { fontSize: 9, color: WARM_GRAY },
  label: { fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 },
  headline: { fontSize: 15, fontFamily: 'Times-Roman', marginBottom: 4 },
  subline: { fontSize: 10, color: WARM_GRAY, lineHeight: 1.5 },
  sectionTitle: { fontSize: 13, fontFamily: 'Times-Roman', marginBottom: 10, marginTop: 22 },
  recCard: { borderWidth: 1, borderColor: LIGHT, borderRadius: 4, padding: 10, marginBottom: 7, backgroundColor: '#FFFFFF' },
  recBlock: { fontSize: 8, color: WARM_GRAY, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 },
  recText: { fontSize: 10, lineHeight: 1.5, color: CHARCOAL },
  bonusWrap: { borderLeftWidth: 2, borderLeftColor: TAUPE, paddingLeft: 10, marginTop: 22, marginBottom: 6 },
  bonusLabel: { fontSize: 8, color: WARM_GRAY, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 },
  bonusText: { fontSize: 10, fontStyle: 'italic', color: CHARCOAL, lineHeight: 1.5 },
  cta: { borderWidth: 1, borderColor: TAUPE, borderRadius: 4, padding: 16, marginTop: 22, alignItems: 'center', backgroundColor: '#FFFFFF' },
  ctaLabel: { fontSize: 8, color: TAUPE, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  ctaHeadline: { fontSize: 13, fontFamily: 'Times-Roman', color: CHARCOAL, marginBottom: 5, textAlign: 'center' },
  ctaBody: { fontSize: 9, color: WARM_GRAY, textAlign: 'center', lineHeight: 1.5, marginBottom: 12 },
  btn: { backgroundColor: TAUPE, paddingHorizontal: 20, paddingVertical: 8 },
  btnText: { color: '#FFFFFF', fontSize: 10, letterSpacing: 0.5 },
  footer: { marginTop: 28, paddingTop: 10, borderTopWidth: 1, borderTopColor: LIGHT, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 8, color: WARM_GRAY },
})

export type PDFProps = {
  score: number
  label: string
  labelColor: string
  headline: string
  subline: string
  recommendations: { questionId: number; blockTitle: string; text: string }[]
  bonusAnswer: string
}

export function ResultsPDF({ score, label, labelColor, headline, subline, recommendations, bonusAnswer }: PDFProps) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Grundriss-Check</Text>
          <Text style={s.headerSub}>von Haus Momster</Text>
        </View>

        <View style={s.scoreRow}>
          <View style={[s.scoreCircle, { borderColor: labelColor }]}>
            <Text style={[s.scoreNum, { color: labelColor }]}>{score}</Text>
            <Text style={s.scoreMax}>/ 100</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.label, { color: labelColor }]}>{label}</Text>
            <Text style={s.headline}>{headline}</Text>
            <Text style={s.subline}>{subline}</Text>
          </View>
        </View>

        {recommendations.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Deine Empfehlungen</Text>
            {recommendations.map((rec) => (
              <View key={rec.questionId} style={s.recCard}>
                <Text style={s.recBlock}>{rec.blockTitle}</Text>
                <Text style={s.recText}>{rec.text}</Text>
              </View>
            ))}
          </View>
        )}

        {bonusAnswer ? (
          <View style={s.bonusWrap}>
            <Text style={s.bonusLabel}>Deine größte Unsicherheit</Text>
            <Text style={s.bonusText}>"{bonusAnswer}"</Text>
          </View>
        ) : null}

        <View style={s.cta}>
          <Text style={s.ctaLabel}>Nächster Schritt</Text>
          <Text style={s.ctaHeadline}>Genau dafür ist mein Ask Me Anything.</Text>
          <Text style={s.ctaBody}>
            Ich würde dir gerne dabei helfen, um Räume zu schaffen, in denen du dich wohl fühlst.
          </Text>
          <Link src="https://hausmomster.setmore.com" style={s.btn}>
            <Text style={s.btnText}>Ask me anything →</Text>
          </Link>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>Lejla · @haus_momster</Text>
          <Text style={s.footerText}>grundriss-check-hm.vercel.app</Text>
        </View>
      </Page>
    </Document>
  )
}
