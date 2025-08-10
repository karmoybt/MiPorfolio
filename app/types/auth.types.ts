// app\types\auth.types.ts
import { z } from 'zod'

// Esquemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
  remember: z.boolean().optional()
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters')
})

export const forgotSchema = z.object({
  email: z.string().email('Invalid email')
})

// Tipos inferidos
export type LoginData    = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type ForgotData   = z.infer<typeof forgotSchema>

export type AuthMode = 'login' | 'register' | 'forgot'