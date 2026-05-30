import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { updateAccount } from 'app/store/slice'
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { transl, type LocaleKey } from 'lib/tool'
import { updateUserDefaultValue } from 'lib/form'

const _FORM_KEY = {
  FIRSTNAME: 'firstname',
  LASTNAME : 'lastname',
  USERNAME : 'username',
  EMAIL    : 'email',
  LOCATION : 'location',
  AVATAR   : 'avatar'
}

const AuthSettingPage = () => {
  const dispatch                = useAppDispatch()
  const { user, status, error } = useAppSelector((state) => state.auth)
  const [notice, setNotice]     = useState<string | null>(null)
  const [form, setForm] = useState(updateUserDefaultValue)

  useEffect(() => {
    if (user) {
      setForm(updateUserDefaultValue(user))
    }
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    const result = await dispatch(updateAccount(form))
    if (updateAccount.fulfilled.match(result)) {
      setNotice(transl('account_updated'))
    }
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant={'h1'}>{transl('update_account')}</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack component={'form'} spacing={2} onSubmit={handleSubmit}>
            {notice ? <Alert severity={'success'}>{notice}</Alert> : null}
            {error ? <Alert severity={'error'}>{error}</Alert> : null}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label={transl(_FORM_KEY.FIRSTNAME as LocaleKey)}
                value={form.firstname}
                onChange={(event) => setForm({ ...form, firstname: event.target.value })}
                required
              />
              <TextField
                fullWidth
                label={transl(_FORM_KEY.LASTNAME as LocaleKey)}
                value={form.lastname}
                onChange={(event) => setForm({ ...form, lastname: event.target.value })}
              />
            </Stack>

            <TextField
              label={transl(_FORM_KEY.USERNAME as LocaleKey)}
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              required
            />
            <TextField
              label={transl(_FORM_KEY.EMAIL as LocaleKey)}
              type={_FORM_KEY.EMAIL}
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
            <TextField label={transl('location')} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
            <TextField label={transl('avatar_url')} value={form.avatar} onChange={(event) => setForm({ ...form, avatar: event.target.value })} />

            <Button type={'submit'} variant={'contained'} startIcon={<SaveIcon />} disabled={status === 'loading'}>
              {transl('save_setting')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default AuthSettingPage
