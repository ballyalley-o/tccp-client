import { zodResolver } from '@hookform/resolvers/zod'
import { KEY } from 'config'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { register } from 'app/store/slice'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { PATH } from 'route/path'
import { registerSchema, type RegisterFormValues } from 'lib/form'
import { Alert, Button, Card, CardContent, MenuItem, Stack } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { ArrowBack } from '@mui/icons-material'
import { FormPasswordField, FormTextField } from 'component/form'
import { AuthPanel, FormTitle } from 'design/styled'
import { formatText, transl } from 'lib/tool'

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
          <Stack component='form' spacing={2} onSubmit={handleSubmit}>
            <FormTitle variant='h1'>Create account</FormTitle>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormTextField control={form.control} name='firstname' fullWidth label='First name' required />
              <FormTextField control={form.control} name='lastname' fullWidth label='Last name' />
            </Stack>
            <FormTextField control={form.control} name='username' label='Username' required autoComplete='username' />
            <FormTextField control={form.control} name='email' label='Email' type='email' required autoComplete='email' />
            <FormPasswordField control={form.control} name='password' label='Password' required autoComplete='new-password' />
            <FormTextField control={form.control} name='role' select label='Role'>
              {KEY.ROLE.map((_r) => (
                <MenuItem key={_r} value={_r}>{formatText(transl((`roles.${_r}`) as unknown as never), 'capitalize')}</MenuItem>
              ))}
            </FormTextField>
            <Button type='submit' variant={'contained'} color={'warning'} startIcon={<PersonAddIcon />} disabled={status === 'loading'}>
              {formatText(transl('create_account'), 'uppercase')}
            </Button>
            <Button component={RouterLink} to={PATH.AUTH.LOG_IN} variant={'text'} color={'inherit'} startIcon={<ArrowBack />} disabled={status === 'loading'}>
              {formatText(transl('log_in_instead'), 'uppercase')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </AuthPanel>
  )
}


export default RegisterPage