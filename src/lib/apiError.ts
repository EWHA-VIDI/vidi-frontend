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

// apiClient가 실패한 요청을 이 형식으로 바꿈
// 서버가 ErrorResponse를 보낸 경우에만 data가 있음
// 네트워크 오류 및 타임아웃에는 status와 data가 없음
export class ApiRequestError extends Error {
  readonly status?: number
  readonly data?: ApiError

  constructor(message: string, options: { status?: number; data?: ApiError; cause?: unknown }) {
    super(message, { cause: options.cause })
    this.name = 'ApiRequestError'
    this.status = options.status
    this.data = options.data
  }
}

export function getApiError(error: unknown): ApiError | undefined {
  if (isApiError(error)) return error
  if (!isRecord(error)) return undefined
  if (isApiError(error.data)) return error.data
  if (isRecord(error.response) && isApiError(error.response.data)) return error.response.data
  return undefined
}
