import { z }      from 'zod'
import { transl } from 'lib/tool'

export const loginSchema = z.object({
  email   : z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const optionalNameSchema = z.string().trim().refine(
  (value) => value === '' || (value.length >= 3 && value.length <= 60),
  transl('validation.default.length', { field: 'lastname', value: '?', min: 3, max: 60 })
)

export const registerSchema = loginSchema.extend({
  firstname   : z.string().trim().min(3, transl('validation.default.min_length', { field: 'firstname', value: '?', min: 3 })).max(60),
  lastname    : optionalNameSchema,
  username    : z.string().trim().min(3, transl('validation.default.min_length', { field: 'username', value: '?', min: 3})),
  password    : z.string().min(6, 'Password must be at least 6 characters'),
  role        : z.enum(['user', 'trainer', 'admin']),
  organization: z.string().trim(),
}).superRefine((value, ctx) => {
  if (value.role === 'admin' && !value.organization.trim()) {
    ctx.addIssue({
      code   : 'custom',
      path   : ['organization'],
      message: transl('validation.default.required', { field: 'organization' })
    })
  }
})

export type LoginFormValues    = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
