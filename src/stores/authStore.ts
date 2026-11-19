import { create } from 'zustand'

import type { UserRole } from '@/types/auth'

// access token은 메모리에만 둠 (localStorage 등에 저장하지 않음)
// refresh token은 BE가 HttpOnly 쿠키로 관리하므로 store에 없음
type AuthState = {
  accessToken: string | null
  role: UserRole | null
  // 앱 시작 시 세션 복구 시도가 끝났는지 여부. 끝나기 전에는 로그인 여부를 판단하지 않음
  isInitialized: boolean
  setSession: (accessToken: string, role: UserRole) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  isInitialized: false,
  setSession: (accessToken, role) => set({ accessToken, role, isInitialized: true }),
  clearSession: () => set({ accessToken: null, role: null, isInitialized: true }),
}))
