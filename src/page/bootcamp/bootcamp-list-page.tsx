import { useEffect, useMemo, useState } from 'react'
import { FILTER } from 'config'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchBootcamps } from 'app/store/slice'
import { Box, Grid2, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { BootcampCard } from 'component/shared/card'
import { StatusView } from 'component/shared/loader'
import { StickyStack } from 'design/styled'
import { transl } from 'lib/tool'

const BootcampListPage = () => {
  const dispatch                 = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.bootcamps)
  const [search, setSearch]      = useState('')
  const [sort, setSort]          = useState('-rating')

  useEffect(() => {
    dispatch(fetchBootcamps({ sort }))
  }, [dispatch, sort])

  const filtered = useMemo(() => {
    const next = search.trim().toLowerCase()
    if (!next) {
      return items
    }

    return items.filter((bootcamp) =>
      [bootcamp.name, bootcamp.description, ...(bootcamp.careers ?? [])].join(' ').toLowerCase().includes(next)
    )
  }, [items, search])

  return (
    <Stack spacing={3}>
      <StickyStack spacing={3}>
        <Box>
          <Typography variant={'h1'}>{transl('message.find_bootcamp')}</Typography>
          <Typography color={'text.secondary'} sx={{ mt: 1, maxWidth: 760 }}>{transl('bootcamp')}</Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label={transl('search_bootcamps')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            label={transl('sort')}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            sx={{ minWidth: { md: 220 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <FilterListIcon />
                  </InputAdornment>
                ),
              },
            }}
          >
            {FILTER.BOOTCAMP_1.map((_f) => (
              <MenuItem value={_f.value}>{_f.label}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </StickyStack>

      {status === 'loading' || status === 'failed' ? (
        <StatusView status={status} error={error} />
      ) : (
        <Grid2 container spacing={2}>
          {filtered.map((bootcamp) => (
            <Grid2 key={bootcamp._id} size={{ xs: 12, md: 6, lg: 4 }}>
              <BootcampCard bootcamp={bootcamp} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  )
}


export default BootcampListPage