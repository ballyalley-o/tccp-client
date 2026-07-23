import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { DashboardRecommendation } from 'page/dashboard/dashboard'

interface DashboardRecommendationsProps {
  title          : string
  message        : string
  recommendations: DashboardRecommendation[]
}

const DashboardRecommendations = ({ title, message, recommendations }: DashboardRecommendationsProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant='h3'>{title}</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              {message}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} variant='outlined'>
                <CardContent>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                        {recommendation.title}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {recommendation.meta}
                      </Typography>
                    </Box>
                    <Button variant='outlined' size='small' onClick={() => navigate(recommendation.path)}>
                      {recommendation.action}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardRecommendations
