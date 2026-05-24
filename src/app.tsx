import { useEffect } from 'react'
import { useAppDispatch } from 'app/hook'
import { fetchAccount } from 'app/store/slice'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { RootLayout } from 'route/layout'
import { theme } from 'design/theme'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAccount())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootLayout />
    </ThemeProvider>
  )
}

export default App