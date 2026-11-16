import axios, { AxiosError } from 'axios'

import { ApiRequestError, getApiError } from '@/lib/apiError'

const DEFAULT_TIMEOUT_MS = 10_000

const NETWORK_ERROR_MESSAGE = '서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.'
const TIMEOUT_ERROR_MESSAGE = '서버 응답이 늦어지고 있습니다. 잠시 후 다시 시도해 주세요.'
const UNKNOWN_ERROR_MESSAGE = '요청을 처리하지 못했습니다.'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// TODO(VIDI-25): 요청 인터셉터에서 accessToken 첨부, 응답 인터셉터에서 401 refresh 후 재시도

export function toApiRequestError(error: unknown): ApiRequestError {
  if (error instanceof ApiRequestError) return error

  if (!(error instanceof AxiosError)) {
    return new ApiRequestError(UNKNOWN_ERROR_MESSAGE, { cause: error })
  }

  const status = error.response?.status
  const data = getApiError(error)

  if (data) return new ApiRequestError(data.message, { status, data, cause: error })
  if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
    return new ApiRequestError(TIMEOUT_ERROR_MESSAGE, { cause: error })
  }
  if (!error.response) return new ApiRequestError(NETWORK_ERROR_MESSAGE, { cause: error })

  return new ApiRequestError(UNKNOWN_ERROR_MESSAGE, { status, cause: error })
}

apiClient.interceptors.response.use(undefined, (error: unknown) =>
  Promise.reject(toApiRequestError(error)),
)
