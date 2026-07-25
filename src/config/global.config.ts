export const GLOBAL = {
  APP_NAME   : import.meta.env.VITE_APP_NAME || 'TCC Projct',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || 'v1',
  LOCALE     : import.meta.env.VITE_LOCALE_LANG || 'en',                                            // temp impl feat: change to navbar ui changable
  PORT       : import.meta.env.PORT || 5173,
} as const