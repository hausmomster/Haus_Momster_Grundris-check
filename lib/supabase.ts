import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type TokenStatus = 'unused' | 'active' | 'expired'

export type AccessToken = {
  id: string
  token: string
  order_id: string
  email: string
  status: TokenStatus
  created_at: string
  activated_at: string | null
  last_heartbeat: string | null
}

const HEARTBEAT_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes

export async function validateToken(token: string): Promise<{
  valid: boolean
  reason?: string
}> {
  const { data, error } = await supabase
    .from('access_tokens')
    .select('*')
    .eq('token', token)
    .single()

  if (error || !data) return { valid: false, reason: 'not_found' }

  const row = data as AccessToken

  if (row.status === 'expired') return { valid: false, reason: 'expired' }

  if (row.status === 'active') {
    const lastBeat = row.last_heartbeat ? new Date(row.last_heartbeat).getTime() : 0
    const timedOut = Date.now() - lastBeat > HEARTBEAT_TIMEOUT_MS
    if (timedOut) {
      await supabase
        .from('access_tokens')
        .update({ status: 'expired' })
        .eq('token', token)
      return { valid: false, reason: 'expired' }
    }
    // Session still alive (another tab or resumed within timeout)
    return { valid: true }
  }

  // status === 'unused' → activate
  await supabase
    .from('access_tokens')
    .update({ status: 'active', activated_at: new Date().toISOString(), last_heartbeat: new Date().toISOString() })
    .eq('token', token)

  return { valid: true }
}

export async function recordHeartbeat(token: string): Promise<boolean> {
  const { error } = await supabase
    .from('access_tokens')
    .update({ last_heartbeat: new Date().toISOString() })
    .eq('token', token)
    .eq('status', 'active')

  return !error
}

export async function expireToken(token: string): Promise<void> {
  await supabase
    .from('access_tokens')
    .update({ status: 'expired' })
    .eq('token', token)
}
