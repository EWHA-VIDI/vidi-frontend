import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'

// TODO(VIDI-26): BE 로그인·refresh API가 나오면 orval 생성 타입으로 교체
type RefreshResponse = {
  accessToken: string
  role: UserRole
}

export const REFRESH_PATH = '/auth/refresh'

// refresh 요청은 apiClient의 인터셉터(토큰 첨부, 401 처리)를 거치지 않도록 따로 보냄
// refresh token은 HttpOnly 쿠키라 브라우저가 자동으로 붙임 (FE와 API가 같은 도메인)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10_000,
})

let refreshPromise: Promise<string | null> | null = null

// refresh 요청을 보내 새 access token으로 세션을 갱신함. 실패하면 세션을 지우고 null을 돌려줌
// 여러 요청이 동시에 401을 받아도 refresh 요청은 한 번만 보냄
export function refreshAccessToken(): Promise<string | null> {
  refreshPromise ??= requestRefresh().finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

async function requestRefresh() {
  const { setSession, clearSession } = useAuthStore.getState()

  try {
    const { data } = await refreshClient.post<RefreshResponse>(REFRESH_PATH)
    setSession(data.accessToken, data.role)
    return data.accessToken
  } catch {
    clearSession()
    return null
  }
}

// 앱 시작 시 refresh 쿠키로 세션을 복구함. 성공·실패와 관계없이 끝나면 isInitialized가 true가 됨
export async function restoreSession() {
  await refreshAccessToken()
}
