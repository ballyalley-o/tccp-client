import { useEffect, useState }                                               from 'react'
import { useNavigate, Link as RouterLink }                                   from 'react-router-dom'
import { useForm }                                                           from 'react-hook-form'
import { zodResolver }                                                       from '@hookform/resolvers/zod'
import { clearAuthError, register }                                          from 'app/store/slice'
import { useAppDispatch, useAppSelector }                                    from 'app/hook'
import { PATH }                                                              from 'route/path'
import { registerSchema, registerUserDefaultValue, type RegisterFormValues } from 'lib/form'
import { Alert, Button, Card, CardContent, MenuItem, Stack }                 from '@mui/material'
import PersonAddIcon                                                         from '@mui/icons-material/PersonAdd'
import { ArrowBack }                                                         from '@mui/icons-material'
import { FormPasswordField, FormTextField }                                  from 'component/form'
import { AuthPanel, FormTitle }                                              from 'design/styled'
import { apiRequest }                                                        from 'lib/api'
import { formatText, transl, type LocaleKey }                                from 'lib/tool'
import type { ApiCollection, AuthRole }                                      from 'types'


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

const RegisterPage = () => {
  const [roles, setRoles]               = useState<AuthRole[]>([])
  const [roleError, setRoleError]       = useState<string | null>(null)
  const [rolesLoading, setRolesLoading] = useState(true)
  const { status, error }               = useAppSelector((state) => state.auth)
  const dispatch                        = useAppDispatch()
  const navigate                        = useNavigate()
  const form                            = useForm<RegisterFormValues>({
    defaultValues: registerUserDefaultValue(),
    resolver     : zodResolver(registerSchema),
  })
  const selectedRoleId    = form.watch(_FORM_KEY.ROLE)
  const selectedRole      = roles.find((role) => role._id === selectedRoleId)
  const needsOrganization = selectedRole?.name === 'trainer' || selectedRole?.name === 'admin'

  useEffect(() => {
    dispatch(clearAuthError())

    let active = true

    apiRequest<ApiCollection<AuthRole>>('/auth/role')
      .then((response) => {
        if (!active) return

        const publicRoles = response.data.filter((role) => role.name !== 'admin' && role.metadata?.public !== false)
        setRoles(publicRoles)

        const defaultRole = publicRoles.find((role) => role.name === 'student')
          ?? publicRoles.find((role) => role.name === 'user')
          ?? publicRoles[0]
        if (defaultRole) form.setValue(_FORM_KEY.ROLE, defaultRole._id, { shouldValidate: true })
      })
      .catch((reason: unknown) => {
        if (!active) return
        setRoleError(reason instanceof Error ? reason.message : transl('error.generic'))
      })
      .finally(() => {
        if (active) setRolesLoading(false)
      })

    return () => {
      active = false
    }
  }, [dispatch, form])

  const handleSubmit = form.handleSubmit(async (values) => {
    if (needsOrganization && !values.organization.trim()) {
      form.setError(_FORM_KEY.ORGANIZATION, {
        message: transl('validation.default.required', { field: 'organization' })
      })
      return
    }

    const result = await dispatch(register({
      ...values,
      organization: needsOrganization ? values.organization : undefined
    }))
    if (register.fulfilled.match(result)) {
      navigate('/')
    }
  })

  return (
    <AuthPanel wide>
      <Card>
        <CardContent>
          <Stack component={'form'} spacing={4} onSubmit={handleSubmit}>
            <FormTitle variant={'h1'}>{transl('create_account')}</FormTitle>
            {error || roleError ? <Alert severity='error'>{error || roleError}</Alert> : null}
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormTextField control={form.control} name={_FORM_KEY.FIRSTNAME} fullWidth label={transl(_FORM_KEY.FIRSTNAME as LocaleKey)} required />
                <FormTextField control={form.control} name={_FORM_KEY.LASTNAME} fullWidth label={transl(_FORM_KEY.LASTNAME as LocaleKey)} />
              </Stack>
              <FormTextField control={form.control} name={_FORM_KEY.USERNAME} label={transl(_FORM_KEY.USERNAME as LocaleKey)} required autoComplete={_FORM_KEY.USERNAME} />
              <FormTextField control={form.control} name={_FORM_KEY.EMAIL} label={transl(_FORM_KEY.EMAIL as LocaleKey)} type={_FORM_KEY.EMAIL} required autoComplete={_FORM_KEY.EMAIL} />
              <FormPasswordField control={form.control} name={_FORM_KEY.PASSWORD} label={transl(_FORM_KEY.PASSWORD as LocaleKey)} required autoComplete={_FORM_KEY.NEW_PASSWORD} />
              <FormTextField control={form.control} name={_FORM_KEY.ROLE} select label={formatText(transl(_FORM_KEY.ROLE as LocaleKey), 'capitalize')}>
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.label || formatText(role.name, 'capitalize')}
                  </MenuItem>
                ))}
              </FormTextField>
              {needsOrganization ? (
                <FormTextField control={form.control} name={_FORM_KEY.ORGANIZATION} label={transl(_FORM_KEY.ORGANIZATION as LocaleKey)} required autoComplete={_FORM_KEY.ORGANIZATION} />
              ) : null}
            </Stack>
            <Button type={'submit'} variant={'contained'} color={'warning'} startIcon={<PersonAddIcon />} disabled={status === 'loading' || rolesLoading || roles.length === 0}>
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
