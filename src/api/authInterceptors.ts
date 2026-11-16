import type { AxiosInstance } from 'axios'

import { useAuthStore } from '@/stores/authStore'

// axios 인스턴스에 인증 인터셉터를 붙임
// apiClient에 연결할 때는 에러 변환 인터셉터보다 먼저 호출해서 axios 원본 에러를 받게 함
export function setupAuthInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`)
    return config
  })
}
