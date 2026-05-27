import { createTheme }  from '@mui/material/styles'
import { designTokens } from './token'

export const theme = createTheme({
  cssVariables: true,
  palette     : {
    mode   : 'light',
    primary: {
      main        : designTokens.color.brand.primary,
      dark        : designTokens.color.brand.primary_dark,
      contrastText: designTokens.color.contrast.white
    },
    secondary: {
      main: designTokens.color.brand.secondary
    },
    error: {
      main: designTokens.color.status.error
    },
    success: {
      main: designTokens.color.status.success
    },
    warning: {
      main: designTokens.color.brand.accent
    },
    background: {
      default: designTokens.color.neutral.surface_alt,
      paper  : designTokens.color.neutral.surface
    },
    text: {
      primary  : designTokens.color.neutral.ink,
      secondary: designTokens.color.neutral.muted
    },
    divider: designTokens.color.neutral.border
  },
  shape: {
    borderRadius: designTokens.radius.xs
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1        : {
      fontWeight: designTokens.typography.weight.bold,
      fontSize  : designTokens.typography.size.h1,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h2: {
      fontWeight: designTokens.typography.weight.bold,
      fontSize  : designTokens.typography.size.h2,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h3: {
      fontWeight: designTokens.typography.weight.bold,
      fontSize  : designTokens.typography.size.h3,
      lineHeight: designTokens.typography.lineHeight.loose,
    },
    button: {
      fontWeight   : designTokens.typography.weight.bold,
      textTransform: 'none',
    }
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.xs,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${designTokens.color.neutral.border}`,
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.xs,
          minHeight   : 40
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.xs,
          border      : `1px solid ${designTokens.color.neutral.border}`,
          boxShadow   : '0 1px 2px rgba(60, 64, 67, 0.08)'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 24,
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          gap: theme.spacing(designTokens.spacing.xl),
        })
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radius.xs
        }
      }
    }
  }
})
