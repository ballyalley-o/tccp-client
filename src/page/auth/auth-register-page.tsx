import { zodResolver } from '@hookform/resolvers/zod'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Alert, Button, Card, CardContent, MenuItem, Stack } from '@mui/material'
import { FormPasswordField, FormTextField } from 'component/form'
import { AuthPanel, FormTitle } from 'design/styled'
import { registerSchema, type RegisterFormValues } from 'lib/form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { register } from 'app/store/slice/auth/auth-slice'

const RegisterPage = () => {
  const dispatch          = useAppDispatch()
  const navigate          = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const form              = useForm<RegisterFormValues>({
    defaultValues: {
      firstname: '',
      lastname : '',
      username : '',
      email    : '',
      password : '',
      role     : 'student',
    },
    resolver: zodResolver(registerSchema),
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = await dispatch(register(values))
    if (register.fulfilled.match(result)) {
      navigate('/')
    }
  })

  return (
    <AuthPanel wide>
      <Card>
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <FormTitle variant="h1">
              Create account
            </FormTitle>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormTextField
                control={form.control}
                name="firstname"
                fullWidth
                label="First name"
                required
              />
              <FormTextField
                control={form.control}
                name="lastname"
                fullWidth
                label="Last name"
              />
            </Stack>
            <FormTextField
              control={form.control}
              name="username"
              label="Username"
              required
              autoComplete="username"
            />
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              required
              autoComplete="email"
            />
            <FormPasswordField
              control={form.control}
              name="password"
              label="Password"
              required
              autoComplete="new-password"
            />
            <FormTextField control={form.control} name="role" select label="Role">
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="trainer">Trainer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </FormTextField>
            <Button type="submit" variant="contained" startIcon={<PersonAddIcon />} disabled={status === 'loading'}>
              Create account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </AuthPanel>
  )
}


export default RegisterPage