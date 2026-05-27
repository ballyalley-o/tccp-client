import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from 'app/store/slice'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { PATH } from 'route/path'
import { loginSchema, type LoginFormValues } from 'lib/form'
import { Alert, Button, Card, CardContent, Divider, Stack } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { FormPasswordField, FormTextField } from 'component/form'
import { AuthPanel, FormTitle, SecondaryButton } from 'design/styled'
import { formatText, transl } from 'lib/tool'

interface LocationState {
  from?: { pathname?: string }
}

const LogInPage = () => {
  const dispatch          = useAppDispatch()
  const navigate          = useNavigate()
  const location          = useLocation()
  const { status, error } = useAppSelector((state) => state.auth)
  const form              = useForm<LoginFormValues>({
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
      navigate(state?.from?.pathname || PATH.ROOT, { replace: true })
    }
  })

  return (
    <AuthPanel wide={true}>
      <Card>
        <CardContent>
          <Stack component={'form'} spacing={4} onSubmit={handleSubmit}>
            <FormTitle variant={'h1'}>{transl('get_started')}</FormTitle>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            <Stack spacing={2}>
              <FormTextField control={form.control} name={'email'} label={transl('email')} type={'email'} required autoComplete={'email'} />
              <FormPasswordField control={form.control} name={'password'} label={transl('password')} required autoComplete={'current-password'} />
              <Button type={'submit'} variant={'contained'} color={'warning'} startIcon={<LoginIcon />} disabled={status === 'loading'}>
                {formatText(transl('log_in'), 'uppercase')}
              </Button>
            </Stack>
            <Divider />
            <SecondaryButton component={RouterLink} to={PATH.AUTH.REGISTER} variant={'text'} color={'inherit'} disabled={status === 'loading'}>
              {formatText(transl('create_an_account'), 'uppercase')}
            </SecondaryButton>
          </Stack>
        </CardContent>
      </Card>
    </AuthPanel>
  )
}


export default LogInPage