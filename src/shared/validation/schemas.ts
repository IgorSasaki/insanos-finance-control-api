import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Email must be valid'),
  name: z.string().min(3, 'Name must have at least 3 characters'),
  nickname: z.string().min(3, 'Nickname must have at least 3 characters'),
  password: z.string().min(6, 'Password must have at least 6 characters')
})
