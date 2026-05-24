import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env       = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:3003'

  return {
    plugins      : [react(), tsconfigPaths()],
    tsconfigPaths: true,
    server       : {
      port : Number(env.VITE_CLIENT_PORT || 5173),
      proxy: {
        '/api': {
          target      : apiTarget,
          changeOrigin: true,
          secure      : false,
        },
      },
    },
  }
})
