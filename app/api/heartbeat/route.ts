import { NextRequest, NextResponse } from 'next/server'
import { recordHeartbeat } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ok = await recordHeartbeat(token)
  return NextResponse.json({ ok })
}
