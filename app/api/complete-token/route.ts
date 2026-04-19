import { NextRequest, NextResponse } from 'next/server'
import { completeToken } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await completeToken(token)
  return NextResponse.json({ ok: true })
}
