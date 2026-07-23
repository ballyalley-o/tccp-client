import type { Bootcamp } from 'types'
import { Card, CardContent, Typography, Chip } from '@mui/material'
import { IntroText, TagStack } from 'design/styled'
import { transl } from 'lib/tool'

const BootcampMainCard = ({ selected }: { selected: Bootcamp }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant={'h2'}>{transl('overview')}</Typography>
        <IntroText color={'text.secondary'}>{selected.description}</IntroText>
        <TagStack direction={'row'} spacing={1} flexWrap={'wrap'} useFlexGap>
          {selected.careers.map((career: string) => (
            <Chip key={career} label={career} color={'primary'} variant={'outlined'} />
          ))}
        </TagStack>
      </CardContent>
    </Card>
  )
}

export default BootcampMainCard