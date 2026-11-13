import type { ApiError } from '@/types/api'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isApiError(value: unknown): value is ApiError {
  return (
    isRecord(value) &&
    typeof value.code === 'string' &&
    typeof value.message === 'string' &&
    typeof value.traceId === 'string'
  )
}

export function getApiError(error: unknown): ApiError | undefined {
  if (isApiError(error)) return error
  if (!isRecord(error)) return undefined
  if (isApiError(error.data)) return error.data
  if (isRecord(error.response) && isApiError(error.response.data)) return error.response.data
  return undefined
}
