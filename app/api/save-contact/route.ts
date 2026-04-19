import { NextRequest, NextResponse } from 'next/server'
import { saveContact } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, contactEmail, instagramHandle } = body

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  await saveContact({ token, contactEmail, instagramHandle })
  return NextResponse.json({ ok: true })
}
