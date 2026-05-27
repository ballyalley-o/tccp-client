import { useEffect } from 'react'
import { useAppDispatch } from 'app/hook'
import { fetchAccount } from 'app/store/slice'
import { RouterProvider } from 'react-router-dom'
import router from 'route'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'design/theme'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAccount())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App