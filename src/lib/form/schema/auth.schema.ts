import { transl } from 'lib/tool'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = loginSchema.extend({
  firstname: z.string().trim().min(1, transl('validation.default.required', { field: 'firstname'})),
  lastname : z.string().trim(),
  username : z.string().trim().min(3, transl('validation.default.min_length', { field: 'username', value: '?', min: 3})),
  password : z.string().min(8, 'Password must be at least 8 characters'),
  role     : z.enum(['student', 'trainer', 'admin']),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
