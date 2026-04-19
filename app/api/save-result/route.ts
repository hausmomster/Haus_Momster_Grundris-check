import { NextRequest, NextResponse } from 'next/server'
import { saveQuizResult } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, score, label, answers, recommendations, bonusAnswer } = body

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await saveQuizResult({ token, score, label, answers, recommendations, bonusAnswer })
  return NextResponse.json({ ok: true })
}
