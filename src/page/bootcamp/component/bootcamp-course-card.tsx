import { KEY } from 'config'
import type { Bootcamp } from 'types'
import { Grid2, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/CheckSharp'
import { CompactListIcon } from 'design/styled'
import { transl, type LocaleKey } from 'lib/tool'

const BootcampTraitOptionItem = ({ label, enabled }: { label: LocaleKey, enabled: boolean }) => (
    <ListItem key={String(label)} disableGutters>
        <CompactListIcon>
            <CheckIcon color={enabled ? 'success' : 'disabled'} />
        </CompactListIcon>
        <ListItemText primary={transl(label)} />
    </ListItem>
)

const BootcampTraitOptionCard = ({ selected }: { selected: Bootcamp }) => {
  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <Card>
        <CardContent>
          <Typography variant={'h2'}>{transl('program_fit')}</Typography>
          <List dense>
            {KEY.TRAIT_OPTION(selected).map(([label, enabled]) => (
              <BootcampTraitOptionItem label={label as LocaleKey} enabled={enabled as boolean} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid2>
  )
}

export default BootcampTraitOptionCard