import { create } from 'zustand'

import type { UserRole } from '@/types/auth'

type AuthState = {
  accessToken: string | null
  role: UserRole | null
  setSession: (accessToken: string, role: UserRole) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  setSession: (accessToken, role) => set({ accessToken, role }),
  clearSession: () => set({ accessToken: null, role: null }),
}))
