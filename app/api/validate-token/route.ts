import { NextRequest, NextResponse } from 'next/server'
import { validateToken } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ valid: false, reason: 'missing_token' }, { status: 400 })
  }

  const result = await validateToken(token)
  return NextResponse.json(result)
}
