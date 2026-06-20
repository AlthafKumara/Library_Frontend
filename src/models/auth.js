import { z } from 'zod'

// ── Auth Response ─────────────────────────────────────────
// The `data` payload inside { status, message, data: ... }
// Login and Register return accessToken + userId (flat, no user wrapper).
// All other profile data is fetched separately from /profile.
export const AuthResponseSchema = z.object({
  accessToken: z.string().min(1),
  userId:      z.string().uuid(),
})
