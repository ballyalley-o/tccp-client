import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { DashboardAction } from 'page/dashboard/dashboard'
import { transl } from 'lib/tool'

interface DashboardQuickActionProps {
  actions: DashboardAction[]
}

const DashboardQuickAction = ({ actions }: DashboardQuickActionProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant={'h3'}>{transl('quick_actions')}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {actions.map((action) => (
              <Button key={action.id} variant={action.variant} startIcon={action.icon} onClick={() => navigate(action.path)} sx={{ flex: 1 }}>
                {transl(action.label)}
              </Button>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardQuickAction
