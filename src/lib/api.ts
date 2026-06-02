import type { ApiError } from 'types/model'
import { transl } from 'lib/tool'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

const securityHeaders = {
  'Content-Type': 'application/json',
  Accept        : 'application/json'
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<T> {
  const { token, headers, ...init } = options
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...securityHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    }
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: payload.message || payload.error?.message || transl('error.generic')
    }
    throw error
  }

  return payload as T
}

export const asQueryString = (query: Record<string, string | number | undefined>) => {
  const params = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  })

  const next = params.toString()
  return next ? `?${next}` : ''
}
