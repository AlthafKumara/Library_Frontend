import { z } from 'zod'

export const ProfileSchema = z.object({
  id:           z.string().uuid(),
  name:         z.string(),
  email:        z.string().email(),
  role:         z.enum(['user', 'admin']),
  gender:       z.string().nullable(),
  photoProfile: z.string().url().nullable(),
  created_at:   z.string(),
  updated_at:   z.string(),
})
