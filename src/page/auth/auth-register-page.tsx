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
import { formatText, transl, type LocaleKey } from 'lib/tool'


const _FORM_KEY = {
  FIRSTNAME   : 'firstname',
  LASTNAME    : 'lastname',
  USERNAME    : 'username',
  EMAIL       : 'email',
  PASSWORD    : 'password',
  ROLE        : 'role',
  NEW_PASSWORD: 'new-password',
  ORGANIZATION: 'organization',
} as const

const _DEFAULT_ROLE = 'student'

const RegisterPage = () => {
  const dispatch          = useAppDispatch()
  const navigate          = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const form              = useForm<RegisterFormValues>({
    defaultValues: {
      firstname   : '',
      lastname    : '',
      username    : '',
      email       : '',
      password    : '',
      role        : _DEFAULT_ROLE,
      organization: '',
    },
    resolver: zodResolver(registerSchema),
  })
  const selectedRole = form.watch(_FORM_KEY.ROLE)
  const isAdmin      = selectedRole === 'admin'

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
          <Stack component={'form'} spacing={2} onSubmit={handleSubmit}>
            <FormTitle variant={'h1'}>{transl('create_account')}</FormTitle>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormTextField control={form.control} name={_FORM_KEY.FIRSTNAME} fullWidth label={transl(_FORM_KEY.FIRSTNAME as LocaleKey)} required />
              <FormTextField control={form.control} name={_FORM_KEY.LASTNAME} fullWidth label={transl(_FORM_KEY.LASTNAME as LocaleKey)} />
            </Stack>
            <FormTextField control={form.control} name={_FORM_KEY.USERNAME} label={transl(_FORM_KEY.USERNAME as LocaleKey)} required autoComplete={_FORM_KEY.USERNAME} />
            <FormTextField control={form.control} name={_FORM_KEY.EMAIL} label={transl(_FORM_KEY.EMAIL as LocaleKey)} type={_FORM_KEY.EMAIL} required autoComplete={_FORM_KEY.EMAIL} />
            <FormPasswordField control={form.control} name={_FORM_KEY.PASSWORD} label={transl(_FORM_KEY.PASSWORD as LocaleKey)} required autoComplete={_FORM_KEY.NEW_PASSWORD} />
            <FormTextField control={form.control} name={_FORM_KEY.ROLE} select label={transl(_FORM_KEY.ROLE as LocaleKey)}>
              {KEY.ROLE.map((_r) => (
                <MenuItem key={_r} value={_r}>{formatText(transl((`roles.${_r}`) as unknown as never), 'capitalize')}</MenuItem>
              ))}
            </FormTextField>
            {isAdmin ? (
              <FormTextField control={form.control} name={_FORM_KEY.ORGANIZATION} label={transl(_FORM_KEY.ORGANIZATION as LocaleKey)} required autoComplete={_FORM_KEY.ORGANIZATION} />
            ) : null}
            <Button type={'submit'} variant={'contained'} color={'warning'} startIcon={<PersonAddIcon />} disabled={status === 'loading'}>
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
