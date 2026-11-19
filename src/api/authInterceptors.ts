import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { isAxiosError } from 'axios'

import { refreshAccessToken } from '@/api/authSession'
import { useAuthStore } from '@/stores/authStore'

type RetriableRequestConfig = InternalAxiosRequestConfig & { authRetried?: boolean }

// axios 인스턴스에 인증 인터셉터를 붙임
// apiClient에 연결할 때는 에러 변환 인터셉터보다 먼저 호출해서 axios 원본 에러를 받게 함
export function setupAuthInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`)
    return config
  })

  // 401이면 refresh 후 원래 요청을 한 번만 다시 보냄
  // refresh가 실패하면 refreshAccessToken이 세션을 지우고, ProtectedRoute가 로그인 화면으로 보냄
  instance.interceptors.response.use(undefined, async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401 || !error.config) {
      return Promise.reject(error)
    }

    const config: RetriableRequestConfig = error.config
    if (config.authRetried) return Promise.reject(error)
    config.authRetried = true

    const accessToken = await refreshAccessToken()
    if (!accessToken) return Promise.reject(error)

    // 다시 보낼 때 요청 인터셉터가 새 access token을 붙임
    return instance.request(config)
  })
}
