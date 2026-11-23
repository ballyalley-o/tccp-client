import type { ApiError }     from 'types/model'
import { transl }            from 'lib/tool'
import { ACTIVE_LOCALE_KEY } from 'config/locale.config'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const DEFAULT_TIMEOUT_MS = 12_000
const DEFAULT_GET_RETRIES = 2

export const API_CONNECTION_EVENT = 'tccp:api-connection'

type ApiConnectionState = 'connected' | 'offline' | 'unavailable'
type ApiRequestOptions = RequestInit & {
  token     ?: string | null
  timeoutMs?: number
  retries  ?: number
}

const reportConnection = (state: ApiConnectionState) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(API_CONNECTION_EVENT, { detail: state }))
  }
}

const wait = (delay: number) => new Promise((resolve) => window.setTimeout(resolve, delay))

const createApiError = (
  message: string,
  kind: ApiError['kind'],
  status = 0,
  errorCode?: string
): ApiError => Object.assign(new Error(message), { status, kind, errorCode })

const securityHeaders = {
  'Content-Type'   : 'application/json',
  Accept           : 'application/json',
  'x-locale'       : ACTIVE_LOCALE_KEY,
  'Accept-Language': ACTIVE_LOCALE_KEY
}

export async function apiRequest<T>(
path   : string,
options: ApiRequestOptions = {}
)      : Promise<T> {
  const { token, headers, timeoutMs = DEFAULT_TIMEOUT_MS, retries, signal, ...init } = options
  const method     = (init.method || 'GET').toUpperCase()
  const maxRetries = retries ?? (method === 'GET' ? DEFAULT_GET_RETRIES : 0)

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const controller = new AbortController()
    const timeoutId  = window.setTimeout(() => controller.abort('timeout'), timeoutMs)
    const abort      = () => controller.abort(signal?.reason)
    signal?.addEventListener('abort', abort, { once: true })

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        signal     : controller.signal,
        credentials: 'include',
        headers    : {
          ...securityHeaders,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers
        }
      })

      reportConnection('connected')
      const payload = await response.json().catch(() => ({}))

      if (response.ok) return payload as T

      const retryable = [429, 502, 503, 504].includes(response.status)
      if (retryable && attempt < maxRetries) {
        const retryAfter = Number(response.headers.get('Retry-After'))
        const delay      = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : (600 * (2 ** attempt)) + Math.random() * 250
        await wait(delay)
        continue
      }

      const message = payload.message || payload.error?.message || transl('error.generic')
      throw Object.assign(createApiError(message, 'http', response.status, payload.errorCode), {
        messageKey: payload.messageKey,
        params    : payload.params,
      })
    } catch (cause) {
      if ((cause as ApiError)?.kind === 'http') throw cause
      if (signal?.aborted) throw createApiError('Request aborted', 'aborted', 0, 'REQUEST_ABORTED')

      const timedOut = controller.signal.aborted
      if (attempt < maxRetries) {
        await wait((600 * (2 ** attempt)) + Math.random() * 250)
        continue
      }

      const offline = typeof navigator !== 'undefined' && !navigator.onLine
      reportConnection(offline ? 'offline' : 'unavailable')
      throw createApiError(
        transl(timedOut ? 'error.request_timeout' : 'error.server_unavailable'),
        timedOut ? 'timeout' : offline ? 'offline' : 'unavailable',
        0,
        timedOut ? 'REQUEST_TIMEOUT' : 'SERVER_UNAVAILABLE'
      )
    } finally {
      window.clearTimeout(timeoutId)
      signal?.removeEventListener('abort', abort)
    }
  }

  throw createApiError(transl('error.server_unavailable'), 'unavailable', 0, 'SERVER_UNAVAILABLE')
}

export const checkApiConnection = () => apiRequest<unknown>('/auth/role', { retries: 0, timeoutMs: 5_000 })

export const asQueryString = (query: Record<string, string | number | undefined>) => {
  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  })

  const next = params.toString()
  return next ? `?${next}`: ''
}
