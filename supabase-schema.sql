-- Run this in your Supabase SQL editor (supabase.com → SQL Editor)

create table if not exists access_tokens (
  id           uuid primary key default gen_random_uuid(),
  token        text unique not null,
  order_id     text not null,
  email        text not null,
  status       text not null default 'unused'
               check (status in ('unused', 'active', 'expired')),
  created_at   timestamptz not null default now(),
  activated_at timestamptz,
  last_heartbeat timestamptz
);

-- Index for fast token lookups
create index if not exists idx_access_tokens_token on access_tokens(token);

-- No public access – only service role can read/write
alter table access_tokens enable row level security;
