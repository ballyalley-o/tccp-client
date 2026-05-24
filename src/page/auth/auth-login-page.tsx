import { zodResolver } from '@hookform/resolvers/zod'
import LoginIcon from '@mui/icons-material/Login'
import { Alert, Button, Card, CardContent, Divider, Stack } from '@mui/material'
import { FormPasswordField, FormTextField } from 'component/form'
import { AuthPanel, FormTitle } from 'design/styled'
import { loginSchema, type LoginFormValues } from 'lib/form'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { login } from 'app/store/slice'

interface LocationState {
  from?: { pathname?: string }
}

const LogInPage = () => {
  const dispatch                = useAppDispatch()
  const navigate                = useNavigate()
  const location                = useLocation()
  const { status, error }       = useAppSelector((state) => state.auth)
  const form                    = useForm<LoginFormValues>({
    defaultValues: {
      email   : '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = await dispatch(login(values))
    if (login.fulfilled.match(result)) {
      const state = location.state as LocationState | null
      navigate(state?.from?.pathname || '/', { replace: true })
    }
  })

  return (
    <AuthPanel>
      <Card>
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <FormTitle variant="h1">
              Sign in
            </FormTitle>
            {error ? <Alert severity="error">{error}</Alert> : null}
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
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" startIcon={<LoginIcon />} disabled={status === 'loading'}>
              Sign in
            </Button>
            <Divider />
            <Button component={RouterLink} to="/register" color="inherit">
              Create an account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </AuthPanel>
  )
}


export default LogInPage