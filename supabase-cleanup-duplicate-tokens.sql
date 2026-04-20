-- ── Step 1: Preview duplicates before deleting ───────────────────────────────
-- Run this SELECT first to confirm which rows will be removed.
--
-- SELECT id, order_id, email, status, created_at
-- FROM access_tokens
-- WHERE order_id IN (
--   SELECT order_id FROM access_tokens GROUP BY order_id HAVING count(*) > 1
-- )
-- ORDER BY order_id, created_at DESC;

-- ── Step 2: Delete older duplicates, keeping the newest token per order ───────
-- For each order_id that has more than one token, all but the most recently
-- created one are deleted. Tokens with status 'completed' are never deleted.

DELETE FROM access_tokens
WHERE id IN (
  SELECT id FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at DESC) AS rn
    FROM access_tokens
    WHERE status != 'completed'
  ) ranked
  WHERE rn > 1
);

-- ── Step 3: Add unique index to prevent future duplicates ────────────────────
-- Ensures at most one unused/active token exists per order at the database
-- level. Expired and completed tokens are excluded so a new token can be
-- issued for the same order if ever needed.

CREATE UNIQUE INDEX IF NOT EXISTS idx_access_tokens_one_active_per_order
  ON access_tokens(order_id)
  WHERE status IN ('unused', 'active');
